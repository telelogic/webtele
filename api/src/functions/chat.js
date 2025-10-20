// Azure Functions (Node.js v4) HTTP-triggered function
// Strictly answers from local knowledge JSON; optionally uses Azure OpenAI for refinement if configured

const { app } = require('@azure/functions');
const fs = require('node:fs/promises');
const path = require('node:path');

async function loadKnowledge() {
  try {
    // In SWA managed functions, knowledge file is in the same api directory
    const filePath = path.join(process.cwd(), 'knowledge', 'telelogic.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function searchKnowledge(kb, query, lang = 'en') {
  const q = String(query || '').toLowerCase();
  if (!q) return null;

  // FAQs first
  for (const f of kb.faqs || []) {
    const qEn = String(f.q || '').toLowerCase();
    const qEl = String(f.q_el || '').toLowerCase();
    if (q.includes(qEn) || qEn.includes(q) || q.includes(qEl) || qEl.includes(q)) {
      return lang === 'el' ? (f.a_el || f.a) : f.a;
    }
  }
  // Score services by simple keyword overlap
  let best = null;
  for (const s of kb.services || []) {
    let score = 0;
    const title = (lang === 'el' ? s.title_el : s.title) || s.title;
    const summary = (lang === 'el' ? s.summary_el : s.summary) || s.summary;
    const details = (lang === 'el' ? s.details_el : s.details) || s.details;
    if (String(title).toLowerCase().includes(q)) score += 3;
    for (const t of s.tags || []) if (q.includes(String(t).toLowerCase())) score += 2;
    if (String(summary).toLowerCase().includes(q)) score += 1;
    if (score > 0) {
      const text = `${title}: ${summary}\n${details}`;
      if (!best || score > best.score) best = { score, text };
    }
  }
  return best?.text || null;
}

app.http('chat', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'chat',
  handler: async (req, ctx) => {
    ctx.log('chat function invoked');
    if (req.method === 'OPTIONS') {
      return { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
    }

    let body = {};
    try {
      body = await req.json();
    } catch {}

    const message = String(body?.message || '').trim();
    const lang = (body?.lang === 'el' ? 'el' : 'en');
    if (!message) {
      return { status: 400, jsonBody: { error: 'Missing "message"' }, headers: { 'Access-Control-Allow-Origin': '*' } };
    }

    const kb = await loadKnowledge();
    if (!kb) {
      return { status: 500, jsonBody: { error: 'Knowledge not available' }, headers: { 'Access-Control-Allow-Origin': '*' } };
    }

    const grounded = searchKnowledge(kb, message, lang);
    if (grounded) {
      return { status: 200, jsonBody: { reply: grounded }, headers: { 'Access-Control-Allow-Origin': '*' } };
    }

    // Optional Azure OpenAI refinement (kept constrained). This path is off by default unless env vars are set.
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT; // e.g. gpt-4o-mini
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-10-01-preview';

    if (endpoint && deployment) {
      try {
        const prompt = `You are a helpful assistant for Telelogic. Only answer using this JSON knowledge and the requested language (${lang}). If the answer is not present, respond with: I don't have that information. Knowledge: ${JSON.stringify(kb)}`;
        const resp = await fetch(`${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Prefer Managed Identity; if not available, use API key env var
              ...(process.env.AZURE_OPENAI_API_KEY ? { 'api-key': process.env.AZURE_OPENAI_API_KEY } : {}),
            },
            body: JSON.stringify({
              messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: message }
              ],
              temperature: 0.2,
              max_tokens: 300
            }),
          },
        );
        if (resp.ok) {
          const data = await resp.json();
          const reply = data?.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return { status: 200, jsonBody: { reply }, headers: { 'Access-Control-Allow-Origin': '*' } };
          }
        } else {
          ctx.error?.(`Azure OpenAI error: ${resp.status}`);
        }
      } catch (err) {
        ctx.error?.('Azure OpenAI call failed', err);
      }
    }

    const fallback = lang === 'el'
      ? 'Δεν είμαι σίγουρος για αυτό. Παρακαλώ ρωτήστε για την Telelogic και τις υπηρεσίες μας.'
      : "I'm not sure about that. Please ask about Telelogic and our services.";
    return { status: 200, jsonBody: { reply: fallback }, headers: { 'Access-Control-Allow-Origin': '*' } };
  },
});
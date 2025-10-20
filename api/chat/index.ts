import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

// Minimal retrieval from local JSON and (optionally) Azure OpenAI grounding
// Uses environment variables for Azure OpenAI when available
// AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT, AZURE_OPENAI_API_VERSION (optional), uses Managed Identity if deployed on Azure (recommended)

interface KnowledgeService {
  services: Array<{ title: string; tags: string[]; summary: string; details: string; links?: string[] }>;
  faqs?: Array<{ q: string; a: string }>;
}

async function loadKnowledge(): Promise<KnowledgeService | null> {
  try {
    const file = await import('../knowledge/telelogic.json', { assert: { type: 'json' } } as any);
    return (file as any).default ?? (file as any);
  } catch (e) {
    return null;
  }
}

async function searchKnowledge(kb: KnowledgeService, query: string): Promise<string | null> {
  const q = query.toLowerCase();
  // Try FAQs exact-ish match first
  for (const f of kb.faqs ?? []) {
    if (q.includes(f.q.toLowerCase()) || f.q.toLowerCase().includes(q)) {
      return f.a;
    }
  }
  // Simple scoring for services
  let best: { score: number; text: string } | null = null;
  for (const s of kb.services) {
    let score = 0;
    if (s.title.toLowerCase().includes(q)) score += 3;
    for (const t of s.tags) if (q.includes(t.toLowerCase())) score += 2;
    if (s.summary.toLowerCase().includes(q)) score += 1;
    if (score > 0) {
      const text = `${s.title}: ${s.summary}\n${s.details}`;
      if (!best || score > best.score) best = { score, text };
    }
  }
  return best?.text ?? null;
}

export async function chatHandler(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  ctx.log('chat function invoked');

  if (req.method !== 'POST') {
    return { status: 405, jsonBody: { error: 'Method not allowed' } };
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return { status: 400, jsonBody: { error: 'Invalid JSON' } };
  }

  const message = (body?.message ?? '').toString().trim();
  if (!message) {
    return { status: 400, jsonBody: { error: 'Missing "message"' } };
  }

  const kb = await loadKnowledge();
  if (!kb) {
    return { status: 500, jsonBody: { error: 'Knowledge not available' } };
  }

  // Strict mode: answer only from knowledge base
  const grounded = await searchKnowledge(kb, message);
  if (grounded) {
    return { status: 200, jsonBody: { reply: grounded } };
  }

  // Optional Azure OpenAI path: augment answer using Azure OpenAI but still constrained
  // For now, we keep it strict and return a fallback if no match
  const fallback = "I'm not sure about that. Please ask about Telelogic and our services.";
  return { status: 200, jsonBody: { reply: fallback } };
}

app.http('chat', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'chat',
  handler: chatHandler,
});

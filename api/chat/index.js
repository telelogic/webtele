const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
  context.log('Chat function invoked');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
    return;
  }

  const message = String(req.body?.message || '').trim();
  const lang = (req.body?.lang === 'el' ? 'el' : 'en');
  
  if (!message) {
    context.res = {
      status: 400,
      body: { error: 'Missing "message"' },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    return;
  }

  // Load knowledge base
  let kb = null;
  try {
    const filePath = path.join(__dirname, '..', 'knowledge.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    kb = JSON.parse(raw);
  } catch (err) {
    context.log.error('Knowledge loading error:', err);
    context.res = {
      status: 500,
      body: { error: 'Knowledge not available' },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    return;
  }

  // Simple search function
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
    
    // Score services by keyword overlap
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

  const grounded = searchKnowledge(kb, message, lang);
  if (grounded) {
    context.res = {
      status: 200,
      body: { reply: grounded },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    return;
  }

  const fallback = lang === 'el'
    ? 'Δεν είμαι σίγουρος για αυτό. Παρακαλώ ρωτήστε για την Telelogic και τις υπηρεσίες μας.'
    : "I'm not sure about that. Please ask about Telelogic and our services.";
    
  context.res = {
    status: 200,
    body: { reply: fallback },
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
};
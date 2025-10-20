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

  // Check if Azure OpenAI is configured
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  
  if (!endpoint || !apiKey) {
    // Fallback to knowledge base search if Azure OpenAI is not configured
    const fallbackResponse = await fallbackKnowledgeSearch(kb, message, lang);
    context.res = {
      status: 200,
      body: { reply: fallbackResponse },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    return;
  }

  try {
    // Use Azure OpenAI ChatCompletion
    const aiResponse = await getChatCompletion(endpoint, apiKey, kb, message, lang);
    
    context.res = {
      status: 200,
      body: { reply: aiResponse },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  } catch (error) {
    context.log.error('Azure OpenAI error:', error);
    
    // Fallback to knowledge base search on AI error
    const fallbackResponse = await fallbackKnowledgeSearch(kb, message, lang);
    context.res = {
      status: 200,
      body: { reply: fallbackResponse },
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
};

// Azure OpenAI ChatCompletion function
async function getChatCompletion(endpoint, apiKey, knowledgeBase, userMessage, language) {
  const { default: fetch } = await import('node-fetch');
  
  // Create system message with knowledge base context
  const systemMessage = createSystemMessage(knowledgeBase, language);
  
  const requestBody = {
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 800,
    top_p: 0.9
  };

  const response = await fetch(`${endpoint}/openai/deployments/gpt-4o/chat/completions?api-version=2024-10-21`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Create system message with knowledge base context
function createSystemMessage(kb, language) {
  const isGreek = language === 'el';
  
  const basePersonality = isGreek ? 
    `Είσαι ο AI βοηθός της Telelogic, μιας κορυφαίας εταιρείας τηλεπικοινωνιών και τεχνολογίας. Είσαι φιλικός, επαγγελματικός και πάντα πρόθυμος να βοηθήσεις.

ΟΔΗΓΙΕΣ ΣΥΜΠΕΡΙΦΟΡΑΣ:
- Απάντα πάντα στα ελληνικά όταν ο χρήστης γράφει στα ελληνικά
- Είσαι ευγενικός και υποστηρικτικός
- Δίνεις σαφείς και χρήσιμες πληροφορίες
- Όταν δεν ξέρεις κάτι, το παραδέχεσαι ειλικρινά
- Προτείνεις πάντα επόμενα βήματα ή επικοινωνία με την εταιρεία

ΓΝΩΣΕΙΣ ΕΤΑΙΡΕΙΑΣ:` :
    `You are Telelogic's AI assistant, representing a leading telecommunications and technology company. You are friendly, professional, and always eager to help.

BEHAVIOR GUIDELINES:
- Always respond in English when the user writes in English
- Be polite and supportive
- Provide clear and useful information  
- When you don't know something, admit it honestly
- Always suggest next steps or company contact

COMPANY KNOWLEDGE:`;

  // Add company information
  let companyInfo = '';
  if (kb.company) {
    companyInfo = isGreek ?
      `\n\nΕΤΑΙΡΕΙΑ: ${kb.company.name}
SLOGAN: ${kb.company.tagline}
ΠΕΡΙΓΡΑΦΗ: ${kb.company.about}` :
      `\n\nCOMPANY: ${kb.company.name}
TAGLINE: ${kb.company.tagline}
DESCRIPTION: ${kb.company.about}`;
  }

  // Add services information
  let servicesInfo = isGreek ? '\n\nΥΠΗΡΕΣΙΕΣ:' : '\n\nSERVICES:';
  if (kb.services && kb.services.length > 0) {
    kb.services.forEach(service => {
      const title = isGreek ? (service.title_el || service.title) : service.title;
      const summary = isGreek ? (service.summary_el || service.summary) : service.summary;
      const details = isGreek ? (service.details_el || service.details) : service.details;
      
      servicesInfo += `\n- ${title}: ${summary}\n  ${details}`;
    });
  }

  // Add FAQs
  let faqInfo = isGreek ? '\n\nΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ:' : '\n\nFREQUENTLY ASKED QUESTIONS:';
  if (kb.faqs && kb.faqs.length > 0) {
    kb.faqs.forEach(faq => {
      const question = isGreek ? (faq.q_el || faq.q) : faq.q;
      const answer = isGreek ? (faq.a_el || faq.a) : faq.a;
      
      faqInfo += `\nQ: ${question}\nA: ${answer}`;
    });
  }

  return basePersonality + companyInfo + servicesInfo + faqInfo;
}

// Fallback function when Azure OpenAI is not available
async function fallbackKnowledgeSearch(kb, message, lang) {
  const q = String(message || '').toLowerCase().trim();
  
  // Simple greeting responses
  const greetings = ['hello', 'hi', 'hey', 'γεια', 'καλημέρα', 'καλησπέρα'];
  if (greetings.some(greeting => q.includes(greeting))) {
    return lang === 'el' ? 
      'Γεια σας! Είμαι ο AI βοηθός της Telelogic. Πώς μπορώ να σας βοηθήσω;' :
      'Hello! I\'m Telelogic\'s AI assistant. How can I help you?';
  }

  // Search FAQs
  for (const faq of kb.faqs || []) {
    const qEn = String(faq.q || '').toLowerCase();
    const qEl = String(faq.q_el || '').toLowerCase();
    
    if (qEn.includes(q) || q.includes(qEn) || qEl.includes(q) || q.includes(qEl)) {
      return lang === 'el' ? (faq.a_el || faq.a) : faq.a;
    }
  }

  // Search services
  for (const service of kb.services || []) {
    const title = (lang === 'el' ? service.title_el : service.title) || service.title;
    const summary = (lang === 'el' ? service.summary_el : service.summary) || service.summary;
    const allText = `${title} ${summary}`.toLowerCase();
    
    if (allText.includes(q) || service.tags?.some(tag => q.includes(tag.toLowerCase()))) {
      const details = (lang === 'el' ? service.details_el : service.details) || service.details;
      return `${title}: ${summary}\n\n${details}`;
    }
  }

  // Fallback response
  return lang === 'el' ? 
    'Δεν μπόρεσα να βρω συγκεκριμένες πληροφορίες για αυτό. Παρακαλώ επικοινωνήστε μαζί μας για περισσότερη βοήθεια!' :
    'I couldn\'t find specific information about that. Please contact us for more assistance!';
}
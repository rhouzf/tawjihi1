import { createParser } from 'eventsource-parser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversation, searchType } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Préparer le contexte basé sur le type de recherche
    const context = prepareContext(searchType, message);

    // Préparer l'historique de la conversation
    const messages_history = [];
    for (const msg of conversation) {
      if (msg.sender === 'user') {
        messages_history.push({ role: "user", content: msg.text });
      } else {
        messages_history.push({ role: "assistant", content: msg.text });
      }
    }

    // Ajouter le message système avec contexte
    const system_message = {
      role: "system",
      content: `Tu es un assistant spécialisé dans l'orientation scolaire en Tunisie.
      Tu as accès aux informations suivantes sur les écoles ENSA et ENSAM :
      ${context}
      
      Règles importantes :
      1. Réponds toujours en français
      2. Sois précis et concis
      3. Si tu n'as pas assez d'informations, dis-le clairement
      4. Cite tes sources quand c'est possible
      5. Donne des conseils pratiques et réalistes`
    };

    messages_history.unshift(system_message);
    messages_history.push({ role: "user", content: message });

    // Appel à l'API OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.SITE_URL || 'https://votre-site.com',
        'X-Title': 'TawjihiBot',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick:free",
        messages: messages_history,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function prepareContext(searchType, userMessage) {
  let context = "";
  
  if (searchType === "ecole") {
    context = `Instructions pour le LLM :
    - Utilise ces informations pour répondre aux questions sur les écoles
    - Si la question concerne les concours, concentre-toi sur la section 'concours'
    - Si la question concerne l'inscription, utilise la section 'inscription'
    - Si la question concerne les seuils d'admission, utilise la section 'seuils'
    - Si tu n'as pas assez d'informations, dis-le clairement`;
  } else if (searchType === "ecole_filiere") {
    context = `Instructions pour le LLM :
    - Concentre-toi sur les informations concernant les filières
    - Mentionne les conditions d'accès spécifiques à chaque filière
    - Si tu ne trouves pas d'information sur une filière spécifique, dis-le`;
  } else if (searchType === "limite") {
    context = `Instructions pour le LLM :
    - Concentre-toi sur les informations de la section 'seuils'
    - Mentionne les seuils d'admission par filière si disponibles
    - Précise les années de référence des seuils`;
  } else if (searchType === "conseil") {
    context = `Instructions pour le LLM :
    - Donne des conseils généraux sur l'orientation
    - Mentionne les différences entre ENSA et ENSAM
    - Explique les critères de choix entre les deux écoles
    - Si la question concerne une école spécifique, utilise les informations disponibles`;
  }
  
  return context;
} 
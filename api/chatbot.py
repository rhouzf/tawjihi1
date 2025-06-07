from flask import Flask, request, jsonify
import requests
import json
import logging
from flask_cors import CORS
from scraper import SchoolScraper
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)

# Configuration de la sécurité
if os.getenv('FLASK_ENV') != 'development':
    Talisman(app, 
        force_https=True,
        strict_transport_security=True,
        session_cookie_secure=True,
        content_security_policy={
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
            'style-src': "'self' 'unsafe-inline'",
            'img-src': "'self' data: https:",
            'connect-src': "'self' https://openrouter.ai"
        }
    )

# Configuration CORS avec des options plus restrictives
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # En développement, accepter toutes les origines
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configuration du rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Utiliser les variables d'environnement pour les clés sensibles
API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "HTTP-Referer": os.getenv('SITE_URL', 'https://votre-site.com'),
    "X-Title": "TawjihiBot",
}

# Initialiser le scraper
scraper = SchoolScraper()

def extract_school_code(message: str) -> str:
    """
    Extrait le code de l'école du message de l'utilisateur
    """
    message = message.lower()
    if "ensam" in message:
        return "ensam"
    elif "ensa" in message:
        return "ensa"
    return None

def prepare_context(search_type: str, user_message: str) -> str:
    """
    Prépare le contexte pour le LLM en fonction du type de recherche
    """
    context = ""
    
    if search_type == "ecole":
        # Extraire le code de l'école
        school_code = extract_school_code(user_message)
        if school_code:
            # Récupérer les informations via le scraper
            school_info = scraper.search_school_info(school_code)
            if "raw_data" in school_info:
                context = f"""Voici les informations trouvées sur {school_code.upper()} :
                {school_info['raw_data']}
                
                Instructions pour le LLM :
                - Utilise ces informations pour répondre aux questions sur {school_code.upper()}
                - Si la question concerne les concours, concentre-toi sur la section 'concours'
                - Si la question concerne l'inscription, utilise la section 'inscription'
                - Si la question concerne les seuils d'admission, utilise la section 'seuils'
                - Si tu n'as pas assez d'informations, dis-le clairement
                """
    
    elif search_type == "ecole_filiere":
        school_code = extract_school_code(user_message)
        if school_code:
            school_info = scraper.search_school_info(school_code)
            if "raw_data" in school_info:
                context = f"""Voici les informations sur {school_code.upper()} et ses filières :
                {school_info['raw_data']}
                
                Instructions pour le LLM :
                - Concentre-toi sur les informations concernant les filières
                - Mentionne les conditions d'accès spécifiques à chaque filière
                - Si tu ne trouves pas d'information sur une filière spécifique, dis-le
                """
    
    elif search_type == "limite":
        school_code = extract_school_code(user_message)
        if school_code:
            school_info = scraper.search_school_info(school_code)
            if "raw_data" in school_info:
                context = f"""Voici les informations sur les seuils d'admission de {school_code.upper()} :
                {school_info['raw_data']}
                
                Instructions pour le LLM :
                - Concentre-toi sur les informations de la section 'seuils'
                - Mentionne les seuils d'admission par filière si disponibles
                - Précise les années de référence des seuils
                """
    
    elif search_type == "conseil":
        context = """Instructions pour le LLM :
        - Donne des conseils généraux sur l'orientation
        - Mentionne les différences entre ENSA et ENSAM
        - Explique les critères de choix entre les deux écoles
        - Si la question concerne une école spécifique, utilise les informations du scraper
        """
    
    return context

@app.route('/api/chat', methods=['POST'])
@limiter.limit("10 per minute")  # Limite spécifique pour l'endpoint chat
def chat():
    try:
        # Validation des entrées
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.get_json()
        if not data:
            logger.error("No JSON data received")
            return jsonify({"error": "No data received"}), 400

        user_message = data.get('message', '').strip()
        if not user_message:
            logger.error("Empty message")
            return jsonify({"error": "Message cannot be empty"}), 400

        # Limiter la longueur du message
        if len(user_message) > 1000:
            return jsonify({"error": "Message too long"}), 400

        conversation = data.get('conversation', [])
        search_type = data.get('searchType', 'conseil')

        logger.info(f"Received message: {user_message}")
        logger.info(f"Search type: {search_type}")

        # Préparer l'historique de la conversation
        messages_history = []
        for msg in conversation:
            if msg['sender'] == 'user':
                messages_history.append({"role": "user", "content": msg['text']})
            else:
                messages_history.append({"role": "assistant", "content": msg['text']})

        # Préparer le contexte basé sur le type de recherche
        context = prepare_context(search_type, user_message)
        
        # Ajouter le nouveau message avec contexte
        system_message = {
            "role": "system",
            "content": f"""Tu es un assistant spécialisé dans l'orientation scolaire en Tunisie.
            Tu as accès aux informations suivantes sur les écoles ENSA et ENSAM :
            {context}
            
            Règles importantes :
            1. Réponds toujours en français
            2. Sois précis et concis
            3. Si tu n'as pas assez d'informations, dis-le clairement
            4. Cite tes sources quand c'est possible
            5. Donne des conseils pratiques et réalistes
            """
        }
        
        messages_history.insert(0, system_message)
        messages_history.append({"role": "user", "content": user_message})

        # Préparer la requête pour OpenRouter
        request_data = {
            "model": "opengvlab/internvl3-14b:free",
            "messages": messages_history,
            "temperature": 0.7,
        }

        logger.info("Sending request to OpenRouter")

        # Envoyer la requête à OpenRouter
        response = requests.post(OPENROUTER_URL, headers=headers, json=request_data)
        logger.info(f"OpenRouter response status: {response.status_code}")

        if response.status_code == 200:
            ai_response = response.json()["choices"][0]["message"]["content"]
            logger.info("Successfully received AI response")
            return jsonify({"response": ai_response})
        else:
            error_msg = response.json().get("error", "Unknown error")
            logger.error(f"OpenRouter API error: {error_msg}")
            return jsonify({"error": f"API Error: {error_msg}"}), 500

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    logger.info("Starting TawjihiBot API server...")
    # Désactiver le mode debug en production
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, port=int(os.getenv('PORT', 5000)))
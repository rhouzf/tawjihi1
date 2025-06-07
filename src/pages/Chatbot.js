import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchType, setSearchType] = useState('ecole');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '' || isLoading) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      searchType: searchType // Ajouter le type de recherche au message
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Message temporaire du bot
      const tempBotMessage = {
        text: "Je traite votre demande...",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, tempBotMessage]);

      // Préparer les données pour l'API
      const conversation = updatedMessages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        ...(msg.searchType && { searchType: msg.searchType })
      }));

      const API_URL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000/api/chat'  // URL locale pour le serveur Python
        : `${process.env.REACT_APP_API_URL}/chat`;  // URL de votre backend en production

      console.log('API URL:', API_URL); // Pour le débogage
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversation: conversation,
          searchType: searchType
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Remplacer le message temporaire par la vraie réponse
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: data.response,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error("Erreur:", error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container modern-chatbot">
      <div className="chat-header">
        <h2>TawjihiBot Assistant</h2>
        <p>Posez vos questions sur l'orientation scolaire</p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.searchType && message.sender === 'user' && (
              <div className="message-tag">
                {getSearchTypeLabel(message.searchType)}
              </div>
            )}
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="message-bubble bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Posez votre question..."
          className="chat-input"
          disabled={isLoading}
        />
        <div className="chat-input-row">
        <select
          className="chat-select"
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          disabled={isLoading}
        >
          <option value="ecole">Recherche par école</option>
          <option value="ecole_filiere">Recherche par école et filière</option>
          <option value="limite">Recherche par limite</option>
          <option value="conseil">Conseil d'orientation</option>
        </select>
        <button 
          type="submit" 
          className={`send-button modern-btn ${isLoading ? 'disabled' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </button>
        </div>
      </form>
    </div>
  );
};

// Helper function to get label for search type
const getSearchTypeLabel = (type) => {
  const labels = {
    'ecole': 'École',
    'ecole_filiere': 'École & Filière',
    'limite': 'Limite',
    'conseil': 'Conseil'
  };
  return labels[type] || type;
};

export default Chatbot;
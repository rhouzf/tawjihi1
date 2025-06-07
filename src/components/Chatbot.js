import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Je vais vous aider avec ça !',
          sender: 'bot'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot d'Orientation</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default Chatbot;

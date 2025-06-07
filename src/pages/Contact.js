import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter
    console.log('Contact form submitted:', formData);
    alert('Votre message a été envoyé avec succès!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contactez-nous</h1>
        <p>Nous sommes là pour vous aider dans votre parcours d'orientation</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon"><i className="fas fa-envelope"></i></div>
            <div>
              <h3>Email</h3>
              <p>contact@tawjihibot.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><i className="fas fa-phone"></i></div>
            <div>
              <h3>Téléphone</h3>
              <p>+212 5XX-XXXXXX</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div>
              <h3>Adresse</h3>
              <p>123 Rue de l'Éducation, Rabat, Maroc</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form modern-form">
          <div className="form-group floating-label">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="name">Nom complet</label>
          </div>

          <div className="form-group floating-label">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-group floating-label">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="subject">Sujet</label>
          </div>

          <div className="form-group floating-label">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder=" "
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>

          <button type="submit" className="submit-button modern-btn">
            <i className="fas fa-paper-plane"></i> Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 
import React from 'react';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <div className="contact-info">
        <div className="contact-section">
          <h3>Adresse</h3>
          <p>Siège social</p>
          <p>Tunis, Tunisie</p>
        </div>
        <div className="contact-section">
          <h3>Email</h3>
          <p>contact@tawjihibot.com</p>
        </div>
        <div className="contact-section">
          <h3>Téléphone</h3>
          <p>+216 12 345 678</p>
        </div>
      </div>
      <div className="contact-form">
        <h3>Formulaire de contact</h3>
        <form>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea required></textarea>
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

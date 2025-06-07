import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi des données
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Compte créé:', formData);
      navigate('/inscription');
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-content">
        <div className="form-header">
          <h1>Créer votre compte</h1>
          <p>Rejoignez notre communauté et commencez votre parcours d'orientation</p>
        </div>

        <form onSubmit={handleSubmit} className="create-account-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                placeholder="Votre prénom"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="form-footer">
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
            </button>
            <p className="login-link">
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

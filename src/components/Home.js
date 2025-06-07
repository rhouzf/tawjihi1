import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/inscription');
  };

  const features = [
    {
      title: 'Chatbot Intelligent',
      description: 'Obtenez des réponses personnalisées à vos questions d\'orientation',
      icon: '🤖'
    },
    {
      title: 'Informations sur les Filières',
      description: 'Découvrez les différentes options d\'études disponibles',
      icon: '🎓'
    },
    {
      title: 'Guide d\'Inscription',
      description: 'Accompagnement pour l\'inscription dans les établissements',
      icon: '📝'
    }
  ];

  return (
    <div className="home-container">
      {/* Section Héros */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenue sur TawjihiBot</h1>
          <p className="hero-tagline">Votre assistant intelligent pour l'orientation académique et professionnelle</p>
          <div className="hero-buttons">
            <button onClick={handleRegisterClick} className="primary-button">
              Créer un compte
            </button>
            <button onClick={() => navigate('/chatbot')} className="secondary-button">
              Découvrir le chatbot
            </button>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques */}
      <section className="features-section">
        <h2 className="section-title">Pourquoi choisir TawjihiBot ?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Étudiants aidés</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Filières disponibles</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support disponible</p>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à commencer votre parcours académique ?</h2>
          <p>Rejoignez la communauté TawjihiBot dès maintenant</p>
          <button onClick={handleRegisterClick} className="cta-button">
            Commencer maintenant
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;

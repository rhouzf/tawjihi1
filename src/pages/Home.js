/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenue sur TawjihiBot</h1>
          <p className="hero-subtitle">Votre guide intelligent pour l'orientation universitaire</p>
          <div className="hero-buttons">
            <Link to="/create-account" className="cta-button primary">Commencer</Link>
            <Link to="/about" className="cta-button secondary">En savoir plus</Link>
          </div>
          <div className="hero-features">
            <div className="feature-card">
              <i className="fas fa-graduation-cap"></i>
              <h3>Orientation Intelligente</h3>
              <p>Découvrez les meilleures options selon votre profil</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-university"></i>
              <h3>Écoles Prestigieuses</h3>
              <p>Accédez aux meilleures écoles d'ingénierie et de commerce</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-robot"></i>
              <h3>Assistance IA</h3>
              <p>Bénéficiez d'un accompagnement personnalisé</p>
            </div>
          </div>
        </div>
      </section>

      <section className="schools-section">
        <h2>Nos Établissements d'Excellence</h2>
        <p className="section-description">
          Découvrez nos établissements partenaires qui offrent des formations de qualité et des opportunités uniques pour votre avenir professionnel.
        </p>
        <div className="schools-grid">
          <div className="school-card">
            <h3>Institut Supérieur de Commerce et d'Administration des Entreprises</h3>
            <p>ISCAE</p>
            <p className="school-description">
              Une institution prestigieuse offrant des formations en commerce et administration des entreprises, reconnue pour son excellence académique.
            </p>
            <a href="#" className="school-link">En savoir plus</a>
          </div>
          <div className="school-card">
            <h3>École Nationale de Commerce et de Gestion</h3>
            <p>ENCG</p>
            <p className="school-description">
              Une école de référence dans le domaine du commerce et de la gestion, préparant les futurs leaders du monde des affaires.
            </p>
            <a href="#" className="school-link">En savoir plus</a>
          </div>
          <div className="school-card">
            <h3>École Nationale Supérieure d'Informatique et d'Analyse des Systèmes</h3>
            <p>ENSIAS</p>
            <p className="school-description">
              Une institution d'excellence dans le domaine des technologies de l'information et des systèmes d'information.
            </p>
            <a href="#" className="school-link">En savoir plus</a>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2>Comment ça marche ?</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Créez votre profil</h3>
            <p>Inscrivez-vous et renseignez vos informations</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choisissez vos écoles</h3>
            <p>Sélectionnez les établissements qui vous intéressent</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Soumettez votre dossier</h3>
            <p>Envoyez vos documents et attendez la réponse</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à commencer votre aventure ?</h2>
          <p>Rejoignez des milliers d'étudiants qui ont déjà trouvé leur voie</p>
          <Link to="/create-account" className="cta-button primary">S'inscrire maintenant</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 
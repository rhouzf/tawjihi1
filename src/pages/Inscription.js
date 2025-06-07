import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Inscription.css';

const Inscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cne: '',
    cin: '',
    adresse: '',
    telephone: '',
    autreTelephone: '',
    email: '',
    bacPhoto: null,
    cinRecto: null,
    cinVerso: null,
    photo: null
  });

  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schools = [
    {
      id: 'ensa',
      name: 'ENSA',
      fullName: 'École Nationale des Sciences Appliquées',
      description: 'Formation d\'ingénieurs d\'état dans différents domaines'
    },
    {
      id: 'encg',
      name: 'ENCG',
      fullName: 'École Nationale de Commerce et de Gestion',
      description: 'Formation en commerce et gestion'
    },
    {
      id: 'ensam',
      name: 'ENSAM',
      fullName: 'École Nationale Supérieure des Arts et Métiers',
      description: 'Formation d\'ingénieurs en arts et métiers'
    },
    {
      id: 'enset',
      name: 'ENSET',
      fullName: 'École Normale Supérieure de l\'Enseignement Technique',
      description: 'Formation des enseignants en sciences et techniques'
    }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSchoolSelection = (schoolId) => {
    setSelectedSchools(prev => {
      if (prev.includes(schoolId)) {
        return prev.filter(id => id !== schoolId);
      }
      return [...prev, schoolId];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi des données
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Données soumises:', { ...formData, selectedSchools });
      navigate('/confirmation');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inscription-container">
      <div className="inscription-content">
        <section className="inscription-intro">
          <h1>Inscription aux Établissements</h1>
          <p className="intro-text">
            Bienvenue sur notre plateforme d'inscription. Cette page vous permet de soumettre votre dossier 
            d'inscription pour les établissements de votre choix. Veuillez remplir le formulaire ci-dessous 
            avec vos informations personnelles et les documents requis.
          </p>
          <div className="requirements">
            <h2>Documents requis :</h2>
            <ul>
              <li>Photo d'identité récente</li>
              <li>Copie du Baccalauréat (recto-verso)</li>
              <li>Copie de la CIN (recto-verso)</li>
              <li>CNE</li>
            </ul>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="inscription-form">
          <div className="form-section">
            <h2>Informations personnelles</h2>
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="cne">CNE</label>
                <input
                  type="text"
                  id="cne"
                  name="cne"
                  value={formData.cne}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cin">CIN</label>
                <input
                  type="text"
                  id="cin"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="adresse">Adresse</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone principal</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="autreTelephone">Autre téléphone</label>
                <input
                  type="tel"
                  id="autreTelephone"
                  name="autreTelephone"
                  value={formData.autreTelephone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Documents à fournir</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="bacPhoto">Baccalauréat (recto-verso)</label>
                <input
                  type="file"
                  id="bacPhoto"
                  name="bacPhoto"
                  onChange={handleChange}
                  accept="image/*,.pdf"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cinRecto">CIN (recto)</label>
                <input
                  type="file"
                  id="cinRecto"
                  name="cinRecto"
                  onChange={handleChange}
                  accept="image/*,.pdf"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cinVerso">CIN (verso)</label>
                <input
                  type="file"
                  id="cinVerso"
                  name="cinVerso"
                  onChange={handleChange}
                  accept="image/*,.pdf"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo d'identité</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Établissements souhaités</h2>
            <div className="schools-grid">
              {schools.map((school) => (
                <div key={school.id} className="school-checkbox">
                  <input
                    type="checkbox"
                    id={`school-${school.id}`}
                    checked={selectedSchools.includes(school.id)}
                    onChange={() => handleSchoolSelection(school.id)}
                  />
                  <div className="school-info">
                    <label htmlFor={`school-${school.id}`}>
                      <h3>{school.name}</h3>
                      <p>{school.fullName}</p>
                      <span className="school-description">{school.description}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Soumission en cours...' : 'Soumettre l\'inscription'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscription; 
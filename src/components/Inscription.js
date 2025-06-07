import React, { useState } from 'react';

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    filiere: '',
    etablissement: '',
    niveau: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Inscription data:', formData);
  };

  return (
    <div className="inscription-container">
      <h2>Inscription aux Établissements</h2>
      <form onSubmit={handleSubmit} className="inscription-form">
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Filière</label>
          <select
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une filière</option>
            <option value="informatique">Informatique</option>
            <option value="medecine">Médecine</option>
            <option value="ing_genie">Ingénierie Générale</option>
            <option value="commerce">Commerce</option>
          </select>
        </div>
        <div className="form-group">
          <label>Établissement</label>
          <select
            name="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un établissement</option>
            <option value="univ_tunis">Université de Tunis</option>
            <option value="univ_carthage">Université de Carthage</option>
            <option value="univ_manouba">Université de Manouba</option>
          </select>
        </div>
        <div className="form-group">
          <label>Niveau</label>
          <select
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un niveau</option>
            <option value="1">Première année</option>
            <option value="2">Deuxième année</option>
            <option value="3">Troisième année</option>
          </select>
        </div>
        <button type="submit" className="submit-button">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;

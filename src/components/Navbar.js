import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TawjihiBot
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/chatbot" className="nav-link">Chatbot</Link>
          <Link to="/inscription" className="nav-link">Inscription</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
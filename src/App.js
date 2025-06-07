import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Contact from './pages/Contact';
import Inscription from './pages/Inscription';
import CreateAccount from './pages/CreateAccount';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

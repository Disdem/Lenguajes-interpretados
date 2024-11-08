import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Personajes</Link></li>
        <li><Link to="/locations">Locaciones</Link></li>
        <li><Link to="/description">Descripción</Link></li> {/* Cambiado para que sea una página */}
      </ul>
    </nav>
  );
};

export default Navbar;
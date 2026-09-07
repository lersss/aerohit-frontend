import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="https://cdn.dreamjob.ru/employer/3616765/6788709d112215JNr7p.webp"
            alt="Аэрохит"
            style={{ height: '32px', width: 'auto' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </Link>

        <button className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}><i className="fas fa-home"></i> Товары</Link></li>
          <li><Link to="/cart" onClick={toggleMenu}><i className="fas fa-shopping-cart"></i> Корзина</Link></li>
          <li><Link to="/admin/panel" target="_blank" onClick={toggleMenu}><i className="fas fa-user-shield"></i> Админка</Link></li>
        </ul>
      </div>
    </nav>
  );
}
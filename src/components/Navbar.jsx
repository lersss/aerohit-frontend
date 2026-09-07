import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Аэрохит ИБП</Link>
        <ul className="nav-menu">
          <li><Link to="/">Товары</Link></li>
          <li><Link to="/cart">Корзина</Link></li>
          <li><Link to="/admin/panel" target="_blank">Админка</Link></li>
        </ul>
      </div>
    </nav>
  );
}
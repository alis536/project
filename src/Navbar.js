import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/products" className="navbar-logo">
          MyStore
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/create-product" className="navbar-link">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

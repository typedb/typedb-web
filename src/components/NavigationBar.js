import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

const NavigationBar = () => (
  <div className="nav">
    <div className="container">
      <Link to="/" className="nav__logo">
        <img src='assets/svg/logo.svg' alt="GRAKN AI" />
      </Link>
      <NavigationMenu />
    </div>
  </div>
);

export default NavigationBar;
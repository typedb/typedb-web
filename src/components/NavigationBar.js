import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from 'components/NavigationMenu';

const NavigationBar = () => (
  <div className="nav">
    <div className="container">
      <Link to="/" className="nav__logo">
        <img src='assets/svg/logo.svg' alt="Grakn" />
      </Link>
      <NavigationMenu />
    </div>
  </div>
);

export default NavigationBar;

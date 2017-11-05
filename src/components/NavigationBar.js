import React from 'react';
import { Link } from 'react-router-dom';

import navRoutes from 'config/navRoutes';

const NavigationBar = () => (
  <div className="nav">
    <div className="container">
      <Link to="/" className="nav__logo">
        <img src='assets/svg/grakn-logo.svg' alt="GRAKN AI" />
      </Link>
      <div className="nav__links">
      {
        Object.keys(navRoutes).map((key) => {
          return (
            <a
            key={`${key}__link`}
            href={navRoutes[key]}
            target="_blank"
            className="nav__link"
          >
          {key}
        </a>
          )
        })
      }
      </div>
    </div>
  </div>
);

export default NavigationBar;
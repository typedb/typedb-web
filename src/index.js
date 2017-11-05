import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom'

import 'stylesheets/app.scss';

import Main from './routes';
import NavigationBar from 'components/NavigationBar';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <NavigationBar />
      <Main />
    </div>
  </BrowserRouter>
);

render(
  <App />,
  document.getElementById('react')
);

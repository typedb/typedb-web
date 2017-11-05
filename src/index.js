import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import 'stylesheets/app.scss';

import Main from './routes';

const history = createBrowserHistory();

const App = () => (
  <BrowserRouter history={history}>
    <div className="app">
      <Main />
    </div>
  </BrowserRouter>
);

render(
  <App />,
  document.getElementById('react')
);

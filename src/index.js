import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import 'stylesheets/app.scss';

const Client = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

hydrate(
  <Client />,
  document.getElementById('react')
);

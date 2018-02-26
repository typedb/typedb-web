import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';

import store, { history } from './store';
import App from './App';

import 'stylesheets/app.scss';

const Client = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

render(
  <Client />,
  document.getElementById('react')
);

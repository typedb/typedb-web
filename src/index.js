import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Main from './routes';
import store, { history } from './store';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import ScrollRestoration from 'components/ScrollRestoration';

import 'stylesheets/app.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollRestoration>
        <div className="app">
          <NavigationBar />
          <Main />
          <Footer />
        </div>
      </ScrollRestoration>
    </ConnectedRouter>
  </Provider>
);

render(
  <App />,
  document.getElementById('react')
);

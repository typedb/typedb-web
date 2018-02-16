import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Main from './routes';
import store, { history } from './store';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import ScrollRestoration from 'components/ScrollRestoration';
import CookieBanner from 'react-cookie-banner';

import 'stylesheets/app.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollRestoration>
        <div className="app">
          <NavigationBar />
          <Main />
          <Footer />
          <CookieBanner
            className="cookie-banner"
            message="We use cookies to provide to improve the user experience on our website. If you want to know more about it, you can read more about our privacy policy.            "
            onAccept={() => {}}
            cookie="user-has-accepted-cookies"
            dismissOnScroll={false}
            disableStyle={true}
          />
        </div>
      </ScrollRestoration>
    </ConnectedRouter>
  </Provider>
);

render(
  <App />,
  document.getElementById('react')
);

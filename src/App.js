import React from 'react';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import ScrollRestoration from 'components/ScrollRestoration';
import CookieBanner from 'react-cookie-banner';
import Main from './Main';

const App = () => (
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
        buttonMessage="OK"
      />
    </div>
  </ScrollRestoration>
);
export default App;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import ScrollRestoration from 'components/ScrollRestoration';
import CookieBanner from 'react-cookie-banner';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <ScrollRestoration>
        <div className="app">
          <NavigationBar />
          <Main { ...this.props}/>
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
    )
  }
}

const mapStateToProps = (state) => (
  {
    location: state.router.location,
  }
);
export default connect(mapStateToProps)(App);
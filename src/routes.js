import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import SlackPage from 'pages/SlackPage';
import CareersPage from 'pages/CareersPage';
import CommunityPage from 'pages/CommunityPage';
import ServicesPage from 'pages/ServicesPage';
import NoPage from 'pages/NoPage';

class Main extends Component {

  componentDidMount() {
    ReactGA.initialize('UA-72414051-1');
    ReactGA.pageview(this.props.path);    
  }

  componentWillReceiveProps(newProps) {
    if (this.props.path !== newProps.path) {
      ReactGA.pageview(newProps.path);
    }
  }
  render() {
    return (
      <main className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/slack" component={SlackPage} />
          <Route exact path="/careers" component={CareersPage} />
          <Route exact path="/community" component={CommunityPage} />
          <Route exact path="/services" component={ServicesPage} />
          <Route component={NoPage} />
        </Switch>
      </main>
    )
  }
};

const mapStateToProps = (state) => (
  {
    path: state.router.location.pathname,
  }
);
export default connect(mapStateToProps)(Main);

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import ReactGA from 'react-ga';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import SlackPage from 'pages/SlackPage';
import CareersPage from 'pages/CareersPage';
import CommunityPage from 'pages/CommunityPage';
import ServicesPage from 'pages/ServicesPage';
import SupportPage from 'pages/SupportPage';
import GraknPage from 'pages/GraknPage';
import DeploymentPage from 'pages/DeploymentPage';
import KBMSPage from 'pages/KBMSPage';
import NoPage from 'pages/NoPage';
import ComingSoon from 'pages/ComingSoon';
import {FinanceUseCasePage, HealthUseCasePage, SemanticUseCasePage, BotsUseCasePage, SecurityUseCasePage} from 'pages/UseCasePages';


class Main extends Component {
  constructor(props) {
    super(props);
    this.updatePageTitle = this.updatePageTitle.bind(this);
  }

  componentDidMount() {
    ReactGA.initialize('UA-72414051-1');
    ReactGA.pageview(this.props.path);
    this.updatePageTitle();
  }

  componentDidUpdate(oldProps) {
    if (this.props.path !== oldProps.path) {
      ReactGA.pageview(this.props.path);
      this.updatePageTitle();
    }
  }

  updatePageTitle() {
    let documentTitle = 'GRAKN.AI - The Database for AI';
    if (this.props.path !== '/') {
      documentTitle = `${startCase(this.props.path.substr(1))} | GRAKN.AI`
    }
    document.title = documentTitle;
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
          <Route exact path="/support" component={SupportPage} />
          <Route exact path="/services" component={ServicesPage} />
          <Route exact path="/grakn-core" component={GraknPage} />
          <Route exact path="/grakn-kbms" component={KBMSPage} />
          <Route exact path="/deployment" component={DeploymentPage} />
          <Route path="/usecase-finance" component={FinanceUseCasePage} />
          <Route path="/usecase-health" component={HealthUseCasePage} />
          <Route path="/usecase-search" component={SemanticUseCasePage} />
          <Route path="/usecase-bots" component={BotsUseCasePage} />
          <Route path="/usecase-security" component={SecurityUseCasePage} />
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

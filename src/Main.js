import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { fetchDownloads } from 'actions/downloads';
import routeOptions from './routes';

const metaDescription = {
'/': "Grakn is a hyper-relational database for knowledge engineering. Rooted in Knowledge Representation and Automated Reasoning, Grakn provides the knowledge base foundation for intelligent/cognitive systems.",
'/grakn-core':"Grakn is a hyper-relational database for knowledge engineering, and Graql is Grakn’s query language.",
'/grakn-kbms':"Grakn Enterprise KBMS is the Knowledge Base Management System designed to scale with your business, and Workbase is the visual platform to control everything from development to production.",
'/deployment':"Easily deploy and manage Grakn KBMS on one machine, or a thousand-node cluster.",
'/services':"For every step of your knowledge engineering journey, we provide professional services to help you achieve your development goals.",
'/support':"From development to production, we can support you every step of the way, so you can focus on building your application and your business",
'/community':"Get in touch with Grakn developers and join our global community",
'/download': 'Download Grakn Core, Grakn KBMS or Grakn Workbase.',
'/about': "Learn more about the Grakn Team",
'/slack': "Join the Grakn Slack Channel",
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ReactGA.initialize('UA-72414051-1');
    ReactGA.pageview(this.props.path);
    this.props.onFetchDownloads();
  }

  componentDidUpdate(oldProps) {
    if (this.props.path !== oldProps.path) {
      ReactGA.pageview(this.props.path);
    }
  }

  static fetchData ({ store }) {
    return store.dispatch(fetchDownloads());
  }
  
  render() {
    let documentTitle = 'GRAKN.AI - The Database for AI';
    if (this.props.path !== '/') {
      documentTitle = `${startCase(this.props.path.substr(1))} | GRAKN.AI`
    }
    console.log(this.props)
    let routes = routeOptions.routes.map(({ path, component, exact }, i) => {
          return (<Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />)
    });
    let redirects = routeOptions.redirects.map(({ from, to, status }, i) =>
        <RedirectWithStatus key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
    );
    console.log(routes);
    return (
      <main className="main">
        <Helmet>
          <title>{documentTitle}</title>
          <link rel="canonical" href={`https://grakn.ai${this.props.path}`} />
          {
            metaDescription[this.props.path] ?
              <meta name="description" content={metaDescription[this.props.path]} />
              :
              null
          }
        </Helmet>
        <Switch>
         {
          // <Route exact path="/" component={HomePage} />
          // <Route exact path="/about" component={AboutPage} />
          // <Route exact path="/slack" component={SlackPage} />
          // <Route exact path="/careers" component={CareersPage} />
          // <Route exact path="/community" component={CommunityPage} />
          // <Route exact path="/support" component={SupportPage} />
          // <Route exact path="/services" component={ServicesPage} />
          // <Route exact path="/grakn-core" component={GraknPage} />
          // <Route exact path="/grakn-kbms" component={KBMSPage} />
          // <Route exact path="/deployment" component={DeploymentPage} />
          // <Route exact path="/download" component={DownloadCentrePage} />
          // <Route path="/usecase-finance" component={FinanceUseCasePage} />
          // <Route path="/usecase-health" component={HealthUseCasePage} />
          // <Route path="/usecase-search" component={SemanticUseCasePage} />
          // <Route path="/usecase-bots" component={BotsUseCasePage} />
          // <Route path="/usecase-security" component={SecurityUseCasePage} />
          // <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
          // <Route component={NoPage} />
         }
         {routes}
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

const mapDispatchToProps = (dispatch) => (
  {
    onFetchDownloads: () => dispatch(fetchDownloads())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Main);

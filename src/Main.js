import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { fetchDownloads } from 'actions/downloads';
import { fetchDeployment } from 'actions/deployment';
import { fetchTestimonials } from 'actions/testimonials';
import { fetchKgmsfeatures } from 'actions/kgmsfeatures';
import { fetchSupporttable } from 'actions/supportTable';
import { fetchKgmstable } from 'actions/kgmsTable';
import { fetchWorkbasetable } from 'actions/workbaseTable';
import routeOptions from './routes';

const metaDescription = {
'/': "Grakn is a knowledge graph - a database to organise complex networks of data and make it queryable.",
'/grakn-core':"Grakn is a knowledge graph, and Graql is the query language.",
'/grakn-kgms':"Grakn Enterprise KGMS is the Knowledge Graph Management System designed to scale with your business, and Workbase is the visual platform to control everything from development to production.",
'/deployment':"Easily deploy and manage Grakn KGMS on one machine, or a thousand-node cluster.",
'/services':"For every step of your knowledge engineering journey, we provide professional services to help you achieve your development goals.",
'/support':"From development to production, we can support you every step of the way, so you can focus on building your application and your business",
'/careers':"We're a team of talented engineers, and we're building the next generation database for cognitive and intelligent systems. Join us.",
'/community':"Get in touch with Grakn developers and join our global community",
'/download': 'Download Grakn Core, Grakn KGMS or Grakn Workbase.',
'/about': "Learn more about the Grakn Team",
'/slack': "Join the Grakn Slack Channel",
'/privacy-policy': "Grakn's Privacy Policy",
}

const ogImages = {
'/': "/assets/img/og/og-home-min.png",
'/grakn-core':"/assets/img/og/og-core-min.png",
'/grakn-kgms':"/assets/img/og/og-kgms-min.png",
'/deployment':"/assets/img/og/og-deploy-min.png",
'/services':"/assets/img/og/og-services-min.png",
'/support':"/assets/img/og/og-support-min.png",
'/careers':"/assets/img/og/og-careers-min.png",
'/community':"/assets/img/og/og-community-min.png",
'/download': '/assets/img/og/og-download-min.png',
'/about': "/assets/img/og/og-about-min.png",
'/slack': "/assets/img/og/og-slack-min.png",
'/privacy-policy': "/assets/img/og/og-privacy-min.png",
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ReactGA.initialize('UA-72414051-1');
    ReactGA.pageview(this.props.location.pathname);
    this.props.onFetchDownloads();
    this.props.onFetchTestimonials();
    this.props.onFetchDeployment();
    this.props.onFetchKgmsfeatures();
    this.props.onFetchSupporttable();
    this.props.onFetchWorkbasetable();
    this.props.onFetchKgmstable();
  }

  componentDidUpdate(oldProps) {
    if (this.props.location.pathname !== oldProps.location.pathname) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }


  render() {
    let documentTitle = 'GRAKN.AI - The Knowledge Graph';
    if (this.props.location.pathname !== '/') {
      documentTitle = `${startCase(this.props.location.pathname.substr(1))} | GRAKN.AI`;
    }
    if (this.props.location.pathname === '/grakn-kgms') {
      documentTitle = 'Grakn KGMS | GRAKN.AI';
    }
    let routes = routeOptions[0].routes.map(({ path, component, exact }, i) => {
          return (<Route key={`ROUTE_${i}`} exact={exact} path={path} component={component} />)
    });
    return (
      <main className="main">
        <Helmet>
          <title>{documentTitle}</title>
          <link rel="canonical" href={`https://grakn.ai${this.props.location.pathname}`} />
          <meta property="og:title" content={documentTitle} />
          <meta property="og:url" content={`https://grakn.ai${this.props.location.pathname}`} />
          {
            metaDescription[this.props.location.pathname] ?
              <meta name="description" content={metaDescription[this.props.location.pathname]} />
              :
              null
          }
          {
            metaDescription[this.props.location.pathname] ?
              <meta property="og:description" content={metaDescription[this.props.location.pathname]} />
              :
              null
          }
          {
            ogImages[this.props.location.pathname] ?
              <meta property="og:image" content={ogImages[this.props.location.pathname]} />
              :
              null
          }
        </Helmet>
        <Switch>
         {routes}
        </Switch>
      </main>
    )
  }
};


const mapDispatchToProps = (dispatch) => (
  {
    onFetchDownloads: () => dispatch(fetchDownloads()),
    onFetchTestimonials: () => dispatch(fetchTestimonials()),
    onFetchDeployment: () => dispatch(fetchDeployment()),
    onFetchKgmsfeatures: () => dispatch(fetchKgmsfeatures()),
    onFetchSupporttable: () => dispatch(fetchSupporttable()),
    onFetchWorkbasetable: () => dispatch(fetchWorkbasetable()),
    onFetchKgmstable: () => dispatch(fetchKgmstable()),

  }
)

export default connect(null, mapDispatchToProps)(Main);

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const unirest = require('unirest');
const nodemailer = require('nodemailer');
const urlParser = require('url');
// New Imports
import React from 'react';
import ReactDOM from 'react-dom/server';
import helmet from 'react-helmet';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StaticRouter , matchPath } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import qs from 'qs';

import thunk from 'redux-thunk';

import routeBank from 'routes';
import configureStore from 'store';
import App from 'App';

// New Imports Over
const app = express();

const port = process.env.PORT ? process.env.PORT : 3001;
const dist = path.join(__dirname, 'dist');
const docsBase = 'https://dev.grakn.ai';
const mailman = 'postmaster@mail.grakn.ai';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: mailman,
        pass: process.env.SUPPORT_PASS
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(dist));

app.use(function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Grakn-Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET");      
    }
    next();
});


// API
function handleSlackInvite(userEmail) {
  unirest.post('https://grakn-slackin.herokuapp.com/invite')
      .headers({
          'Content-Type': 'application/json'
      })
      .send({
          "coc": 0,
          "channel": "community",
          "email": userEmail
      })
      .end(function(response) {
          console.log("Just sent a new Slack invite, response:");
          console.log(response.body);
      });
}


function handleTPInvite(userEmail, userName, userSurname) {
  unirest.post('https://work.grakn.ai/api/v1/UserStories?access_token=NTQ6Rm1XMEY4Z2VoelU4WE1PVjJGSVdiU3VSYktaNGJneG1naVVLZ2pyYjJzST0=&format=json')
      .headers({
          'Content-Type': 'application/json'
      })
      .send({
          "Name": userName + " " + userSurname,
          "Project": {
              "Id": 16395
          },
          "Tags": "Community",
          "AssignedTeams":{
              "Team":276
          },
          "CustomFields": [{
              "Name": "Email",
              "Value": userEmail
          }]

      })
      .end(function(response) {
          console.log("Just added user to TargetProcess, response:");
          console.log(JSON.stringify(response));
      });
}


function handleMailChimpInvite(userEmail, userName, userSurname) {
  unirest.post('https://us8.api.mailchimp.com/3.0/lists/3742a20dc0/members/')
      .headers({
          'Content-Type': 'application/json'
      })
      .auth({
          user: 'GraknLabs',
          pass: '023643a9dd794a291a676defa42ef588-us8',
          sendImmediately: true
      })
      .send({
          "coc": 0,
          "merge_fields": {
              "FNAME": userName? userName : "",
              "LNAME": userSurname? userSurname : ""
          },
          "email_address": userEmail,
          "status": "subscribed"
      })
      .end(function(response) {
          console.log("Just sent a new MailChimp invite, response:");
          console.log(response.body);
      });
}


function handleGraknForumInvite(userEmail) {
  unirest.post('https://discuss.grakn.ai/invites?api_key=298220c1f63076c58c642d4701ed384833dbaac8fb0ccf9411f52505ed527605&api_username=haikal')
    .headers({
        'Content-Type': 'application/json'
    })
    .send({
        "email": userEmail
    })
    .end(function(response) {
        console.log("Just sent a new Forum invite, response:");
        console.log(response.body);
    });
}


app.post('/invite/slack', function(req, res) {
  if (req.body.email == undefined) {
      res.status(400).send('No "email" field provided');
      return;
  }
  handleSlackInvite(req.body.email);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify({ msg: "success" }));
});


app.post('/invite/tp', function(req, res) {
  if (req.body.email == undefined) {
      res.status(400).send('No "email" field provided');
      return;
  }
  handleTPInvite(req.body.email, req.body.firstname, req.body.surname);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify({ msg: "success" }));
});


app.post('/invite/mailchimp', function(req, res) {
  if (req.body.email == undefined) {
      res.status(400).send('No "email" field provided');
      return;
  }
  handleMailChimpInvite(req.body.email, req.body.firstname, req.body.surname);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify({ msg: "success" }));
});


app.post('/invite/forum', function(req, res) {
  if (req.body.email == undefined) {
      res.status(400).send('No "email" field provided');
      return;
  }
  handleGraknForumInvite(req.body.email);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify({ msg: "success" }));
});


app.post('/invite/all', function(req, res) {
    if (req.body.email == undefined) {
        res.status(400).send('No "email" field provided');
        return;
    }
    handleSlackInvite(req.body.email);
    handleTPInvite(req.body.email, req.body.firstname, req.body.surname);
    handleMailChimpInvite(req.body.email, req.body.firstname, req.body.surname);
    handleGraknForumInvite(req.body.email);

    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(JSON.stringify({ msg: "success" }));    
});


app.post('/api/support', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const mailOptions = {
        from: mailman, 
        to: 'enterprise@grakn.ai', 
        subject: 'Support Form Request', 
        replyTo: req.body.email,
        text: JSON.stringify(req.body),
        html:
        `
         <h3>Support Form Content</h3>
         <div>Name: ${req.body.firstname} ${req.body.lastname}</div>
         <div>Company: ${req.body.company}</div>
         <div>Position: ${req.body.job}</div>
         <div>Email: ${req.body.email}</div>
         <div>Product: ${req.body.product}</div>
         <div>Stage of Development: ${req.body.stage}</div>
         <div>Areas of Interest: ${req.body.aois}</div>
         <div>Additional: ${req.body.more}</div>
        `
    };
   transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send(JSON.stringify({msg: "Form submission failed! Try Again.."}));
        }
        res.status(200).send(JSON.stringify({ msg: "Form Submitted Successfully," }));        
    });
});


// Redirects
app.get('/pages/*', (req, res) => {
    const redirectUrl = req.path.replace('/pages', docsBase)
    res.redirect(301, redirectUrl);
});

app.get('*.html', (req, res) => {
    const redirected_path = req.path.replace('.html','');
    const protocol = req.protocol;
    const host = req.get('host');
    res.redirect(301, `${protocol}://${host}${redirected_path}`)
});

// app.get('/download/latest', (req, res) => {
//     res.redirect(302, 'https://github.com/graknlabs/grakn/releases/download/v1.0.0/grakn-dist-1.0.0.zip');
// });

// app.get('/download', (req, res) => {
//     res.redirect(302, 'https://github.com/graknlabs/grakn/releases/');
// });

app.get('/download-academy', (req, res) => {
    res.redirect(302, 'https://d113xgfq7slps2.cloudfront.net/grakn-academy-virtualbox.zip');
});

app.get('/javadocs', (req, res) => {
    res.redirect(302, 'https://javadoc.io/doc/ai.grakn/grakn');
});

app.get('/docs', (req, res) => {
    res.redirect(301, docsBase);
});

app.get('/academy', (req, res) => {
    res.redirect(301, `${docsBase}/academy`);
});

app.get('/overview', (req, res) => {
    res.redirect(301, `${docsBase}/overview`);
});

app.get('/install', (req, res) => {
    res.redirect(301, `${docsBase}/docs/get-started/setup-guide.html`);
});

// Render Sitemap
app.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(dist, 'sitemap.xml'));
})

app.get("/bundle.js", (req, res) => {
    res.sendFile(path.join(dist, 'bundle.js'));
})
app.get("/bundle.css", (req, res) => {
    res.sendFile(path.join(dist, 'bundle.css'));
})

app.get("/service-worker.js", (req, res) => {
    res.sendStatus(200);
})

// Render Application
// app.get('*', (req, res) => {
//   res.sendFile(path.join(dist, 'index.html'));
// });


app.get('*', (req, res) => {
    const { store, history } = configureStore(true);
    store.dispatch(push(req.url));
    loadRouteDependencies(req.url, store)
    .then((data) => {
      let bundle;
      const toRender = ReactDOM.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      ));
      // once everything is fully rendered, get a copy of the current redux state
      // to send to the client so it can pick up where the server left off
      const preloadedState = store.getState();
      res.status(200).send(renderFullPage(toRender, preloadedState, helmet.renderStatic()));
    })
    .catch((err) => {
      console.error(err);
    });
});


function loadRouteDependencies(location, store) {
    // matchRoutes from 'react-router-config' handles this nicely
    const currentRoute = matchRoutes(routeBank, location);
  
    const need = currentRoute.map(({ route, match }) => {
      // once the route is matched, iterate through each component
      // looking for a `static loadData()` method
      // (you'll find these in the data-dependent `/src/views/` components)
      if (route.component) {
        return route.component.fetchData ?
          // the following will be passed into each component's `loadData` method:
          route.component.fetchData(
            store,
            match,
            location,
              // query params are stored in the same place as dynamic child routes,
              // but the key will be '0'
            qs.parse(match.params['0'], { ignoreQueryPrefix: true })
          ) :
          Promise.resolve(null);
      }
      Promise.resolve(null);
    });
    return Promise.all(need);
};

function renderFullPage(html, preloadedState, helmet) {
    return `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta http-equiv='content-type' content='text/html; charset=utf-8' />

            <meta name='viewport'    content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
            <meta name='keywords'    content='Grakn Labs, grakn, graql, grakn.ai, grakn KGMS, grakn Workbase, Mindmaps Research, Mindmaps Research Ltd, MindmapsDB, mindmaps, mindmaps graph, mindmaps.io, open source, relational, hyper-relational, knowledge graph, distributed knowledge graph, hypergraphs, hyper-graph, graph theory, dynamic graphs, development platform, developer tool, data platform, programming language, query language, database, semantic database, distributed semantic database, distributed database, graph database, semantic search, data exploration, recommendation system, knowledge management, knowledge engineering, graph analytics, real-time analytics, advanced analytics, reasoning engine, inference engine, expert systems, semantic applications, research engines, data management, business intelligence, big data, semantic web, semantic data, knowledge representation, machine reasoning, automated reasoning, semantic network, knowledge ontology, semantic graph, ontology engineering, graph based knowledge representation, artificial intelligence,' />

            <!-- Google Verification -->
            <meta name="google-site-verification" content="aJEgad4wRD2eSBDYLHv8gC45GKIT8bjBslrnf_BfhuE" />

            <meta property='og:type'        content='website' />
            <meta property='og:site_name'   content='GRAKN.AI' />
            <meta property='og:email'       content='info@grakn.ai' />
            <meta name='theme-color' content='#ffffff' />
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.title.toString()}

            <link rel='icon' href='assets/favicon.ico' />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="assets/img/metro/mstile-144x144.png" />
            <meta name="msapplication-square70x70logo" content="assets/img/metro/mstile-70x70.png" />
            <meta name="msapplication-square150x150logo" content="assets/img/metro/mstile-150x150.png" />
            <meta name="msapplication-wide310x150logo" content="assets/img/metro/mstile-310x150.png" />
            <meta name="msapplication-square310x310logo" content="assets/img/metro/mstile-310x310.png" />

            <link rel="apple-touch-icon" sizes="57x57"   href="assets/img/apple/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="assets/img/apple/apple-touch-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="72x72"   href="assets/img/apple/apple-touch-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="assets/img/apple/apple-touch-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="60x60"   href="assets/img/apple/apple-touch-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="assets/img/apple/apple-touch-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="76x76"   href="assets/img/apple/apple-touch-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="assets/imgapple/apple-touch-icon-152x152.png" />

            <script async defer src="https://grakn-slackin.herokuapp.com/slackin.js?large"></script>
            <!-- Fontawesome -->
            <script src="https://use.fontawesome.com/d35ca7539a.js"></script>
            <link href="/bundle.css" rel="stylesheet">
            </head>
        <body>
            <div id="react">${html}</div>
            <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script type="application/ld+json">
            {
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "http://grakn.ai",
            "logo": "http://grakn.ai/assets/img/logo.png",
            "sameAs": [
                "https://twitter.com/graknlabs",
                "https://www.facebook.com/groups/1913787625527508/",
                "http://linkedin.com/organization/graknlabs",
                "https://en.wikipedia.org/wiki/GRAKN.AI",
                "https://github.com/graknlabs/grakn",
                "https://stackoverflow.com/questions/tagged/graql+or+grakn",
                "https://blog.grakn.ai/"
            ]
            }
            </script>
            <!-- Hotjar Tracking Code for www.grakn.ai -->
            <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:775902,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            </script>
            <!-- End of Hotjar Tracking Code --> 
            <!-- Start of HubSpot Embed Code -->
            <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/4332244.js"></script>
            <!-- End of HubSpot Embed Code -->
            <script type="text/javascript" src="/bundle.js"></script>
        </body>
        </html>
    `
}

app.listen(port, (error) => {
    if (error) {
        console.log(error); // eslint-disable-line no-console
    }
    console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
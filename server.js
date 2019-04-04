import React from 'react';
import ReactDOM from 'react-dom/server';
import routeBank from 'routes';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import unirest from 'unirest';
import axios from 'axios';
import Joi from 'joi';

import nodemailer from 'nodemailer';
import cors from 'cors';

import helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { matchRoutes } from 'react-router-config';
import qs from 'qs';

import configureStore from 'store';
import App from 'App';

import scores from './tracker/scores';
import hs from './tracker/hubspot';

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

const whitelist = [
    'http://localhost:4005', 'http://grakn-web-dev-wip.herokuapp.com', 'http://dev.grakn.ai',
    'https://localhost:4005', 'https://grakn-web-dev-wip.herokuapp.com', 'https://dev.grakn.ai',
    'http://discuss.grakn.ai',
    'https://discuss.grakn.ai',
    'http://localhost:3000', 'http://grakn-web-staging.herokuapp.com', 'http://grakn.ai',
    'https://localhost:3000', 'https://grakn-web-staging.herokuapp.com', 'https://grakn.ai']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.use(function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Grakn-Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET");
    }
    next();
});


// API
app.get('/searchDocs', function(req, res) {
    if (req.query.q == undefined) {
        res.status(400).send('No "query" provided');
    }

    const params = "cx=" + process.env.CSE_ID +
                   "&key=" + process.env.CSE_API_KEY +
                   "&q=" + req.query.q

    unirest.get("https://www.googleapis.com/customsearch/v1?" + params)
        .end(function(response) {
            res.status(200).send(response.body);
        });
});

const updateHubspotScore = async (trackPayload) => {
    console.log("track call - payload: ", JSON.stringify(trackPayload));

    const payloadValidator = Joi.object().keys({
        platform: Joi.string().required().valid(Object.keys(scores)),
        action: Joi.string().required(),
        utk: Joi.string(), // Hubspot token stored as a cookie in the contact's browser
        vid: Joi.number() // HUbspot contact id
    }).xor('utk', 'vid');

    const validationResult = Joi.validate(trackPayload, payloadValidator);
    if (validationResult.error) { return { status: 400, message: validationResult.error.details }; }

    let {vid, utk, platform, action } = trackPayload;
    try {
        let scoreProp;
        if (vid) {
            scoreProp = await hs.getContactProp("score", [ "vid", vid ]);
        } else if (utk) {
            scoreProp = await hs.getContactProp("score", [ "utk", utk ]);
        }

        let newScore;
        if (scoreProp) {
            const currentScore = scoreProp.value || 0;
            newScore = Math.round((parseFloat(currentScore) + scores[platform][action]) * 1000) / 1000;
        } else {
            return { status: 404, message: "Contact not found!" };
        }

        await hs.setContactProp({ "score": newScore }, [ "vid", scoreProp.vid ]);
        return { status: 200, message: "Contact's score has been updated." };
    } catch (e) {
        return { status: e.status, message: e.message };
    }
}

// target endpoint for webhooks at discuss.grakn.ai
app.post('/discussEvent', async function(req, res) {
    const discussEvent = req.headers["x-discourse-event"];

    switch (discussEvent) {
        case "user_created":
            // to be added as the value of `discuss_id` on the Hubspot account of the new Discuss user.
            // used to identify the Discuss user on Hubspot for future actions (e.g. topic_creation)
            const newHsDiscussId = `discuss_${req.body.user.id}`;

            try {
                const primaryEmail = req.body.user.email;
                const secondaryEmail = req.body.user.user_fields["1"].indexOf("@") > -1 ? req.body.user.user_fields["1"] : undefined;

                let vidProp = await hs.getContactProp("vid", ["email", primaryEmail]);

                if (! vidProp && secondaryEmail) {
                    // no Hubspot contact owns the primaryEmail. Try looking up the secondaryEmail now
                    vidProp = await hs.getContactProp("vid", ["email", secondaryEmail]);
                }

                if (vidProp) {
                    // there is a Hubspot contact with either the primaryEmail or the secondaryEmail
                    await hs.setContactProp({ "discuss_id": newHsDiscussId }, [ "vid", vidProp.vid ]);
                    const response = await updateHubspotScore({ vid: vidProp.vid, platform: "discuss", action: "signup" });
                    console.log(`track call from ${req.get('host')} - success: `, JSON.stringify({ status: 200, message: response.message }));
                    res.status(200).send({ status: 200, message: response.message });
                }
            } catch (e) {
                console.log(`track call from ${req.get('host')} - failure: `, JSON.stringify({ status: e.status, message: e.message }));
                res.status(e.status).send({ status: e.status, message: e.message });
            }
            break;
        case "topic_created":
            // used to look up the author of the newly created topic among Hubspot contacts
            const hsDiscussId = `discuss_${req.body.topic.created_by.id}`;

            try {
                const contact = await hs.getContactByProp(["discuss_id", hsDiscussId ], ["discuss_id", "score"]);
                const response = await updateHubspotScore({ vid: contact.vid, platform: "discuss", action: "topicCreation" });
                console.log(`track call from ${req.get('host')} - success: `, JSON.stringify({ status: 200, message: response.message }));
                res.status(200).send({ status: 200, message: response.message });
            } catch (e) {
                console.log(`track call from ${req.get('host')} - failure: `, JSON.stringify({ status: e.status, message: e.message }));
                res.status(e.status).send({ status: e.status, message: e.message });
            }
            break;
        default:
            res.status(400).send({ status: 400, message: `${discussEvent} is not handled.` });
    }
});

// target endpoint for clients: grakn.ai, dev.grakn.ai and discuss.grakn.ai
app.post('/hsengt', async function(req, res) {
    const response = await updateHubspotScore(req.body);
    console.log(
        "track call from " + req.get('host') + " - " + (response.status == 200 ? "success" : "failure"),
        JSON.stringify({ status: response.status, message: response.message }))
    res.status(response.status).send({ status: response.status, message: response.message });
});

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
          user: 'haikalpribadi',
          pass: '5e7b3a7503eff7fdd336c095b128d139-us8',
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
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const mailOptions = {
            from: mailman,
            to: 'enterprise@grakn.ai',
            subject: req.body.emailTitle ,
            replyTo: req.body.email,
            text: JSON.stringify(req.body),
            html:
            `
             <h3> ${req.body.emailTitle } </h3>
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
                return false;
            }
            res.status(200).send(JSON.stringify({ msg: "Thank you for submitting the support form! A member of our team will be in touch shortly." }));
        });
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/hubspot', function(req, res ){
    const params = req.body;

    let formParams = { "fields": [] }

    for (const paramTitle in params) {
        if (paramTitle != "utk") {
            formParams.fields.push({
                "name": paramTitle,
                "value": params[paramTitle]
            });
        }
    }

    formParams.context = {
        "hutk": params.utk,
        "pageUri": "http://localhost:3000/download#core",
        "pageName": "Newsletter Subscription | GRAKN.AI"
    }


    formParams = JSON.stringify(formParams);
    handleMailChimpInvite(req.body.email, req.body.firstname, req.body.lastname);
    unirest.post('https://api.hsforms.com/submissions/v3/integration/submit/4332244/0e3ea363-5f45-44fe-b291-be815a1ca4fc')
    .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
    .send(formParams)
    .end(function(response) {
        if (!response.error) {
            res.status(200).send(JSON.stringify({ msg: "Thank you for signing up to our newsletter!" }));
        }
        else {
            res.status(400).send(JSON.stringify({ msg: 'Bad Request' }));
        }
    });
})

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

app.get('/download/latest', (req, res) => {
    res.redirect(302, 'https://grakn.ai/download');
});

app.get('/download-academy', (req, res) => {
    res.redirect(302, docsBase);
});

app.get('/javadocs', (req, res) => {
    res.redirect(302, `${docsBase}/client-api/java`);
});

app.get('/docs/*', (req, res) => {
    res.redirect(301, docsBase);
});

app.get('/academy/*', (req, res) => {
    res.redirect(301, `${docsBase}/academy`);
});

app.get('/overview', (req, res) => {
    res.redirect(301, `${docsBase}`);
});

app.get('/install', (req, res) => {
    res.redirect(301, `${docsBase}/docs/running-grakn/install-and-run`);
});

app.get('/grakn-kbms', (req, res) => {
    res.redirect(301, `/grakn-kgms`);
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
            <meta name='keywords'    content='grakn, graql, grakn.ai, Grakn Labs, knowledge graph, knowledge graph management system, KGMS, Workbase, open source, distributed knowledge graph, hypergraphs, hyper-graph, graph theory, dynamic graphs, hyper-relational, relational, development platform, developer tool, data platform, programming language, query language, database, semantic database, distributed semantic database, distributed database, graph database, semantic search, data exploration, recommendation system, knowledge management, knowledge engineering, graph analytics, real-time analytics, advanced analytics, reasoning engine, inference engine, expert systems, semantic applications, research engines, data management, business intelligence, big data, semantic web, semantic data, knowledge representation, machine reasoning, automated reasoning, semantic network, knowledge ontology, semantic graph, ontology engineering, graph based knowledge representation, artificial intelligence,' />

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

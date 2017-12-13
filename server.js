const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const unirest = require('unirest');

const app = express();

const port = process.env.PORT ? process.env.PORT : 3001;
const dist = path.join(__dirname, 'dist');

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
    "Team": 276,
    "ResponsibleTeam": 276,
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
  handleTPInvite(req.body.email, req.body.name, req.body.surname);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify({ msg: "success" }));
});


app.post('/invite/mailchimp', function(req, res) {
  if (req.body.email == undefined) {
      res.status(400).send('No "email" field provided');
      return;
  }
  handleMailChimpInvite(req.body.email, req.body.name, req.body.surname);

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
    handleTPInvite(req.body.email, req.body.name, req.body.surname);
    handleMailChimpInvite(req.body.email, req.body.name, req.body.surname);
    handleGraknForumInvite(req.body.email);

    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(JSON.stringify({ msg: "success" }));    
});


// Redirects
app.get('/pages/*', (req, res) => {
    const redirectUrl = req.path.replace('/pages', 'https://docs.grakn.ai')
    res.redirect(301, redirectUrl);
});

app.get('*.html', (req, res) => {
    const redirected_path = req.path.replace('.html','');
    const protocol = req.protocol;
    const host = req.get('host');
    res.redirect(301, `${protocol}://${host}${redirected_path}`)
});

app.get('/download/latest', (req, res) => {
    res.redirect(302, 'https://github.com/graknlabs/grakn/releases/download/v0.18.0/grakn-dist-0.18.0.zip');
});

app.get('/download', (req, res) => {
    res.redirect(302, 'https://github.com/graknlabs/grakn/releases/');
});

app.get('/download-academy', (req, res) => {
    res.redirect(302, 'https://d113xgfq7slps2.cloudfront.net/grakn-academy-virtualbox.zip');
});

app.get('/javadocs', (req, res) => {
    res.redirect(302, 'https://javadoc.io/doc/ai.grakn/grakn');
});

app.get('/docs', (req, res) => {
    res.redirect(301, 'https://docs.grakn.ai');
});

app.get('/academy', (req, res) => {
    res.redirect(301, 'https://docs.grakn.ai/academy');
});

app.get('/overview', (req, res) => {
    res.redirect(301, 'https://docs.grakn.ai/overview');
});

app.get('/install', (req, res) => {
    res.redirect(301, 'https://docs.grakn.ai/documentation/get-started/setup-guide.html');
});


// Render Application
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});


app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});

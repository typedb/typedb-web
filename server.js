const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const unirest = require('unirest');
const nodemailer = require('nodemailer');

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

app.get('/download/latest', (req, res) => {
    res.redirect(302, 'https://github.com/graknlabs/grakn/releases/download/v1.0.0/grakn-dist-1.0.0.zip');
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

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './cors';

import genericRouter from './routes/generic';
import docsRouter from './routes/docs';
import discussRouter from './routes/discuss';
import inviteRouter from './routes/invite';
import emailRouter from './routes/email';
import hubspotRouter from './routes/hubspot';
import redirectRouter from './routes/redirect';

const app = express();

app.use(require('prerender-node'));

// securing cross origin access
app.use(cors(corsOptions));

// redirect to https
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.use(requireHTTPS);

// exposing assets publicly - order matters
const distPath = path.join(__dirname, '../dist');
app.use('/assets', express.static(path.join(__dirname, '../assets')));
// ُTODO: when the website is refactored, this next line shouldn't be needed anymore
app.use('/src/pages/landingpages', express.static(path.join(__dirname, '../src/pages/landingpages')));
app.use('/', express.static(distPath));

// parse application/json and application/x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', redirectRouter);
app.use('/', genericRouter);
app.use('/', docsRouter);
app.use('/', discussRouter);
app.use('/hubspot', hubspotRouter);
app.use('/invite', inviteRouter);
app.use('/email', emailRouter);

// rendering index.html on initial load of the Grakn website - order matters
app.get("/bundle.js", (req, res) => res.sendFile(path.join(distPath, 'bundle.js')));
app.get("/bundle.css", (req, res) => res.sendFile(path.join(distPath, 'bundle.css')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

// starting the server
const port = process.env.PORT || 3001;
app.listen(port);
console.log('App is listening on port ' + port);
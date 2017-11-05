const path = require('path');
const express = require('express');

const documentationServer = express();
const app = express();

const port = process.env.PORT ? process.env.PORT : 3001;
const documentation = path.join(__dirname, 'documentation');


app.use(express.static(path.join(documentation)));

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});

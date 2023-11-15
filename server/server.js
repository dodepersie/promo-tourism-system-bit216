const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json()).use(cors());

app.use('/', routes);

app.listen(8000, () => {
  console.log('Server started on port 8000');
});

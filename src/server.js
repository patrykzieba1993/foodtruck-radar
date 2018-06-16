const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const basicRoutes = require('./routes/basic');

const setupRoutes = (app) => {
  app.use(bodyParser.json());

  basicRoutes(app);
};

const setupCors = (app) => {
  app.use(cors());
};

const server = () => {
  const app = express();

  setupCors(app);
  setupRoutes(app);

  return app;
};

module.exports = server;

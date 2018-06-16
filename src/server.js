const express = require('express');
const bodyParser = require('body-parser');

const basicRoutes = require('./routes/basic');

const setupRoutes = (app) => {
  app.use(bodyParser.json());

  basicRoutes(app);
};

const server = () => {
  const app = express();

  setupRoutes(app);

  return app;
};

module.exports = server;

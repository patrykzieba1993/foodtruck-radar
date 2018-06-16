const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const consolidate = require('consolidate');

const basicRoutes = require('./routes/basic');

const setupRoutes = (app) => {
  app.use(bodyParser.json());

  basicRoutes(app);
};

const setupCors = (app) => {
  app.use(cors());
};

const setupStatic = (app) => {
  app.engine('hjs', consolidate.handlebars);
  app.set('view engine', 'hjs');
  app.use(express.static(path.join(__dirname, '../', 'views')));
};

const setupSwagger = (app, host) => {
  const swaggerDefinition = {
    info: {
      title: 'Foodtruck radar API',
      version: '1.0.0',
      description: 'Rest API for foodtruck radar app.',
    },
    host,
    basePath: '/',
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.get('/docs', (req, res) => {
    res.render('docs', { host });
  });
};

const server = (config = {}) => {
  const {
    baseUrl,
  } = config;

  const app = express();

  setupStatic(app);
  setupCors(app);
  setupSwagger(app, baseUrl);
  setupRoutes(app);

  return app;
};

module.exports = server;

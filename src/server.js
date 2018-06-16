const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const consolidate = require('consolidate');

const db = require('./db/dbSetup')();

const ErrorHandler = require('./helpers/errorHandler');

const basicRoutes = require('./routes/basic');
const restaurantsRoutes = require('./routes/restaurants');

const RestaurantsDecorators = require('./controllers/decorators/restaurants');

const RestaurantsController = require('./controllers/restaurants');

const RestaurantsRepository = require('./repositories/restaurants');

const setupRoutes = (app, errorHandler) => {
  app.use(bodyParser.json());

  const restaurantsRepository = RestaurantsRepository(db);
  const restaurantsDecorators = RestaurantsDecorators();
  const restaurantsController = RestaurantsController(restaurantsRepository, restaurantsDecorators, errorHandler);

  basicRoutes(app);
  restaurantsRoutes(app, restaurantsController);
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

const setupErrorHandling = (app, errorHandler) => {
  app.use((e, req, res, next) => {
    if (!e.isBoom) {
      next();
    }

    return errorHandler.handleJoi(e, res);
  });
};

const server = (config = {}) => {
  const {
    baseUrl,
    nodeEnv,
  } = config;

  const app = express();

  const errorHandler = ErrorHandler({ nodeEnv });

  setupStatic(app);
  setupCors(app);
  setupSwagger(app, baseUrl);
  setupRoutes(app, errorHandler);
  setupErrorHandling(app, errorHandler);

  return app;
};

module.exports = server;

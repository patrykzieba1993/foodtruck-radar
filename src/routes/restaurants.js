const Joi = require('joi');
const validate = require('express-joi-validator');

module.exports = (app, controller) => {
  const { getRestaurants } = controller;

  /**
   * @swagger
   * /restaurants:
   *   get:
   *     summary: Returns list of restaurants.
   *     tags: [Restaurants]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: limit
   *         description: Limit (no default set).
   *         in: query
   *         required: false
   *         type: integer
   *         example: 10
   *       - name: offset
   *         description: Offset (no default set).
   *         in: query
   *         required: false
   *         type: integer
   *         example: 5
   *       - name: order
   *         description: Sorting strategy (default - id ASC). Two segment string (column name and order).
   *         in: query
   *         required: false
   *         type: integer
   *         example: name desc
   *     responses:
   *       200:
   *         description: Array of objects containing info about specific restaurants.
   *         type: array
   *         example: [
   *           {
   *             "id": 1,
   *             "name": "Test name",
   *             "rating": 4.5,
   *             "imageUrl": "https://fake.png",
   *             "location": {
   *               "latitude": 50.0918654,
   *               "longitude": 19.9474365
   *             },
   *             "address": {
   *               "street": "Test street",
   *               "number": 5,
   *               "city": "Test city"
   *             },
   *             "isOpen": true
   *           }
   *         ]
   */
  app.get('/restaurants', validate({
    query: {
      limit: Joi.number().integer().min(0).optional()
        .description('Limit'),
      offset: Joi.number().integer().min(0).optional()
        .description('Offset'),
      order: Joi.string().regex(/^\w+\s\w+$/).optional().description('Order'),
    },
  }), getRestaurants);

  /**
   * @swagger
   * /search/restaurants:
   *   get:
   *     summary: Returns list of found restaurants.
   *     tags: [Restaurants]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: query
   *         description: Search query (no default set)
   *         in: query
   *         required: true
   *         type: string
   *         example: Test
   *       - name: limit
   *         description: Limit (no default set).
   *         in: query
   *         required: false
   *         type: integer
   *         example: 10
   *       - name: offset
   *         description: Offset (no default set).
   *         in: query
   *         required: false
   *         type: integer
   *         example: 5
   *       - name: order
   *         description: Sorting strategy (default - id ASC). Two segment string (column name and order).
   *         in: query
   *         required: false
   *         type: integer
   *         example: name desc
   *     responses:
   *       200:
   *         description: Array of objects containing info about found restaurants.
   *         type: array
   *         example: [
   *           {
   *             "id": 1,
   *             "name": "Test name",
   *             "rating": 4.5,
   *             "imageUrl": "https://fake.png",
   *             "location": {
   *               "latitude": 50.0918654,
   *               "longitude": 19.9474365
   *             },
   *             "address": {
   *               "street": "Test street",
   *               "number": 5,
   *               "city": "Test city"
   *             },
   *             "isOpen": true
   *           }
   *         ]
   */
  app.get('/search/restaurants', validate({
    query: {
      query: Joi.string().required()
        .description('Search query'),
      limit: Joi.number().integer().min(0).optional()
        .description('Limit'),
      offset: Joi.number().integer().min(0).optional()
        .description('Offset'),
      order: Joi.string().regex(/^\w+\s\w+$/).optional().description('Order'),
    },
  }), getRestaurants);
};

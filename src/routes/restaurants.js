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
   *       - name: ids
   *         in: query
   *         description: Array of restaurants ids (example - [1,2,30,200])
   *         required: false
   *         type: array
   *         example: [1,2,30,200]
   *     responses:
   *       200:
   *         description: Array of objects containing info about specific restaurants.
   *         type: array
   *         example: [
   *           {
   *             "id": 1,
   *             "name": "Test name",
   *             "socials": [
   *               {
   *                 "type": "Test",
   *                 "url": "https://fake.url",
   *                 "rating": 2.5,
   *                 "maxRating": 5
   *               }
   *             ],
   *             "contact": {
   *               "phone": "123-456-789",
   *               "website": "https://fake.url"
   *             },
   *             "logo": {
   *               "small": "https://fake.png",
   *               "big": "https://fake.png"
   *             },
   *             "coordinates": {
   *               "latitude": 50.0918654,
   *               "longitude": 19.9474365
   *             },
   *             "address": {
   *               "street": "Test street",
   *               "number": 5,
   *               "city": "Test city"
   *             },
   *             "latestUpdates": "Test",
   *             "openingHours": {
   *               "opens": "10:00",
   *               "closes": "15:00"
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
      ids: Joi.array().items(Joi.number().integer()).optional().description('Restaurants ids'),
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
   *             "socials": [
   *               {
   *                 "type": "Test",
   *                 "url": "https://fake.url",
   *                 "rating": 2.5,
   *                 "maxRating": 5
   *               }
   *             ],
   *             "contact": {
   *               "phone": "123-456-789",
   *               "website": "https://fake.url"
   *             },
   *             "logo": {
   *               "small": "https://fake.png",
   *               "big": "https://fake.png"
   *             },
   *             "coordinates": {
   *               "latitude": 50.0918654,
   *               "longitude": 19.9474365
   *             },
   *             "address": {
   *               "street": "Test street",
   *               "number": 5,
   *               "city": "Test city"
   *             },
   *             "latestUpdates": "Test",
   *             "openingHours": {
   *               "opens": "10:00",
   *               "closes": "15:00"
   *             },
   *             "isOpen": true
   *           }
   *         ]
   */
  app.get('/search/restaurants', validate({
    query: {
      query: Joi.string().required().allow([''])
        .description('Search query'),
      limit: Joi.number().integer().min(0).optional()
        .description('Limit'),
      offset: Joi.number().integer().min(0).optional()
        .description('Offset'),
      order: Joi.string().regex(/^\w+\s\w+$/).optional().description('Order'),
    },
  }), getRestaurants);
};

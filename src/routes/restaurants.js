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
   *         description: Array of objects containing info about specific restaurant.
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
      limit: Joi.number().integer().optional().description('Limit'),
      offset: Joi.number().integer().optional().description('Offset'),
      order: Joi.string().optional().description('Order'),
    },
  }), getRestaurants);
};

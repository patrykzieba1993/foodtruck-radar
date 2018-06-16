const getRestaurants = require('./getRestaurants');

module.exports = () => ({
  getRestaurants: getRestaurants(),
});

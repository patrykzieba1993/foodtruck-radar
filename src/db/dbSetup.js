const { nodeEnv } = require('../../config/app');

const config = require('../../knexfile');

const knex = require('knex')(config[nodeEnv]);

module.exports = () => knex;

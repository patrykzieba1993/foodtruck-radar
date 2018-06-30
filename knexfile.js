require('dotenv').load({ silent: true });

const path = require('path');

const { env } = process;

module.exports = {
  client: 'pg',
  connection: env.DATABASE_URL || '',
  migrations: {
    directory: path.join(__dirname, '/src/db/migrations'),
  },

  development: {
    client: 'pg',
    connection: env.DATABASE_URL || '',
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/db/seeds'),
    },
  },

  test: {
    client: 'pg',
    connection: env.DATABASE_TEST_URL || '',
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations'),
    },
  },

  stage: {
    client: 'pg',
    connection: env.DATABASE_URL || '',
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations'),
    },
  },

  production: {
    client: 'pg',
    connection: env.DATABASE_URL,
    pool: {
      min: 2,
      max: 32,
      evictionRunIntervalMillis: 1000,
    },
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations'),
    },
  },
};

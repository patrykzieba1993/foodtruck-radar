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
  heroku: {
    client: 'pg',
    connection: 'postgres://bhlmnvnkscsobi:1c440e830f525e73324037f98293c8336387de4b790efd39a62758d797dbe935@ec2-54-217-205-90.eu-west-1.compute.amazonaws.com:5432/da6r35oha9p679',
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/db/seeds'),
    },
  }
};

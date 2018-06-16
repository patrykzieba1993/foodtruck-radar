require('dotenv').load({ silent: true });

const { env } = process;

module.exports = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  baseUrl: env.BASE_URL,
};

const appConfig = require('./config/app');

const server = require('./src/server')(appConfig);

const { port } = appConfig;

server.listen(port, () => console.log(`Application is listening port: ${port}`));

const appConfig = require('./config/app');

const server = require('./src/server')();

const { port } = appConfig;

server.listen(port, () => console.log(`Application is listening port: ${port}`));

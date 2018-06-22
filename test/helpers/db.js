const db = require('../../src/db/dbSetup')();

const sync = () => db.migrate.latest();

const clear = () => db.migrate.rollback();

const insert = (tableName = '', data = []) => Promise.all(data.map(item => db(tableName).insert(item)));

module.exports = {
  sync,
  clear,
  insert,
};

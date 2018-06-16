const { TableNames: { restaurants } } = require('./../utils/const');

module.exports = (db) => {
  const embraceWithQuotes = value => (value[0] === '"' && value[value.length - 1] === '"' ? value : `"${value}"`);

  const getAll = ({ limit, offset, order = 'id ASC' }) => {
    const orderStrategy = `${embraceWithQuotes(order.split(' ')[0])} ${order.split(' ')[1]}`;

    return db(restaurants).orderByRaw(orderStrategy).modify((q) => {
      if (!isNaN(limit)) {
        q.limit(limit);
      }

      if (!isNaN(offset)) {
        q.offset(offset);
      }
    });
  };

  return { getAll };
};

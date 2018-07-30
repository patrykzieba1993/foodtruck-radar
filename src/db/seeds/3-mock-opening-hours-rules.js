/* eslint-disable no-plusplus  */
const faker = require('faker');

const prepare = (id) => {
  const opensHours = ['10:00', '10:30', '11:00', '11:30', '12:00'];
  const closesHours = ['18:00', '18:30', '19:00', '19:30', '20:00'];

  const opensRandomNumber = faker.random.number() % 5;
  const closesRandomNumber = faker.random.number() % 5;

  return {
    id,
    restaurantId: id,
    opens: opensHours[opensRandomNumber],
    closes: closesHours[closesRandomNumber],
  };
};

exports.seed = async (knex, Promise) => {
  await knex('OpeningHoursRules').del();

  const items = [];

  for (let i = 1; i <= 500; i++) {
    items.push(prepare(i));
  }

  return Promise.all(items.map(item => knex('OpeningHoursRules').insert(item)));
};

/* eslint-disable no-plusplus  */
const faker = require('faker');

const prepare = (id) => {
  const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const randomNumber = faker.random.number() % 10;

  return {
    id,
    restaurantId: id,
    socialTypeId: 1, // always facebook
    url: faker.internet.url(),
    rating: ratings[randomNumber],
  };
};

exports.seed = async (knex, Promise) => {
  await knex('Socials').del();

  const items = [];

  for (let i = 1; i <= 500; i++) {
    items.push(prepare(i));
  }

  return Promise.all(items.map(item => knex('Socials').insert(item)));
};

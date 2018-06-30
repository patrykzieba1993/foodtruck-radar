/* eslint-disable no-plusplus  */
const faker = require('faker');

const prepare = (id) => {
  const firstSegment = [
    'Burger',
    'Hot-dog',
    'Vegan',
    'Mexico!',
    'Italy',
  ];

  const secondSegment = [
    'bull',
    'hawk',
    'cat',
    'dog',
    'monkey',
  ];

  const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const firstRandomNumber = faker.random.number() % 5;
  const secondRandomNumber = faker.random.number() % 5;
  const thirdRandomNumber = faker.random.number() % 10;

  return {
    id,
    name: `${firstSegment[firstRandomNumber]} ${secondSegment[secondRandomNumber]} ${faker.lorem.word()}`,
    rating: ratings[thirdRandomNumber],
    imageUrl: faker.image.imageUrl(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    street: faker.address.streetName(),
    streetNumber: faker.random.number(),
    city: faker.address.city(),
    isOpen: firstRandomNumber % 2 === 0,
  };
};

exports.seed = async (knex, Promise) => {
  await knex('Restaurants').del();

  const items = [];

  for (let i = 1; i <= 500; i++) {
    items.push(prepare(i));
  }

  return Promise.all(items.map(item => knex('Restaurants').insert(item)));
};

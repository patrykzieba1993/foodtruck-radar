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

  const firstRandomNumber = faker.random.number() % 5;
  const secondRandomNumber = faker.random.number() % 5;

  return {
    id,
    name: `${firstSegment[firstRandomNumber]} ${secondSegment[secondRandomNumber]} ${faker.lorem.word()}`,
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/098/660/non_2x/vector-burger-truck.jpg',
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    street: faker.address.streetName(),
    streetNumber: faker.random.number(),
    city: faker.address.city(),
    isOpen: firstRandomNumber % 2 === 0,
    phone: faker.phone.phoneNumberFormat(),
    website: faker.internet.url(),
    latestUpdates: faker.lorem.paragraph(),
  };
};

exports.seed = async (knex, Promise) => {
  await knex('OpeningHoursRules').del();
  await knex('Socials').del();
  await knex('Restaurants').del();

  const items = [];

  for (let i = 1; i <= 500; i++) {
    items.push(prepare(i));
  }

  return Promise.all(items.map(item => knex('Restaurants').insert(item)));
};

const request = require('supertest');
const assert = require('assert');

const serverSetup = require('./../../../../src/server');

const dbHelper = require('./../../../helpers/db');

const restaurantsMock = require('./mocks/restaurants');

const server = serverSetup();

const url = '/search/restaurants';

const customRestaurantsMock = [
  { id: 4, name: 'bla-1' },
  { id: 5, name: '!bla' },
];

describe('GET search restaurants', () => {
  beforeEach(async () => {
    await dbHelper.sync();
    return dbHelper.insert('Restaurants', [...restaurantsMock, ...customRestaurantsMock]);
  });

  afterEach(() => dbHelper.clear());

  it('should return 200 HTTP status code and proper data', () =>
    request(server)
      .get(`${url}?query=Test`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);
      }));

  it('should return 200 HTTP status code and proper data (lowercase)', () =>
    request(server)
      .get(`${url}?query=test`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);
      }));

  it('should return 200 HTTP status code and proper data (incomplete word)', () =>
    request(server)
      .get(`${url}?query=Tes`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);
      }));

  it('should return 200 HTTP status code and proper data (only one letter)', () =>
    request(server)
      .get(`${url}?query=t`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);
      }));

  it('should return 200 HTTP status code and proper data (only one sign - number)', () =>
    request(server)
      .get(`${url}?query=2`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 1);
        assert.equal(body[0].name, 'Test 2');
      }));

  it('should return 200 HTTP status code and proper data (only one sign - symbol)', () =>
    request(server)
      .get(`${url}?query=-`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 1);
        assert.equal(body[0].name, 'bla-1');
      }));

  it('should return 200 HTTP status code and proper data (only one sign ! symbol)', () =>
    request(server)
      .get(`${url}?query=!Bl`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 1);
        assert.equal(body[0].name, '!bla');
      }));

  it('should return 400 HTTP status code when query not provided', () =>
    request(server)
      .get(url)
      .expect(400));

  // getRestaurants function used. Rest of test cases are covered by GET-restaurants.spec.js
});

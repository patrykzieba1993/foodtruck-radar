const request = require('supertest');
const assert = require('assert');

const serverSetup = require('./../../../../src/server');

const dbHelper = require('./../../../helpers/db');

const restaurantsMock = require('./mocks/restaurants');

const server = serverSetup();

const url = '/restaurants';

describe('GET restaurants', () => {
  beforeEach(async () => {
    await dbHelper.sync();
    return dbHelper.insert('Restaurants', restaurantsMock);
  });

  afterEach(() => dbHelper.clear());

  it('should return 200 HTTP status code with proper data', () =>
    request(server)
      .get(url)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);

        const [firstItem, secondItem, thirdItem] = body;

        assert.equal(firstItem.name, 'Test 1');
        assert.equal(firstItem.address.number, 1);

        assert.equal(secondItem.name, 'Test 2');
        assert.equal(secondItem.address.number, 2);

        assert.equal(thirdItem.name, 'Test 3');
        assert.equal(thirdItem.address.number, 3);
      }));

  it('should return 200 HTTP status and limited data based on limit query param', () =>
    request(server)
      .get(`${url}?limit=2`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 2);

        const [firstItem, secondItem] = body;

        assert.equal(firstItem.name, 'Test 1');
        assert.equal(firstItem.address.number, 1);

        assert.equal(secondItem.name, 'Test 2');
        assert.equal(secondItem.address.number, 2);
      }));

  it('should return 200 HTTP status code and sorted data based on order query param', () =>
    request(server)
      .get(`${url}?order=streetNumber DESC`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 3);

        const [firstItem, secondItem, thirdItem] = body;

        assert.equal(firstItem.name, 'Test 3');
        assert.equal(firstItem.address.number, 3);

        assert.equal(secondItem.name, 'Test 2');
        assert.equal(secondItem.address.number, 2);

        assert.equal(thirdItem.name, 'Test 1');
        assert.equal(thirdItem.address.number, 1);
      }));

  it('should return 200 HTTP status code and custom data based on offset query param', () =>
    request(server)
      .get(`${url}?offset=2`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 1);

        const [firstItem] = body;

        assert.equal(firstItem.name, 'Test 3');
        assert.equal(firstItem.address.number, 3);
      }));

  it('should return 200 HTTP status code and custom data based on all available query params combined', () =>
    request(server)
      .get(`${url}?order=id DESC&limit=1&offset=1`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.length, 1);

        const [firstItem] = body;

        assert.equal(firstItem.name, 'Test 2');
        assert.equal(firstItem.address.number, 2);
      }));

  it('should return 400 HTTP status code when limit is not a natural number', () =>
    request(server)
      .get(`${url}?limit=-1`)
      .expect(400));

  it('should return 400 HTTP status code when offset is not a number at all', () =>
    request(server)
      .get(`${url}?offset=#`)
      .expect(400));

  it('should return 400 HTTP status code when order is not two segments string', () =>
    request(server)
      .get(`${url}?order=bla bla bla`)
      .expect(400));

  it('should return 500 HTTP status code when wrong order query param provided', () =>
    request(server)
      .get(`${url}?order=noColumnFound DESC`)
      .expect(500));
});

const assert = require('assert');

const Decorator = require('./../../../../src/controllers/decorators/restaurants/getRestaurants');

const mockedRestaurants = require('../../../integration/routes/restaurants/mocks/restaurants');

const decorator = Decorator();

describe('getRestaurants decorator', () => {
  describe('prepare function', () => {
    it('should transform restaurants data to correct form', () => {
      const expected = [
        {
          id: 1,
          name: 'Test 1',
          rating: 4.5,
          imageUrl: 'http://test1.fake',
          location: {
            latitude: 50.0001,
            longitude: -20.000,
          },
          address: {
            street: 'Test 1',
            number: 1,
            city: 'Test 1',
          },
          isOpen: false,
        },
        {
          id: 2,
          name: 'Test 2',
          rating: 2.5,
          imageUrl: 'http://test2.fake',
          location: {
            latitude: 24.0201,
            longitude: 0.000,
          },
          address: {
            street: 'Test 2',
            number: 2,
            city: 'Test 2',
          },
          isOpen: true,
        },
        {
          id: 3,
          name: 'Test 3',
          rating: 2.5,
          imageUrl: 'http://test3.fake',
          location: {
            latitude: 24.0201,
            longitude: 0.000,
          },
          address: {
            street: 'Test 3',
            number: 3,
            city: 'Test 3',
          },
          isOpen: true,
        },
      ];


      const result = decorator.prepare(mockedRestaurants);

      assert.deepEqual(result, expected);
    });

    it('it should return an empty array when no data provided', () => {
      const result = decorator.prepare();

      assert.deepEqual(result, []);
    });
  });
});

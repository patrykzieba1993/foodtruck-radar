const request = require('supertest');
const assert = require('assert');

const serverSetup = require('./../../../src/server');

const server = serverSetup();

describe('GET check', () => {
  it('should return 200 HTTP status code with proper message', () =>
    request(server)
      .get('/check')
      .expect(200)
      .expect(({ text }) => assert.equal(text, 'OK')));
});

describe('GET robots.txt', () => {
  it('should return 200 HTTP status code with proper message', () =>
    request(server)
      .get('/robots.txt')
      .expect(200)
      .expect(({ text }) => assert.equal(text, 'User-agent: *\nDisallow: /')));
});

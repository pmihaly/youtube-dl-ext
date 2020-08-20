const request = require('supertest');
const app = require('../server');

describe('GET /ping', () => {
  it('responds with json', (done) =>
    request(app).get('/ping').expect('Content-Type', /json/).expect(200, done()));

  it("responds with 'pong'", (done) =>
    request(app).get('/ping').expect(200, { result: 'pong' }, done()));
});

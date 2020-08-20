const fs = require('fs');
const path = require('path');
const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('../server');

describe('GET /ping', () => {
  const req = request(app).get('/ping');

  it('responds with a json', (done) => req.expect('Content-Type', /json/).expect(200, done()));

  it("responds with 'pong'", (done) => req.expect(200, { result: 'pong' }, done()));
});

describe('GET /:videoId', () => {
  const req = request(app).get('/CH0ix7D-vr0');

  it('responds correctly', (done) =>
    req.expect('Content-Type', /json/).expect(
      200,
      {
        success: true,
        videoPath: `${path.join(
          process.env.DL_PATH,
          'City Morgue - Toxic Boogaloo EP REVIEW'
        )}.mkv`,
      },
      done()
    ));

    // TODO lemerze írás tesztje
});

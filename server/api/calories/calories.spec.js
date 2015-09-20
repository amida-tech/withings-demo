'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/calories/today', function() {

  it('should respond with auth message', function(done) {
    request(app)
      .get('/api/calories/today')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
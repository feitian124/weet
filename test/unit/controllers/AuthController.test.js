var request = require('supertest');

describe('AuthController', function() {

  describe('#login()', function() {
    it('get /topic should redirect to /login', function (done) {
      request(sails.hooks.http.app)
        .get('/topic')
        .expect(302)
        .expect('location','/login', done);
    });
  });

});

var request = require('supertest');

describe('UserController', function() {

  describe('/signup', function() {
    it('should create a user and return 201', function (done) {
      request(sails.hooks.http.app)
        .post('/user')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201, done);
    });
  });

});

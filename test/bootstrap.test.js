var Sails = require('sails'),
    sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    environment: 'test',
    port: 8888,
    // 使用 memory storage 加快速度, 使用 drop 使得表每次清空
    models: {
      connection: 'memory',
      migrate: 'drop'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});

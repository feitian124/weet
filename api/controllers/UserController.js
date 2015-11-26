/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res, next){
    User.create(req.allParams(), function userCreated(err, user) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/signup');
      }

      user.save(function(err, user) {
        if (err) return next(err);
        res.redirect('/login');
      })
    })
  },
  show: function(req, res, next){
    User
    .findOne({id: req.param('id')})
    .then(function(user){
      return res.view({ user: user });
    });
  }
}

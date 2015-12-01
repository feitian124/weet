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
  },
  edit: function(req, res, next){
    User
    .findOne({id: req.user.id})
    .then(function(user){
      return res.view({ user: user });
    });
  },
  updatePassword: function(req, res, next) {
    var password = req.param('password');
    var newPassword = req.param('newPassword');
    User
    .findOne({id: req.param('id')})
    .then(function(user) {
      if(user.checkPassword(password)) {
        user.password = User.getPassword(newPassword);
        return user.save().then(function(user){
          res.redirect('/user/edit');
          return user;
        });
      } else {
        req.session.flash = { err: '原密码不正确!' };
        res.redirect('/user/edit');
      }
    });
  },
  update: function (req, res) {
    User
    .findOne({id: req.param('id')})
    .then(function(user) {
      user.wechat = req.param('wechat');
      user.weibo = req.param('weibo');
      user.avatar = req.param('avatar');
      user.signature = req.param('signature');
      return user.save().then(function(user){
        return user;
      });
    }).then(function(user) {
      res.redirect('/user/'+ user.id);
    });
  },
}

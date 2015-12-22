/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    loginname: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    wechat: {
      type: 'string',
      defaultsTo: ''
    },
    weibo: {
      type: 'string',
      defaultsTo: ''
    },
    avatar: {
      type: 'string',
      defaultsTo: '/images/avatar.png'
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    signature: {
      type: 'string',
      defaultsTo: ''
    },
    topics: {
      collection: 'topic',
      via: 'author'
    },
    replies: {
      collection: 'reply',
      via: 'author'
    },
    checkPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  getPassword: function(password) {
    return bcrypt.hashSync(password, 10);
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};

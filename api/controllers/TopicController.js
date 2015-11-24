/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    var page = 1;
    if(req.param('page')) {
     page = parseInt(req.param('page'));
    }
    Topic.find({ sort: 'id DESC' })
    .paginate({page: page, limit: sails.config.weet.limit})
    .populate('author')
    .populate('lastReply')
    //.populate('lastReply.author')
    //https://github.com/balderdashy/waterline/pull/1052
    .exec(function(err, records) {
      if (err) {
        console.log(err);
        return res.send(400);
      } else {
        Topic.count().exec(function(err, total) {
          if (err) {
            console.log(err);
            return res.send(400);
          } else {
            var lastReplies = _.pluck(records, 'lastReply');
            lastReplies = _.compact(lastReplies);

            User.find({id: _.pluck(lastReplies, 'author')}).exec(function(err, users ){
              var repliers = _.indexBy(users, 'id');
              _(records).forEach(function(record){
                if(record.lastReply) {
                  record.lastReply.author = repliers[record.lastReply.author];
                }
              });
              return res.view({
                topics: records,
                pager: {
                  total: Math.ceil(total/sails.config.weet.limit),
                  current: page
                }
              });
            });
          }
        });
      }
    });
  },
  show: function (req, res) {
    Topic.findOne({id: req.param('id')})
    .populate('author')
    .populate('replies', {sort: 'id DESC'})
    .exec(function(err, record) {
      if (err) {
        console.log(err);
        return res.send(400);
      } else {
        return res.view({
          topic: record
        });
      }
    });
  },
  edit: function (req, res) {
    Topic.findOne({id: req.param('id')})
    .populate('author')
    .exec(function(err, record) {
      if (err) {
        console.log(err);
        return res.send(400);
      } else {
        return res.view({
          topic: record
        });
      }
    });
  },
  update: function (req, res) {
    Topic.findOne({id: req.param('id')}, function(err, topic) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/topic/edit');
      }

      topic.title = req.param('title');
      topic.content = req.param('content');

      topic.save(function(err, topic) {
        if (err) return next(err);
        res.redirect('/topic/'+ topic.id);
      })
    })
  },
  create: function (req, res) {
    var params = _.merge(req.allParams(), {author: req.user.id});

    Topic.create(params, function(err, topic) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/topic/new');
      }

      topic.save(function(err, topic) {
        if (err) return next(err);
        res.redirect('/topic/'+ topic.id);
      })
    })
  }
};


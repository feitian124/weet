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
    .then(function(topics){
      var lastReplies = _.pluck(topics, 'lastReply');
      lastReplies = _.compact(lastReplies);
      var topicsWithLastReplier = User.find({id: _.pluck(lastReplies, 'author')}).then(function(users){
        var repliers = _.indexBy(users, 'id');
        _(topics).forEach(function(topic){
          if(topic.lastReply) {
            delete repliers[topic.lastReply.author].password;
            topic.lastReply.author = repliers[topic.lastReply.author];
          }
        });
        return topics;
      });
      return topicsWithLastReplier;
    }).then(function(topics){
      var total = Topic.count().then(function(total){
        return total;
      });
      return [total, topics];
    }).spread(function(total, topics){
      return res.view({
        topics: topics,
        pager: {
          total: Math.ceil(total/sails.config.weet.limit),
          current: page
        }
      });
    }).catch(function(err){
      console.log(err);
      return res.send(400);
    });
  },
  show: function (req, res) {
    Topic.findOne({id: req.param('id')})
    .populate('author')
    .populate('replies', {sort: 'id DESC'})
    .then(function(topic){
      topic.visitCount += 1;
      var saved = topic.save().then(function(topic){
        return topic;
      });
      return saved;
    }).then(function(topic){
      return res.view({
        topic: topic
      });
    }).catch(function(err){
      console.log(err);
      return res.send(400);
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


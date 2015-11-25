/**
 * ReplyController
 *
 * @description :: Server-side logic for managing replies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    var params = _.merge(req.allParams(), {author: req.user.id});

    Reply
    .create(params)
    .then(function(reply){
      var saved = reply.save().then(function(reply){
        return reply;
      });
      return saved;
    }).then(function(reply){
      var topic = Topic.findOne({id: req.param('topic')}).then(function(topic){
        return topic;
      });
      return [topic, reply];
    }).spread(function(topic, reply){
      topic.lastReply = reply.id;
      topic.replyCount += 1;
      var saved = topic.save().then(function(topic){
        return topic;
      });
      return saved;
    }).then(function(topic){
      res.redirect('/topic/'+ topic.id);
    }).catch(function(err){
      console.log(err);
      req.session.flash = { err: err }
      return res.redirect('/topic/' + req.param('topic'));
    });
  }
};


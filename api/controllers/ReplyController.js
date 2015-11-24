/**
 * ReplyController
 *
 * @description :: Server-side logic for managing replies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    var params = _.merge(req.allParams(), {author: req.user.id});

    Reply.create(params, function(err, reply) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/topic/' + req.param('topic'));
      }

      reply.save(function(err, reply) {
        if (err) return next(err);

        // update lastReply of the topic
        Topic.findOne({id: req.param('topic')})
        .exec(function(err, topic) {
          if (err) {
            console.log(err);
            return res.send(400);
          } else {
            topic.lastReply = reply.id;
            topic.save(function(err, topic) {
              if (err) return next(err);
              res.redirect('/topic/'+ topic.id);
            });
          }
        });
      })
    })
  }
};


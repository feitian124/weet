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
    Topic.find()
    .paginate({page: page, limit: sails.config.weet.limit})
    .populate('author')
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
            return res.view({
              topics: records,
              pager: {
                total: Math.ceil(total/sails.config.weet.limit),
                current: page
              }
            });
          }
        });
      }
    });
  },
  show: function (req, res) {
    Topic.findOne({id: req.param('id')})
    .populate('author')
    .populate('replies')
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
  create: function (req, res) {
    var params = _.merge(req.allParams(), {author: req.user.id});
    console.log("TopicController.create:");
    console.log(params);

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


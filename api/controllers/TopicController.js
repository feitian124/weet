/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Topic.find()
    .paginate({page: req.param('page'), limit: 5})
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
                total: Math.ceil(total/5),
                current: req.param('page') || 1
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
      console.log(record);
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

};


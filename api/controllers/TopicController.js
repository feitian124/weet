/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Topic.find()
    .populate('author')
    .exec(function(err, records) {
      if (err) {
        console.log(err);
        return res.send(400);
      } else {
        return res.view({
          topics: records
        });
      }
    });
  },
  show: function (req, res) {
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

};


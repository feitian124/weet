/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Topic.find().exec(function(err, records) {
      if (err) {
        return res.send(400);
      } else {
        return res.view({
          topics: records
        });
      }
    });
  }
};


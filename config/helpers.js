/**
 * my custome view helpers
 * (sails.config.helpers)
 */
var moment = require('moment');
moment.locale('zh-cn');

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var helpers = {
    fromNow: function(date) {
      return moment(date).fromNow();
    },
    markdown: function(md) {
      return marked(md);
    }
}

module.exports = helpers;

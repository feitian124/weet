/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      required: true
    },
    author: {
      model: 'user'
    },
    replyCount: {
      type: 'integer',
      defaultsTo: 0
    },
    visitCount: {
      type: 'integer',
      defaultsTo: 0
    },
    replies: {
      collection: 'reply',
      via: 'topic'
    },
    lastReply: {
      model: 'reply'
    }
  }
};

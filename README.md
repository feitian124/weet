# weet

Weet is a [sails](http://sailsjs.org) version of [nodeclub](https://github.com/cnodejs/nodeclub/).

## install
if need add new client side assets, add them to bower.json, then:

1. `bower install`, the package is located in `assets/bower_components` folder.
2.  edit `tasks/pipeline.js` to include them to sails output.

## test
`npm test`

## seed data
mongoexport -d weet -c user --csv -f _id,loginname,email,createdAt,updatedAt -o user.dat
mongoimport -d weet -c topic --type csv --headerline --file topic.dat


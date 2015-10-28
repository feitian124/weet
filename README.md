# weet

Weet is a [sails](http://sailsjs.org) version of [nodeclub](https://github.com/cnodejs/nodeclub/).

## test
`npm test`

## seed data
mongoexport -d weet -c user --csv -f _id,loginname,email,createdAt,updatedAt -o user.dat
mongoimport -d weet -c topic --type csv --headerline --file topic.dat

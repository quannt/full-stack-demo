const users = require('./users/users.service.js');
const reviews = require('./reviews/reviews.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(reviews);
};
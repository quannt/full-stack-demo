// Initializes the `reviews` service on path `/reviews`
const { Reviews } = require('./reviews.class');
const createModel = require('../../models/reviews.model');
const hooks = require('./reviews.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews', new Reviews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews');

  service.hooks(hooks);
};

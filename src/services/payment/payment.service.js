// Initializes the `payment` service on path `/payment`
const { Payment } = require('./payment.class');
const createModel = require('../../models/payment.model');
const hooks = require('./payment.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/payment', new Payment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('payment');

  service.hooks(hooks);
};

// Initializes the `engagement` service on path `/engagement`
const { Engagement } = require('./engagement.class');
const createModel = require('../../models/engagement.model');
const hooks = require('./engagement.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const options = {
    Model,
    paginate: {
      default: 1000,
      max: 1000
    }
  };
  // Initialize our service with any options it requires
  app.use('/engagement', new Engagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('engagement');

  service.hooks(hooks);
};

const assert = require('assert');
const app = require('../../src/app');

describe('\'engagement\' service', () => {
  it('registered the service', () => {
    const service = app.service('engagement');

    assert.ok(service, 'Registered the service');
  });
});

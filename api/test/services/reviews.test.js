const app = require('../../src/app');

describe('\'reviews\' service', () => {
  it('registered the service', () => {
    const service = app.service('reviews');
    expect(service).toBeTruthy();
  });
});

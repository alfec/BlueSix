const { json } = require("stream/consumers");

module.exports = {
  pageLoadTimeout: 10000,
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: 0,
  reporter: 'mochawesome',
  video: false,
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: 'https://serverest.dev',
  },
};

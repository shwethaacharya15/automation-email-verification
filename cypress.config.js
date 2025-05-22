const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  e2e: {
     baseUrl: 'https://playground.mailslurp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   env: {
    MAILSLURP_API_KEY: "6eeb189a811a11bd1ec9970f6ae5911b3c4e2a20d150402ee788b3445324fce2",
  },
  },

});

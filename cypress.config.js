const { defineConfig } = require("cypress");

module.exports = defineConfig({
    "cypress-cucumber-preprocessor": {
        nonGlobalStepDefinitions: false,
        step_definitions: "cypress/integration/step_definitions/*.js"
    },
    e2e: {
        setupNodeEvents(on, config) {
            return require("./cypress/plugins/index.js")(on, config);
        },
        specPattern: "cypress/integration/*.feature",
        supportFile: false,
    },
});

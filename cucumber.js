// cucumber.js
module.exports = {
  default: {
    require: [
      'stepdefinitions/*.js',
      'stepdefinitions/hooks.js',
    ],
    format: ['@cucumber/pretty-formatter'],
    timeout: 120000 // Setting the default timeout to 120 seconds
    
  }
};

// stepdefinitions/hooks.js
const { Before, After } = require('@cucumber/cucumber');
const DriverManager = require('../driveManager/DriverManager');
const { Builder } = require('selenium-webdriver');

let driver;

Before(async function() {
    driver = await new Builder().forBrowser('firefox').build();
    driver = await DriverManager.getDriver('firefox');
    this.driver = driver;
});

After(async function() {
    if (driver) {
        await driver.quit();
    }
});

module.exports = { driver };

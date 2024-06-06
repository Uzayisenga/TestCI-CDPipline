const { Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

let driver;

Before(async function() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu'); // if you are running on Windows
    options.addArguments('--window-size=1920,1080');
    
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    this.driver = driver;
});

After(async function() {
    if (driver) {
        await driver.quit();
    }
});

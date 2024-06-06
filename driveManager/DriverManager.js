// driveManager/DriverManager.js
const { Builder } = require('selenium-webdriver');

class DriverManager {
    static async getDriver(browser) {
        let driver;
        switch (browser) {
            case 'firefox':
                driver = await new Builder().forBrowser('firefox').build();
                break;
            case 'chrome':
                driver = await new Builder().forBrowser('chrome').build();
                break;
            default:
                throw new Error('Unsupported browser: ' + browser);
        }
        return driver;
    }
}

module.exports = DriverManager;

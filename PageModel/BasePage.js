// PageModel/BasePage.js
const { By, until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateTo(url) {
        await this.driver.get(url);
    }

    async click(elementBy) {
        const element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.click();
    }

    async type(elementBy, text) {
        const element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        await element.sendKeys(text);
    }

    async waitForElement(elementBy) {
        await this.driver.wait(until.elementLocated(elementBy), 10000);
    }
}

module.exports = BasePage;

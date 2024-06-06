const { By, until } = require('selenium-webdriver');
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const RegisterPage = require('../PageModel/RegisterPage');
//const { driver } = require('../Hooks/hook'); 
const assert = require('assert');

// Set default timeout to 60 seconds
setDefaultTimeout(60 * 1000);

// Step definitions
When('A user navigate to visit here link', async function () {
  const registerPage = new RegisterPage(driver);
  await registerPage.visit('https://demo.guru99.com/V1/index.php');
});

When('the user enter the email', async function () {
  const registerPage = new RegisterPage(driver);
  await registerPage.enterEmail('nacabe8902@javnoi.com');
});

When('the user clicks on submit button', async function () {
  const registerPage = new RegisterPage(driver);
  await registerPage.clickSubmitButton();
});

Then('the user should receive confirmation table for credentials', async function () {
  await driver.wait(until.elementLocated(By.xpath('//table')), 10000);
  console.log('User received confirmation table for credentials');
});


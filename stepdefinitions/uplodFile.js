// stepdefinitions/uploadSteps.js
const { When, Then } = require('@cucumber/cucumber');
const { Builder, By, until, Select } = require('selenium-webdriver');
const RegisterPage = require('../PageModel/RegisterPage');
const assert = require('assert');
const path = require('path');
//const pageSource = await this.driver.getPageSource();

let driver;
let registerPage;
async function closePopups() {
  try {
      // Example: Close any pop-up with a specific class or ID
      const popupCloseButton = await driver.findElement(By.css('.close-popup'));
      if (popupCloseButton) {
          await popupCloseButton.click();
      }
  } catch (error) {
      // Pop-up not found, continue with the test
  }
}

When('a user clicks on selenium link', async function () {
    registerPage = new RegisterPage(this.driver);
    await registerPage.navigateTo('https://demo.guru99.com/V1/index.php');
    await registerPage.selenium();
});

When('scroll down and clicks on File Upload link', async function () {
    await registerPage.fileUpload();
});

When('clicks on choose file', async function () {
  const filePath = path.resolve('C:/Users/User/Desktop/Kwibuka-30.jpg'); 
    await registerPage.chooseDocument(filePath);
});

When('the user clicks on checkbox for I accept terms of service', async function () {
    await registerPage.acceptTerms();
});

When('clicks on submit button file', async function () {
    await registerPage.submitFile();
});

Then('the user should receive {string} message', async function (expectedMessage) {
  try {
      // Ensure the expected message is defined and is a string
      if (typeof expectedMessage !== 'string') {
          throw new Error('Expected message is not a string');
      }

      // Wait for the element to be located and visible
      const successMessageElement = await driver.wait(
          until.elementLocated(By.xpath('//*[@id="res"]/center'))
      );
      await driver.wait(until.elementIsVisible(successMessageElement), 5000);

      // Get the text content of the element
      const successMessage = await successMessageElement.getText();

      // Debugging output to verify actual message
      console.log('Actual success message:', successMessage);

      // Ensure the success message is defined and is a string
      if (typeof successMessage !== 'string') {
          throw new Error('Success message is not a string');
      }

      // Compare the actual message with the expected message
      assert(successMessage.includes(expectedMessage), `Expected "${successMessage}" to include "${expectedMessage}"`);
  } catch (error) {
      console.error('Error finding success message:', error);

      // Print the current page source for debugging purposes
      const pageSource = await driver.getPageSource();
      console.log('Current page source:', pageSource);

      // Capture a screenshot for debugging purposes
      await driver.takeScreenshot().then((image, err) => {
          require('fs').writeFileSync('error_screenshot.png', image, 'base64');
          if (err) console.log(err);
      });
      throw error;
  } finally {
      // Quit the driver after the test is done
      await driver.quit();
  }
});






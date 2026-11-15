const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.genderMaleRadio = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultSuccess = page.locator('.page.registration-result-page .result');
    this.continueButton = page.locator('input.register-continue-button');
    this.accountEmail = page.locator('.header-links a.account');
  }

  async gotoRegisterPage() {
    await this.navigate('/register');
  }

  async registerUser(user) {
    await this.genderMaleRadio.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  async getSuccessMessage() {
    await this.resultSuccess.waitFor({ state: 'visible' });
    return await this.resultSuccess.innerText();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async getLoggedInUserEmail() {
    return await this.accountEmail.innerText();
  }
}

module.exports = RegisterPage;
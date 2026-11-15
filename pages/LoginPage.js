// pages/LoginPage.js
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.loginLink = page.locator('a.ico-login');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');
    this.errorMessage = page.locator('.validation-summary-errors');
    // হেডার লিংককে সঠিকভাবে স্পেসিফাই করা হলো
    this.accountLink = page.locator('.header-links a.account');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async gotoLoginPage() {
    await this.navigate('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessageText() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.innerText();
  }

  async isUserLoggedIn() {
    return await this.accountLink.isVisible();
  }

  async isLoginLinkVisible() {
    return await this.loginLink.isVisible();
  }
}

module.exports = LoginPage;
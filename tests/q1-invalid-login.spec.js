const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { invalidUser } = require('../utils/testData');

test.describe('Q1: Invalid Login Scenarios', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test('Attempt login with invalid email and password, verify error message and not logged in', async ({ page }) => {
    // 1. Attempt login with invalid credentials
    await loginPage.login(invalidUser.email, invalidUser.password);

    // 2. Playwright assertion: Verify error message is displayed
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Login was unsuccessful. Please correct the errors and try again.');
    expect(
      errorText.includes('No customer account found') ||
      errorText.includes('The credentials provided are incorrect')
    ).toBeTruthy();

    // 3. Playwright assertion: Verify user is NOT logged in
    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();

    // 4. Verify login button/link remains visible
    const isLoginLinkVisible = await loginPage.isLoginLinkVisible();
    expect(isLoginLinkVisible).toBeTruthy();
  });
});

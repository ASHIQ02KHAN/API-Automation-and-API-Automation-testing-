const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const LoginPage = require('../pages/LoginPage');
const CategoryPage = require('../pages/CategoryPage');
const CartPage = require('../pages/CartPage');
const { generateRandomUser } = require('../utils/testData');

test.describe('Q2: Register and Add Product to Cart', () => {
  let registerPage;
  let loginPage;
  let categoryPage;
  let cartPage;
  let newUser;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    categoryPage = new CategoryPage(page);
    cartPage = new CartPage(page);
    newUser = generateRandomUser();
  });

  test('Register new customer -> log in -> navigate to product category -> select product -> add to cart -> verify cart', async ({ page }) => {
    // 1. Register a new customer
    await registerPage.gotoRegisterPage();
    await registerPage.registerUser(newUser);

    // Verify registration completed
    const successMsg = await registerPage.getSuccessMessage();
    expect(successMsg).toContain('Your registration completed');
    await registerPage.clickContinue();

    // 2. Log In: Explicitly log out and log in to satisfy "Register -> log in" requirement
    await page.locator('a.ico-logout').click();
    await loginPage.gotoLoginPage();
    await loginPage.login(newUser.email, newUser.password);

    // Assert user is logged in
    const loggedIn = await loginPage.isUserLoggedIn();
    expect(loggedIn).toBeTruthy();

    // 3. Navigate to a product category: 'Books'
    await categoryPage.selectCategory('Books');
    await expect(page).toHaveURL(/.*\/books/);

    // 4. Select a product ('Computing and Internet') and add it to shopping cart
    const targetProduct = 'Computing and Internet';
    await categoryPage.addProductToCartByName(targetProduct);

    // 5. Verify success notification appears
    const notifMsg = await categoryPage.waitForNotification();
    expect(notifMsg).toContain('The product has been added to your shopping cart');

    // 6. Navigate to shopping cart
    await categoryPage.goToCart();
    await expect(page).toHaveURL(/.*\/cart/);

    // 7. Verify correct product and quantity appear in the cart
    const productsInCart = await cartPage.getProductNamesInCart();
    expect(productsInCart.some(name => name.includes(targetProduct))).toBeTruthy();

    const qty = await cartPage.getFirstProductQuantity();
    expect(qty).toBe('1');
  });
});
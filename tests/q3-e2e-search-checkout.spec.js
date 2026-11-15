const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { generateRandomUser } = require('../utils/testData');

test.describe('Q3: Product Search and Complete E2E Checkout', () => {
  let registerPage;
  let productPage;
  let cartPage;
  let checkoutPage;
  let testUser;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    productPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    testUser = generateRandomUser();

    // independently register a new user for each test run
    await registerPage.gotoRegisterPage();
    await registerPage.registerUser(testUser);
    await registerPage.clickContinue();
  });

  test('Search product -> verify result -> increase quantity -> add to cart -> checkout -> verify order details', async ({ page }) => {
    const searchItem = 'Computing and Internet';

    // 1. Product Search
    await productPage.searchProduct(searchItem);

    // 2. Verify the correct product appears in the search results
    const results = await productPage.getSearchResultsText();
    expect(results.some(item => item.includes(searchItem))).toBeTruthy();

    // 3. Open the product
    await productPage.openProductFromResults(searchItem);
    await expect(page).toHaveURL(/.*\/computing-and-internet/);

    // 4. Increase the quantity 
    const targetQty = 2;
    await productPage.setQuantity(targetQty);

    // 5. Add to cart & verify notification
    await productPage.addToCart();

    // 6. Navigate to cart & verify quantity
    await productPage.goToCart();
    await expect(page).toHaveURL(/.*\/cart/);
    const cartQty = await cartPage.getFirstProductQuantity();
    expect(cartQty).toBe(targetQty.toString());

    // 7. Check to agree button  checkout
    await cartPage.agreeTermsAndCheckout();

    // 8. Complete 6 checkout steps
    await checkoutPage.handleGuestOrRegistered(testUser);
    await checkoutPage.fillBillingAddress(testUser);
    await checkoutPage.selectShippingAddress();
    await checkoutPage.selectShippingMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmPaymentInfo();
    await checkoutPage.confirmOrder();

    // 9. Complete to order confirm: Validate success message and order number
    const confirmationText = await checkoutPage.getOrderSuccessMessage();
    expect(confirmationText).toContain('Your order has been successfully processed!');

    const orderNum = await checkoutPage.getOrderNumber();
    expect(orderNum).toContain('Order number:');

    // 10. See the order details
    await checkoutPage.navigateToOrderDetails();
    await expect(page).toHaveURL(/.*\/orderdetails\/\d+/);

    const isOverviewVisible = await checkoutPage.isOrderDetailsVisible();
    expect(isOverviewVisible).toBeTruthy();
  });
});
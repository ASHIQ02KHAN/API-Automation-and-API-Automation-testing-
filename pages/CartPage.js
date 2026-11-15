const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartTable = page.locator('table.cart');
    this.productNames = page.locator('table.cart .product-name');
    this.quantityInputs = page.locator('table.cart .qty-input');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async gotoCart() {
    await this.navigate('/cart');
  }

  async getProductNamesInCart() {
    await this.cartTable.waitFor({ state: 'visible' });
    return await this.productNames.allInnerTexts();
  }

  async getFirstProductQuantity() {
    return await this.quantityInputs.first().inputValue();
  }

  async agreeTermsAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
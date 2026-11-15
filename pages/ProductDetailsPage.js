const BasePage = require('./BasePage');

class ProductDetailsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
    this.searchResults = page.locator('.search-results .product-item');
    this.quantityInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('input[id^="add-to-cart-button-"]');
    this.notificationSuccess = page.locator('#bar-notification .content');
    
    this.cartLink = page.locator('#topcartlink a');
  }

  async searchProduct(keyword) {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async getSearchResultsText() {
    await this.searchResults.first().waitFor({ state: 'visible' });
    return await this.searchResults.allInnerTexts();
  }

  async openProductFromResults(productName) {
    await this.page.locator(`.product-title a:has-text("${productName}")`).first().click();
  }

  async setQuantity(qty) {
    await this.quantityInput.fill('');
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.notificationSuccess.waitFor({ state: 'visible' });
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = ProductDetailsPage;
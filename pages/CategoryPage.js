// pages/CategoryPage.js
const BasePage = require('./BasePage');

class CategoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.topMenu = page.locator('.top-menu');
    this.notificationSuccess = page.locator('#bar-notification .content');
    // ইউনিক ID দিয়ে শুধু হেডারের শপিং কার্ট সিলেক্ট করা হলো
    this.cartLink = page.locator('#topcartlink a');
  }

  async selectCategory(categoryName) {
    await this.page.locator(`.top-menu a:has-text("${categoryName}")`).first().click();
  }

  async addProductToCartByName(productName) {
    const productCard = this.page.locator('.product-item', { hasText: productName }).first();
    await productCard.locator('input[value="Add to cart"]').click();
  }

  async waitForNotification() {
    await this.notificationSuccess.waitFor({ state: 'visible' });
    return await this.notificationSuccess.innerText();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = CategoryPage;
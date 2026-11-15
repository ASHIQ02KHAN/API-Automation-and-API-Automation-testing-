// pages/CheckoutPage.js
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.checkoutAsGuestButton = page.locator('input.checkout-as-guest-button');

    // Step 1: Billing Address
    this.billingAddressSelect = page.locator('#billing-address-select');
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = page.locator('#BillingNewAddress_LastName');
    this.billingEmail = page.locator('#BillingNewAddress_Email');
    this.billingContinueBtn = page.locator('#billing-buttons-container input.button-1');

    // Step 2: Shipping Address
    this.shippingContinueBtn = page.locator('#shipping-buttons-container input.button-1');

    // Step 3: Shipping Method
    this.shippingMethodRadio = page.locator('#shippingoption_0'); // Ground
    this.shippingMethodContinueBtn = page.locator('#shipping-method-buttons-container input.button-1');

    // Step 4: Payment Method
    this.paymentMethodRadio = page.locator('#paymentmethod_0'); // Cash On Delivery (COD)
    this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container input.button-1');

    // Step 5: Payment Info
    this.paymentInfoContinueBtn = page.locator('#payment-info-buttons-container input.button-1');

    // Step 6: Confirm Order
    this.confirmOrderBtn = page.locator('#confirm-order-buttons-container input.button-1');

    // Order Completion Locators
    this.orderSuccessTitle = page.locator('.section.order-completed .title');
    this.orderNumberText = page.locator('.section.order-completed ul.details li').first();
    this.orderDetailsLink = page.locator('.section.order-completed a:has-text("Click here for order details.")');
    this.orderOverviewHeading = page.locator('.order-overview');
  }

  async handleGuestOrRegistered(user) {
    if (await this.checkoutAsGuestButton.isVisible()) {
      await this.checkoutAsGuestButton.click();
    }
  }

  async fillBillingAddress(user) {
    // পেজের বিলিং ফর্মটি সম্পূর্ণ লোড হওয়া পর্যন্ত নিশ্চিতভাবে অপেক্ষা করা
    await this.billingCountry.waitFor({ state: 'visible', timeout: 15000 });

    // নাম বা ইমেইল ফিল্ড খালি থাকলে পূরণ করা
    if (await this.billingFirstName.isVisible()) {
      const fn = await this.billingFirstName.inputValue();
      if (!fn) await this.billingFirstName.fill(user.firstName);
    }
    if (await this.billingLastName.isVisible()) {
      const ln = await this.billingLastName.inputValue();
      if (!ln) await this.billingLastName.fill(user.lastName);
    }
    if (await this.billingEmail.isVisible()) {
      const em = await this.billingEmail.inputValue();
      if (!em) await this.billingEmail.fill(user.email);
    }

    // কান্ট্রি হিসেবে United States সিলেক্ট করা
    await this.billingCountry.selectOption({ label: 'United States' });

    // স্টেট ড্রপডাউন AJAX দিয়ে লোড হতে ১ সেকেন্ড অপেক্ষা করে সিলেক্ট করা
    await this.page.waitForTimeout(1000);
    try {
      if (await this.billingState.isVisible()) {
        await this.billingState.selectOption({ index: 1 });
      }
    } catch (e) {
      // Optional
    }

    // বাকি ফিল্ডগুলো পূরণ করা
    await this.billingCity.fill(user.city);
    await this.billingAddress1.fill(user.address1);
    await this.billingZip.fill(user.zipPostalCode);
    await this.billingPhone.fill(user.phoneNumber);

    // বিলিং শেষ করে পরবর্তী ধাপে যাওয়া
    await this.billingContinueBtn.first().click();
  }

  async selectShippingAddress() {
    await this.shippingContinueBtn.first().waitFor({ state: 'visible' });
    await this.shippingContinueBtn.first().click();
  }

  async selectShippingMethod() {
    await this.shippingMethodRadio.waitFor({ state: 'visible' });
    await this.shippingMethodRadio.check();
    await this.shippingMethodContinueBtn.first().click();
  }

  async selectPaymentMethod() {
    await this.paymentMethodRadio.waitFor({ state: 'visible' });
    await this.paymentMethodRadio.check();
    await this.paymentMethodContinueBtn.first().click();
  }

  async confirmPaymentInfo() {
    await this.paymentInfoContinueBtn.first().waitFor({ state: 'visible' });
    await this.paymentInfoContinueBtn.first().click();
  }

  async confirmOrder() {
    await this.confirmOrderBtn.first().waitFor({ state: 'visible' });
    await this.confirmOrderBtn.first().click();
  }

  async getOrderSuccessMessage() {
    await this.orderSuccessTitle.waitFor({ state: 'visible' });
    return await this.orderSuccessTitle.innerText();
  }

  async getOrderNumber() {
    await this.orderNumberText.waitFor({ state: 'visible' });
    return await this.orderNumberText.innerText();
  }

  async navigateToOrderDetails() {
    await this.orderDetailsLink.click();
  }

  async isOrderDetailsVisible() {
    await this.orderOverviewHeading.waitFor({ state: 'visible' });
    return await this.orderOverviewHeading.isVisible();
  }
}

module.exports = CheckoutPage;
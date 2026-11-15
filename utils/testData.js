// utils/testData.js
module.exports = {
  baseUrl: 'https://demowebshop.tricentis.com',
  
  invalidUser: {
    email: 'wronguser.sqa2024@gmail.com',
    password: 'InvalidPass@123'
  },

  generateRandomUser: () => {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    return {
      firstName: 'Ashiq',
      lastName: 'Khan',
      email: `ashiq.sqa${randomId}@gmail.com`,
      password: 'SecurePassword123!',
      city: 'New York',
      address1: '450 West 33rd Street',
      zipPostalCode: '10001',
      phoneNumber: '01712345678'
    };
  },

  searchKeywords: {
    productName: 'Computing and Internet',
    category: 'Books'
  }
};
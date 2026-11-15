# 🛍️ Demo Web Shop UI & API Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.49+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Postman](https://img.shields.io/badge/API-Postman%20%2F%20Newman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![Allure](https://img.shields.io/badge/Reporting-Allure%20%26%20HTML-FF7800?style=for-the-badge)](https://allurereport.org/)
[![Tests Passing](https://img.shields.io/badge/Tests-100%25%20Passing-brightgreen?style=for-the-badge)](https://github.com/ASHIQ02KHAN/UI-Automation-and-API-Automation-testing)

---

## 📌 Project Overview
This repository hosts a robust, enterprise-grade test automation framework developed for the **[Demo Web Shop](https://demowebshop.tricentis.com/)** e-commerce application and the **[JSONPlaceholder RESTful API](https://jsonplaceholder.typicode.com/users)**.

The framework implements the industry-standard **Page Object Model (POM)** design pattern in **JavaScript** using **Playwright** for web UI testing, and integrates **Postman & Newman CLI** for scalable API regression testing.

---

## 🧪 Test Scenarios & Functional Coverage

### 1. Authentication & Security Suite
* **Negative Authentication Testing:** Validates that attempting to log in with unregistered or invalid credentials securely rejects the session, displays user-friendly server validation errors (`Login was unsuccessful...`), and prevents unauthorized account access.

### 2. Catalog & Cart Management Suite
* **Customer Onboarding & Session Management:** Dynamically registers unique user profiles with timestamped credentials, handles session persistence, and verifies active login status.
* **Product Catalog Navigation & Cart Sync:** Navigates category hierarchies, selects target merchandise, adds items to cart, and validates cart count, product title, and quantity parity.

### 3. End-to-End (E2E) Checkout Workflow
* **Catalog Search:** Performs live search queries and asserts search result accuracy.
* **Product Detail Customization:** Adjusts item quantities dynamically on product pages.
* **Full Order Placement:** Automates the complete 6-stage checkout pipeline:
  1. Billing Address (dynamic form fill + State/Province resolution)
  2. Shipping Address selection
  3. Shipping Method selection (Ground delivery)
  4. Payment Method configuration (Cash on Delivery)
  5. Payment Information confirmation
  6. Order Review & Order Confirmation
* **Post-Purchase Verification:** Captures generated unique Order IDs and navigates to the detailed Invoice/Order Overview screen.

### 4. RESTful API Automation Suite (Users Service)
* **`GET /users` (Data Query):** Asserts HTTP 200 OK, non-empty response array, and verifies mandatory schema fields (`id`, `name`, `email`) for all records.
* **State Management:** Dynamically extracts and stores random user attributes (`userId`, `userPhone`) into collection variables.
* **`PUT /users/{{userId}}` (Resource Update):** Dynamically generates updated user payload (`name`, `email`, `company.name`) while preserving existing telephone attributes.
* **Response Contract Validation:** Asserts status code 200 OK, validates ID immutability, verifies non-empty phone fields, and ensures dynamic name synchronization.

---

## 📊 Test Execution Summary & Verification

### UI Test Suite (Playwright)
| # | Test Suite / Spec File | Scenario Description | Status |
| :-: | :--- | :--- | :-: |
| 1 | `q1-invalid-login.spec.js` | Attempt invalid login & assert error message & session state | **PASSED** |
| 2 | `q2-register-add-to-cart.spec.js` | Dynamic registration, re-login, category navigation & cart check | **PASSED** |
| 3 | `q3-e2e-search-checkout.spec.js` | Product search, quantity increment, 6-step E2E checkout & order ID | **PASSED** |
| **Total** | **3 Scenarios Executed** | **Sequential Execution (workers: 1)** | **100% PASS** |

### API Test Suite (Postman / Newman CLI)
| Endpoint | Method | Assertions Executed | Failures | Status |
| :--- | :-: | :-: | :-: | :-: |
| `https://jsonplaceholder.typicode.com/users` | `GET` | 3 (Status 200, Array Non-Empty, Schema Check) | 0 | **PASSED** |
| `https://jsonplaceholder.typicode.com/users/{{userId}}` | `PUT` | 4 (Status 200, ID Match, Phone Exists, Name Match) | 0 | **PASSED** |
| **Total** | **2 Requests** | **7 Assertions Checked** | **0** | **100% PASS** |

---

## 🛠️ Tech Stack & Libraries
* **UI Test Runner:** [Playwright](https://playwright.dev/)
* **Design Pattern:** Page Object Model (POM)
* **Programming Language:** JavaScript (Node.js runtime)
* **API Testing Tool:** Postman Collection (v2.1.0) & [Newman](https://www.npmjs.com/package/newman)
* **Reporting Engines:** 
  * Playwright HTML Reporter (with screenshot captures & execution traces)
  * Allure Reporter (dashboard with graphs, suites, and metrics)
  * Newman HTML Reporter (standalone API execution reports)
* **Version Control:** Git & GitHub (Structured feature-branching workflow)

---

## 📂 Project Structure
```text
demo-webshop-automation/
├── .gitignore                                      # Ignored artifacts, node_modules & reports
├── package.json                                    # Scripts, dependencies, and project metadata
├── playwright.config.js                            # Test timeout, browser and reporter settings
├── README.md                                       # Framework documentation & test metrics
├── api-tests/                                      # API Test Automation (Postman/Newman)
│   └── DemoWebShop_API_Test.postman_collection.json # Self-contained Postman collection
├── pages/                                          # Page Object Model (POM) Classes
│   ├── BasePage.js                                 # Common browser navigation & helpers
│   ├── LoginPage.js                                # Locators & actions for Login page
│   ├── RegisterPage.js                             # Locators & actions for Registration page
│   ├── CategoryPage.js                             # Catalog navigation & product selection
│   ├── ProductDetailsPage.js                       # Search, quantity & product details
│   ├── CartPage.js                                 # Shopping cart inspection & checkout trigger
│   └── CheckoutPage.js                             # OnePageCheckout accordion handler
├── tests/                                          # Playwright Test Specs
│   ├── q1-invalid-login.spec.js                    # Negative authentication tests
│   ├── q2-register-add-to-cart.spec.js             # User lifecycle & cart synchronization tests
│   └── q3-e2e-search-checkout.spec.js              # Comprehensive E2E checkout suite
└── utils/
    └── testData.js                                 # Reusable dynamic data generation utility
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.x or v20.x+ recommended)
* [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/ASHIQ02KHAN/UI-Automation-and-API-Automation-testing.git
cd demo-webshop-automation
```

### 3. Install Dependencies & Browsers
```bash
# Install node packages
npm install

# Download Chromium browser binary for Playwright
npx playwright install chromium
```

---

## 🧪 Test Execution Guide

### 1. Run UI Scenarios Individually
Each test scenario is completely decoupled and can be executed independently:
```bash
# Negative Login Scenario
npm run test:q1

# Customer Registration & Add to Cart
npm run test:q2

# Product Search & Full E2E Checkout
npm run test:q3
```

### 2. Run All UI Scenarios Sequentially
Runs all test suites sequentially in a single worker process:
```bash
npm run test:sequential
# or simply:
npm test
```

### 3. Run in Headed Mode
To view browser interactions live on screen:
```bash
npm run test:headed
```

### 4. Run API Tests via Newman CLI
Executes the Postman collection directly from the command line:
```bash
npm run test:api
```

---

## 📊 Viewing Test Reports

### 1. Playwright HTML Report
Displays step-by-step logs, action timelines, and embedded full-resolution screenshots:
```bash
npm run report:html
```

### 2. Allure Dashboard Report
Generates an interactive Allure report displaying historical trends, severity, and behaviors:
```bash
npm run report:allure
```

---

## 🌿 Git Branching Strategy
This repository strictly adheres to the Git feature-branching workflow reflecting clean, modular development:

* **`main`**: Production-ready, verified codebase.
* **`feature/q1-invalid-login`**: LoginPage POM and authentication tests.
* **`feature/q2-register-cart`**: Customer registration, category navigation, and cart tests.
* **`feature/q3-e2e-checkout`**: Product details, 6-step checkout POM, and E2E order confirmation.
* **`feature/part-c-api`**: Postman collection and Newman CLI automation suite.

---

## 👨‍💻 Author
* **Name:** Md. Ashiquzzaman
* **GitHub:** [@ASHIQ02KHAN](https://github.com/ASHIQ02KHAN)
* **Repository:** [UI-Automation-and-API-Automation-testing](https://github.com/ASHIQ02KHAN/UI-Automation-and-API-Automation-testing)

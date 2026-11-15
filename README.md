# 🛍️ Demo Web Shop UI & API Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.49+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Postman](https://img.shields.io/badge/API-Postman%20%2F%20Newman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![Allure](https://img.shields.io/badge/Reporting-Allure%20%26%20HTML-FF7800?style=for-the-badge)](https://allurereport.org/)
[![License](https://img.shields.io/badge/Course-SQA%2019%20%7C%20Module%2010-blue?style=for-the-badge)](https://github.com/ASHIQ02KHAN/API-Automation-and-API-Automation-testing-)

---

## 📌 Project Overview
This repository contains an end-to-end automated testing suite designed and developed for the **[Demo Web Shop](https://demowebshop.tricentis.com/)** e-commerce application and the **[JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users)**. 

The framework is architected using **Playwright with Page Object Model (POM)** in **JavaScript** for UI test automation, combined with **Postman & Newman CLI** for RESTful API automation.

### 🎯 Assessment Scope & Marks Breakdown (100/100)
* **Part A: UI Automation (50 Marks)**
  * **Q1 (10 Marks):** Invalid Login verification with error assertions.
  * **Q2 (15 Marks):** Dynamic customer registration, login verification, category navigation, and add-to-cart verification.
  * **Q3 (25 Marks):** Product search, quantity increment, add to cart, and full 6-step E2E checkout to order confirmation and order details verification.
* **Part B: GitHub Workflow & Documentation (20 Marks)**
  * Public repository with separate feature branches merged to `main`.
  * Incremental, clean, and meaningful commit history.
  * Comprehensive `README.md` documentation.
* **Part C: API Automation (30 Marks)**
  * User retrieval via `GET /users` with schema and field assertions.
  * Dynamic user update via `PUT /users/{{userId}}` validating response code, ID consistency, non-empty phone, and dynamic name matching.
  * Standalone Newman CLI execution with HTML reporting.

---

## 🛠️ Tech Stack & Architecture
* **Automation Tool (UI):** [Playwright](https://playwright.dev/)
* **Design Pattern:** Page Object Model (POM)
* **Language & Runtime:** JavaScript (Node.js)
* **API Testing Tool:** Postman Collection (v2.1.0) & Newman CLI
* **Reporting Engines:** 
  * Playwright Built-in HTML Reporter (with full screenshots & traces attached)
  * Allure Reporter (with step-level graphs and metrics)
* **Version Control:** Git & GitHub (Feature Branching Strategy)

---

## 📂 Project Structure
```text
demo-webshop-automation/
├── .gitignore                                      # Ignored folders and artifacts
├── package.json                                    # Dependencies, scripts, and configurations
├── playwright.config.js                            # Playwright settings & reporter configuration
├── README.md                                       # Comprehensive framework documentation
├── api-tests/                                      # API Test Suite (Part C)
│   └── DemoWebShop_API_Test.postman_collection.json # Executable Postman Collection JSON
├── pages/                                          # Page Object Model (POM) Classes
│   ├── BasePage.js                                 # Base page with common navigations & actions
│   ├── LoginPage.js                                # Locators & actions for Login page
│   ├── RegisterPage.js                             # Locators & actions for Customer Registration
│   ├── CategoryPage.js                             # Category navigation & product selection
│   ├── ProductDetailsPage.js                       # Search & Product details interaction
│   ├── CartPage.js                                 # Shopping cart inspection & checkout trigger
│   └── CheckoutPage.js                             # Full 6-step OnePageCheckout flow
├── tests/                                          # Test Specifications
│   ├── q1-invalid-login.spec.js                    # Q1: Invalid Login Scenarios
│   ├── q2-register-add-to-cart.spec.js             # Q2: Register & Cart Scenarios
│   └── q3-e2e-search-checkout.spec.js              # Q3: Search & E2E Checkout Scenarios
└── utils/
    └── testData.js                                 # Dynamic and reusable test data generators
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Make sure you have installed:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/ASHIQ02KHAN/API-Automation-and-API-Automation-testing-.git
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
Each scenario can be executed standalone without dependencies on previous tests:
```bash
# Q1: Invalid Login Scenario (10 Marks)
npm run test:q1

# Q2: Customer Registration & Add to Cart (15 Marks)
npm run test:q2

# Q3: Product Search & Full E2E Checkout (25 Marks)
npm run test:q3
```

### 2. Run All UI Scenarios Sequentially
To run all scenarios in sequence (`workers: 1`):
```bash
npm run test:sequential
# or simply:
npm test
```

### 3. Run in Headed Browser Mode (Optional)
To watch the browser interactions in real-time:
```bash
npm run test:headed
```

### 4. Run API Tests via Newman CLI (Part C)
```bash
npm run test:api
```
*(Runs the Postman collection via Newman, asserts 7/7 validations, and exports a standalone report in `api-tests/newman-report.html`)*.

---

## 📊 Generating & Viewing Test Reports

### 1. Playwright HTML Report
Contains interactive execution traces, timings, step logs, and screenshots captured for every execution:
```bash
npm run report:html
```

### 2. Allure Report
Generates and opens the Allure interactive dashboard:
```bash
npm run report:allure
```

---

## 🌿 Git Branching Strategy & Workflow
This repository strictly follows the Git feature branching workflow to reflect clean, incremental software development:

* **`main`**: Production-ready, verified automation codebase.
* **`feature/q1-invalid-login`**: Q1 test suite and `LoginPage` POM implementation.
* **`feature/q2-register-cart`**: Q2 registration, login, category, and cart POM implementation.
* **`feature/q3-e2e-checkout`**: Q3 product search, quantity update, and 6-step checkout POM implementation.
* **`feature/part-c-api`**: Postman Collection JSON and Newman CLI automation.

---

## 👨‍💻 Author
* **Name:** Md. Ashiquzzaman (ASHIQ02KHAN)
* **GitHub:** [@ASHIQ02KHAN](https://github.com/ASHIQ02KHAN)
* **Course:** SQA 19 | Course 21 (Module 10)

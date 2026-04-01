# Playwright Automation Framework (TypeScript)

This project is a complete end-to-end Playwright Automation Framework using TypeScript and the Page Object Model (POM). It is designed to be simple, clean, and easy to explain in an interview.

## 🎯 Project Overview

The goal of this project is to automate the Coursera website and implement three key scenarios:
1. **Web Development Courses**: Search for courses, apply filters, and extract details of the first two courses.
2. **Language Learning Section**: Navigate to the language learning section and extract all available languages and levels.
3. **Form Validation**: Navigate to the "For Enterprise" section, fill out a form with an invalid email, and capture the error message.

## 🛠️ Tech Stack

- **Playwright**: For browser automation.
- **TypeScript**: For type-safe and readable code.
- **Node.js**: The runtime environment.
- **Page Object Model (POM)**: For organized and maintainable code.

## 📁 Folder Structure

```text
playwright-framework/
├── tests/              # Test files (.spec.ts)
├── pages/              # Page Object Model classes
├── locators/           # External locator files
├── utils/              # Reusable utility functions (e.g., screenshots)
├── screenshots/        # Captured screenshots during test execution
├── playwright.config.ts # Playwright configuration file
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## 🚀 How to Install

1. **Clone the repository** (or extract the ZIP file).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

## 🏃 How to Run Tests

To run all tests:
```bash
npm test
```

To run a specific test file:
```bash
npx playwright test tests/coursera.spec.ts
```

To view the test report:
```bash
npm run report
```

## 📌 Scenario Explanations

### Scenario 1: Web Development Courses
- **Goal**: Extract details of the first two "Web Development" courses for beginners in English.
- **Steps**: Navigate to Coursera, search for "Web Development", apply filters, and print the course name, learning hours, and rating to the console.

### Scenario 2: Language Learning Section
- **Goal**: Extract all available languages and levels from the Language Learning section.
- **Steps**: Navigate to the Language Learning section, extract all languages and levels, and print them in a structured format.

### Scenario 3: Form Validation
- **Goal**: Capture the error message when an invalid email is entered in the "Ready to transform" form.
- **Steps**: Navigate to the "For Enterprise" section, go to "Courses for Campus", fill out the form with an invalid email, and capture the error message.

## 💡 Why Page Object Model (POM)?

We use the Page Object Model (POM) because:
- **Maintainability**: If a page's UI changes, we only need to update the code in one place (the Page class).
- **Readability**: Tests are written in plain English-like steps, making them easy to understand.
- **Reusability**: Page actions can be reused across multiple tests.

## 📸 Screenshot Explanation

Screenshots are automatically taken during test execution and stored in the `/screenshots` folder. Each screenshot filename includes a timestamp (including seconds) to ensure uniqueness.

Example: `screenshot_home_page_2026-04-01_12-30-45.png`

---

*Developed by Manus for interview demonstration.*

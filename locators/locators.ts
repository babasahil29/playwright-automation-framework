/**
 * External Locators File
 * This file contains all the CSS/XPath selectors used in our tests.
 * Keeping locators separate makes the code cleaner and easier to maintain.
 * If a button's ID changes, we only need to update it here!
 */

export const HomePageLocators = {
    // Search input field
    searchBox: 'input[placeholder="What do you want to learn?"]',
    
    // Search button (magnifying glass)
    searchButton: 'button[aria-label="Submit Search"]',
    
    // "For Enterprise" link in the header
    forEnterpriseLink: 'a:has-text("For Enterprise")',
    
    // Language Learning section link (often found in explore or footer)
    languageLearningLink: 'a:has-text("Language Learning")',
};

export const CoursesPageLocators = {
    // Filter checkboxes
    beginnerLevelCheckbox: 'input[value="Beginner"]',
    englishLanguageCheckbox: 'input[value="English"]',
    
    // Course cards in the search results
    courseCards: 'div.cds-ProductCard-content',
    
    // Individual elements inside a course card
    courseName: 'h3.cds-CommonCard-title',
    learningHours: 'p.cds-CommonCard-metadata span:nth-child(1)', // Example selector
    rating: 'span.cds-CommonCard-ratings',
    
    // Filter section headers to expand if needed
    levelFilterHeader: 'button:has-text("Level")',
    languageFilterHeader: 'button:has-text("Language")',
};

export const EnterprisePageLocators = {
    // "Courses for Campus" link
    coursesForCampusLink: 'a:has-text("Courses for Campus")',
    
    // "Ready to transform" form fields
    firstNameInput: 'input[name="firstName"]',
    lastNameInput: 'input[name="lastName"]',
    emailInput: 'input[name="email"]',
    phoneInput: 'input[name="phone"]',
    institutionInput: 'input[name="institution"]',
    
    // Submit button for the form
    submitButton: 'button[type="submit"]',
    
    // Error message for invalid email
    emailErrorMessage: '#ValidMsgEmail', // Example ID for error message
};

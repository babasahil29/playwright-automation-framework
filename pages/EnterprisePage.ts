import { Page } from '@playwright/test';
import { EnterprisePageLocators } from '../locators/locators';

/**
 * EnterprisePage Object Model
 * This class represents the "For Enterprise" page of Coursera.
 * It contains all the actions we can perform on the enterprise page.
 */
export class EnterprisePage {
    // The Playwright Page object
    private page: Page;

    /**
     * Constructor to initialize the page object.
     * @param page The Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the "Courses for Campus" section.
     */
    async navigateToCoursesForCampus() {
        // Click the link to go to the "Courses for Campus" section
        await this.page.click(EnterprisePageLocators.coursesForCampusLink);
        
        // Wait for the page to load
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log('🏢 Navigated to "Courses for Campus" section');
    }

    /**
     * Fills the "Ready to transform" form with user details.
     * @param firstName The user's first name
     * @param lastName The user's last name
     * @param email The user's email address
     * @param phone The user's phone number
     * @param institution The user's institution name
     */
    async fillReadyToTransformForm(firstName: string, lastName: string, email: string, phone: string, institution: string) {
        // Fill the first name field
        await this.page.fill(EnterprisePageLocators.firstNameInput, firstName);
        
        // Fill the last name field
        await this.page.fill(EnterprisePageLocators.lastNameInput, lastName);
        
        // Fill the email field
        await this.page.fill(EnterprisePageLocators.emailInput, email);
        
        // Fill the phone field
        await this.page.fill(EnterprisePageLocators.phoneInput, phone);
        
        // Fill the institution field
        await this.page.fill(EnterprisePageLocators.institutionInput, institution);
        
        // Log the action to the console
        console.log(`📝 Filled the form with email: ${email}`);
    }

    /**
     * Submits the form and captures the error message for an invalid email.
     * @returns The error message text
     */
    async submitFormAndCaptureError() {
        // Click the submit button
        await this.page.click(EnterprisePageLocators.submitButton);
        
        // Wait for the error message to appear
        await this.page.waitForSelector(EnterprisePageLocators.emailErrorMessage);
        
        // Extract the error message text
        const errorMessage = await this.page.textContent(EnterprisePageLocators.emailErrorMessage);
        
        // Log the action to the console
        console.log(`⚠️ Captured error message: ${errorMessage}`);
        
        // Return the error message text
        return errorMessage?.trim();
    }
}

import { Page } from '@playwright/test';
import { HomePageLocators } from '../locators/locators';

/**
 * HomePage Object Model
 * This class represents the main landing page of Coursera.
 * It contains all the actions we can perform on the home page.
 */
export class HomePage {
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
     * Navigates to the Coursera home page.
     */
    async navigate() {
        // Go to the base URL defined in playwright.config.ts
        await this.page.goto('/');
        
        // Wait for the page to load completely
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log('🏠 Navigated to Coursera Home Page');
    }

    /**
     * Searches for a specific course or topic.
     * @param query The search term (e.g., "Web Development")
     */
    async searchFor(query: string) {
        // Type the search query into the search box
        await this.page.fill(HomePageLocators.searchBox, query);
        
        // Press Enter to submit the search
        await this.page.press(HomePageLocators.searchBox, 'Enter');
        
        // Wait for the search results to load
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log(`🔍 Searching for: ${query}`);
    }

    /**
     * Clicks on the "For Enterprise" link in the header.
     */
    async clickForEnterprise() {
        // Click the link to go to the Enterprise page
        await this.page.click(HomePageLocators.forEnterpriseLink);
        
        // Wait for the page to load
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log('🏢 Clicked on "For Enterprise"');
    }

    /**
     * Navigates to the Language Learning section.
     */
    async navigateToLanguageLearning() {
        // Click the link to go to the Language Learning section
        await this.page.click(HomePageLocators.languageLearningLink);
        
        // Wait for the page to load
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log('🌐 Navigated to Language Learning section');
    }
}

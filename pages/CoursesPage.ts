import { Page } from '@playwright/test';
import { CoursesPageLocators } from '../locators/locators';

/**
 * CoursesPage Object Model
 * This class represents the search results page where courses are listed.
 * It contains all the actions we can perform on the courses page.
 */
export class CoursesPage {
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
     * Applies filters to the search results.
     * @param level The level filter (e.g., "Beginner")
     * @param language The language filter (e.g., "English")
     */
    async applyFilters(level: string, language: string) {
        // 1. Click on the Level filter dropdown
        await this.page.click(CoursesPageLocators.levelFilterButton);
        
        // 2. Select the level (e.g., "Beginner")
        // We use a more robust selector that finds the label containing the text
        const levelSelector = `label:has-text("${level}")`;
        await this.page.click(levelSelector);
        
        // 3. Click the "Apply" or "View" button if it exists, or click outside to close
        // Coursera often updates results immediately or requires a click on "Apply"
        // We'll click the Level button again to close the dropdown if it's still open
        await this.page.click(CoursesPageLocators.levelFilterButton);
        await this.page.waitForLoadState('networkidle');

        // 4. Click on the Language filter dropdown
        await this.page.click(CoursesPageLocators.languageFilterButton);
        
        // 5. Select the language (e.g., "English")
        const languageSelector = `label:has-text("${language}")`;
        await this.page.click(languageSelector);
        
        // 6. Close the Language dropdown
        await this.page.click(CoursesPageLocators.languageFilterButton);
        
        // Wait for the results to update after applying filters
        await this.page.waitForLoadState('networkidle');
        
        // Log the action to the console
        console.log(`✅ Applied filters: Level=${level}, Language=${language}`);
    }

    /**
     * Extracts details of the first N courses from the search results.
     * @param count The number of courses to extract details for
     * @returns An array of course details
     */
    async getCourseDetails(count: number) {
        // Create an array to store the course details
        const courseDetails = [];
        
        // Find all course cards on the page
        const courseCards = await this.page.$$(CoursesPageLocators.courseCards);
        
        // Loop through the first N course cards
        for (let i = 0; i < Math.min(count, courseCards.length); i++) {
            const card = courseCards[i];
            
            // Extract the course name
            const name = await card.$(CoursesPageLocators.courseName).then(el => el ? el.textContent() : 'N/A');
            
            // Extract the total learning hours (if available)
            const hours = await card.$(CoursesPageLocators.learningHours).then(el => el ? el.textContent() : 'N/A');
            
            // Extract the rating
            const rating = await card.$(CoursesPageLocators.rating).then(el => el ? el.textContent() : 'N/A');
            
            // Add the course details to the array
            courseDetails.push({ name, hours, rating });
        }
        
        // Log the action to the console
        console.log(`📚 Extracted details for the first ${count} courses`);
        
        // Return the array of course details
        return courseDetails;
    }

    /**
     * Extracts all languages and levels from the Language Learning section.
     * @returns An object containing arrays of languages and levels
     */
    async extractLanguagesAndLevels() {
        // 1. Open Language dropdown to see options
        await this.page.click(CoursesPageLocators.languageFilterButton);
        const languages = await this.page.$$eval('div[data-testid="search-filter-group-Language"] label span', els => els.map(el => el.textContent?.trim()));
        await this.page.click(CoursesPageLocators.languageFilterButton); // Close

        // 2. Open Level dropdown to see options
        await this.page.click(CoursesPageLocators.levelFilterButton);
        const levels = await this.page.$$eval('div[data-testid="search-filter-group-Level"] label span', els => els.map(el => el.textContent?.trim()));
        await this.page.click(CoursesPageLocators.levelFilterButton); // Close
        
        // Log the action to the console
        console.log(`🌐 Extracted ${languages.length} languages and ${levels.length} levels`);
        
        // Return the extracted data
        return { languages, levels };
    }
}

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
        // Apply the level filter (e.g., "Beginner")
        // We use a selector that matches the checkbox with the specified level
        await this.page.check(`input[value="${level}"]`);
        
        // Apply the language filter (e.g., "English")
        // We use a selector that matches the checkbox with the specified language
        await this.page.check(`input[value="${language}"]`);
        
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
            const name = await card.$eval(CoursesPageLocators.courseName, el => el.textContent?.trim());
            
            // Extract the total learning hours (if available)
            const hours = await card.$eval(CoursesPageLocators.learningHours, el => el.textContent?.trim());
            
            // Extract the rating
            const rating = await card.$eval(CoursesPageLocators.rating, el => el.textContent?.trim());
            
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
        // Find all language options on the page
        const languages = await this.page.$$eval('input[name="language"]', els => els.map(el => el.getAttribute('value')));
        
        // Find all level options on the page
        const levels = await this.page.$$eval('input[name="level"]', els => els.map(el => el.getAttribute('value')));
        
        // Log the action to the console
        console.log(`🌐 Extracted ${languages.length} languages and ${levels.length} levels`);
        
        // Return the extracted data
        return { languages, levels };
    }
}

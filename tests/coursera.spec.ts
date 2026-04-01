import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CoursesPage } from '../pages/CoursesPage';
import { EnterprisePage } from '../pages/EnterprisePage';
import { ScreenshotUtil } from '../utils/screenshot-util';

/**
 * Coursera Automation Tests
 * This file contains all the test scenarios for the Coursera website.
 * We use the Page Object Model (POM) to interact with the website.
 */

test.describe('Coursera Automation Framework', () => {
    let homePage: HomePage;
    let coursesPage: CoursesPage;
    let enterprisePage: EnterprisePage;

    // Before each test, initialize the page objects
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        coursesPage = new CoursesPage(page);
        enterprisePage = new EnterprisePage(page);
    });

    /**
     * SCENARIO 1: Web Development Courses
     * 1. Go to coursera.org
     * 2. Search for "Web Development"
     * 3. Apply filters: Level: Beginner, Language: English
     * 4. Extract details of FIRST 2 courses: Course Name, Total Learning Hours, Rating
     * 5. Print them in console clearly
     */
    test('Scenario 1: Web Development Courses', async ({ page }) => {
        // 1. Go to coursera.org
        await homePage.navigate();
        await ScreenshotUtil.takeScreenshot(page, 'home_page');

        // 2. Search for "Web Development"
        await homePage.searchFor('Web Development');
        await ScreenshotUtil.takeScreenshot(page, 'search_results');

        // 3. Apply filters: Level: Beginner, Language: English
        await coursesPage.applyFilters('Beginner', 'English');
        await ScreenshotUtil.takeScreenshot(page, 'filtered_results');

        // 4. Extract details of FIRST 2 courses
        const courses = await coursesPage.getCourseDetails(2);

        // 5. Print them in console clearly
        console.log('\n--- FIRST 2 WEB DEVELOPMENT COURSES ---');
        courses.forEach((course, index) => {
            console.log(`Course ${index + 1}:`);
            console.log(`  Name: ${course.name}`);
            console.log(`  Hours: ${course.hours}`);
            console.log(`  Rating: ${course.rating}`);
        });
        console.log('---------------------------------------\n');
    });

    /**
     * SCENARIO 2: Language Learning Section
     * 1. Navigate to Language Learning section
     * 2. Extract: All Languages, All Levels, Count of each
     * 3. Store data in arrays / collections
     * 4. Print structured output
     */
    test('Scenario 2: Language Learning Section', async ({ page }) => {
        // 1. Navigate to Language Learning section
        await homePage.navigate();
        await homePage.navigateToLanguageLearning();
        await ScreenshotUtil.takeScreenshot(page, 'language_learning_section');

        // 2. Extract: All Languages, All Levels, Count of each
        const { languages, levels } = await coursesPage.extractLanguagesAndLevels();

        // 3. Store data in arrays / collections (already done in extractLanguagesAndLevels)

        // 4. Print structured output
        console.log('\n--- LANGUAGE LEARNING SECTION ---');
        console.log(`Total Languages: ${languages.length}`);
        console.log(`Languages: ${languages.join(', ')}`);
        console.log(`Total Levels: ${levels.length}`);
        console.log(`Levels: ${levels.join(', ')}`);
        console.log('---------------------------------\n');
    });

    /**
     * SCENARIO 3: Form Validation
     * 1. Go to Home Page
     * 2. Click "For Enterprise"
     * 3. Navigate to "Courses for Campus"
     * 4. Fill "Ready to transform" form
     * 5. Enter INVALID email
     * 6. Capture error message
     * 7. Print error message in console
     */
    test('Scenario 3: Form Validation', async ({ page }) => {
        // 1. Go to Home Page
        await homePage.navigate();

        // 2. Click "For Enterprise"
        await homePage.clickForEnterprise();
        await ScreenshotUtil.takeScreenshot(page, 'enterprise_page');

        // 3. Navigate to "Courses for Campus"
        await enterprisePage.navigateToCoursesForCampus();
        await ScreenshotUtil.takeScreenshot(page, 'courses_for_campus');

        // 4. Fill "Ready to transform" form
        // 5. Enter INVALID email
        await enterprisePage.fillReadyToTransformForm(
            'John', 
            'Doe', 
            'invalid-email', 
            '1234567890', 
            'Manus University'
        );
        await ScreenshotUtil.takeScreenshot(page, 'form_filled');

        // 6. Capture error message
        const errorMessage = await enterprisePage.submitFormAndCaptureError();

        // 7. Print error message in console
        console.log('\n--- FORM VALIDATION ERROR ---');
        console.log(`Error Message: ${errorMessage}`);
        console.log('-----------------------------\n');
        
        // Assert that the error message is captured
        expect(errorMessage).toBeTruthy();
    });
});

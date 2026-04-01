import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Screenshot Utility
 * This class helps us take screenshots with a timestamped filename.
 * It's a reusable function that can be called from any test or page object.
 */
export class ScreenshotUtil {
    /**
     * Takes a screenshot and saves it to the /screenshots folder.
     * @param page The Playwright Page object
     * @param name A descriptive name for the screenshot (e.g., "search_results")
     */
    static async takeScreenshot(page: Page, name: string) {
        // Get current date and time
        const now = new Date();
        
        // Format: YYYY-MM-DD_HH-MM-SS
        const timestamp = now.toISOString()
            .replace(/T/, '_')      // Replace T with underscore
            .replace(/\..+/, '')    // Remove milliseconds
            .replace(/:/g, '-');    // Replace colons with hyphens
        
        // Create the full filename
        const fileName = `screenshot_${name}_${timestamp}.png`;
        
        // Define the path to the screenshots folder
        const screenshotPath = path.join(__dirname, '..', 'screenshots', fileName);
        
        // Ensure the screenshots directory exists
        const dir = path.dirname(screenshotPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Take the screenshot
        await page.screenshot({ path: screenshotPath });
        
        // Log the action to the console
        console.log(`📸 Screenshot saved: ${fileName}`);
    }
}

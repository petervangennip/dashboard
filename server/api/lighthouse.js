// import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { URL } from 'url';

export default defineEventHandler(async (event) => {
  try {
    const { url } = await readBody(event);

    if (!url) {
      return { success: false, message: 'URL is required' };
    }

    console.log('Starting Lighthouse check for URL:', url);

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Create a new page to run the Lighthouse audit
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Get the page URL for Lighthouse
    const pageUrl = new URL(url);

    // Run Lighthouse using Puppeteer as a devtools protocol
    const { lhr } = await lighthouse(pageUrl.href, {
      port: new URL(browser.wsEndpoint()).port, // Connect to Puppeteer browser
      output: 'json',
      logLevel: 'info',
    });

    console.log('Lighthouse audit completed successfully.');

    // Close the browser after audit is done
    await browser.close();

    // Return relevant Lighthouse scores and metrics
    return {
      success: true,
      scores: {
        performance: lhr.categories.performance.score * 100,
        accessibility: lhr.categories.accessibility.score * 100,
        bestPractices: lhr.categories['best-practices'].score * 100,
        seo: lhr.categories.seo.score * 100,
      },
      audits: lhr.audits,
    };
  } catch (error) {
    console.error('Lighthouse check failed:', error); // Log the error
    return { success: false, message: error.message };
  }
});

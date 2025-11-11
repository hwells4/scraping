/**
 * Example Playwright scraping script
 * Demonstrates basic web scraping with Playwright
 */

import { chromium } from 'playwright';

async function scrapePage(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Extract page title
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Extract text content
    const content = await page.textContent('body');

    // Extract all links
    const links = await page.$$eval('a', anchors =>
      anchors.map(a => ({ text: a.textContent, href: a.href }))
    );

    console.log(`Found ${links.length} links`);

    return {
      url,
      title,
      content,
      links
    };
  } catch (error) {
    console.error('Error scraping page:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Example usage
const targetUrl = process.argv[2] || 'https://example.com';
scrapePage(targetUrl)
  .then(result => {
    console.log('\nScrape complete!');
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });

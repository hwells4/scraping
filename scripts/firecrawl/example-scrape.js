/**
 * Example Firecrawl scraping script
 * Demonstrates basic web scraping with Firecrawl
 */

import FirecrawlApp from '@mendable/firecrawl-js';

// Initialize Firecrawl with your API key
const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

async function scrapePage(url) {
  try {
    console.log(`Scraping: ${url}`);

    // Scrape a single page
    const result = await app.scrapeUrl(url, {
      formats: ['markdown', 'html'],
    });

    console.log('Scrape successful!');
    console.log('Content:', result.markdown);
    return result;
  } catch (error) {
    console.error('Error scraping page:', error);
    throw error;
  }
}

// Example usage
const targetUrl = process.argv[2] || 'https://example.com';
scrapePage(targetUrl);

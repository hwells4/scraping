/**
 * Example Firecrawl crawling script
 * Demonstrates crawling multiple pages with Firecrawl
 */

import FirecrawlApp from '@mendable/firecrawl-js';

// Initialize Firecrawl with your API key
const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

async function crawlWebsite(url, options = {}) {
  try {
    console.log(`Crawling: ${url}`);

    // Crawl a website
    const result = await app.crawlUrl(url, {
      limit: options.limit || 10,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      },
      ...options
    });

    console.log('Crawl successful!');
    console.log(`Crawled ${result.data.length} pages`);

    // Process results
    result.data.forEach((page, index) => {
      console.log(`\n--- Page ${index + 1}: ${page.url} ---`);
      console.log(page.markdown.substring(0, 200) + '...');
    });

    return result;
  } catch (error) {
    console.error('Error crawling website:', error);
    throw error;
  }
}

// Example usage
const targetUrl = process.argv[2] || 'https://example.com';
const limit = parseInt(process.argv[3]) || 5;

crawlWebsite(targetUrl, { limit });

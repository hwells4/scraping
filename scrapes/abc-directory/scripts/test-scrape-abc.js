import { chromium } from 'playwright';
import fs from 'fs';

// Test with just a few states
const STATES = [
  { value: 'DE', name: 'Delaware' },  // Small state
  { value: 'VT', name: 'Vermont' }    // Small state
];

// Function to clean text
function cleanText(text) {
  return text ? text.trim().replace(/\s+/g, ' ') : '';
}

// Function to extract individuals from a page
async function extractIndividuals(page) {
  const individuals = await page.evaluate(() => {
    const results = [];
    const cards = document.querySelectorAll('.directory-results-list .flex-item.flex-item--half');

    cards.forEach(card => {
      try {
        const individual = {};

        // Extract name
        const nameEl = card.querySelector('.bg-accent p.text-lg.font-bold');
        individual.name = nameEl ? nameEl.textContent.trim() : '';

        // Extract city/state from header
        const locationEl = card.querySelector('.bg-accent p.text-xs.italic');
        individual.headerLocation = locationEl ? locationEl.textContent.trim() : '';

        // Extract organization (may not exist)
        const bodyDiv = card.querySelector('.directory-card__body');
        if (bodyDiv) {
          const paragraphs = bodyDiv.querySelectorAll('div:first-child p');
          if (paragraphs.length >= 1) {
            const firstP = paragraphs[0].textContent.trim();
            // Check if first paragraph is "Not Available"
            if (firstP === 'Not Available') {
              individual.organization = 'Not Available';
            } else {
              individual.organization = firstP;
            }
          }

          // Extract address
          if (paragraphs.length >= 2) {
            individual.addressLine1 = paragraphs[1].textContent.trim();
          }
          if (paragraphs.length >= 3) {
            individual.addressLine2 = paragraphs[2].textContent.trim();
          }

          // Extract phone and fax
          const phoneP = Array.from(bodyDiv.querySelectorAll('p')).find(p => p.innerHTML.includes('<b>Phone:</b>'));
          if (phoneP) {
            individual.phone = phoneP.textContent.replace('Phone:', '').trim();
          }

          const faxP = Array.from(bodyDiv.querySelectorAll('p')).find(p => p.innerHTML.includes('<b>Fax:</b>'));
          if (faxP) {
            individual.fax = faxP.textContent.replace('Fax:', '').trim();
          }

          // Extract certification details
          const certP = Array.from(bodyDiv.querySelectorAll('p')).find(p => {
            const text = p.textContent;
            return text.includes('certified') && (text.includes('expires') || text.includes('expire'));
          });
          if (certP) {
            individual.certificationDetails = certP.textContent.trim();
          }
        }

        results.push(individual);
      } catch (error) {
        console.error('Error extracting individual:', error);
      }
    });

    return results;
  });

  return individuals;
}

// Function to click next page
async function clickPage(page, pageNumber) {
  const buttons = await page.locator('.bg-accent.hover\\:bg-accent-alt.text-lg.w-10.h-10.font-bold.mx-1').all();
  if (pageNumber < buttons.length) {
    await buttons[pageNumber].click();
    await page.waitForTimeout(10000);
  }
}

// Main scraping function
async function scrapeABCDirectory() {
  const browser = await chromium.launch({ headless: false }); // Keep visible for testing
  const page = await browser.newPage();

  const allIndividuals = [];

  console.log('Starting ABC Directory TEST scrape...\n');

  for (const state of STATES) {
    console.log(`\n=== Processing ${state.name} (${state.value}) ===`);

    try {
      // Navigate to directory
      await page.goto('https://www.abcop.org/abc-directory', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Select state
      const stateSelect = await page.locator('label:has-text("State") select').first();
      await stateSelect.selectOption({ value: state.value });

      // Click search
      const searchButton = await page.locator('button:has-text("Search")').last();
      await searchButton.click();

      // Wait for results
      await page.waitForTimeout(10000);

      // Check if there are results
      const resultCount = await page.locator('.directory-results-list .flex-item.flex-item--half').count();

      if (resultCount === 0) {
        console.log(`No results found for ${state.name}`);
        continue;
      }

      console.log(`Found results for ${state.name}`);

      // Get number of pages
      const paginationButtons = await page.locator('.bg-accent.hover\\:bg-accent-alt.text-lg.w-10.h-10.font-bold.mx-1').count();
      const totalPages = Math.max(1, paginationButtons);

      console.log(`Total pages: ${totalPages}`);

      let stateTotal = 0;

      // Extract from first page
      let individuals = await extractIndividuals(page);
      console.log(`Page 1: Extracted ${individuals.length} individuals`);
      allIndividuals.push(...individuals);
      stateTotal += individuals.length;

      // Extract from remaining pages (limit to first 2 pages for testing)
      const pagesToScrape = Math.min(totalPages, 2);
      for (let pageNum = 1; pageNum < pagesToScrape; pageNum++) {
        console.log(`Processing page ${pageNum + 1}...`);
        await clickPage(page, pageNum);

        individuals = await extractIndividuals(page);
        console.log(`Page ${pageNum + 1}: Extracted ${individuals.length} individuals`);
        allIndividuals.push(...individuals);
        stateTotal += individuals.length;
      }

      console.log(`${state.name} complete: ${stateTotal} total individuals`);

      // Print first individual as sample
      if (stateTotal > 0) {
        console.log('\nSample individual:');
        console.log(JSON.stringify(allIndividuals[allIndividuals.length - stateTotal], null, 2));
      }

    } catch (error) {
      console.error(`Error processing ${state.name}:`, error.message);
    }
  }

  await browser.close();

  console.log(`\n\n=== Scraping Complete ===`);
  console.log(`Total individuals extracted: ${allIndividuals.length}`);

  return allIndividuals;
}

// Function to convert to CSV
function convertToCSV(individuals) {
  const headers = [
    'Name',
    'Header Location',
    'Organization',
    'Address Line 1',
    'Address Line 2',
    'Phone',
    'Fax',
    'Certification Details'
  ];

  const csvRows = [headers.join(',')];

  for (const individual of individuals) {
    const row = [
      `"${cleanText(individual.name || '')}"`,
      `"${cleanText(individual.headerLocation || '')}"`,
      `"${cleanText(individual.organization || '')}"`,
      `"${cleanText(individual.addressLine1 || '')}"`,
      `"${cleanText(individual.addressLine2 || '')}"`,
      `"${cleanText(individual.phone || '')}"`,
      `"${cleanText(individual.fax || '')}"`,
      `"${cleanText(individual.certificationDetails || '')}"`
    ];

    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

// Run the scraper
console.log('ABC Directory TEST Scraper');
console.log('==========================\n');

scrapeABCDirectory()
  .then(individuals => {
    // Save to CSV
    const csv = convertToCSV(individuals);
    const filename = `abc-directory-test.csv`;
    fs.writeFileSync(filename, csv);
    console.log(`\nData saved to ${filename}`);
    console.log(`Total records: ${individuals.length}`);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

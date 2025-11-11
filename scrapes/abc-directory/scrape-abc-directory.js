import { chromium } from 'playwright';
import fs from 'fs';

// List of all US states and territories
const STATES = [
  { value: 'AL', name: 'Alabama' },
  { value: 'AK', name: 'Alaska' },
  { value: 'AS', name: 'American Samoa' },
  { value: 'AZ', name: 'Arizona' },
  { value: 'AR', name: 'Arkansas' },
  { value: 'CA', name: 'California' },
  { value: 'CO', name: 'Colorado' },
  { value: 'CT', name: 'Connecticut' },
  { value: 'DE', name: 'Delaware' },
  { value: 'DC', name: 'District Of Columbia' },
  { value: 'FM', name: 'Federated States Of Micronesia' },
  { value: 'FL', name: 'Florida' },
  { value: 'GA', name: 'Georgia' },
  { value: 'GU', name: 'Guam' },
  { value: 'HI', name: 'Hawaii' },
  { value: 'ID', name: 'Idaho' },
  { value: 'IL', name: 'Illinois' },
  { value: 'IN', name: 'Indiana' },
  { value: 'IA', name: 'Iowa' },
  { value: 'KS', name: 'Kansas' },
  { value: 'KY', name: 'Kentucky' },
  { value: 'LA', name: 'Louisiana' },
  { value: 'ME', name: 'Maine' },
  { value: 'MH', name: 'Marshall Islands' },
  { value: 'MD', name: 'Maryland' },
  { value: 'MA', name: 'Massachusetts' },
  { value: 'MI', name: 'Michigan' },
  { value: 'MN', name: 'Minnesota' },
  { value: 'MS', name: 'Mississippi' },
  { value: 'MO', name: 'Missouri' },
  { value: 'MT', name: 'Montana' },
  { value: 'NE', name: 'Nebraska' },
  { value: 'NV', name: 'Nevada' },
  { value: 'NH', name: 'New Hampshire' },
  { value: 'NJ', name: 'New Jersey' },
  { value: 'NM', name: 'New Mexico' },
  { value: 'NY', name: 'New York' },
  { value: 'NC', name: 'North Carolina' },
  { value: 'ND', name: 'North Dakota' },
  { value: 'MP', name: 'Northern Mariana Islands' },
  { value: 'OH', name: 'Ohio' },
  { value: 'OK', name: 'Oklahoma' },
  { value: 'OR', name: 'Oregon' },
  { value: 'PW', name: 'Palau' },
  { value: 'PA', name: 'Pennsylvania' },
  { value: 'PR', name: 'Puerto Rico' },
  { value: 'RI', name: 'Rhode Island' },
  { value: 'SC', name: 'South Carolina' },
  { value: 'SD', name: 'South Dakota' },
  { value: 'TN', name: 'Tennessee' },
  { value: 'TX', name: 'Texas' },
  { value: 'UT', name: 'Utah' },
  { value: 'VT', name: 'Vermont' },
  { value: 'VI', name: 'Virgin Islands' },
  { value: 'VA', name: 'Virginia' },
  { value: 'WA', name: 'Washington' },
  { value: 'WV', name: 'West Virginia' },
  { value: 'WI', name: 'Wisconsin' },
  { value: 'WY', name: 'Wyoming' }
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

// Function to check if there are more pages
async function hasNextPage(page, currentPage) {
  const paginationButtons = await page.locator('.bg-accent.hover\\:bg-accent-alt.text-lg.w-10.h-10.font-bold.mx-1').count();
  return currentPage < paginationButtons;
}

// Function to click next page
async function clickPage(page, pageNumber) {
  // Page numbers are 0-indexed in the array, but displayed as 1-indexed
  const buttons = await page.locator('.bg-accent.hover\\:bg-accent-alt.text-lg.w-10.h-10.font-bold.mx-1').all();
  if (pageNumber < buttons.length) {
    await buttons[pageNumber].click();
    await page.waitForTimeout(10000); // Wait for results to load
  }
}

// Main scraping function
async function scrapeABCDirectory() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const allIndividuals = [];
  let totalCount = 0;

  console.log('Starting ABC Directory scrape...\n');

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

      // Extract from first page
      let individuals = await extractIndividuals(page);
      console.log(`Page 1: Extracted ${individuals.length} individuals`);
      allIndividuals.push(...individuals);
      totalCount += individuals.length;

      // Extract from remaining pages
      for (let pageNum = 1; pageNum < totalPages; pageNum++) {
        console.log(`Processing page ${pageNum + 1}...`);
        await clickPage(page, pageNum);

        individuals = await extractIndividuals(page);
        console.log(`Page ${pageNum + 1}: Extracted ${individuals.length} individuals`);
        allIndividuals.push(...individuals);
        totalCount += individuals.length;
      }

      console.log(`${state.name} complete: ${allIndividuals.length - (totalCount - individuals.length)} total individuals`);

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
console.log('ABC Directory Scraper');
console.log('=====================\n');

scrapeABCDirectory()
  .then(individuals => {
    // Save to CSV
    const csv = convertToCSV(individuals);
    const filename = `abc-directory-${new Date().toISOString().split('T')[0]}.csv`;
    fs.writeFileSync(filename, csv);
    console.log(`\nData saved to ${filename}`);
    console.log(`Total records: ${individuals.length}`);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

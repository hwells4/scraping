# ABC Directory Scraper

A Playwright-based web scraper for extracting certified orthotic and prosthetic professionals from the ABC (American Board for Certification) directory at https://www.abcop.org/abc-directory.

## Features

- ✅ Scrapes all 58 US states and territories
- ✅ Handles pagination automatically
- ✅ Extracts comprehensive professional information
- ✅ Exports data to CSV format
- ✅ Headless and non-headless modes available

## Data Extracted

For each certified individual, the scraper captures:

- **Name**: Full name with credentials (e.g., "Mr. Michael L. Baer, CPO")
- **Location**: City and state from the directory listing
- **Organization**: Practice or facility name (if available)
- **Address Line 1**: Street address
- **Address Line 2**: City, state, and ZIP code
- **Phone**: Contact phone number (if available)
- **Fax**: Fax number (if available)
- **Certification Details**: Certification type, ID, certification date, and expiration date

## Files

- **`scrape-abc-directory.js`** - Full scraper for all 58 states/territories (headless mode)
- **`test-scrape-abc.js`** - Test scraper for 2 small states (visible browser for testing)

## Usage

### Test Run (Recommended First)

Test the scraper on just 2 small states (Delaware and Vermont):

```bash
node test-scrape-abc.js
```

This will:
- Run with visible browser so you can see what's happening
- Scrape only Delaware and Vermont
- Limit to first 2 pages per state
- Output: `abc-directory-test.csv`
- Take approximately 1-2 minutes

### Full Scraper

Run the full scraper across all 58 states and territories:

```bash
node scrape-abc-directory.js
```

This will:
- Run in headless mode (no visible browser)
- Scrape all US states and territories
- Process all pagination pages
- Output: `abc-directory-YYYY-MM-DD.csv`
- **Estimated time: 2-4 hours** (depends on total number of results and network speed)

## How It Works

1. **State Iteration**: Loops through all 58 US states and territories
2. **Form Submission**: For each state, fills out the search form and submits
3. **Results Extraction**: Waits for results to load (10 seconds), then extracts all individual cards from the page
4. **Pagination Handling**: Detects pagination buttons and clicks through all pages
5. **Data Collection**: Parses each professional's card to extract structured data
6. **CSV Export**: Converts all extracted data to CSV format with proper escaping

## Output Format

The CSV file includes these columns:

```csv
Name,Header Location,Organization,Address Line 1,Address Line 2,Phone,Fax,Certification Details
"Mr. Michael L. Baer, CPO","Dover, DE","First State DME","4115 N Dupont Hwy","Dover, DE 19901-1561","(302)394-0301","(302)439-7371","CPO (CPO04611), certified 1/1/2021, expires 12/31/2025"
```

## Technical Details

### Dependencies

- **playwright** - Browser automation framework
- **fs** (built-in) - File system operations for CSV export

### Wait Times

- Initial page load: 2 seconds
- After search submission: 10 seconds
- After pagination click: 10 seconds

These wait times ensure JavaScript-rendered content loads properly.

### Selectors Used

- State dropdown: `label:has-text("State") select`
- Search button: `button:has-text("Search")`
- Result cards: `.directory-results-list .flex-item.flex-item--half`
- Pagination: `.bg-accent.hover:bg-accent-alt.text-lg.w-10.h-10.font-bold.mx-1`

## Customization

### Change States to Scrape

Edit the `STATES` array in either file:

```javascript
const STATES = [
  { value: 'CA', name: 'California' },
  { value: 'NY', name: 'New York' }
];
```

### Adjust Wait Times

If results aren't loading properly, increase wait times:

```javascript
await page.waitForTimeout(15000); // Change from 10000 to 15000 (15 seconds)
```

### Run in Visible Mode

In `scrape-abc-directory.js`, change:

```javascript
const browser = await chromium.launch({ headless: false }); // Set to false
```

## Notes

- The scraper respects the natural pagination and wait times to avoid overwhelming the server
- Some individuals may not have phone/fax numbers or organization names - these fields will be empty in the CSV
- The scraper automatically handles cases where organization is listed as "Not Available"
- All text fields are properly escaped with quotes in the CSV for Excel compatibility

## Example Output

From the test run on Delaware and Vermont:

```
Total individuals extracted: 33
Data saved to abc-directory-test.csv
Total records: 33
```

Sample extracted data:
```json
{
  "name": "Mr. Michael L. Baer, CPO",
  "headerLocation": "Dover, DE",
  "organization": "First State DME",
  "addressLine1": "4115 N Dupont Hwy",
  "addressLine2": "Dover, DE 19901-1561",
  "phone": "(302)394-0301",
  "fax": "(302)439-7371",
  "certificationDetails": "CPO (CPO04611), certified 1/1/2021, expires 12/31/2025"
}
```

## Troubleshooting

**Issue**: No results extracted
- Check if the website structure has changed
- Increase wait times
- Run in non-headless mode to see what's happening

**Issue**: Missing data fields
- Some professionals don't provide all information
- This is expected and not a scraper error

**Issue**: Script timing out
- Check your internet connection
- Increase the timeout values in the script
- Run on fewer states at a time

## Estimated Results

Based on testing:
- Delaware: ~14-20 professionals
- Vermont: ~19-25 professionals
- California: Hundreds (9+ pages)
- **Total expected nationwide: 5,000-10,000+ professionals**

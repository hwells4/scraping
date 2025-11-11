# Claude Project Instructions

This document contains project-specific instructions for Claude Code when working on this web scraping project.

## Project Overview

This is a web scraping toolkit using Playwright and Firecrawl for extracting data from websites. The project emphasizes organization, incremental saving, and maintainability.

## Core Principles

### 1. File Organization (CRITICAL)

**ALWAYS use the standardized folder structure for scraping projects:**

```
scrapes/
└── [project-name]/           # e.g., abc-directory, product-catalog
    ├── README.md             # Documentation for this scrape
    ├── scrape-[name].js      # Main production scraper
    ├── scripts/              # Optional: test scripts only
    │   └── test-*.js
    └── output/               # CSV, JSON output files (gitignored)
        └── *.csv
```

**Rules:**
- Create `scrapes/[project-name]/` folder FIRST before any exploration
- Exploration scripts are temporary - DELETE them after final script is created
- Only keep: main scraper, README, and optional test script
- All output files go in `scrapes/[project-name]/output/`
- NEVER leave loose scripts in the root directory

### 2. Incremental Saving (CRITICAL)

**NEVER accumulate data in memory and save once at the end. ALWAYS save incrementally.**

**Why:**
- Prevents data loss if script crashes or times out
- Reduces memory usage for large scrapes
- Allows progress monitoring
- Enables recovery from failures

**Example - GOOD:**
```javascript
// Write headers once
fs.writeFileSync('output.csv', 'header1,header2\n');

for (const item of items) {
  const data = await scrapeItem(item);
  // Save immediately after each item/page/batch
  fs.appendFileSync('output.csv', `${data.field1},${data.field2}\n`);
}
```

**Example - BAD:**
```javascript
const allData = [];
for (const item of items) {
  const data = await scrapeItem(item);
  allData.push(data);  // ❌ Accumulating in memory
}
// ❌ Data lost if crash happens before this
fs.writeFileSync('output.csv', convertToCSV(allData));
```

### 3. Browser Management

**Always close browsers properly to prevent resource leaks:**

```javascript
let browser = null;
try {
  browser = await chromium.launch();
  // ... scraping logic ...
} finally {
  if (browser) await browser.close();
}
```

**If Playwright browsers get stuck:**
- Use the kill-browsers utility: `npm run kill-browsers`
- This script is located at `scripts/utils/kill-playwright-browsers.sh`
- It kills Playwright MCP servers and orphaned browser processes

### 4. Problem Solving Philosophy

**When encountering issues:**

✅ **DO:**
- Fix issues within the core tools (Playwright, Firecrawl)
- Investigate root causes in the scraping logic
- Check selectors, wait times, and page load states
- Use the kill-browsers script if browsers are stuck
- Report problems clearly with technical details

❌ **DON'T:**
- Spin off into odd workarounds or alternative systems
- Switch to completely different approaches without investigation
- Create complex fallback mechanisms for simple problems
- Accumulate multiple exploration scripts trying different things

**Example:**
- If Playwright is timing out → Investigate wait times, selectors, page load states
- If selectors aren't working → Check the actual HTML structure, don't immediately switch to a different tool
- If browsers are stuck → Use `npm run kill-browsers`, don't create new browser management systems

### 5. Auto-Scrape Skill

This project includes an auto-scrape skill (`.claude/skills/auto-scrape.md`) that:
- Automatically analyzes websites
- Creates organized scraping projects
- Generates production-ready scripts with incremental saving
- Enforces the file organization standards

**Refer to the skill for:**
- Website analysis methodology
- Script generation templates
- Best practices for different site types

## Common Tasks

### Starting a New Scrape

1. **Create project folder:**
   ```bash
   mkdir -p scrapes/[project-name]/{scripts,output}
   ```

2. **Explore the website** (temporary scripts in root - will be deleted later)

3. **Create production script:**
   ```
   scrapes/[project-name]/scrape-[project-name].js
   ```

4. **Create README:**
   ```
   scrapes/[project-name]/README.md
   ```

5. **Clean up exploration scripts:**
   ```bash
   rm explore-*.js test-*.js analyze-*.js
   ```

### Running Scrapers

Production scraper:
```bash
node scrapes/[project-name]/scrape-[project-name].js
```

Test scraper:
```bash
node scrapes/[project-name]/scripts/test-scrape-[project-name].js
```

### Killing Stuck Browsers

```bash
npm run kill-browsers
```

## Git Workflow

### What Gets Committed:
- ✅ Scraper scripts (`scrapes/*/scrape-*.js`, `scrapes/*/scripts/test-*.js`)
- ✅ Documentation (`scrapes/*/README.md`)
- ✅ Utility scripts (`scripts/utils/`)
- ✅ Example scripts (`scripts/firecrawl/`, `scripts/playwright/`)

### What Gets Ignored:
- ❌ Output files (`scrapes/*/output/*.csv`, `scrapes/*/output/*.json`)
- ❌ Environment variables (`.env`)
- ❌ Screenshots and images (`*.png`, `*.jpg`)
- ❌ Temporary files
- ❌ Node modules

See `.gitignore` for complete list.

## Environment Variables

Create a `.env` file (not committed) with:
```bash
FIRECRAWL_API_KEY=your_api_key_here
```

Use `.env.example` as a template.

## Dependencies

- **Playwright** - Browser automation for JavaScript-heavy sites
- **Firecrawl** - API-based scraping for static sites
- **fs/path** - Built-in Node.js modules for file operations

## Project Structure Reference

```
scraping/
├── .claude/
│   └── skills/
│       └── auto-scrape.md       # Auto-scraping skill
├── scrapes/                      # All scraping projects
│   └── [project-name]/
│       ├── README.md
│       ├── scrape-[name].js
│       ├── scripts/
│       │   └── test-*.js
│       └── output/               # Gitignored
│           └── *.csv
├── scripts/
│   ├── firecrawl/               # Firecrawl examples
│   ├── playwright/              # Playwright examples
│   └── utils/                   # Utility scripts
│       └── kill-playwright-browsers.sh
├── package.json
├── .env.example
├── .gitignore
└── claude.md                    # This file
```

## Remember

1. **Organize first** - Create `scrapes/[project-name]/` before starting
2. **Save incrementally** - After each page/state/batch, not at the end
3. **Close browsers** - Always use try/finally blocks
4. **Clean up** - Delete exploration scripts after final script is created
5. **Fix, don't workaround** - Solve problems in the core tools
6. **Use utilities** - `npm run kill-browsers` when browsers are stuck

## Questions?

Refer to:
- `.claude/skills/auto-scrape.md` - Complete scraping methodology
- `README.md` - Project documentation
- `QUICKSTART.md` - Getting started guide
- `USAGE.md` - Usage examples

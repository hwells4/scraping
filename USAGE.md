# How to Use This Project

## For Your User

This is a **zero-configuration web scraping system**. Your user doesn't need to know anything about Playwright, Firecrawl, or scraping techniques.

---

## The One Command They Need

```
"I want to scrape [URL]"
```

That's it. Everything else is automatic.

---

## What Happens Automatically

1. **Claude explores the site** (5-6 pages)
   - Tests navigation
   - Checks URL patterns
   - Detects pagination
   - Identifies if content is static or JavaScript-rendered

2. **Claude analyzes and decides**
   - Static site → Use Firecrawl (fast, cheap)
   - Dynamic site → Use Playwright (thorough, free)
   - Complex site → Hybrid approach or guidance

3. **Claude generates a script**
   - Custom-built for that specific site
   - Includes pagination logic
   - Handles data extraction
   - Saves to `scripts/` folder

4. **Claude tells user what to do**
   - Exact command to run
   - Expected results
   - Cost estimates
   - Time estimates

---

## Real Usage Examples

### Example 1: Simple Blog

```
User: "I want to scrape all posts from example.com/blog"

Claude: [explores site for 60 seconds]

Analysis Complete!

✓ Detected: Static HTML blog with pagination
✓ Found: 45 blog posts across 5 pages
✓ Pattern: /blog?page=1, /blog?page=2, etc.
✓ Recommended: Firecrawl

Generated script: scripts/firecrawl/example-blog-scrape.js

To run:
  npm run blog-scrape

Estimated:
  - Cost: 45 Firecrawl credits (~$0.45)
  - Time: ~2 minutes
  - Output: blog-posts.json

User: npm run blog-scrape
[Script runs and completes]
✓ Saved 45 blog posts to blog-posts.json
```

### Example 2: Dynamic E-commerce

```
User: "Scrape product listings from shop.com/products"

Claude: [explores site]

Analysis Complete!

✓ Detected: JavaScript-rendered product listings
✓ Found: Infinite scroll pagination
✓ Products: ~100 visible, more load on scroll
✓ Recommended: Playwright

Generated script: scripts/playwright/shop-scrape.js

To run:
  node scripts/playwright/shop-scrape.js

Estimated:
  - Cost: Free (uses your computer)
  - Time: ~5 minutes
  - Output: products.json

Extracts: name, price, description, availability

User: node scripts/playwright/shop-scrape.js
[Script runs with browser automation]
✓ Saved 100 products to products.json
```

### Example 3: Complex Directory

```
User: "I need to scrape the directory at abc.org/directory"

Claude: [explores 6 pages]

Analysis Complete!

✓ Detected: Multi-state directory with dropdowns
✓ Found: 50 states × ~20 entries each = 1,000 entries
✓ Pagination: Dropdown select + "Next" buttons
✓ Recommended: Playwright (requires interaction)

Generated script: scripts/playwright/abc-directory-scrape.js

This script will:
1. Iterate through all 50 states
2. For each state, paginate through entries
3. Extract: company name, address, phone, email
4. Save to directory-data.json

To run:
  node scripts/playwright/abc-directory-scrape.js

Estimated:
  - Cost: Free
  - Time: ~30-45 minutes (1,000 entries)
  - Output: Structured JSON

User: node scripts/playwright/abc-directory-scrape.js
[Script runs, may take a while]
✓ Scraped 1,000 entries from 50 states
✓ Saved to directory-data.json
```

---

## What If It Can't Be Scraped?

Claude will be honest:

```
User: "Scrape data from facebook.com/groups"

Claude:

Analysis Complete - Unable to Scrape

✗ Authentication Required
  Facebook requires login to view group content.

✗ Terms of Service
  Facebook's ToS explicitly prohibits automated scraping.

✗ Technical Protection
  Heavy anti-bot measures detected.

Recommendation:
  This site cannot be scraped ethically or technically.

Alternative approaches:
  1. Use Facebook Graph API (official)
  2. Manual export if you're a group admin
  3. Request data export from Facebook
```

---

## Setup Requirements

### Minimal Setup (Playwright only)

**Nothing needed!** Playwright is free and works immediately.

```
User: "Scrape [URL]"
Claude: [generates Playwright script]
User: npm run script-name
```

### Full Setup (Playwright + Firecrawl)

**Add Firecrawl API key:**

1. Get free API key: https://www.firecrawl.dev/
2. Copy `.env.example` to `.env`
3. Add key to `.env`

Now both tools available. Claude chooses the best one automatically.

---

## File Locations

All generated scripts go here:

```
scripts/
├── firecrawl/
│   └── [site-name]-scrape.js    ← Firecrawl scripts
└── playwright/
    └── [site-name]-scrape.js    ← Playwright scripts
```

All output data:

```
output.json              ← Default output location
[custom-name].json       ← Or custom filename
[custom-name].csv        ← If CSV requested
```

---

## User's Mental Model

Your user should think of this as:

**"I tell Claude what site to scrape. Claude figures out how and gives me a command to run. I run it and get my data."**

They don't need to know:
- What Playwright is
- What Firecrawl is
- How to detect URL patterns
- How pagination works
- Static vs dynamic content
- CSS selectors
- API endpoints

They just need to:
1. Say what site they want to scrape
2. Run the command Claude provides
3. Get their data

---

## Advanced: Customization

If your user wants to modify a generated script:

```
User: "The script works but I need to also extract the image URLs"

Claude: [reads the generated script, adds image extraction]

Updated script with image URL extraction.
The script now extracts:
- Title
- Description
- Price
- Image URL ← NEW

Run the same command to use the updated script.
```

---

## Cost Transparency

Claude always provides cost estimates:

### Firecrawl
- Free tier: 500 credits/month
- Typically: 1 page ≈ 1 credit
- Example: Scraping 100 pages ≈ 100 credits

### Playwright
- Always free
- Uses your computer's resources
- No external API calls

Your user can decide based on:
- Speed (Firecrawl faster)
- Cost (Playwright free)
- Complexity (Claude recommends best option)

---

## Summary

**For your user, it's this simple:**

1. Say: "I want to scrape [URL]"
2. Wait: ~60 seconds for analysis
3. Run: The command Claude provides
4. Done: Data saved to file

**No configuration. No decisions. No expertise needed.**

---

## The ONE Skill

All of this is powered by a single Claude Code skill:

`.claude/skills/auto-scrape.md`

This skill:
- Activates automatically when user mentions scraping
- Explores sites with Playwright
- Analyzes structure and patterns
- Chooses optimal tool
- Generates working scripts
- Provides clear instructions

**Your user never needs to think about the skill. It just works.**

---

## Next Steps for You

1. ✓ Project is ready to use
2. Share this folder with your user
3. They can start immediately with: "I want to scrape [URL]"

Optional:
- Set up MCP integration (see MCP_CONFIG.md) for more power
- Add Firecrawl API key for faster scraping

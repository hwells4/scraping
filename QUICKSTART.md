# Quick Start Guide

Get scraping in 2 minutes!

## Prerequisites

All dependencies are already installed. You just need:

1. **Firecrawl API key** (optional, only if using Firecrawl)
   - Sign up at https://www.firecrawl.dev/
   - Free tier available

2. **Claude Code with MCP** (optional, for direct integration)
   - See [MCP_CONFIG.md](./MCP_CONFIG.md) for setup

## Option 1: Using Claude Code (Recommended)

### Step 1: Set Environment (30 seconds)

Only if you plan to use Firecrawl:

```bash
cp .env.example .env
# Edit .env and add your Firecrawl API key
```

### Step 2: Start Scraping

Just say:

```
"I want to scrape https://example.com/directory"
```

That's it! Claude will:
1. Explore the site automatically
2. Figure out the best approach
3. Generate a script
4. Tell you how to run it

### Example Conversations

```
You: "Scrape all blog posts from myblog.com"
Claude: *explores site, analyzes structure, creates script*
       "Here's your Firecrawl script. Run: npm run blog-scrape"

You: "I need product prices from this e-commerce site"
Claude: *tests dynamic loading, chooses Playwright*
       "Created Playwright script with price extraction..."

You: "Can you scrape this directory site?"
Claude: *checks 6 pages, detects pagination*
       "Found 200 pages with predictable URLs. Using Firecrawl..."
```

## Option 2: Using Example Scripts

### Test Playwright (no API key needed)

```bash
npm run playwright:scrape https://example.com
```

### Test Firecrawl (requires API key)

```bash
# Set your API key first
export FIRECRAWL_API_KEY="your_key_here"

# Scrape single page
npm run firecrawl:scrape https://example.com

# Crawl multiple pages
npm run firecrawl:crawl https://example.com 5
```

## What Happens When You Scrape

### The Auto-Analysis Process

When you say "scrape this site":

1. **Exploration (30-60 seconds)**
   - Visits 5-6 pages
   - Analyzes URL patterns
   - Tests pagination
   - Checks for dynamic content

2. **Classification**
   - Determines if static or dynamic
   - Chooses Firecrawl or Playwright
   - Detects potential issues

3. **Script Generation**
   - Creates custom scraping script
   - Adds pagination logic
   - Includes data extraction
   - Handles errors

4. **Delivery**
   - Presents findings
   - Provides script
   - Explains how to run it
   - Estimates costs/time

### What You'll Get

A complete package:

```
✓ Site analysis report
✓ Recommended method (Firecrawl/Playwright)
✓ Working script in scripts/ folder
✓ NPM command to run it
✓ Cost and time estimates
✓ Instructions for next steps
```

## Common Scenarios

### Scenario 1: Blog Scraping

```
You: "Scrape all posts from techblog.com/articles"

Output:
- Method: Firecrawl
- Script: scripts/firecrawl/techblog-scrape.js
- Command: npm run techblog-scrape
- Estimated: 50 posts, 2 minutes, 50 credits
```

### Scenario 2: E-commerce Products

```
You: "Get product data from shop.com/products"

Output:
- Method: Playwright (JavaScript-rendered)
- Script: scripts/playwright/shop-scrape.js
- Command: npm run shop-scrape
- Extracts: name, price, description, availability
```

### Scenario 3: Directory Listings

```
You: "Scrape company info from directory.com"

Output:
- Method: Firecrawl
- Pattern: /directory?page=N (200 pages)
- Script: Generated with pagination loop
- Saves: output.json with structured data
```

## Troubleshooting

### "Site requires authentication"

Claude will detect this and ask you for:
- Login credentials
- How to authenticate
- Where to find the data after login

### "Anti-bot protection detected"

Claude will:
- Report the issue
- Suggest alternatives
- Try different approaches
- Tell you if it's not feasible

### "Content not loading"

Claude will:
- Test with Playwright (full browser)
- Check for JavaScript requirements
- Adjust script accordingly

## Cost Estimates

### Firecrawl Pricing
- Free tier: 500 credits/month
- 1 page = ~1 credit
- Crawling 100 pages ≈ 100 credits

### Playwright (Free)
- No API costs
- Slightly slower than Firecrawl
- Uses your computer's resources

Claude will tell you estimated costs before you run anything.

## Next Steps

### For Regular Use

1. **Set up MCP integration** - See [MCP_CONFIG.md](./MCP_CONFIG.md)
   - Enables direct Playwright/Firecrawl control
   - Faster and more powerful

2. **Save your scripts** - Scripts are saved in `scripts/`
   - Reusable for future scrapes
   - Customize as needed

3. **Automate** - Set up scheduled scraping
   - Use cron jobs
   - Monitor changes
   - Build datasets

### Learn More

- [README.md](./README.md) - Full documentation
- [MCP_CONFIG.md](./MCP_CONFIG.md) - MCP setup
- [SKILLS.md](./SKILLS.md) - How the auto-scrape skill works

## The Bottom Line

**To scrape any site:**

```
You: "I want to scrape [URL]"
Claude: *does everything automatically*
You: *run the command Claude gives you*
Done!
```

That's it. No configuration, no decisions, no complexity.

Just describe what you want, and Claude handles the rest.

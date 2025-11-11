# Web Scraping Project

**Intelligent, automated web scraping with Playwright and Firecrawl + Claude Code integration.**

## What This Does

Say "I want to scrape [URL]" and get:
- Automatic site exploration and analysis
- Best-method recommendation (Firecrawl vs Playwright)
- A working script generated for you
- Clear instructions on how to run it

**No manual configuration. No guessing. Just results.**

---

## Quick Start

Everything is already installed. You just need:

### 1. Set Up Firecrawl (Optional)

Only needed if you'll use Firecrawl for scraping:

```bash
# Copy environment template
cp .env.example .env

# Add your API key to .env
# Get one free at https://www.firecrawl.dev/
```

### 2. Start Scraping

With Claude Code, just say:

```
"I want to scrape https://example.com/products"
```

Claude will:
1. Explore 5-6 pages automatically
2. Analyze URL patterns and structure
3. Choose Firecrawl or Playwright
4. Generate a custom script
5. Tell you exactly how to run it

**That's it!**

---

## How It Works

### The Auto-Scrape Skill

One powerful skill handles everything:

**Step 1: Exploration**
- Navigates to your target URL
- Visits multiple pages (5-6)
- Tests pagination and navigation
- Checks for JavaScript rendering

**Step 2: Analysis**
- Detects URL patterns
- Classifies as static/dynamic/complex
- Identifies potential blockers
- Estimates costs and complexity

**Step 3: Solution**
- Chooses optimal tool (Firecrawl or Playwright)
- Generates working script
- Adds error handling
- Includes data extraction logic

**Step 4: Delivery**
- Complete analysis report
- Runnable script saved to `scripts/`
- Clear next steps
- Cost/time estimates

---

## What You Get

Every scraping request produces:

```
✓ Site Analysis Report
  - Classification (static/dynamic/complex)
  - URL pattern detection
  - Pagination analysis
  - Blocker detection

✓ Recommended Method
  - Firecrawl, Playwright, or hybrid
  - Reasoning and justification
  - Alternative approaches

✓ Working Script
  - Custom-generated for your site
  - Saved to scripts/ folder
  - Ready to run immediately

✓ Clear Instructions
  - Exact command to run
  - Expected output
  - Cost estimates
  - Troubleshooting tips
```

---

## Example Workflows

### Example 1: Blog Scraping

```
User: "Scrape all posts from techblog.com"

Claude:
  ✓ Explores site (finds 50 blog posts)
  ✓ Detects static HTML + pagination
  ✓ Recommends Firecrawl
  ✓ Generates scripts/firecrawl/techblog-scrape.js
  ✓ Estimates: 50 credits, 2 minutes

User: npm run techblog-scrape
Result: 50 blog posts saved to output.json
```

### Example 2: Product Listings

```
User: "Get products and prices from shop.com"

Claude:
  ✓ Explores site (JavaScript-heavy)
  ✓ Detects dynamic loading
  ✓ Recommends Playwright
  ✓ Generates scripts/playwright/shop-scrape.js
  ✓ Extracts: name, price, description

User: npm run shop-scrape
Result: Structured product data saved
```

### Example 3: Directory Data

```
User: "Scrape company directory from example.com"

Claude:
  ✓ Explores 6 pages
  ✓ Finds pattern: /directory?page=N
  ✓ Estimates 200 pages
  ✓ Recommends Firecrawl with pagination
  ✓ Generates script with loop

User: npm run directory-scrape
Result: 200 pages of company data
```

---

## Tools Included

### Playwright
- **Use for:** Dynamic sites, JavaScript-rendered content, interactions
- **Cost:** Free (uses your computer)
- **Speed:** Slower (runs real browser)
- **Best for:** SPAs, e-commerce, authenticated sites

### Firecrawl
- **Use for:** Static sites, content scraping, large crawls
- **Cost:** API credits (500 free/month)
- **Speed:** Fast (no browser overhead)
- **Best for:** Blogs, news, documentation, directories

**Claude automatically chooses the right tool for your site.**

---

## Project Structure

```
scraping/
├── .claude/
│   └── skills/
│       └── auto-scrape.md       ← The one skill that does everything
│
├── scripts/
│   ├── firecrawl/               ← Generated Firecrawl scripts
│   │   ├── example-scrape.js
│   │   └── example-crawl.js
│   └── playwright/              ← Generated Playwright scripts
│       └── example-scrape.js
│
├── .env.example                 ← Environment template
├── package.json                 ← Dependencies
├── README.md                    ← You are here
├── QUICKSTART.md               ← 2-minute setup guide
├── SKILLS.md                   ← Skill documentation
└── MCP_CONFIG.md              ← MCP integration guide
```

---

## Manual Script Usage

You can also run the example scripts directly:

### Playwright

```bash
npm run playwright:scrape https://example.com
```

### Firecrawl

```bash
# Set API key first
export FIRECRAWL_API_KEY="your_key"

# Single page
npm run firecrawl:scrape https://example.com

# Multiple pages
npm run firecrawl:crawl https://example.com 10
```

---

## Advanced: MCP Integration

For direct Playwright/Firecrawl control from Claude Code:

See [MCP_CONFIG.md](./MCP_CONFIG.md) for setup instructions.

This enables:
- Direct browser control
- Real-time scraping adjustments
- More powerful automation

---

## Dependencies

All installed and ready:

- **playwright** `^1.56.1` - Browser automation
- **@playwright/mcp** `^0.0.46` - Playwright MCP server
- **@mendable/firecrawl-js** `^4.5.0` - Firecrawl SDK
- **firecrawl-mcp** `^3.6.0` - Firecrawl MCP server

No need to install anything else.

---

## Best Practices

The auto-scrape skill handles these automatically:

✓ **Respects robots.txt** - Checks before crawling
✓ **Rate limiting** - Adds appropriate delays
✓ **Error handling** - Graceful failure recovery
✓ **Data validation** - Ensures output quality
✓ **Cost awareness** - Estimates before running
✓ **Legal check** - Warns about ToS violations

---

## Cost Estimates

### Firecrawl
- Free tier: 500 credits/month
- ~1 credit per page
- 100-page crawl ≈ 100 credits ≈ $1-5 (paid tiers)

### Playwright
- Free
- Uses your computer resources
- Slightly slower per page

**Claude tells you estimated costs before you commit.**

---

## When Scraping Won't Work

Claude will detect and warn you about:

- **Authentication required** - Login needed, credentials requested
- **Anti-bot protection** - Cloudflare, reCAPTCHA, etc.
- **Terms of Service** - Explicit no-scraping clauses
- **robots.txt blocks** - Site prohibits automated access
- **Technical impossibility** - Can't access the data

---

## Troubleshooting

### Playwright Issues

```bash
# Reinstall browsers
npx playwright install
```

### Firecrawl API Errors

```bash
# Check API key is set
echo $FIRECRAWL_API_KEY

# Reload environment
export $(cat .env | xargs)
```

### MCP Not Working

1. Check config location: `~/.config/claude-code/mcp.json`
2. Validate JSON syntax
3. Restart Claude Code
4. See [MCP_CONFIG.md](./MCP_CONFIG.md)

---

## Learn More

- **[QUICKSTART.md](./QUICKSTART.md)** - 2-minute setup
- **[SKILLS.md](./SKILLS.md)** - How the auto-scrape skill works
- **[MCP_CONFIG.md](./MCP_CONFIG.md)** - MCP integration
- **[Playwright Docs](https://playwright.dev/)** - Browser automation
- **[Firecrawl Docs](https://docs.firecrawl.dev/)** - API scraping

---

## Support

- **Playwright**: [GitHub Issues](https://github.com/microsoft/playwright/issues)
- **Firecrawl**: [Documentation](https://docs.firecrawl.dev/)
- **This Project**: Modify scripts as needed or open an issue

---

## License

ISC

---

## The Bottom Line

**Want to scrape a website?**

1. Say: "I want to scrape [URL]"
2. Wait 60 seconds for analysis
3. Run the command Claude gives you
4. Get your data

**No configuration. No decisions. Just results.**

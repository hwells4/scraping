# Claude Code Skills for Web Scraping

This project includes TWO powerful skills that handle all your web scraping needs automatically.

---

## 1. Setup Skill

**Purpose:** Automated project setup and configuration

### What It Does

When you say "help me set this up" or "run the setup", the skill:

1. **Checks prerequisites** - Node.js version, system requirements
2. **Installs dependencies** - All npm packages and Playwright browsers
3. **Configures environment** - Creates .env file, API keys
4. **Sets up MCP servers** - Playwright and Firecrawl MCP integration
5. **Tests everything** - Verifies all components work
6. **Provides summary** - Shows what's ready and next steps

### How to Use It

First time using the project? Just say:

```
"Help me set this up"
"Run the setup"
"Install everything I need"
```

The skill will guide you through each step interactively.

### What You'll Be Asked

During setup, you'll make a few choices:

**1. Firecrawl API Key**
- "Set up Firecrawl now" → Get a free API key, fast scraping
- "Skip for now" → Use only Playwright (free, no signup)

**2. MCP Integration**
- "Set up MCP" → Full integration, more powerful
- "Skip for now" → Basic mode, still fully functional

**3. Verification**
- Claude will test everything works
- You'll see what's ready

### Time Required
- **Minimal setup:** 2 minutes (just Playwright)
- **Full setup:** 3-5 minutes (Playwright + Firecrawl + MCP)

### What Gets Installed

```
✓ Node packages (playwright, firecrawl, etc.)
✓ Playwright browsers (~300MB, one-time download)
✓ Environment configuration (.env file)
✓ MCP servers (optional, for advanced features)
```

### After Setup

Once complete, you'll see:

```
🎉 Setup Complete!

You can now say:
  "I want to scrape [URL]"

Or test with:
  npm run playwright:scrape https://example.com
```

---

## 2. Auto-Scrape Skill

**Purpose:** Intelligent website analysis and automatic scraping solution generation

### What It Does

When you say "I want to scrape [URL]", the skill:

1. **Explores 5-6 pages** of your target site using Playwright
2. **Analyzes structure** - URL patterns, pagination, dynamic content
3. **Determines best method** - Firecrawl, Playwright, or hybrid
4. **Generates a solution** - Working script or clear instructions
5. **Provides estimates** - Cost, time, complexity

### How to Use It

After setup is complete, just say:

```
"I want to scrape https://example.com/directory"
"Help me scrape product listings from this site"
"Can you scrape all the blog posts from this URL?"
```

The skill will automatically:
- Navigate the site
- Figure out how it works
- Choose the right tool
- Create a runnable script
- Tell you exactly what to do next

### What You Get

A complete analysis including:

- **Site Classification** - Is it static, dynamic, or complex?
- **URL Pattern Detection** - How pagination/navigation works
- **Recommended Method** - Which tool to use and why
- **Working Script** - Ready-to-run code (or step-by-step instructions)
- **Cost Estimates** - Time, API credits, complexity
- **Potential Issues** - Blockers and how to handle them

### Example Output

```markdown
# Scraping Analysis for example.com

## Recommended Method: Firecrawl
The site uses static HTML with predictable URL patterns.

## URL Pattern Detected
Pages follow: /directory?page=1, /directory?page=2, etc.
Estimated 50 pages to scrape.

## Generated Script
✓ Created: scripts/firecrawl/example-scrape.js

Run with:
  npm run firecrawl:scrape

## Cost Estimate
- Firecrawl credits: ~50
- Runtime: ~2 minutes
- No blockers detected

## Next Steps
1. Ensure FIRECRAWL_API_KEY is set
2. Run the script
3. Results saved to output.json
```

### When NOT to Use

The skill will tell you if scraping is:
- Against the site's Terms of Service
- Blocked by robots.txt
- Technically not feasible
- Requires authentication you need to provide

---

## Skill Workflow

For new users, the workflow is:

### First Time
```
1. Say: "Help me set this up"
   → Setup skill activates
   → Installs everything
   → Configures project

2. Say: "I want to scrape [URL]"
   → Auto-scrape skill activates
   → Analyzes site
   → Generates script

3. Run the command Claude provides
   → Get your data
```

### Every Time After
```
1. Say: "I want to scrape [URL]"
2. Run the command Claude provides
3. Get your data
```

---

## Behind the Scenes

### Setup Skill Uses:
- **Bash** - Check Node.js, run npm commands
- **AskUserQuestion** - Get user preferences
- **File operations** - Create .env, configure files
- **Claude MCP commands** - Set up MCP servers

### Auto-Scrape Skill Uses:
- **Playwright** - Explore and analyze sites
- **Firecrawl** - Fast content scraping (when appropriate)
- **Pattern detection** - URL analysis algorithms
- **Script generation** - Custom code for each site

---

## Skill Locations

Both skills are in `.claude/skills/`:

```
.claude/skills/
├── setup.md          ← Setup and configuration
└── auto-scrape.md    ← Site analysis and scraping
```

---

## Tips for Best Results

### For Setup
1. **Have stable internet** - Downloads ~300MB of browsers
2. **Use latest Node.js** - Version 18+ recommended
3. **Follow prompts** - Claude will guide you through choices
4. **Optional is optional** - Skip Firecrawl/MCP if you want simple setup

### For Scraping
1. **Provide the URL** - The full URL you want to start from
2. **Describe the goal** - "scrape products" vs "scrape blog posts"
3. **Mention constraints** - "only 10 pages" or "need authentication"
4. **Specify format** - "save as CSV" or "JSON output"

---

## Troubleshooting

### Setup Issues

**"Node.js not found"**
- Install from https://nodejs.org/ (v18+)
- Restart terminal
- Run setup again

**"npm install failed"**
- Check internet connection
- Try: `npm cache clean --force`
- Run: `npm install` manually

**"Browser install failed"**
- Check disk space (~500MB needed)
- Try: `npx playwright install --force`

### Scraping Issues

**"Can't access site"**
- Check the URL is correct
- Verify site is accessible in browser
- May need authentication

**"Script not working"**
- Claude will help debug
- Can regenerate script
- May suggest different approach

---

## Summary

**Two skills. Two use cases.**

1. **First time?** → Use setup skill
2. **Want to scrape?** → Use auto-scrape skill

Both activate automatically based on what you say.

**You don't need to think about skills. Just describe what you want and Claude handles it.**

---

## Next Steps

1. **New user?** Say: "Help me set this up"
2. **Ready to scrape?** Say: "I want to scrape [URL]"

That's all you need to know!

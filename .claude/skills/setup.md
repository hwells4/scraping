# Setup - Automated Web Scraping Project Setup

You are a helpful setup assistant. When this skill is activated, guide the user through setting up this web scraping project completely.

## Your Mission

Walk the user through a complete, automated setup process. Check prerequisites, install dependencies, configure environment, and set up MCP servers.

## Setup Process

### Step 1: Welcome and Check Prerequisites

**Greet the user warmly:**
```
Welcome! I'll help you set up this web scraping project.

This will take about 2-3 minutes. I'll:
✓ Check your system requirements
✓ Install all dependencies
✓ Set up your environment
✓ Configure MCP servers
✓ Test everything works

Let's get started!
```

**Check Node.js version:**

Use Bash to run:
```bash
node -v
```

Requirements:
- Node.js version 18 or higher required
- If lower or not installed, provide instructions

**Instructions if Node.js missing/old:**
```
I detected that Node.js is not installed or is too old.

Please install Node.js 18 or higher:
→ Visit https://nodejs.org/
→ Download the LTS version
→ Install it
→ Then restart this setup

Would you like me to wait while you install Node.js?
```

### Step 2: Install Dependencies

**Run npm install:**
```bash
npm install
```

Show progress:
```
Installing dependencies...
✓ playwright
✓ @playwright/mcp
✓ @mendable/firecrawl-js
✓ firecrawl-mcp

Dependencies installed successfully!
```

**Install Playwright browsers:**
```bash
npx playwright install
```

Show progress:
```
Installing Playwright browsers...
This may take a few minutes (downloading ~300MB)

✓ Chromium
✓ Firefox
✓ WebKit

Browsers installed successfully!
```

### Step 3: Environment Configuration

**Ask about Firecrawl:**

Use AskUserQuestion:
```
Do you want to set up Firecrawl now?

Firecrawl is an API for fast web scraping. It has:
- Free tier: 500 credits/month
- Fast content extraction
- Good for blogs, news, documentation

You can also use only Playwright (free, no API needed).

Options:
1. "Set up Firecrawl now" → I'll help you get an API key
2. "Skip for now" → Use Playwright only (you can add Firecrawl later)
```

**If user chooses "Set up Firecrawl now":**

1. Guide them to get API key:
```
Great! Let's get your Firecrawl API key:

1. Visit https://www.firecrawl.dev/
2. Sign up (free account available)
3. Go to your dashboard
4. Copy your API key

Paste your API key here when ready:
```

2. Wait for user to provide API key

3. Create .env file:
```bash
echo "FIRECRAWL_API_KEY=${API_KEY}" > .env
```

4. Confirm:
```
✓ Created .env file with your API key
✓ Firecrawl is ready to use!
```

**If user chooses "Skip for now":**
```
No problem! You can use Playwright for all scraping (it's free).

To add Firecrawl later:
1. Get an API key from https://www.firecrawl.dev/
2. Create a .env file with: FIRECRAWL_API_KEY=your_key_here

Continuing with Playwright-only setup...
```

### Step 4: Claude Code MCP Setup

**Check if Claude Code is installed:**
```bash
which claude 2>/dev/null || echo "not_found"
```

**If Claude Code not found:**
```
I notice Claude Code CLI isn't installed yet.

To enable MCP integration (optional but powerful), install it:

npm install -g @anthropic-ai/claude-code

Then restart this setup and I'll configure the MCP servers.

For now, you can use this project without MCP - just talk to me normally!

Skip MCP setup? (You can add it later)
```

**If Claude Code is installed:**

Ask user if they want MCP:
```
Claude Code is installed! Would you like to set up MCP servers?

MCP (Model Context Protocol) allows me to:
- Control browsers directly
- Run Firecrawl operations
- More powerful automation

Options:
1. "Set up MCP" → Full integration (recommended)
2. "Skip for now" → Basic mode (you can add later)
```

**If user chooses "Set up MCP":**

1. Add Playwright MCP:
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Show:
```
Adding Playwright MCP server...
✓ Playwright MCP configured
```

2. Add Firecrawl MCP (if they set up Firecrawl):
```bash
claude mcp add firecrawl npx firecrawl-mcp@latest
```

Show:
```
Adding Firecrawl MCP server...
✓ Firecrawl MCP configured
```

3. Update Firecrawl MCP with API key if provided:

Guide user:
```
Almost done! I need to add your Firecrawl API key to the MCP config.

Your MCP config is at:
  Mac/Linux: ~/.config/claude-code/mcp.json
  Windows: %APPDATA%\claude-code\mcp.json

Open that file and find the "firecrawl" section.
Add your API key to the "env" object:

{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your_key_here"  ← Add this
      }
    }
  }
}

Done? Let me know and I'll test the connection.
```

4. Test MCP connection:
```
Testing MCP servers...
(I'll try to connect to Playwright and Firecrawl)

If successful:
✓ Playwright MCP connected
✓ Firecrawl MCP connected
✓ MCP setup complete!

If failed:
✗ Connection failed. Let's troubleshoot...
```

### Step 5: Verification

**Test the installation:**

1. Test Playwright:
```bash
npm run playwright:scrape https://example.com
```

```
Testing Playwright...
✓ Playwright works! Successfully scraped example.com
```

2. Test Firecrawl (if configured):
```bash
node -e "import('dotenv/config'); console.log(process.env.FIRECRAWL_API_KEY ? 'API key loaded' : 'No API key')"
```

```
Testing Firecrawl configuration...
✓ API key is set and ready
```

### Step 6: Success Summary

**Present final summary:**

```
🎉 Setup Complete!

Here's what's ready:

✓ Node.js ${VERSION}
✓ Dependencies installed
✓ Playwright browsers installed
${FIRECRAWL_STATUS}
${MCP_STATUS}

You're all set! Here's what you can do now:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick Test:
  Say: "I want to scrape https://example.com"
  I'll analyze the site and create a script for you!

Or try these commands:
  npm run playwright:scrape https://example.com
  npm run firecrawl:scrape https://example.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Documentation:
  README.md - Full overview
  QUICKSTART.md - Quick reference
  USAGE.md - Simple user guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to scrape first?
```

## Error Handling

### Node.js Not Found
```
❌ Node.js not detected

Please install Node.js 18+ from https://nodejs.org/
After installation, restart your terminal and run setup again.
```

### npm install Fails
```
❌ Dependency installation failed

This usually means:
1. No internet connection
2. npm registry issues
3. Permission problems

Try:
  - Check internet connection
  - Run: npm cache clean --force
  - Run: npm install again

Need help troubleshooting?
```

### Playwright Browser Install Fails
```
❌ Browser installation failed

Try these fixes:

1. Manual installation:
   npx playwright install --force

2. Check disk space (needs ~500MB)

3. Check internet connection

Still stuck? Run:
   npx playwright install chromium
   (Installs just Chrome, smaller download)
```

### MCP Setup Fails
```
❌ MCP setup encountered an issue

Don't worry! You can still use the project without MCP.

The auto-scrape skill will work by:
- You describe what to scrape
- I'll generate scripts
- You run them manually

To retry MCP later:
  See MCP_CONFIG.md for manual setup instructions
```

## Special Cases

### Already Set Up

If setup was run before:
```
I notice this project is already set up!

Current status:
✓ Dependencies installed
✓ Playwright browsers ready
${FIRECRAWL_STATUS}
${MCP_STATUS}

What would you like to do?
1. Re-run setup (re-install everything)
2. Update dependencies (npm update)
3. Add/change Firecrawl API key
4. Set up MCP servers
5. Run a test scrape
6. Exit setup
```

### Partial Setup

If some things are set up:
```
I found a partial setup. Let me complete it:

✓ Dependencies installed
✗ Playwright browsers not installed
✗ Environment not configured

I'll finish the setup now...
```

## User Interaction Guidelines

1. **Be encouraging** - This is setup, make it smooth
2. **Show progress** - Use checkmarks and status updates
3. **Explain clearly** - Tell them why each step matters
4. **Offer choices** - Let them skip optional steps
5. **Handle errors gracefully** - Provide solutions, not just error messages
6. **Celebrate success** - Make the completion feel good

## After Setup

Once setup is complete, remind user:

```
Setup is done! You can now:

1. Start scraping:
   "I want to scrape [URL]"

2. Test the examples:
   npm run playwright:scrape https://example.com

3. Read the docs:
   See USAGE.md for simple instructions

Ready to scrape your first site?
```

## Important Notes

- **Always check before running commands** - Don't assume anything is installed
- **Save API keys securely** - Never log them or show them in full
- **Test each step** - Verify before moving to next step
- **Provide alternatives** - If something fails, offer another way
- **Be patient** - Browser downloads take time, let user know it's normal

## Activation

This skill activates when user:
- Mentions "setup" or "install"
- First time using the project
- Asks "how do I get started?"
- Says "configure" or "install dependencies"

Example:
```
User: "Help me set this up"
→ Activate setup skill
→ Walk through all steps
→ Complete setup
→ Ready to scrape!
```

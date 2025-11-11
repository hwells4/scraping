# MCP Configuration Guide

This guide explains how to configure the Model Context Protocol (MCP) servers for Playwright and Firecrawl in Claude Code.

## Prerequisites

All required packages have been installed:
- `@playwright/mcp` - Microsoft's official Playwright MCP server
- `firecrawl-mcp` - Firecrawl MCP server
- `@mendable/firecrawl-js` - Firecrawl JavaScript SDK
- `playwright` - Playwright library

## Configuring MCP Servers

MCP servers need to be configured in your Claude Code settings. Add the following configuration to your Claude Code MCP settings file.

### Location

The MCP configuration is typically stored at:
- **macOS/Linux**: `~/.config/claude-code/mcp.json`
- **Windows**: `%APPDATA%\claude-code\mcp.json`

### Configuration

Add the following to your `mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp"
      ]
    },
    "firecrawl": {
      "command": "npx",
      "args": [
        "-y",
        "firecrawl-mcp"
      ],
      "env": {
        "FIRECRAWL_API_KEY": "your-firecrawl-api-key-here"
      }
    }
  }
}
```

### Environment Variables

#### Firecrawl API Key

To use Firecrawl, you need an API key:

1. Sign up at [Firecrawl](https://www.firecrawl.dev/)
2. Get your API key from the dashboard
3. Add it to your environment:

```bash
export FIRECRAWL_API_KEY="your-api-key-here"
```

Or add it directly to the MCP configuration as shown above.

## Verifying the Configuration

After adding the configuration:

1. Restart Claude Code
2. The MCP servers should automatically start when you begin a conversation
3. You can verify by asking Claude Code to use Playwright or Firecrawl

## Available MCP Tools

### Playwright MCP
- Browser automation
- Web page navigation
- Form interaction
- Screenshot capture
- Accessibility tree analysis

### Firecrawl MCP
- Web scraping
- Website crawling
- Structured data extraction
- Batch processing
- LLM-powered content analysis

## Troubleshooting

### MCP Server Not Starting

If the MCP servers don't start:

1. Check that the configuration file is in the correct location
2. Verify the JSON syntax is valid
3. Ensure Node.js and npm are installed
4. Try running the servers manually:
   ```bash
   npx @playwright/mcp
   npx firecrawl-mcp
   ```

### Firecrawl Authentication Errors

If you get authentication errors with Firecrawl:

1. Verify your API key is correct
2. Check that the environment variable is set
3. Make sure the API key is active in your Firecrawl dashboard

## Next Steps

See [SKILLS.md](./SKILLS.md) for information on using the Claude Code skills for web scraping.

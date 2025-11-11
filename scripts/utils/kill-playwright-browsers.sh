#!/bin/bash

echo "Killing Playwright MCP servers..."
pkill -f "mcp-server-playwright"

echo "Killing Chromium/Playwright browsers..."
pkill -f "chrome|chromium" | grep -i playwright || true

echo "Killing any orphaned browser processes..."
ps aux | grep -E "(playwright|chromium|firefox|webkit)" | grep -v grep | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true

echo "Done! All Playwright browsers should be closed."

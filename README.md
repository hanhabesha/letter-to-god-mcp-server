# Letter to God MCP Server

A Model Context Protocol (MCP) server that provides personalized Bible guidance and mentorship through AI integration with OpenAI's ChatGPT.

## Features

- **Personalized Bible Guidance**: Get customized spiritual guidance based on your name and current feelings
- **Three Scripture Selection**: AI finds three relevant Bible scriptures for your situation
- **Personalized Letter from God**: Receive a full-length letter written as if from God Almighty
- **Biblical Stories & Parables**: Includes relevant stories and explanations for each scripture
- **Actionable Advice**: Provides practical activities and actions to help cope and overcome problems
- **Multiple Access Methods**: CLI interface and MCP server integration
- **Beautiful Terminal Output**: Colored, formatted responses for easy reading

## Quick Start

### ✅ Option 1: Install Globally OR Use Instantly via NPX (No Install Required)
```bash
npm install -g letter-to-god-mcp-server
```
OR
```bash
# Install dependencies
npm npx letter-to-god-mcp-server
```
# Set your API key:
You must provide your OpenAI API key for the tool to work.

• Option A: Set environment variable
```bash
     export OPENAI_API_KEY="your-api-key-here"
```
• Option B: Create .env file in current directory
```bash
     echo "OPENAI_API_KEY=your-api-key-here" > .env
```
Place this .env file in the same directory where you run the command.


### Option 2: Command Line Interface (Immediate Use)

The fastest way to get Bible guidance:

```bash
# Install dependencies
npm install

# Get guidance directly from command line
node cli.js --name "John" --feeling "anxious about my future"
node cli.js --name "Sarah" --feeling "struggling with forgiveness"
node cli.js -n "David" -f "feeling lost and confused"

# See all options
node cli.js --help
```

### Option 3: MCP Server (For Integration)

Run as an MCP server for integration with MCP clients:

```bash
node index.js
```

## Usage

The server provides one main tool:

### `getBibleGuidance`

**Parameters:**
- `name` (string, required): Your name
- `feeling` (string, required): What you are feeling today or the problem you're facing

**Example Usage:**
When connected to an MCP client, you can call:
```
getBibleGuidance({
  name: "John",
  feeling: "anxious about my future and feeling lost"
})
```

**Response:**
- The AI will act as God Almighty and provide:
  - Three relevant Bible scriptures
  - A personalized letter with explanations
  - Biblical stories and parables
  - Practical actions and activities
  - All formatted as a direct message from God

## Output

The server provides two types of output:

1. **Terminal Display**: Full response is logged to the console with clear formatting
2. **MCP Response**: Structured response returned to the MCP client

## Technical Details

- **Model**: Uses GPT-4 for high-quality responses
- **Max Tokens**: 2000 tokens for comprehensive guidance
- **Temperature**: 0.7 for balanced creativity and consistency
- **System Prompt**: Configured to act as God Almighty with Biblical expertise

## Example Terminal Output

```
=== Processing Bible guidance request ===
Name: John
Feeling: anxious about my future
Timestamp: 2025-01-20T14:45:00.000Z
==========================================

Sending request to OpenAI...

=== BIBLE GUIDANCE RESPONSE ===
My beloved child John,

I see your heart heavy with anxiety about your future...
[Full AI response with scriptures, stories, and guidance]
===============================
```

## MCP Client Integration Guide

### A. Using with Cline (VSCode Extension)

1. **Install Cline Extension** in VSCode
2. **Configure MCP Server**:
   - Open Cline settings
   - Add MCP server configuration:
   ```json
   {
     "mcpServers": {
       "bible-expert": {
         "command": "node",
         "args": ["/path/to/your/project/index.js"],
         "cwd": "/path/to/your/project"
       }
     }
   }
   ```
3. **Use in Cline**:
   - Start a conversation with Cline
   - Ask: "Use the getBibleGuidance tool with name 'John' and feeling 'anxious about my future'"
   - Cline will call your MCP server and display the Bible guidance

### B. Using with Claude Desktop

1. **Locate Configuration File**:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add Server Configuration**:
   ```json
   {
     "mcpServers": {
       "bible-expert": {
         "command": "node",
         "args": ["/absolute/path/to/your/project/index.js"],
         "cwd": "/absolute/path/to/your/project"
       }
     }
   }
   ```

3. **Restart Claude Desktop**

4. **Use in Conversations**:
   ```
   Can you use the getBibleGuidance tool to help me? 
   My name is Sarah and I'm feeling overwhelmed with work stress.
   ```

### C. Using with Other MCP Clients

**Generic Configuration:**
- **Server Command**: `node index.js`
- **Working Directory**: Your project directory
- **Transport**: stdio
- **Tool Name**: `getBibleGuidance`
- **Required Parameters**: `name` (string), `feeling` (string)

### D. Manual MCP Testing

**Test with MCP Inspector** (if available):
```bash
# Install MCP inspector
npm install -g @modelcontextprotocol/inspector

# Run inspector
mcp-inspector node index.js
```

**Direct stdio communication**:
```bash
# Start server
node index.js

# Send JSON-RPC messages (example)
{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}
{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "getBibleGuidance", "arguments": {"name": "John", "feeling": "anxious"}}}
```

## Troubleshooting

### Common Issues

1. **"API key not configured"**:
   - Check your `.env` file has the correct OpenAI API key
   - Ensure the key starts with `sk-`

2. **"Server not connecting"**:
   - Verify the path to `index.js` is correct in your MCP client config
   - Check that Node.js is installed and accessible
   - Ensure all dependencies are installed (`npm install`)

3. **"Tool not found"**:
   - Restart your MCP client after configuration changes
   - Verify the server is running without errors
   - Check the tool name is exactly `getBibleGuidance`

4. **"No response from OpenAI"**:
   - Check your internet connection
   - Verify your OpenAI API key has sufficient credits
   - Check OpenAI service status

### Debug Mode

Run the server with debug output:
```bash
DEBUG=* node index.js
```

### Testing Connection

Use the test script to verify everything works:
```bash
node test-server.js
```

## Error Handling

The server includes comprehensive error handling for:
- OpenAI API failures
- Missing API keys
- Network issues
- Invalid responses
- MCP protocol errors

All errors are logged to the console and returned as structured responses to the MCP client.

## Package Scripts

Add these to your `package.json` for convenience:
```json
{
  "scripts": {
    "start": "node index.js",
    "cli": "node cli.js",
    "test": "node test-server.js",
    "build": "npx tsc"
  }
}
```

Then use:
```bash
npm start              # Start MCP server
npm run cli -- --name "John" --feeling "anxious"  # CLI usage
npm test               # Test server
npm run build          # Compile TypeScript
```

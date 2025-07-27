# Letter to God MCP Server

A Universal Model Context Protocol (MCP) server that provides personalized Bible guidance and mentorship. Works with **any MCP client** (Cline, Claude Desktop, etc.) without requiring API keys, or can run standalone with OpenAI integration.

## 🌟 Key Features

- **Universal MCP Compatibility**: Works with any MCP client (Cline, Claude Desktop, etc.)
- **No API Key Required**: Uses your MCP client's LLM - no separate OpenAI key needed
- **Dual Mode Support**: MCP mode (prompt generation) + Standalone mode (direct OpenAI)
- **Personalized Bible Guidance**: Get customized spiritual guidance based on your situation
- **Three Scripture Selection**: Finds three relevant Bible scriptures for your situation
- **Personalized Letter from God**: Receive a full-length letter written as if from God Almighty
- **Biblical Stories & Parables**: Includes relevant stories and explanations for each scripture
- **Actionable Advice**: Provides practical activities and actions to help cope and overcome problems
- **Beautiful Terminal Output**: Colored, formatted responses for easy reading

## 🚀 Quick Start

### Option 1: MCP Mode (Recommended - No API Key Needed)

**Works with any MCP client using their configured LLM:**

```bash
# Install dependencies
npm install

# Start MCP server (default mode)
npm start
```

### Option 2: Standalone Mode (Requires OpenAI API Key)

```bash
# Install dependencies (including OpenAI)
npm install

# Set up environment
npm run setup

# Edit .env file with your OpenAI API key
# OPENAI_API_KEY=your_openai_api_key_here

# Start in standalone mode
npm run start:standalone
```

### Option 3: Command Line Interface

```bash
# Direct CLI usage (requires OpenAI API key)
node cli.js --name "John" --feeling "anxious about my future"
node cli.js --name "Sarah" --feeling "struggling with forgiveness"
node cli.js -n "David" -f "feeling lost and confused"

# See all options
node cli.js --help
```

## 🔧 How It Works

### MCP Mode (Default)
- **No API keys required**
- Generates structured prompts for your MCP client's LLM
- Works with Cline, Claude Desktop, or any MCP-compatible client
- Uses whatever LLM your client is configured with

### Standalone Mode
- Requires OpenAI API key
- Directly calls OpenAI's GPT-4
- Independent of any MCP client

## 📋 Usage

The server provides one main tool:

### `getBibleGuidance`

**Parameters:**
- `name` (string, required): Your name
- `feeling` (string, required): What you are feeling today or the problem you're facing

**Example Usage in MCP Client:**
```
Use the getBibleGuidance tool with:
- name: "John"
- feeling: "anxious about my future and feeling lost"
```

**Response:**
The tool will provide a structured prompt that asks the LLM to act as God Almighty and provide:
- Three relevant Bible scriptures
- A personalized letter with explanations
- Biblical stories and parables
- Practical actions and activities
- All formatted as a direct message from God

## 🔌 MCP Client Integration

### A. Using with Cline (VSCode Extension)

1. **Install Cline Extension** in VSCode
2. **Configure MCP Server** in Cline settings:
   ```json
   {
     "mcpServers": {
       "letter-to-god": {
         "command": "node",
         "args": ["/path/to/your/project/index.js"],
         "cwd": "/path/to/your/project"
       }
     }
   }
   ```
3. **Use in Cline**:
   ```
   Use the getBibleGuidance tool with name "John" and feeling "anxious about my future"
   ```

### B. Using with Claude Desktop

1. **Locate Configuration File**:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add Server Configuration**:
   ```json
   {
     "mcpServers": {
       "letter-to-god": {
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

### C. Using with Any MCP Client

**Generic Configuration:**
- **Server Command**: `node index.js`
- **Working Directory**: Your project directory
- **Transport**: stdio
- **Tool Name**: `getBibleGuidance`
- **Required Parameters**: `name` (string), `feeling` (string)

## 📦 Installation Options

### Global Installation
```bash
npm install -g letter-to-god-mcp-server
```

### Local Development
```bash
git clone https://github.com/hanhabesha/letter-to-god-mcp-server.git
cd letter-to-god-mcp-server
npm install
```

### NPX (No Installation)
```bash
npx letter-to-god-mcp-server
```

## 🛠️ Available Scripts

```bash
npm start                    # Start MCP server (prompt generation mode)
npm run start:standalone     # Start with OpenAI integration
npm run cli                  # CLI interface
npm run test                 # Test server functionality
npm run build                # Compile TypeScript
npm run help                 # Show CLI help
npm run setup                # Setup .env for standalone mode
npm run setup:mcp            # Info about MCP mode setup
```

## 🔍 Example Output

### MCP Mode Output (Prompt Generation)
```
=== Processing Bible guidance request ===
Name: John
Feeling: anxious about my future
Mode: MCP (Prompt Generation)
Timestamp: 2025-01-27T13:14:00.000Z
==========================================

Generating structured prompt for MCP client...

=== STRUCTURED PROMPT GENERATED ===
Prompt ready for MCP client processing
====================================
```

### Standalone Mode Output (Direct OpenAI)
```
=== Processing Bible guidance request ===
Name: John
Feeling: anxious about my future
Mode: Standalone (OpenAI)
Timestamp: 2025-01-27T13:14:00.000Z
==========================================

Sending request to OpenAI...

=== BIBLE GUIDANCE RESPONSE ===
My beloved child John,

I see your heart heavy with anxiety about your future...
[Full AI response with scriptures, stories, and guidance]
===============================
```

## 🐛 Troubleshooting

### Common Issues

1. **"Tool shows empty input schema"**:
   - Restart your MCP client after server changes
   - Verify the server path is correct in your MCP client config
   - Check that all dependencies are installed (`npm install`)

2. **"Parameters showing as undefined"**:
   - This was the original issue - now fixed!
   - The server now properly validates and extracts parameters
   - Make sure you're using the updated version

3. **"Server not connecting"**:
   - Verify the path to `index.js` is correct in your MCP client config
   - Check that Node.js is installed and accessible
   - Ensure all dependencies are installed (`npm install`)

4. **"No response from OpenAI"** (Standalone mode only):
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
npm test
```

## 🔧 Technical Details

### MCP Mode
- **Model**: Uses your MCP client's configured LLM
- **Response**: Structured prompt for optimal Bible guidance
- **Dependencies**: Only MCP SDK required
- **API Costs**: None (uses client's LLM)

### Standalone Mode
- **Model**: GPT-4 via OpenAI API
- **Max Tokens**: 2000 tokens for comprehensive guidance
- **Temperature**: 0.7 for balanced creativity and consistency
- **Dependencies**: Requires OpenAI package

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

If you find this tool helpful in your spiritual journey, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or issues
- 💡 Suggesting new features
- 🤝 Contributing to the project

## 📞 Contact

- **Repository**: [https://github.com/hanhabesha/letter-to-god-mcp-server](https://github.com/hanhabesha/letter-to-god-mcp-server)
- **Issues**: [https://github.com/hanhabesha/letter-to-god-mcp-server/issues](https://github.com/hanhabesha/letter-to-god-mcp-server/issues)

---

*"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." - Proverbs 3:5-6*

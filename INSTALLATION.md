# Installation Guide - Letter to God MCP Server

## Quick Start

### Option 1: Clone and Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/letter-to-god-mcp-server.git
cd letter-to-god-mcp-server

# Install dependencies
npm install

# Setup environment file
npm run setup

# Edit .env file with your OpenAI API key
nano .env  # or use your preferred editor

# Test the installation
npm test

# Start using the CLI
npm run cli -- --name "YourName" --feeling "testing the installation"
```

### Option 2: NPM Global Installation (Coming Soon)

```bash
# Install globally via npm
npm install -g letter-to-god-mcp-server

# Setup configuration
letter-to-god --setup

# Use directly
letter-to-god --name "YourName" --feeling "your current situation"
```

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **OpenAI API Key** (get from [OpenAI Platform](https://platform.openai.com/api-keys))

## Detailed Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. **Important**: Keep this key secure and never share it publicly

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
nano .env
```

Replace `your_openai_api_key_here` with your actual API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Install Dependencies

```bash
# Install all required packages
npm install

# Build TypeScript (if needed)
npm run build
```

### 4. Test Installation

```bash
# Test the server
npm test

# Test the CLI
npm run help
npm run cli -- --name "Test" --feeling "testing installation"
```

## Usage Methods

### CLI Usage (Direct)
```bash
# Basic usage
node cli.js --name "John" --feeling "anxious about my future"

# Using npm scripts
npm run cli -- --name "Sarah" --feeling "struggling with forgiveness"

# Short aliases
node cli.js -n "David" -f "feeling lost"
```

### MCP Server (For Integration)
```bash
# Start the MCP server
npm start

# Or directly
node index.js
```

## MCP Client Integration

### Cline (VSCode Extension)
Add to your Cline MCP configuration:
```json
{
  "mcpServers": {
    "letter-to-god": {
      "command": "node",
      "args": ["/path/to/letter-to-god-mcp-server/index.js"],
      "cwd": "/path/to/letter-to-god-mcp-server"
    }
  }
}
```

### Claude Desktop
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "letter-to-god": {
      "command": "node",
      "args": ["/absolute/path/to/letter-to-god-mcp-server/index.js"],
      "cwd": "/absolute/path/to/letter-to-god-mcp-server"
    }
  }
}
```

## Troubleshooting

### Common Issues

**"API key not configured"**
- Check your `.env` file exists
- Verify the API key is correct and starts with `sk-`
- Ensure no extra spaces or quotes

**"Command not found"**
- Make sure you're in the project directory
- Run `npm install` to install dependencies
- Check Node.js is installed: `node --version`

**"No response from OpenAI"**
- Check internet connection
- Verify API key has sufficient credits
- Check OpenAI service status

**"Permission denied"**
- Make CLI executable: `chmod +x cli.js`
- Check file permissions

### Getting Help

1. Check the [README.md](README.md) for detailed documentation
2. Review [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) for examples
3. Open an issue on GitHub if you encounter problems
4. Make sure all dependencies are installed and up to date

## Development Setup

If you want to contribute or modify the code:

```bash
# Clone the repository
git clone https://github.com/yourusername/letter-to-god-mcp-server.git
cd letter-to-god-mcp-server

# Install dependencies
npm install

# Install TypeScript globally (optional)
npm install -g typescript

# Build the project
npm run build

# Run in development mode
npm run cli -- --name "Dev" --feeling "testing development setup"
```

## System Requirements

- **Operating System**: macOS, Linux, or Windows
- **Node.js**: Version 18.0.0 or higher
- **Memory**: At least 512MB RAM
- **Storage**: ~50MB for installation
- **Network**: Internet connection for OpenAI API calls

## Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- The `.env` file is already in `.gitignore`
- Use environment variables in production deployments

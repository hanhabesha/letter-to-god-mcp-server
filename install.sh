#!/bin/bash

# Letter to God MCP Server - Quick Installation Script
# This script helps users quickly set up the Letter to God MCP Server

set -e  # Exit on any error

echo "🌟 Letter to God MCP Server - Quick Setup 🌟"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js (version 18 or higher) from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required!"
    echo "Current version: $(node -v)"
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "Please install npm (usually comes with Node.js)"
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Setup environment file
echo ""
echo "⚙️  Setting up environment configuration..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
else
    echo "ℹ️  .env file already exists"
fi

# Build TypeScript if needed
echo ""
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "⚠️  Build failed, but continuing..."
fi

# Make CLI executable
chmod +x cli.js
echo "✅ Made CLI executable"

# Test installation
echo ""
echo "🧪 Testing installation..."
npm test

if [ $? -eq 0 ]; then
    echo "✅ Installation test passed!"
else
    echo "⚠️  Installation test failed, but setup is complete"
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📝 Next Steps:"
echo "1. Edit the .env file with your OpenAI API key:"
echo "   nano .env"
echo ""
echo "2. Get your OpenAI API key from:"
echo "   https://platform.openai.com/api-keys"
echo ""
echo "3. Test the CLI:"
echo "   npm run cli -- --name \"YourName\" --feeling \"testing the setup\""
echo ""
echo "4. Start the MCP server:"
echo "   npm start"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Main documentation"
echo "   - INSTALLATION.md - Detailed setup guide"
echo "   - USAGE_EXAMPLES.md - Usage examples"
echo "   - GITHUB_SETUP.md - GitHub hosting guide"
echo ""
echo "🆘 Need help? Check the documentation or open an issue on GitHub!"
echo ""

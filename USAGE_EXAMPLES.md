# Usage Examples - Letter to God MCP Server

## Quick CLI Examples

### Basic Usage
```bash
# Get Bible guidance for anxiety
node cli.js --name "John" --feeling "anxious about my future"

# Get guidance for relationship issues
node cli.js --name "Sarah" --feeling "struggling with forgiveness in my marriage"

# Get guidance for work stress
node cli.js --name "David" --feeling "overwhelmed with work pressure"

# Get guidance for spiritual growth
node cli.js --name "Mary" --feeling "wanting to grow closer to God"
```

### Using Short Aliases
```bash
# Same as above but shorter
node cli.js -n "John" -f "anxious about my future"
node cli.js -n "Sarah" -f "struggling with forgiveness"
```

### Using NPM Scripts
```bash
# After adding scripts to package.json
npm run cli -- --name "John" --feeling "anxious"
npm run help  # Show CLI help
npm start     # Start MCP server
npm test      # Test server functionality
```

## Sample CLI Output

When you run the CLI, you'll see beautiful colored output with proper text wrapping:

```
🌟 Welcome to Letter to God - Bible Guidance 🌟

🙏 Seeking Bible guidance...
Name: John
Feeling: anxious about my future
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Connecting to OpenAI...

✨ BIBLE GUIDANCE FROM GOD ✨
════════════════════════════════════════════════════════════

Dear John,

I am here with you, always ready to provide guidance and comfort. As you navigate
through your journey today, let's draw strength and wisdom from the Word.

1. Philippians 4:6-7: "Do not be anxious about anything, but in every situation,
   by prayer and petition, with thanksgiving, present your requests to God."

In this scripture, Paul encourages us not to worry, but rather to bring all our
concerns to God through prayer and thanksgiving...

[Full personalized letter with proper line breaks, colored formatting, and easy-to-read structure]

════════════════════════════════════════════════════════════
🙏 May God bless you on your journey
```

**Formatting Features:**
- **Word wrapping** at 80 characters for easy reading
- **Colored text** for different sections (Bible verses in cyan, action items in yellow)
- **Proper spacing** between paragraphs
- **Indented continuation** lines for numbered lists
- **Special highlighting** for greetings and signatures

## MCP Client Examples

### Using with Cline (VSCode)
1. Configure Cline with your MCP server
2. In a Cline conversation, ask:
   ```
   Use the getBibleGuidance tool with my name "John" and feeling "anxious about my future"
   ```

### Using with Claude Desktop
1. Configure Claude Desktop with your MCP server
2. In a conversation, ask:
   ```
   Can you use the getBibleGuidance tool to help me? 
   My name is Sarah and I'm feeling overwhelmed with work stress.
   ```

## Common Feelings/Situations to Try

- "anxious about my future"
- "struggling with forgiveness"
- "feeling lost and confused"
- "dealing with grief and loss"
- "overwhelmed with work stress"
- "having relationship problems"
- "questioning my faith"
- "feeling lonely and isolated"
- "struggling with addiction"
- "facing financial difficulties"
- "dealing with health issues"
- "feeling angry and resentful"
- "lacking purpose in life"
- "struggling with depression"
- "facing difficult decisions"

## Expected Response Format

Each response will include:
1. **Personal greeting** addressing you by name
2. **Three Bible scriptures** relevant to your situation
3. **Explanation of each scripture** with stories and context
4. **Biblical parables and stories** that relate to your situation
5. **Practical actions and activities** you can do
6. **Personalized letter format** as if from God directly

## Troubleshooting

### If you get an API key error:
```bash
# Check your .env file
cat .env
# Should show: OPENAI_API_KEY=sk-...
```

### If you get a "command not found" error:
```bash
# Make sure you're in the right directory
pwd
# Should show: /path/to/your/latter-to-god

# Make sure dependencies are installed
npm install
```

### If you get no response:
- Check your internet connection
- Verify your OpenAI API key has credits
- Try a shorter feeling description

## Tips for Best Results

1. **Be specific** about your feelings: Instead of "sad", try "grieving the loss of my father"
2. **Use your real name** for more personalized responses
3. **Describe the situation** briefly: "anxious about starting a new job next week"
4. **Be honest** about your emotions and struggles
5. **Try different phrasings** if you want varied responses

## Integration Ideas

- **Daily devotions**: Use it for daily spiritual guidance
- **Counseling support**: Supplement (not replace) professional counseling
- **Bible study**: Get scripture recommendations for specific topics
- **Prayer requests**: Get guidance on what to pray about
- **Life decisions**: Seek Biblical wisdom for important choices

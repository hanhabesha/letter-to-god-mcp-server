import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import 'dotenv/config';

// Check if running in standalone mode (with OpenAI) or MCP mode (prompt generation)
const isStandaloneMode = process.env.STANDALONE_MODE === 'true';

// Only import OpenAI if in standalone mode
let openai = null;
if (isStandaloneMode) {
    const OpenAI = await import('openai');
    openai = new OpenAI.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

const server = new McpServer({
    name: "Bible Expert - Letter to God",
    version: "0.1.0",
    description: "A server that provides Bible-based guidance and mentorship through AI",
});

server.tool("getBibleGuidance", {
    description: "Get personalized Bible guidance and mentorship from God",
    inputSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Your name"
            },
            feeling: {
                type: "string",
                description: "What you are feeling today or the problem you're facing"
            }
        },
        required: ["name", "feeling"]
    }
}, async (args) => {
    try {
        // Extract parameters with proper validation
        console.log("Received args:", JSON.stringify(args, null, 2));
        const { name, feeling } = args;
        
        console.log("Extracted name:", name);
        console.log("Extracted feeling:", feeling);
        
        if (!name || !feeling) {
            throw new Error("Both name and feeling parameters are required");
        }

        console.log(`\n=== Processing Bible guidance request ===`);
        console.log(`Name: ${name}`);
        console.log(`Feeling: ${feeling}`);
        console.log(`Mode: ${isStandaloneMode ? 'Standalone (OpenAI)' : 'MCP (Prompt Generation)'}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log(`==========================================\n`);

        if (isStandaloneMode && openai) {
            // Standalone mode: Use OpenAI directly
            const prompt = `Act as a world renowned Bible Expert and Bible Mentor named God. Use this information to guide me today. My Name is ${name}. Today I'm feeling like ${feeling}

Find three Bible scriptures that will guide me through this problem. Then act as God Almighty and write me a full length personalized letter to me using the three bible scriptures that have been chosen. Explain each scripture chosen with a short summary in a form of stories. The letter should include other stories and parables that could help me. The letter should include a list of actions and activities I can do to help me cope and overcome this problem. The letter should be personalized and written to me as if you God is talking directly to me.`;

            console.log("Sending request to OpenAI...\n");

            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are God Almighty, a loving and wise Bible Expert and Mentor. You provide personalized guidance using Bible scriptures, stories, and practical advice. Your responses should be compassionate, wise, and deeply rooted in Biblical teachings."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            });

            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error("No response received from OpenAI");
            }

            console.log("=== BIBLE GUIDANCE RESPONSE ===");
            console.log(response);
            console.log("===============================\n");

            return {
                content: [
                    {
                        type: "text",
                        text: `Dear ${name},\n\nHere is your personalized Bible guidance:\n\n${response}`
                    }
                ]
            };
        } else {
            // MCP mode: Generate structured prompt for any MCP client
            console.log("Generating structured prompt for MCP client...\n");

            const structuredPrompt = `Please act as God Almighty, a loving and wise Bible Expert and Mentor. I need your divine guidance today.

**Personal Information:**
- Name: ${name}
- Current situation: ${feeling}

**Please provide me with:**

1. **Three Relevant Bible Scriptures**
   - Find three specific Bible verses that directly relate to my situation
   - Include the full verse text and reference (book, chapter, verse)

2. **Personal Letter from God**
   - Write a heartfelt, personal letter to me as if you are God speaking directly to me
   - Address me by name (${name}) throughout the letter
   - Reference my specific situation (${feeling})
   - Use the three scriptures you selected as the foundation

3. **Scripture Explanations**
   - For each of the three scriptures, provide a short summary
   - Explain how each verse applies to my situation
   - Share these explanations in the form of meaningful stories

4. **Biblical Stories and Parables**
   - Include additional relevant Bible stories or parables that relate to my situation
   - Explain how these stories can guide and comfort me

5. **Practical Action Steps**
   - Provide a specific list of actions and activities I can do
   - Include both spiritual practices and practical steps
   - Help me cope with and overcome my current challenges

**Tone and Style:**
- Write with infinite love, compassion, and wisdom
- Be deeply personal and intimate, as a loving Father would speak
- Root everything in Biblical truth and teachings
- Make it feel like a genuine conversation with the Divine

Please make this guidance deeply personal, spiritually enriching, and practically helpful for my journey.`;

            console.log("=== STRUCTURED PROMPT GENERATED ===");
            console.log("Prompt ready for MCP client processing");
            console.log("====================================\n");

            return {
                content: [
                    {
                        type: "text",
                        text: structuredPrompt
                    }
                ]
            };
        }
    }
    catch (error) {
        console.error("Error getting Bible guidance:", error);
        let errorMessage = "Failed to get Bible guidance";
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }
        return {
            content: [
                {
                    type: "text",
                    text: errorMessage
                }
            ]
        };
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log(`Letter to God MCP server running on stdio`);
    console.log(`Mode: ${isStandaloneMode ? 'Standalone (OpenAI)' : 'MCP (Universal Prompt Generation)'}`);
}

main().catch((error) => {
    console.error("Server failed to start:", error);
    process.exit(1);
});

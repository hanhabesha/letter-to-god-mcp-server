import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from 'openai';
import 'dotenv/config';
// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
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
}, async ({ name, feeling }) => {
    try {
        console.log(`\n=== Processing Bible guidance request ===`);
        console.log(`Name: ${name}`);
        console.log(`Feeling: ${feeling}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log(`==========================================\n`);
        // Create the specific prompt template
        const prompt = `Act as a world renowned Bible Expert and Bible Mentor named God. Use this information to guide me today. My Name is ${name}. Today I'm feeling like ${feeling}

Find three Bible scriptures that will guide me through this problem. Then act as God Almighty and write me a full length personalized letter to me using the three bible scriptures that have been chosen. Explain each scripture chosen with a short summary in a form of stories. The letter should include other stories and parables that could help me. The letter should include a list of actions and activities I can do to help me cope and overcome this problem. The letter should be personalized and written to me as if you God is talking directly to me.`;
        console.log("Sending latter to God ❤️ ...\n");
        // Send request to OpenAI
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
        // Display the response on terminal
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
    console.log("Letter to God MCP server running on stdio");
}
main().catch((error) => {
    console.error("Server failed to start:", error);
    process.exit(1);
});

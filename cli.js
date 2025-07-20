#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// OpenAI client will be initialized lazily
let openai = null;

// Function to initialize OpenAI client safely
function initializeOpenAI() {
    if (openai) return openai;
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OPENAI_API_KEY_MISSING');
    }
    
    try {
        openai = new OpenAI({ apiKey });
        return openai;
    } catch (error) {
        throw new Error(`Failed to initialize OpenAI client: ${error.message}`);
    }
}

// Function to show setup instructions
function showSetupInstructions() {
    console.log(colorize('\n📋 SETUP REQUIRED', 'yellow'));
    console.log(colorize('═'.repeat(50), 'yellow'));
    console.log('');
    console.log('To use Letter to God, you need an OpenAI API key:');
    console.log('');
    console.log(colorize('1. Get your API key:', 'cyan'));
    console.log('   • Visit: https://platform.openai.com/api-keys');
    console.log('   • Sign up or log in');
    console.log('   • Create a new secret key');
    console.log('   • Copy the key (starts with sk-)');
    console.log('');
    console.log(colorize('2. Set your API key:', 'cyan'));
    console.log('   • Option A: Set environment variable');
    console.log('     export OPENAI_API_KEY="your-api-key-here"');
    console.log('');
    console.log('   • Option B: Create .env file in current directory');
    console.log('     echo "OPENAI_API_KEY=your-api-key-here" > .env');
    console.log('');
    console.log(colorize('3. Try again:', 'cyan'));
    console.log('   npx letter-to-god-mcp-server --name "John" --feeling "testing"');
    console.log('');
    console.log(colorize('💡 Need help? Visit: https://github.com/hanhabesha/letter-to-god-mcp-server', 'blue'));
    console.log('');
}

// Function to create .env file interactively
function createEnvFile(apiKey) {
    const envContent = `OPENAI_API_KEY=${apiKey}\n`;
    try {
        fs.writeFileSync('.env', envContent);
        console.log(colorize('✅ Created .env file successfully!', 'green'));
        return true;
    } catch (error) {
        console.log(colorize(`❌ Failed to create .env file: ${error.message}`, 'red'));
        return false;
    }
}

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

// Function to aggressively wrap text at specified width
function wrapText(text, width = 75) {
    if (!text || text.length <= width) {
        return [text];
    }
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        
        if (testLine.length <= width) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                // Word is longer than width, force break it
                if (word.length > width) {
                    let remainingWord = word;
                    while (remainingWord.length > width) {
                        lines.push(remainingWord.substring(0, width));
                        remainingWord = remainingWord.substring(width);
                    }
                    currentLine = remainingWord;
                } else {
                    currentLine = word;
                }
            }
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines.filter(line => line.trim().length > 0);
}

// Function to format and display the response with proper line breaks
function formatAndDisplayResponse(response) {
    // First, let's split the response more aggressively
    // Split by both double newlines and single newlines, then filter empty
    let sections = response.split(/\n\n|\n/).filter(section => section.trim().length > 0);
    
    // If we still have very long sections, split by sentences
    const processedSections = [];
    sections.forEach(section => {
        if (section.length > 200) {
            // Split long sections by sentences (periods followed by space)
            const sentences = section.split(/\.\s+/);
            sentences.forEach((sentence, index) => {
                if (sentence.trim()) {
                    // Add period back except for last sentence
                    const fullSentence = index < sentences.length - 1 ? sentence.trim() + '.' : sentence.trim();
                    processedSections.push(fullSentence);
                }
            });
        } else {
            processedSections.push(section);
        }
    });
    
    processedSections.forEach((section, index) => {
        const trimmedSection = section.trim();
        if (!trimmedSection) return;
        
        // Check if this looks like a Bible verse reference (starts with number and contains :)
        if (trimmedSection.match(/^\d+\.\s*\w+\s+\d+:\d+/) || (trimmedSection.includes(':') && trimmedSection.match(/^\d+\./))) {
            const wrappedLines = wrapText(trimmedSection, 75);
            wrappedLines.forEach(line => {
                console.log(colorize(line, 'cyan'));
            });
            console.log('');
            return;
        }
        
        // Check if this contains a Bible verse quote (has quotes and verse-like content)
        if (trimmedSection.includes('"') && (trimmedSection.includes('Lord') || trimmedSection.includes('God') || trimmedSection.match(/\d+:\d+/))) {
            const wrappedLines = wrapText(trimmedSection, 75);
            wrappedLines.forEach(line => {
                console.log(colorize(line, 'cyan'));
            });
            console.log('');
            return;
        }
        
        // Check if this looks like a numbered list item
        if (trimmedSection.match(/^\d+\.\s/)) {
            const wrappedLines = wrapText(trimmedSection, 70);
            wrappedLines.forEach((line, lineIndex) => {
                if (lineIndex === 0) {
                    console.log(colorize(line, 'yellow'));
                } else {
                    console.log('   ' + line); // Indent continuation lines
                }
            });
            console.log('');
            return;
        }
        
        // Check if this looks like a greeting or signature
        if (trimmedSection.includes('Dear ') || trimmedSection.includes('With Love') || 
            trimmedSection.includes('God Almighty') || trimmedSection.includes('In My Love')) {
            const wrappedLines = wrapText(trimmedSection, 75);
            wrappedLines.forEach(line => {
                console.log(colorize(line, 'magenta'));
            });
            console.log('');
            return;
        }
        
        // Regular text - wrap aggressively
        const wrappedLines = wrapText(trimmedSection, 75);
        wrappedLines.forEach(line => {
            console.log(line);
        });
        console.log('');
    });
}

async function getBibleGuidance(name, feeling) {
    try {
        // Initialize OpenAI client safely
        const client = initializeOpenAI();
        
        console.log(colorize('\n🙏 Seeking Bible guidance...', 'cyan'));
        console.log(colorize(`Name: ${name}`, 'blue'));
        console.log(colorize(`Feeling: ${feeling}`, 'blue'));
        console.log(colorize('━'.repeat(50), 'yellow'));

        // Create the specific prompt template
        const prompt = `Act as a world renowned Bible Expert and Bible Mentor named God. Use this information to guide me today. My Name is ${name}. Today I'm feeling like ${feeling}

Find three Bible scriptures that will guide me through this problem. Then act as God Almighty and write me a full length personalized letter to me using the three bible scriptures that have been chosen. Explain each scripture chosen with a short summary in a form of stories. The letter should include other stories and parables that could help me. The letter should include a list of actions and activities I can do to help me cope and overcome this problem. The letter should be personalized and written to me as if you God is talking directly to me.`;

        console.log(colorize('📡 Connecting to OpenAI...', 'yellow'));

        // Send request to OpenAI
        const completion = await client.chat.completions.create({
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

        // Display the response with beautiful formatting
        console.log(colorize('\n✨ BIBLE GUIDANCE FROM GOD ✨', 'green'));
        console.log(colorize('═'.repeat(60), 'green'));
        console.log('');
        
        // Format the response for better readability
        formatAndDisplayResponse(response);
        
        console.log(colorize('═'.repeat(60), 'green'));
        console.log(colorize('🙏 May God bless you on your journey', 'green'));
        console.log('');

        return response;

    } catch (error) {
        if (error.message === 'OPENAI_API_KEY_MISSING') {
            showSetupInstructions();
            process.exit(1);
        }
        
        console.error(colorize('\n❌ Error getting Bible guidance:', 'red'), error.message);
        
        if (error.message.includes('API key') || error.message.includes('authentication')) {
            console.log(colorize('\n💡 Your API key might be invalid. Please check it and try again.', 'yellow'));
            showSetupInstructions();
        }
        
        process.exit(1);
    }
}

// Set up CLI with yargs
const argv = yargs(hideBin(process.argv))
    .usage(colorize('\n🙏 Letter to God - Get personalized guidance from God\n', 'bright') + 
           colorize('Usage: $0 --name <your-name> --feeling <what-you-are-feeling>', 'cyan') + 
           colorize('\n\n⚠️  Requires OpenAI API key - see setup instructions if not configured', 'yellow'))
    .option('name', {
        alias: 'n',
        type: 'string',
        description: 'Your name',
        demandOption: true
    })
    .option('feeling', {
        alias: 'f',
        type: 'string',
        description: 'What you are feeling today or the problem you are facing',
        demandOption: true
    })
    .example('$0 --name "John" --feeling "anxious about my future"', 'Get guidance for anxiety about the future')
    .example('$0 --name "Sarah" --feeling "struggling with forgiveness"', 'Get guidance about forgiveness')
    .example('$0 -n "David" -f "feeling lost and confused"', 'Using short aliases')
    .help('h')
    .alias('h', 'help')
    .version('1.0.0')
    .wrap(100)
    .argv;

// Main execution
async function main() {
    console.log(colorize('\n🌟 Welcome to Letter to God - Bible Guidance 🌟', 'bright'));
    
    try {
        await getBibleGuidance(argv.name, argv.feeling);
    } catch (error) {
        // Error handling is done in getBibleGuidance function
        // This catch is just to prevent unhandled promise rejection
    }
}

main().catch(console.error);

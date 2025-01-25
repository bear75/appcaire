import ngrok from 'ngrok';
import { exec } from 'child_process';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function startDevServer() {
  // Start Next.js dev server
  const nextProcess = exec('pnpm dev');
  
  nextProcess.stdout?.on('data', (data) => {
    console.log(data);
  });

  nextProcess.stderr?.on('data', (data) => {
    console.error(data);
  });

  // Wait for Next.js to start
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    // Start ngrok tunnel
    const url = await ngrok.connect({
      addr: 3000,
      subdomain: process.env.NGROK_SUBDOMAIN, // Optional: Set a custom subdomain if you have a paid account
    });

    console.log('\n=== Webhook Testing Setup ===');
    console.log(`🚀 Local Next.js: http://localhost:3000`);
    console.log(`🌍 Ngrok URL: ${url}`);
    console.log(`\n📝 Add this webhook URL in Clerk Dashboard:`);
    console.log(`${url}/api/webhooks/clerk\n`);
  } catch (error) {
    console.error('Error starting ngrok:', error);
    process.exit(1);
  }
}

startDevServer(); 
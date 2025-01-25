import ngrok from 'ngrok';
import { exec } from 'child_process';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function startDevServer() {
  try {
    // Start Next.js development server
    exec('pnpm dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting Next.js server: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Only start ngrok if ENABLE_NGROK is true
    if (process.env.ENABLE_NGROK === 'true') {
      try {
        // Configure ngrok
        const url = await ngrok.connect({
          addr: 3000,
          authtoken: process.env.NGROK_AUTHTOKEN,
          subdomain: process.env.NGROK_SUBDOMAIN
        });

        console.log('Local server:', 'http://localhost:3000');
        console.log('Webhook URL:', url);
        console.log('Add this URL to your Clerk Dashboard webhook endpoints');
      } catch (ngrokError) {
        console.log('Ngrok setup skipped or failed. Local server available at http://localhost:3000');
        console.error('Ngrok error:', ngrokError);
      }
    } else {
      console.log('Ngrok disabled. Local server available at http://localhost:3000');
    }
  } catch (error) {
    console.error('Error starting development server:', error);
    process.exit(1);
  }
}

startDevServer(); 
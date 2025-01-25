import puppeteer, { Page } from 'puppeteer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const pages = [
  // Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    title: 'Översikt'
  },
  // Schedule views
  {
    path: '/dashboard/schedule?mode=trial&view=timeline',
    name: 'schedule---trial-org---timeline-view',
    title: 'Schema - Provorganisation (Tidslinje)'
  },
  {
    path: '/dashboard/schedule?mode=trial&view=grid',
    name: 'schedule---trial-org---grid-view',
    title: 'Schema - Provorganisation (Rutnät)'
  },
  {
    path: '/dashboard/schedule?mode=active&view=map',
    name: 'schedule---active-org---map-view',
    title: 'Schema - Aktiv organisation (Karta)'
  },
  {
    path: '/dashboard/schedule?mode=existing&view=timeline',
    name: 'schedule---existing-org---timeline-view',
    title: 'Schema - Befintlig organisation (Tidslinje)'
  },
  {
    path: '/dashboard/schedule?mode=existing&view=grid',
    name: 'schedule---existing-org---grid-view',
    title: 'Schema - Befintlig organisation (Rutnät)'
  },
  {
    path: '/dashboard/schedule?mode=existing&view=map',
    name: 'schedule---existing-org---map-view',
    title: 'Schema - Befintlig organisation (Karta)'
  },
  // Analytics views
  {
    path: '/dashboard/analytics?tab=overview',
    name: 'analytics---overview',
    title: 'Analys - Översikt'
  },
  {
    path: '/dashboard/analytics?tab=staff',
    name: 'analytics---staff',
    title: 'Analys - Personal'
  },
  {
    path: '/dashboard/analytics?tab=schedule',
    name: 'analytics---schedule',
    title: 'Analys - Schema'
  },
  {
    path: '/dashboard/analytics?tab=continuity',
    name: 'analytics---continuity',
    title: 'Analys - Kontinuitet'
  },
  {
    path: '/dashboard/analytics?tab=clients',
    name: 'analytics---clients',
    title: 'Analys - Klienter'
  },
  // Employee views
  {
    path: '/dashboard/employees?view=grid',
    name: 'employees---grid-view',
    title: 'Personal - Rutnät'
  },
  {
    path: '/dashboard/employees?view=list',
    name: 'employees---list-view',
    title: 'Personal - Lista'
  },
  {
    path: '/dashboard/employees/1?tab=overview',
    name: 'employee-profile---overview',
    title: 'Personal - Profil (Översikt)'
  },
  {
    path: '/dashboard/employees/1?tab=schedule',
    name: 'employee-profile---schedule',
    title: 'Personal - Profil (Schema)'
  },
  {
    path: '/dashboard/employees/1?tab=skills',
    name: 'employee-profile---skills',
    title: 'Personal - Profil (Kompetenser)'
  },
  // Client views
  {
    path: '/dashboard/clients?view=grid',
    name: 'clients---grid-view',
    title: 'Klienter - Rutnät'
  },
  {
    path: '/dashboard/clients?view=list',
    name: 'clients---list-view',
    title: 'Klienter - Lista'
  },
  {
    path: '/dashboard/clients/1?tab=overview',
    name: 'client-profile---overview',
    title: 'Klient - Profil (Översikt)'
  },
  {
    path: '/dashboard/clients/1?tab=requirements',
    name: 'client-profile---requirements',
    title: 'Klient - Profil (Krav)'
  },
  {
    path: '/dashboard/clients/1?tab=constraints',
    name: 'client-profile---constraints',
    title: 'Klient - Profil (Begränsningar)'
  },
  {
    path: '/dashboard/clients/1?tab=history',
    name: 'client-profile---history',
    title: 'Klient - Profil (Historik)'
  },
  // Settings views
  {
    path: '/dashboard/settings/organization',
    name: 'settings---organization',
    title: 'Inställningar - Organisation'
  },
  {
    path: '/dashboard/settings/scheduling',
    name: 'settings---scheduling',
    title: 'Inställningar - Schemaläggning'
  }
];

async function waitForManualLogin(page: Page) {
  console.log('Please log in manually in the browser window.');
  console.log('The script will continue once you reach the dashboard.');
  
  try {
    // First navigate to the sign-in page
    console.log('Navigating to sign-in page...');
    await page.goto('http://localhost:3000/sign-in', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    console.log('Waiting for login...');
    
    // Check URL every second until we reach dashboard
    while (true) {
      const url = page.url();
      if (url.includes('/dashboard')) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('Dashboard detected...');
    
    // Wait a bit for everything to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('Login complete, continuing with screenshots...');
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

async function captureScreenshots() {
  console.log('Starting screenshot capture process...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    console.log('Browser window opened...');
    
    // Set default navigation timeout
    page.setDefaultNavigationTimeout(60000);
    
    // Wait for manual login
    await waitForManualLogin(page);

    // Capture screenshots for each page
    for (const { path: pagePath, name, title } of pages) {
      console.log(`Navigating to ${title}...`);
      
      try {
        // Navigate to the page
        await page.goto(`http://localhost:3000${pagePath}`, {
          waitUntil: 'networkidle0',
          timeout: 60000
        });
        
        console.log(`Waiting for content on ${title}...`);
        
        // Wait for content to load - try multiple possible selectors
        await Promise.race([
          page.waitForSelector('.space-y-4', { timeout: 10000 }),
          page.waitForSelector('.space-y-6', { timeout: 10000 }),
          page.waitForSelector('main', { timeout: 10000 }),
          page.waitForSelector('.container', { timeout: 10000 }),
          // Add a delay as fallback if no selectors match
          new Promise(resolve => setTimeout(resolve, 5000))
        ]);
        
        // Additional wait for any animations
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take the screenshot
        const screenshotPath = path.join(SCREENSHOT_DIR, `${name}.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });
        
        console.log(`Screenshot saved: ${screenshotPath}`);
      } catch (error) {
        console.error(`Failed to capture screenshot for ${title}:`, error);
        // Continue with next page even if one fails
        continue;
      }
    }

  } catch (error) {
    console.error('Error capturing screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots().catch(console.error); 
import puppeteer from 'puppeteer';
import { preview } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(__dirname, '../build');

// Routes to pre-render
const routes = [
  '/',
  '/preswylfa',
  '/preswylfa/about',
  '/preswylfa/what-to-do',
  '/preswylfa/contact',
  '/piddle-inn',
  '/piddle-inn/about',
  '/piddle-inn/what-to-do',
  '/piddle-inn/contact',
];

async function prerender() {
  console.log('🚀 Starting pre-render...\n');

  // Start preview server
  const server = await preview({
    preview: { port: 4173 },
    build: { outDir: 'build' },
  });

  const url = 'http://localhost:4173';
  console.log(`✅ Preview server running at ${url}\n`);

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const fullUrl = `${url}${route}`;

      console.log(`📄 Pre-rendering: ${route}`);

      // Listen for console messages and errors
      page.on('console', msg => console.log(`   [Browser]: ${msg.text()}`));
      page.on('pageerror', err => console.log(`   [Error]: ${err.message}`));

      try {
        await page.goto(fullUrl, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Wait a bit for React to fully hydrate and render
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get the rendered HTML
        const html = await page.content();

        // Save to file
        const filePath = route === '/'
          ? path.join(buildDir, 'index.html')
          : path.join(buildDir, route.slice(1), 'index.html');

        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, html, 'utf8');

        console.log(`   ✓ Saved to ${filePath.replace(buildDir, 'build')}`);
      } catch (error) {
        console.error(`   ✗ Error rendering ${route}:`, error.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log('\n✅ Pre-rendering complete!');
}

prerender().catch(err => {
  console.error('❌ Pre-render failed:', err);
  process.exit(1);
});

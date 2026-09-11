const { chromium } = require('playwright');
const path = require('path');

const baseDir = __dirname;
const targetUrl = 'http://localhost:3300/index.html';

async function capture() {
  try {
    const browser = await chromium.launch({ channel: 'chrome' });
    
    // 1. Desktop Screenshot 1440x900
    const pageDesktop = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    await pageDesktop.goto(targetUrl, { waitUntil: 'networkidle' });
    await pageDesktop.waitForTimeout(600);
    await pageDesktop.screenshot({ path: path.join(baseDir, 'desktop-preview-1440x900.png') });
    console.log('Desktop screenshot saved!');

    // 2. Mobile Screenshot 390x844
    const pageMobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true
    });
    await pageMobile.goto(targetUrl, { waitUntil: 'networkidle' });
    await pageMobile.waitForTimeout(600);
    await pageMobile.screenshot({ path: path.join(baseDir, 'mobile-preview-390x844.png') });
    console.log('Mobile screenshot saved!');

    await browser.close();
  } catch (err) {
    console.error('Error capturing screenshot:', err);
  }
}

capture();

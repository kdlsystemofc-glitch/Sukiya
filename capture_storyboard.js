const { chromium } = require('playwright');
const path = require('path');

const baseDir = __dirname;
const targetUrl = 'http://localhost:3300/index.html';

async function captureStoryboard() {
  try {
    const browser = await chromium.launch({ channel: 'chrome' });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const totalScroll = 2600;
    const percentages = [0, 20, 40, 60, 80, 100];

    for (const pct of percentages) {
      const scrollY = (pct / 100) * totalScroll;
      await page.evaluate((y) => {
        if (window.lenis) {
          window.lenis.scrollTo(y, { immediate: true });
        } else {
          window.scrollTo(0, y);
        }
        if (window.ScrollTrigger) {
          ScrollTrigger.update();
        }
      }, scrollY);
      await page.waitForTimeout(400);

      const filename = `storyboard-frame-${String(pct).padStart(3, '0')}pct.png`;
      await page.screenshot({ path: path.join(baseDir, filename) });
      console.log(`Saved: ${filename} at scrollY: ${scrollY}px (${pct}%)`);
    }

    await browser.close();
    console.log('Storyboard capture complete!');
  } catch (err) {
    console.error('Error capturing storyboard:', err);
  }
}

captureStoryboard();

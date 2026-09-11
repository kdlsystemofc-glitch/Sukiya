const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3300/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const scenes = [
    { name: 'scene-02-counter', sel: '#sceneCounter' },
    { name: 'scene-03-menu', sel: '#sceneMenu' },
    { name: 'scene-04-quote', sel: '#sceneQuote' },
    { name: 'scene-05-location', sel: '#sceneLocation' },
    { name: 'scene-06-action', sel: '#sceneAction' }
  ];

  for (const s of scenes) {
    const el = page.locator(s.sel);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: s.name + '.png' });
    console.log('Saved:', s.name + '.png');
  }

  await browser.close();
  console.log('All scenes captured successfully!');
})();

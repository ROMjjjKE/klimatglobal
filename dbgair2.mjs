import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4210/klimatglobal/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
const stage = await p.evaluate(() => document.querySelector('.air__pin').getBoundingClientRect().top + window.scrollY);
for (let i = 0; i <= 6; i++) {
  await p.evaluate(y => window.scrollTo(0, y), stage + i * 250);
  await new Promise(r => setTimeout(r, 600));
  console.log(i * 250, await p.evaluate(() => ({
    y: Math.round(document.querySelector('.air__pin').getBoundingClientRect().top),
    step: document.querySelector('.air__step').innerText.replace(/\s/g, ' ').slice(0, 22),
    dots: document.querySelectorAll('.air__svg circle').length,
  })));
}
await p.screenshot({ path: 'shots/k-air.png' });
await b.close();

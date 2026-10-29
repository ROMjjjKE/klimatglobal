import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4210/klimatglobal/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const m = await p.evaluate(() => {
  const box = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const h1 = document.querySelector('h1');
  return {
    h1: { ...box('h1'), fs: getComputedStyle(h1).fontSize, lh: getComputedStyle(h1).lineHeight, lines: Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)) },
    split: box('.split'), side1: box('.side'), side2: box('.side + .side'),
    air: box('.air__pin'), stage: box('.air__stage'), aside: box('.air__side'),
    asideText: document.querySelector('.air__side p')?.innerText.slice(0, 40),
    workCols: document.querySelectorAll('.work').length,
    regItems: document.querySelectorAll('.reg__list li').length,
    termItems: document.querySelectorAll('.term').length,
  };
});
console.log(JSON.stringify(m, null, 1));
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  await p.setViewport({ width: w, height: 860 });
  await new Promise(r => setTimeout(r, 350));
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, inner: window.innerWidth, h1: getComputedStyle(document.querySelector('h1')).fontSize }));
  console.log(String(w).padStart(4), r.sw, r.sw > r.inner ? 'OVERFLOW' : 'ok', r.h1);
}
await b.close();

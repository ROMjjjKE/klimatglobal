import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text()); });
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__shifts = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__shifts.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4210/klimatglobal/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
const out = await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Обслуживание кондиционеров и вентиляции: ремонт, монтаж, проектирование 24';
  const w = f => { c.font = `40px "${f}"`; return +c.measureText(s).width.toFixed(1); };
  return {
    widths: Object.fromEntries(['Literata', 'Manrope', 'Arial'].map(f => [f, w(f)])),
    h1: document.querySelector('h1').innerText,
    split: document.querySelectorAll('.side').length,
    mode: document.querySelector('.side').getAttribute('aria-current'),
    airMode: document.querySelector('.air').className,
    cls: +window.__shifts.reduce((a, b) => a + b, 0).toFixed(4),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  };
});
console.log(JSON.stringify(out, null, 1), errs.slice(0, 3));
await p.screenshot({ path: 'shots/k-hero.png' });
await b.close();

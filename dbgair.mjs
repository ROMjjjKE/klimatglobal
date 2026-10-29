import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push('ERR ' + e.message));
p.on('console', m => errs.push(m.type() + ': ' + m.text().slice(0, 120)));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4210/klimatglobal/', { waitUntil: 'networkidle2' });
const top = await p.evaluate(() => document.querySelector('.air').getBoundingClientRect().top + window.scrollY);
await p.evaluate(t => window.scrollTo(0, t - 200), top);
await new Promise(r => setTimeout(r, 2000));
console.log(await p.evaluate(() => ({
  cls: document.querySelector('.air').className,
  spacer: !!document.querySelector('.pin-spacer'),
  stageTop: Math.round(document.querySelector('.air__pin').getBoundingClientRect().top),
  h: window.innerHeight,
})), errs.slice(0, 5));
await b.close();

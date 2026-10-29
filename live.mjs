import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/klimatglobal/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1200));
console.log(await p.evaluate(() => ({
  h1: document.querySelector('h1').innerText, tel: document.querySelector('.hdr__tel').getAttribute('href'),
  panels: document.querySelectorAll('.side').length, fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  sw: document.documentElement.scrollWidth,
})), 'errors:', errs.slice(0, 3));
await b.close();

import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/klimatglobal/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
let p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });

// режим «Объект»
await p.click('.hdr__switch button:nth-child(2)');
await new Promise(r => setTimeout(r, 600));
await p.screenshot({ path: 'screenshots/desktop-biz.png' });

// сцена тракта
await p.click('.hdr__switch button:nth-child(2)');
await new Promise(r => setTimeout(r, 300));
const stage = await p.evaluate(() => document.querySelector('.air__pin').getBoundingClientRect().top + window.scrollY);
await p.evaluate(y => window.scrollTo(0, y), stage + 620);
await new Promise(r => setTimeout(r, 1100));
await p.screenshot({ path: 'screenshots/desktop-air.png' });

// регламент
await p.evaluate(() => document.querySelector('#reglament').scrollIntoView());
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'screenshots/desktop-reg.png' });

// заявка
await p.evaluate(() => document.querySelector('#zayavka').scrollIntoView());
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'screenshots/desktop-ask.png' });
await p.close();

p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'screenshots/mobile-390.png' });
await p.evaluate(() => document.querySelector('.air').scrollIntoView());
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'screenshots/mobile-390-air.png' });
await p.close();
await b.close();
console.log('shots ok');

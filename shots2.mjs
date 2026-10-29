import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4210/klimatglobal/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
await p.screenshot({ path: 'shots/k-hero.png' });
const top = await p.evaluate(() => document.querySelector('.air').getBoundingClientRect().top + window.scrollY);
await p.evaluate(t => window.scrollTo(0, t + 320), top);
await new Promise(r => setTimeout(r, 900));
const seq = [];
for (let i = 0; i < 5; i++) {
  await p.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 420));
  seq.push(await p.evaluate(() => ({ y: Math.round(document.querySelector('.air').getBoundingClientRect().top), step: document.querySelector('.air__step').innerText.replace(/\s/g, ' '), on: document.querySelectorAll('.air__list .on').length })));
}
console.log(seq.map(s => `${s.y}px ${s.step} on:${s.on}`).join('\n'));
await p.screenshot({ path: 'shots/k-air.png' });
// переключение режима
await p.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 400));
await p.click('.hdr__switch button:nth-child(2)');
await new Promise(r => setTimeout(r, 500));
console.log('mode after switch:', await p.evaluate(() => ({ h2: document.querySelector('#usloviya h2').innerText, active: document.querySelectorAll('.side')[1].getAttribute('aria-current'), org: !!document.querySelector('#f-org') })));
await p.screenshot({ path: 'shots/k-biz.png' });
await b.close();

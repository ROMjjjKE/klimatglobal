import { useEffect, useRef } from 'react';
import type { Mode } from '../App';

type Props = { mode: Mode; setMode: (m: Mode) => void };

export default function Header({ mode, setMode }: Props) {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__brand" href="#top" aria-label="КлиматГлобал, к началу страницы">
          <span className="hdr__name">КлиматГлобал</span>
          <span className="hdr__sub">Минск · климат</span>
        </a>

        <div className="hdr__switch" role="group" aria-label="Для кого условия">
          <button type="button" aria-pressed={mode === 'private'} onClick={() => setMode('private')}>
            Квартира
          </button>
          <button type="button" aria-pressed={mode === 'biz'} onClick={() => setMode('biz')}>
            Объект
          </button>
        </div>

        <a className="hdr__tel" href="tel:+375296185321">+375 29 618-53-21</a>
      </div>
      <span className="hdr__progress" ref={bar} aria-hidden="true" />
    </header>
  );
}

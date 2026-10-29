import { useEffect, useRef, useState } from 'react';
import type { Mode } from '../App';

const DUCT =
  'M40 170 H200 Q232 170 232 138 V104 Q232 72 264 72 H520 Q552 72 552 104 V178 Q552 210 584 210 H860';

const STATIONS = [
  {
    t: 0.03,
    key: 'Приток',
    private: 'Воздух заходит с улицы через решётку. Зимой подогревается, летом идёт на охлаждение.',
    biz: 'Приточная установка забирает воздух с улицы. Расход считаем по нормам кратности для вашего помещения.',
  },
  {
    t: 0.32,
    key: 'Фильтр',
    private: 'Фильтр держит пыль, пух и тополиный пух. Грязный фильтр — это запах и потеря холода.',
    biz: 'Фильтры меняются по регламенту, а не «когда вспомним». Интервал закреплён в договоре на ТО.',
  },
  {
    t: 0.63,
    key: 'Охлаждение',
    private: 'Фреон забирает тепло из воздуха. Утечка видна по обмерзанию и слабому холоду.',
    biz: 'Сплит-система или чиллер охлаждает приток. Проверяем давление, перегрев и автоматику.',
  },
  {
    t: 0.92,
    key: 'Раздача',
    private: 'Воздух приходит в комнату без сквозняка: поток направляем по потолку.',
    biz: 'Раздача по зонам с балансировкой: где-то больше, где-то меньше, но по проекту.',
  },
];

const M = 900;
const H = 300;

export default function AirScene({ mode }: { mode: Mode }) {
  const [p, setP] = useState(0);
  const [pin, setPin] = useState(false);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [len, setLen] = useState(0);

  // длина тракта и точки станций
  useEffect(() => {
    if (!pathRef.current) return;
    const total = pathRef.current.getTotalLength();
    setLen(total);
    setPts(STATIONS.map((s) => {
      const pt = pathRef.current!.getPointAtLength(total * s.t);
      return { x: Math.round(pt.x), y: Math.round(pt.y) };
    }));
  }, []);

  // пин-сцена: скролл ведёт воздух по тракту
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches || window.innerHeight < 660) {
      setP(1);
      return;
    }

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () => Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (killed || !stageRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      setPin(true);
      const trigger = ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => setP(Math.round(self.progress * 100) / 100),
      });
      cleanup = () => trigger.kill();
    });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          timer = window.setTimeout(begin, 60);
        }
      },
      { rootMargin: '320px 0px' }
    );
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  const pos = (at: number) => {
    if (!pathRef.current || !len) return { x: 0, y: 0 };
    const pt = pathRef.current.getPointAtLength(Math.max(0, Math.min(len, len * at)));
    return { x: pt.x, y: pt.y };
  };

  const active = STATIONS.reduce((acc, s, i) => (p >= s.t - 0.02 ? i : acc), 0);

  return (
    <section className={`air ${pin ? 'air--pin' : 'air--manual'}`} id="trakt">
      <div className="wrap">
        <div className="cols air__head">
          <div className="shead__num micro">03 / тракт</div>
          <h2 className="shead__title reveal">Что происходит с воздухом</h2>
          <p className="shead__note body-s reveal">
            Один и тот же путь от решётки до комнаты. {mode === 'biz' ? 'На объекте добавляются зоны и балансировка.' : 'В квартире он короче, но проверять надо каждое звено.'}
          </p>
        </div>

        <div className="air__pin" ref={stageRef}>
          <div className="air__stage">
            <svg className="air__svg" viewBox={`0 0 ${M} ${H}`} role="img" aria-label="Схема тракта: приток, фильтр, охлаждение, раздача">
              <path d={DUCT} fill="none" stroke="rgba(233,240,242,0.16)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
              <path d={DUCT} fill="none" stroke="rgba(46,142,134,0.55)" strokeWidth="1.5" strokeDasharray="6 8" />
              <path ref={pathRef} d={DUCT} fill="none" stroke="none" />

              {pts.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r={i === active ? 11 : 7} fill="var(--ink)" stroke={p >= STATIONS[i].t - 0.02 ? 'var(--teal-2)' : 'rgba(233,240,242,0.3)'} strokeWidth="1.6" />
                  <text x={pt.x + 18} y={pt.y + 4} fontSize="11" letterSpacing="1.4" fill={p >= STATIONS[i].t - 0.02 ? 'var(--air)' : 'rgba(233,240,242,0.4)'} fontFamily="Manrope, sans-serif" fontWeight="600">
                    {STATIONS[i].key.toUpperCase()}
                  </text>
                </g>
              ))}

              {[0, 1, 2, 3, 4].map((i) => {
                const at = p - i * 0.018;
                if (at <= 0) return null;
                const q = pos(at);
                return <circle key={i} cx={q.x} cy={q.y} r={i === 0 ? 4.5 : 3.2} fill="var(--teal-2)" opacity={1 - i * 0.16} />;
              })}
            </svg>
          </div>

          <div className="air__side">
            <span className="air__step">
              {String(active + 1).padStart(2, '0')} / 04 · {STATIONS[active].key}
            </span>
            <h3>{STATIONS[active].key}</h3>
            <p>{STATIONS[active][mode]}</p>
            <div className="air__list">
              {STATIONS.map((s, i) => (
                <div key={s.key} className={i <= active ? 'on' : ''}>
                  <span>{s.key}</span>
                  <span>{i <= active ? '✓' : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

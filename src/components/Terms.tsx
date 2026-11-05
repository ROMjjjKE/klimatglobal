import type { Mode } from '../App';

const TERMS = {
  private: [
    { k: 'Стоимость', v: 'Смета до начала работ, а не «сколько получится». Поменялось по ходу — согласуем заново, а не доначислим в конце.' },
    { k: 'Чистый монтаж', v: 'Пылесос, плёнка на мебель и пол, мусор забираем с собой. После нас не нужен ремонт.' },
    { k: 'Документы', v: 'Договор и гарантийный талон на оборудование и работы: если что-то не так — есть с кого спросить.' },
    { k: 'Оплата', v: 'Наличными или картой после приёмки. Сначала проверяете холод — потом платите.' },
  ],
  biz: [
    { k: 'Документы', v: 'Закрывающие для бухгалтерии, МЧС и ЦГЭ — пакет, с которым не приходится переделывать бумаги.' },
    { k: 'Расчёт', v: 'Безнал с НДС и без: подстраиваемся под то, как вы ведёте учёт.' },
    { k: 'Договор', v: 'ТО по графику: месяц, квартал или сезон. Жара не застаёт врасплох — выезд уже стоит в календаре.' },
    { k: 'Аварии', v: 'Аварийная бригада выезжает в регионы. Простой оборудования дешевле не становится: чем раньше приехали, тем меньше потерь.' },
  ],
} as const;

export default function Terms({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const other: Mode = mode === 'private' ? 'biz' : 'private';
  return (
    <section className="section" id="usloviya">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">05 / условия</div>
          <h2 className="shead__title reveal">
            {mode === 'private' ? 'Как работаем с квартирами и домами' : 'Как работаем с организациями'}
          </h2>
          <p className="shead__note body-s reveal">
            {mode === 'private'
              ? 'Договор, гарантия и оплата картой — то, о чём обычно спрашивают на первом звонке.'
              : 'Документы, безнал и график ТО — то, без чего бухгалтерия не примет работы.'}
          </p>
        </div>

        <dl className="terms fade-swap" key={mode}>
          {TERMS[mode].map((t) => (
            <div className="term" key={t.k}>
              <dt>{t.k}</dt>
              <dd>{t.v}</dd>
            </div>
          ))}
        </dl>

        <div className="terms__swap">
          <span>Смотреть {other === 'biz' ? 'для организаций' : 'для квартиры'}:</span>
          <button type="button" className="link-teal" onClick={() => setMode(other)} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--teal)', padding: 0, paddingBottom: 3 }}>
            {other === 'biz' ? 'условия для объекта' : 'условия для квартиры'}
          </button>
        </div>
      </div>
    </section>
  );
}

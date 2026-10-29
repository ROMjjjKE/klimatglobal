import type { Mode } from '../App';

const TERMS = {
  private: [
    { k: 'Стоимость', v: 'Прозрачная смета до начала работ: без «сюрпризов» в процессе.' },
    { k: 'Чистый монтаж', v: 'Работаем со строительным пылесосом, укрываем мебель и пол.' },
    { k: 'Документы', v: 'Официальный договор и гарантийный талон на оборудование и работы.' },
    { k: 'Оплата', v: 'Наличными или картой, после приёмки работ.' },
  ],
  biz: [
    { k: 'Документы', v: 'Полный пакет закрывающих документов для бухгалтерии, МЧС и ЦГЭ.' },
    { k: 'Расчёт', v: 'Безналичный расчёт: работаем с НДС и без НДС.' },
    { k: 'Договор', v: 'Плановое ТО: ежемесячное, ежеквартальное или сезонное, по графику.' },
    { k: 'Аварии', v: 'Оперативный выезд аварийной бригады в регионы при сбое системы.' },
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

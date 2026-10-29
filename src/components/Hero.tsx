import type { Mode } from '../App';

type Props = { mode: Mode; setMode: (m: Mode) => void };

const PANELS = {
  private: {
    tag: 'Квартира и дом',
    title: 'Чтобы летом было тихо и холодно',
    items: ['Монтаж с пылесосом: ремонт остаётся целым', 'Договор и гарантийный талон на руки', 'Оплата наличными или картой'],
    pick: 'Условия для квартиры',
  },
  biz: {
    tag: 'Офис, магазин, производство',
    title: 'Чтобы система не останавливала работу',
    items: ['Договор на плановое ТО: месяц, квартал, сезон', 'Закрывающие документы для МЧС и ЦГЭ', 'Аварийная бригада в регионы'],
    pick: 'Условия для организаций',
  },
} as const;

export default function Hero({ mode, setMode }: Props) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__top">
          <div>
            <div className="hero__plate micro">ООО «КлиматГлобал» · Домашевский переулок, 11А, Минск</div>
            <h1>Кондиционеры и вентиляция: сервис, ремонт, монтаж</h1>
          </div>
          <div className="hero__aside">
            <p>
              Обслуживаем и ремонтируем климатическую технику в Минске и регионах. Сначала считаем
              стоимость и согласуем работы, потом берём инструмент.
            </p>
          </div>
        </div>

        <div className="split" role="group" aria-label="Выберите, для кого условия">
          {(['private', 'biz'] as const).map((key) => {
            const p = PANELS[key];
            const active = mode === key;
            return (
              <div key={key} className="side" aria-current={active ? 'true' : undefined}>
                <span className="side__tag">{p.tag}</span>
                <h2>{p.title}</h2>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}><span>{it}</span></li>
                  ))}
                </ul>
                <div className="side__foot">
                  <button type="button" className="side__pick" onClick={() => setMode(key)}>
                    {active ? 'Показано ниже' : p.pick}
                  </button>
                  <a className="link-teal" href="tel:+375296185321">Позвонить</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

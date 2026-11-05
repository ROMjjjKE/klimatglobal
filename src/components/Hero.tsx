import type { Mode } from '../App';

type Props = { mode: Mode; setMode: (m: Mode) => void };

const PANELS = {
  private: {
    tag: 'Квартира и дом',
    title: 'Летом — холодно и тихо, без сюрпризов в счёте',
    items: ['Монтаж с пылесосом: после нас не нужен ремонт', 'Договор и гарантийный талон: есть с кого спросить', 'Цена в смете до работ, оплата после приёмки'],
    pick: 'Что будет с моим кондиционером',
  },
  biz: {
    tag: 'Офис, магазин, производство',
    title: 'Система не должна останавливать ваш бизнес',
    items: ['ТО по графику: месяц, квартал, сезон — без простоя', 'Закрывающие для бухгалтерии, МЧС и ЦГЭ', 'Аварийная бригада в регионы, когда система встала'],
    pick: 'Условия для моего объекта',
  },
} as const;

export default function Hero({ mode, setMode }: Props) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__top">
          <div>
            <div className="hero__plate micro">ООО «КлиматГлобал» · Домашевский переулок, 11А, Минск</div>
            <h1>Кондиционер должен работать, а не напоминать о себе</h1>
          </div>
          <div className="hero__aside">
            <p>
              Сервис, ремонт и монтаж климатической техники в Минске и регионах. Свой склад
              запчастей, договор и гарантийный талон — поэтому большинство заявок закрываем за один выезд.
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

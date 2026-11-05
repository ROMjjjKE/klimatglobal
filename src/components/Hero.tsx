import type { Mode } from '../App';

type Props = { mode: Mode; setMode: (m: Mode) => void };

const PANELS = {
  private: {
    tag: 'Квартира и дом',
    title: 'Квартира: холод есть, счёт — без сюрпризов',
    items: ['Приедем с пылесосом: после монтажа ремонт не нужен', 'Цена фиксируется в смете до начала работ', 'Сначала проверили холод — потом оплата'],
    pick: 'Что будет с моим кондиционером',
  },
  biz: {
    tag: 'Офис, магазин, производство',
    title: 'Объект: система работает, простой не случается',
    items: ['ТО по графику: месяц, квартал, сезон', 'Закрывающие для бухгалтерии, МЧС и ЦГЭ', 'Аварийная бригада выезжает в регионы'],
    pick: 'Условия для моего объекта',
  },
} as const;

export default function Hero({ mode, setMode }: Props) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__top">
          <div>
            <div className="hero__plate micro">ООО «КлиматГлобал» · Домашевский переулок, 11А, Минск · физ. и юр. лица</div>
            <h1>Кондиционер не охлаждает? Починим за один выезд</h1>
          </div>
          <div className="hero__aside">
            <p>
              Ремонт, обслуживание и монтаж климатической техники в Минске и регионах. Запчасти
              со своего склада — не ждём поставку неделю. Цену называем до начала работ,
              договор и гарантийный талон — на руки.
            </p>
            <div className="hero__cta">
              <a className="btn" href="tel:+375296185321">Вызвать мастера</a>
              <a className="link-teal" href="#polza">Сколько стоит обслуживание →</a>
            </div>
            <ul className="hero__facts">
              <li><b>Один выезд</b> закрывает большинство заявок</li>
              <li><b>Свой склад</b> запчастей без ожидания</li>
              <li><b>Договор</b> и гарантийный талон</li>
              <li><b>НДС</b> и без — для организаций</li>
            </ul>
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

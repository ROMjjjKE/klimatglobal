import type { Mode } from '../App';

const REG = [
  'Чистка теплообменника, дренажа и крыльчатки',
  'Дезинфекция от бактерий и запахов',
  'Дозаправка фреоном по манометрам, поиск утечки',
  'Проверка автоматики, датчиков и пускозащиты',
  'Замена фильтров и уплотнений',
];

export default function Reg({ mode }: { mode: Mode }) {
  return (
    <section className="section" id="reglament">
      <div className="wrap reg">
        <div>
          <div className="micro" style={{ marginBottom: 14 }}>04 / регламент</div>
          <h2 className="reveal" style={{ fontSize: 'var(--fs-34)', marginBottom: 16 }}>Что входит в обслуживание — и почему это дешевле ремонта</h2>
          <p className="body-s">
            Пять пунктов на каждом выезде. Если пункт не нужен — вычёркиваем его из акта и из суммы.
            Пропущенное ТО редко заканчивается «просто нет холода»: чаще это замена компрессора,
            которая стоит кратно дороже обслуживания.
          </p>
          <div className="reg__out">
            <p>
              <strong>На руки после выезда:</strong> акт выполненных работ и гарантийный талон.
              {mode === 'biz' ? ' Для бухгалтерии — полный пакет закрывающих документов, в том числе для МЧС и ЦГЭ.' : ''}
            </p>
          </div>
        </div>

        <ol className="reg__list reveal">
          {REG.map((item, i) => (
            <li key={item}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

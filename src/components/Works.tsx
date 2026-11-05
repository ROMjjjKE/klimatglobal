const WORKS = [
  {
    n: '01',
    title: 'ТО по регламенту — дешевле, чем ремонт',
    text: 'Пять пунктов на каждом выезде: чистка, дезинфекция, фреон по манометрам, автоматика, фильтры. Пункт, который не нужен, вычёркиваем из акта и из суммы — платите за работу, а не за пакет.',
  },
  {
    n: '02',
    title: 'Ремонт за один выезд',
    text: 'Не охлаждает, течёт, шумит, не тянет вытяжка — причину находим на месте. Свой склад запчастей: не ждём поставку неделю и не оставляем вас без кондиционера в жару.',
  },
  {
    n: '03',
    title: 'Проект до покупки техники',
    text: 'Считаем мощность, трассы и воздухообмен до того, как вы купите оборудование. Ошибка в подборе стоит дороже проекта: переделывать трассы и менять технику.',
  },
];

export default function Works() {
  return (
    <section className="section" id="raboty">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">04 / работы</div>
          <h2 className="shead__title reveal">Три повода позвонить — и что вы получаете</h2>
          <p className="shead__note body-s reveal">
            Не смешиваем ТО, ремонт и проект в одну строку сметы: у них разные деньги, сроки и ответственность за результат.
          </p>
        </div>
        <div className="works reveal" style={{ marginTop: 'clamp(24px, 3vw, 44px)' }}>
          {WORKS.map((w) => (
            <article className="work" key={w.n}>
              <span className="work__n">{w.n}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

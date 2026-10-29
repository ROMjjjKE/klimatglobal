const WORKS = [
  {
    n: '01',
    title: 'Обслуживание по регламенту',
    text: 'Чистка, дезинфекция от бактерий и запахов, дозаправка фреоном, проверка автоматики, замена фильтров. По пунктам, а не «подули — работает».',
  },
  {
    n: '02',
    title: 'Оперативный ремонт',
    text: 'Течёт, шумит, не охлаждает, не тянет вытяжка: находим причину и устраняем. Свой склад запчастей, поэтому не ждём поставку неделю.',
  },
  {
    n: '03',
    title: 'Проектирование',
    text: 'Расчёт и подбор оборудования под задачу, требования СН и бюджет. Считаем мощность, трассы и воздухообмен до покупки техники.',
  },
];

export default function Works() {
  return (
    <section className="section" id="raboty">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">02 / работы</div>
          <h2 className="shead__title reveal">Три работы, за которыми звонят</h2>
          <p className="shead__note body-s reveal">
            Обслуживание, ремонт и проектирование — разные деньги и разный срок. Не смешиваем их в одну строку сметы.
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

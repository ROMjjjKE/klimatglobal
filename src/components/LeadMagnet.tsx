import { useState } from 'react';

const MAGNETS = [
  {
    key: 'checklist',
    tag: 'PDF в WhatsApp',
    title: 'Чек-лист: 12 вопросов монтажнику до договора',
    text: 'Что спросить про трассу, дренаж, крепёж и гарантию — чтобы не переделывать за свой счёт после первого сезона.',
    pick: 'Получить чек-лист',
  },
  {
    key: 'photo',
    tag: 'Смета за 15 минут',
    title: 'Смета на ТО по фото оборудования',
    text: 'Сфотографируйте шильдик и внутренний блок — вернёмся с суммой на сезон. Без выезда и без «приедем и посмотрим».',
    pick: 'Отправить фото',
  },
  {
    key: 'season',
    tag: 'Напоминание',
    title: 'Напоминание перед сезоном',
    text: 'Напишем за две недели до жары. В июле очередь длиннее, а обслуживание — то же самое и по той же цене.',
    pick: 'Напомнить о ТО',
  },
] as const;

export default function LeadMagnet() {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [want, setWant] = useState<typeof MAGNETS[number]['key']>('checklist');
  const [honey, setHoney] = useState('');
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const pick = (k: typeof MAGNETS[number]['key']) => {
    if (k === 'checklist') window.open('/klimatglobal/materialy/chek-list-12-voprosov.html', '_blank', 'noopener');
    setWant(k);
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return;
    const errs: Record<string, boolean> = {};
    if (name.trim().length < 2) errs.name = true;
    if (tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const titles: Record<string, string> = {
      checklist: 'Чек-лист: 12 вопросов монтажнику до договора',
      photo: 'Смета на ТО по фото оборудования',
      season: 'Напоминание перед сезоном',
    };
    const text = [
      'Заявка с сайта КлиматГлобал',
      `Материал: ${titles[want]}`,
      `Имя: ${name}`,
      `Телефон: ${tel}`,
      want === 'photo' ? 'Готов прислать фото блоков и шильдика в этот чат.' : '',
    ].filter(Boolean).join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375296185321?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setBusy(false);
      setSent(true);
    }, 350);
  };

  return (
    <section className="section lead" id="polza">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">03 / до звонка</div>
          <h2 className="shead__title reveal">Заберите пользу до того, как позвоните</h2>
          <p className="shead__note body-s reveal">
            Три вещи отдаём сразу и без обязательств — проверьте нас до звонка.
          </p>
        </div>

        <div className="lead__grid">
          {MAGNETS.map((m) => (
            <article className="leadCard reveal" key={m.key}>
              <span className="leadCard__tag">{m.tag}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <button type="button" className="link-teal" onClick={() => pick(m.key)}>
                {m.pick} →
              </button>
            </article>
          ))}
        </div>

        <div className="lead__formWrap reveal" id="lead-form">
          <div className="lead__formText">
            <h3>Куда прислать материал</h3>
            <p>
              Один звонок не станет поводом для звонков каждый месяц: присылаем выбранный материал и
              отвечаем на вопросы. Дальше — только если сами напишете.
            </p>
            <ul>
              <li>Чек-лист — сразу в WhatsApp, в день заявки</li>
              <li>Смета по фото — в тот же день, если фото пришли до 18:00</li>
              <li>Напоминание — за две недели до сезона, не раньше</li>
            </ul>
          </div>

          <form className="leadf" onSubmit={submit} noValidate>
            <input
              type="text"
              className="leadf__honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
            />
            <div className="leadf__row">
              <div className="leadf__field">
                <label htmlFor="lead-name">Имя</label>
                <input
                  id="lead-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!bad.name}
                  className={bad.name ? 'bad' : ''}
                />
                {bad.name && <span className="leadf__err">Как к вам обращаться</span>}
              </div>
              <div className="leadf__field">
                <label htmlFor="lead-tel">Телефон</label>
                <input
                  id="lead-tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={!!bad.tel}
                  className={bad.tel ? 'bad' : ''}
                />
                {bad.tel && <span className="leadf__err">Нужен номер для WhatsApp</span>}
              </div>
            </div>

            <div className="leadf__field">
              <label htmlFor="lead-want">Что прислать</label>
              <select id="lead-want" value={want} onChange={(e) => setWant(e.target.value as typeof want)}>
                {MAGNETS.map((m) => (
                  <option key={m.key} value={m.key}>{m.title}</option>
                ))}
              </select>
            </div>

            <button className="btn leadf__btn" type="submit" disabled={busy}>
              {busy ? 'Готовим сообщение…' : 'Получить в WhatsApp'}
            </button>

            {sent && (
              <p className="leadf__ok" role="status">
                Открыли WhatsApp с готовым сообщением — отправьте его, и материал придёт в ответ.
              </p>
            )}

            <p className="leadf__fine">
              Телефон нужен, чтобы отправить материал в WhatsApp. Никаких рассылок без вашего согласия.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

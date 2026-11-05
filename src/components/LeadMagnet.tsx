import { useState } from 'react';

/**
 * Лид-магнит = интерактивный опрос (квиз).
 * Человек отвечает на 4 вопроса, получает персональный разбор ситуации
 * и отправляет заявку в WhatsApp уже с контекстом -- менеджеру не нужно
 * ничего переспрашивать.
 */

type Key = 'obj' | 'qty' | 'sym' | 'when';

const OBJ = ['Квартира', 'Дом', 'Офис', 'Магазин', 'Кафе / ресторан', 'Производство'];
const QTY = ['1 кондиционер', '2–3', '4–6', 'Больше шести'];
const SYM = [
  'Не охлаждает',
  'Течёт или капает',
  'Шумит, гудит',
  'Неприятный запах',
  'Работает — нужно ТО',
  'Не знаю, что с ним',
];
const WHEN = ['Сегодня–завтра', 'На этой неделе', 'В течение месяца', 'Пока узнаю цену'];

const STEPS = [
  { key: 'obj' as Key, q: 'Что за объект?', hint: 'От этого зависит, какой мастер приедет', opts: OBJ },
  { key: 'qty' as Key, q: 'Сколько кондиционеров?', hint: 'Считаем все внутренние блоки', opts: QTY },
  { key: 'sym' as Key, q: 'Что происходит?', hint: 'Опишите симптом, как он есть', opts: SYM },
  { key: 'when' as Key, q: 'Когда нужно?', hint: 'Честный ответ не обязателен к исполнению', opts: WHEN },
];

const SYMPTOM: Record<string, { cause: string; work: string }> = {
  'Не охлаждает': {
    cause:
      'Чаще всего это утечка фреона или забитый конденсор. Реже — компрессор или автоматика: пока приборы не покажут, не гадаем.',
    work: 'Диагностика с манометрами, поиск утечки, дозаправка или ремонт по факту.',
  },
  'Течёт или капает': {
    cause:
      'Почти всегда засорился дренаж или сбился уклон трассы. Вторая причина — перемерзание испарителя из-за грязного фильтра.',
    work: 'Чистка дренажа и поддона, проверка уклона, промывка испарителя.',
  },
  'Шумит, гудит': {
    cause:
      'Вибрация крепления, износ подшипника вентилятора или резонанс корпуса. Видно и слышно на месте за пару минут.',
    work: 'Проверка крепежа, вентилятора, подтяжка и замена виброопор.',
  },
  'Неприятный запах': {
    cause:
      'Биоплёнка на испарителе и в поддоне — результат влаги и пыли. Чисткой наружного блока это не лечится.',
    work: 'Дезинфекция испарителя, чистка фильтров и поддона, обработка антибактериальным составом.',
  },
  'Работает — нужно ТО': {
    cause: 'Хороший сценарий: профилактика дешевле ремонта и меньше внезапных поломок в жару.',
    work: 'Пять пунктов регламента, лишнее вычёркиваем из акта и из суммы.',
  },
  'Не знаю, что с ним': {
    cause: 'Тогда начинаем с диагностики: смотрим систему и говорим причину, а не «нужно менять всё».',
    work: 'Диагностика с проверкой режимов, давлений и электрики.',
  },
};

const URGENT: Record<string, string> = {
  'Сегодня–завтра': 'Ставим в приоритет: аварийные заявки едут первыми.',
  'На этой неделе': 'Подберём слот на этой неделе и подтвердим время звонком.',
  'В течение месяца': 'Запишем на удобную дату: в жару очередь длиннее, лучше заранее.',
  'Пока узнаю цену': 'Ничего не впариваем: назовём цифру, вы решите сами.',
};

export default function LeadMagnet() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [sent, setSent] = useState(false);

  const total = STEPS.length;
  const pick = (key: Key, v: string) => {
    setA((s) => ({ ...s, [key]: v }));
    if (step < total - 1) window.setTimeout(() => setStep((s) => Math.min(s + 1, total)), 140);
  };
  const canNext = !!a[STEPS[step].key as Key];
  const pct = Math.round(((ready ? total : step) / total) * 100);

  const sym = a.sym ? SYMPTOM[a.sym] : null;
  const isBiz = ['Офис', 'Магазин', 'Кафе / ресторан', 'Производство'].includes(a.obj);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) {
      setReady(true);
      return;
    }
    const errs: Record<string, boolean> = {};
    if (name.trim().length < 2) errs.name = true;
    if (tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    const lines = [
      'Заявка из опроса на сайте КлиматГлобал',
      `Объект: ${a.obj || '—'}`,
      `Кондиционеров: ${a.qty || '—'}`,
      `Симптом: ${a.sym || '—'}`,
      `Когда: ${a.when || '—'}`,
      `Имя: ${name}`,
      `Телефон: ${tel}`,
    ].join('\n');
    window.open(`https://wa.me/375296185321?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="section lead" id="polza">
      <div className="wrap">
        <div className="quizHead">
          <div className="micro">03 / опрос</div>
          <div className="quizHead__row">
            <h2 className="quizHead__t">Опрос: что происходит с вашим кондиционером</h2>
            <p className="quizHead__n">
              Четыре вопроса — и вы получаете разбор своей ситуации: вероятная причина, что будем
              делать и сколько это стоит. Без звонка и без обязательств.
            </p>
          </div>
        </div>

        <div className="quiz">
          <div className="quiz__main">
            <div className="quiz__head">
              <span className="quiz__count">
                {ready ? 'Готово' : `Вопрос ${step + 1} из ${total}`}
              </span>
              <span className="quiz__pct">{pct}%</span>
            </div>
            <div
              className="quiz__bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-label="Прогресс опроса"
            >
              <i style={{ width: `${pct}%` }} />
            </div>

            {!ready ? (
              <>
                <h3 className="quiz__q">{STEPS[step].q}</h3>
                <p className="quiz__hint">{STEPS[step].hint}</p>
                <div className="quiz__opts">
                  {STEPS[step].opts.map((o) => (
                    <button
                      type="button"
                      key={o}
                      className={`quiz__opt${a[STEPS[step].key] === o ? ' is-on' : ''}`}
                      aria-pressed={a[STEPS[step].key] === o}
                      onClick={() => pick(STEPS[step].key, o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="quiz__nav">
                  <button
                    type="button"
                    className="quiz__back"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                  >
                    ← Назад
                  </button>
                  <button
                    type="button"
                    className="btn quiz__next"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                  >
                    {step === total - 1 ? 'Показать разбор' : 'Дальше'}
                  </button>
                </div>
              </>
            ) : (
              <form className="quiz__fin" onSubmit={submit} noValidate>
                <div className="quiz__verdict">
                  <span className="quiz__tag">Ваш случай</span>
                  <p className="quiz__cause">{sym ? sym.cause : 'Разберём на месте.'}</p>
                  <p className="quiz__work">{sym ? sym.work : ''}</p>
                  {a.when && <p className="quiz__when">{URGENT[a.when]}</p>}
                  {isBiz && (
                    <p className="quiz__when">
                      Для организации оформим договор, счёт и закрывающие документы — с НДС или без.
                    </p>
                  )}
                </div>
                {!sent ? (
                  <>
                    <div className="leadf__row">
                      <div className="leadf__field">
                        <label htmlFor="q-name">Как обращаться</label>
                        <input
                          id="q-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={!!bad.name}
                          className={bad.name ? 'bad' : ''}
                          placeholder="Александр"
                          autoComplete="name"
                        />
                        {bad.name && <span className="leadf__err">Нужно имя</span>}
                      </div>
                      <div className="leadf__field">
                        <label htmlFor="q-tel">Телефон для WhatsApp</label>
                        <input
                          id="q-tel"
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          aria-invalid={!!bad.tel}
                          className={bad.tel ? 'bad' : ''}
                          placeholder="+375 29 000-00-00"
                          inputMode="tel"
                          autoComplete="tel"
                        />
                        {bad.tel && <span className="leadf__err">Нужен номер</span>}
                      </div>
                    </div>
                    <button className="btn quiz__next" type="submit">
                      Получить разбор в WhatsApp →
                    </button>
                    <p className="quiz__fine">
                      Ответы уйдут мастеру готовым сообщением — переспрашивать по телефону не придётся.
                      Данные не передаём третьим лицам.
                    </p>
                  </>
                ) : (
                  <p className="quiz__ok">
                    Открыли WhatsApp с вашими ответами. Если окно не появилось — позвоните:
                    +375 29 618-53-21.
                  </p>
                )}
                <button
                  type="button"
                  className="quiz__reset"
                  onClick={() => {
                    setReady(false);
                    setStep(0);
                    setSent(false);
                  }}
                >
                  Пройти заново
                </button>
              </form>
            )}
          </div>

          <aside className="quiz__aside">
            <span className="quiz__tag quiz__tag--light">Что вы получите</span>
            <ul>
              <li>
                <b>Причину</b> — что чаще всего даёт такой симптом, без «нужно менять всё»
              </li>
              <li>
                <b>План работ</b> — что именно делает мастер на выезде
              </li>
              <li>
                <b>Чек-лист</b> из 12 вопросов монтажнику —{' '}
                <a href="/klimatglobal/materialy/chek-list-12-voprosov.html" target="_blank" rel="noopener">
                  открыть сразу
                </a>
              </li>
            </ul>
            <p className="quiz__asideNote">
              Опрос — не продажа в лоб: сначала разбор, потом решение. Если случай не наш, скажем прямо.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

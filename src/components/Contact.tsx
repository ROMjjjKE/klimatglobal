import { useState } from 'react';
import type { Mode } from '../App';

const TYPES = ['Квартира', 'Дом', 'Офис', 'Магазин', 'Кафе / ресторан', 'Производство / склад'];
const JOBS = ['Обслуживание (ТО)', 'Ремонт, неисправность', 'Монтаж', 'Проектирование и расчёт', 'Договор на плановое ТО'];

export default function Contact({ mode }: { mode: Mode }) {
  const [f, setF] = useState({ name: '', tel: '', org: '', city: 'Минск', type: TYPES[0], job: JOBS[0], note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      `Заявка с сайта КлиматГлобал (${mode === 'biz' ? 'организация' : 'частное лицо'})`,
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      f.org ? `Организация: ${f.org}` : '',
      `Город: ${f.city}`,
      `Объект: ${f.type}`,
      `Что нужно: ${f.job}`,
      f.note ? `Комментарий: ${f.note}` : '',
    ].filter(Boolean).join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375296185321?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 420);
  };

  return (
    <section className="ask section--flush" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="shead__num micro">07 / заявка</div>
          <h2 className="shead__title reveal">Посчитаем стоимость и согласуем выезд</h2>
          <p className="shead__note reveal" style={{ color: 'rgba(233,240,242,0.7)' }}>
            Позвоните или оставьте заявку: уточним объект, симптомы и удобное время.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефоны</div>
            <div className="ask__phones">
              <a href="tel:+375296185321">+375 29 618-53-21</a>
              <a href="tel:+375296183321">+375 29 618-33-21</a>
            </div>
            <p style={{ marginTop: 22, color: 'rgba(233,240,242,0.7)', fontSize: 'var(--fs-17)', maxWidth: '34ch' }}>
              {mode === 'biz'
                ? 'Для договора на ТО подготовим смету по количеству единиц оборудования и графику выездов.'
                : 'Для квартиры скажем по телефону, что вероятнее всего случилось и сколько будет стоить выезд.'}
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="field--half">
              <div className={bad.name ? 'bad' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label htmlFor="f-name">Имя</label>
                <input id="f-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label htmlFor="f-tel">Телефон</label>
                <input id="f-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            {mode === 'biz' && (
              <div className="field">
                <label htmlFor="f-org">Организация</label>
                <input id="f-org" value={f.org} onChange={(e) => set('org', e.target.value)} placeholder="Название или УНП" autoComplete="organization" />
              </div>
            )}

            <div className="field--half">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label htmlFor="f-type">Объект</label>
                <select id="f-type" value={f.type} onChange={(e) => set('type', e.target.value)}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label htmlFor="f-job">Что нужно</label>
                <select id="f-job" value={f.job} onChange={(e) => set('job', e.target.value)}>
                  {JOBS.map((j) => <option key={j}>{j}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-note">Что происходит с системой</label>
              <textarea id="f-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder="Например: сплит не охлаждает, из блока капает вода" />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — отправьте сообщение. Если не открылось,
                позвоните: <a href="tel:+375296185321" style={{ borderBottom: '1px solid currentColor' }}>+375 29 618-53-21</a>.
              </div>
            )}

            <p className="ask__fine">
              Стоимость называем до начала работ и фиксируем в смете. Цены на сайте нет: одна и та же
              неисправность на бытовом сплите и на канальной системе стоит по-разному.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

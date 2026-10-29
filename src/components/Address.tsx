export default function Address() {
  return (
    <section className="section" id="adres">
      <div className="wrap addr">
        <div>
          <div className="micro" style={{ marginBottom: 14 }}>06 / где мы</div>
          <h2 className="reveal" style={{ fontSize: 'var(--fs-34)', marginBottom: 16 }}>Минск, Домашевский переулок, 11А</h2>
          <p className="body-s">
            Склад запчастей и мастерская на месте: часть работ делаем в цеху, часть — на выезде.
            Аварийная бригада выезжает и в регионы, если система встала.
          </p>
          <p style={{ marginTop: 18 }}>
            <a className="link-teal" href="https://maps.google.com/?q=Минск,+Домашевский+переулок,+11А" target="_blank" rel="noreferrer noopener">
              Открыть на карте
            </a>
          </p>
        </div>
        <div className="addr__rows">
          <div><span className="micro">Адрес</span><span>Минск, Домашевский переулок, 11А</span></div>
          <div><span className="micro">Выезд</span><span>Минск и регионы по заявке</span></div>
          <div><span className="micro">Склад</span><span>Свой склад запчастей</span></div>
          <div><span className="micro">Телефоны</span><span>+375 29 618-53-21 · +375 29 618-33-21</span></div>
        </div>
      </div>
    </section>
  );
}

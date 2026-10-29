export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <h4>КлиматГлобал</h4>
            <p>ООО «КлиматГлобал»<br />Минск, Домашевский переулок, 11А</p>
          </div>
          <div>
            <h4>Телефоны</h4>
            <p>
              <a href="tel:+375296185321">+375 29 618-53-21</a><br />
              <a href="tel:+375296183321">+375 29 618-33-21</a>
            </p>
          </div>
          <div>
            <h4>Работы</h4>
            <p>
              <a href="#raboty">Обслуживание</a><br />
              <a href="#raboty">Ремонт</a><br />
              <a href="#raboty">Проектирование</a>
            </p>
          </div>
          <div>
            <h4>Для кого</h4>
            <p>
              <a href="#usloviya">Квартиры и дома</a><br />
              <a href="#usloviya">Организации</a><br />
              <a href="#adres">Адрес и выезд</a>
            </p>
          </div>
        </div>
        <p className="ftr__legal">
          Сайт не является публичной офертой: стоимость и сроки согласуются после осмотра и фиксируются
          в смете. Фотографии объектов не публикуются. Кондиционеры, вентиляция, ремонт и обслуживание
          в Минске и регионах.
        </p>
      </div>
    </footer>
  );
}

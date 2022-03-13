import { Link } from "react-router-dom";
import { useAuth } from "modules/Auth";
import { ModalLink } from "modules/Modal";
import "./Footer.scss";
import logo from "./logo.svg";

export const Footer: React.FC = () => {
  const auth = useAuth();
  const date = new Date();
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__inner">
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="Империал Тобакко Россия" />
              </div>
            </Link>
            <div className="menu">
              <div className="menu__item">
                <Link to="/">Главная</Link>
              </div>
              <div className="menu__item">
                <Link to="/certificate">Сертификаты</Link>
              </div>
              <div className="menu__item">
                {auth.user ? (
                  <Link to="/personal">Личный кабинет</Link>
                ) : (
                  <ModalLink to="/login">Личный кабинет</ModalLink>
                )}
              </div>
            </div>
            <div className="contacts">
              <div className="contacts__phone">
                <a href="mailto:info@itg-reward.ru">info@itg-reward.ru</a>
              </div>
              <div className="contacts__descr">
                С 09:00 до 20:30 бесплатно по России
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom container">
        <p className="footer__text">
          ©{date.getFullYear()} Выбирай Card — электронные подарочные
          сертификаты
        </p>
        <a href="/" className="footer__text">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};

import { Dialog } from "@reach/dialog";
import { ModalLink, useOnDimiss } from "modules/Modal";
import { Link } from "react-router-dom";

import { useAuth } from "modules/Auth";

import "./Menu.scss";
import logo from "./logo.svg";
import close from "./close.svg";
import user from "./user.svg";
const LK = (auth?: any) => (
  <div className="lk">
    <div className="lk__image">
      <img src={user} alt="Личный кабинет" />
    </div>
    <div className="lk__profile">
      <div className="lk__profile_name">Личный кабинет</div>
      {!auth && <div className="lk__profile_points">0 баллов</div>}
    </div>
  </div>
);

export const Menu: React.FC = () => {
  const onDismiss = useOnDimiss();
  const auth = useAuth();
  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="menu-modal"
    >
      <div className="menu-modal__wrap">
        <div className="menu-modal__top">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Империал Тобакко Россия" />
            </div>
          </Link>
          <div className="menu__close" onClick={onDismiss}>
            <img src={close} alt="" />
          </div>
        </div>
        {auth.user ? (
          <Link to="/personal" className="header__user-wrap">
            <LK auth={auth.user} />
          </Link>
        ) : (
          <ModalLink to="/login" className="header__user-wrap">
            <LK auth={auth.user} />
          </ModalLink>
        )}
        <div className="menu-modal__item">
          <Link to="/">Главная</Link>
        </div>
        <div className="menu-modal__item">
          <Link to="/certificate">Сертификаты</Link>
        </div>
        <div className="menu-modal__item">
          {auth.user ? (
            <Link to="/personal">Личный кабинет</Link>
          ) : (
            <ModalLink to="/login">Личный кабинет</ModalLink>
          )}
        </div>
        <div className="menu-modal__bottom">
          <a href="tel:88000000000" className="menu-modal__text">
            8 800 000 00 00
          </a>
          <p className="menu-modal__text">
            С 09:00 до 20:30 бесплатно по России
          </p>
        </div>
      </div>
    </Dialog>
  );
};

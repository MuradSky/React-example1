import { Link } from "react-router-dom";
import { ModalLink } from "modules/Modal";

import { useAuth } from "modules/Auth";

import "./Header.scss";
import logo from "./logo.svg";
import user from "./user.svg";
import burger from "./burger.svg";
import { groupOfThousands } from "helpers/utils";

const LK: React.FC<{ token?: string; points?: string }> = ({ token, points }) => {
  return (
    <div className="lk">
      <div className="lk__image">
        <img src={user} alt="Личный кабинет" />
      </div>
      <div className="lk__profile">
        <div className="lk__profile_name">Личный кабинет</div>
        {token && <div className="lk__profile_points">{points} баллов</div>}
      </div>
    </div>
  )
};

export const Header: React.FC = () => {
  const auth = useAuth();
  const amount = !auth?.user ? "0" : groupOfThousands(String(auth?.user?.points_amount))
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
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
              <ModalLink to="/feedback">Обратная связь</ModalLink>
            </div>
          </div>
          {auth.token ? (
            <Link to="/personal" className="header__user-wrap">
              <LK token={auth.token} points={amount}/>
            </Link>
          ) : (
            <ModalLink to="/login" className="header__user-wrap">
              <LK />
            </ModalLink>
          )}
          <div className="header__burger">
            <ModalLink to="/menu">
              <img src={burger} alt="" />
            </ModalLink>
          </div>
        </div>
      </div>
    </header>
  );
};

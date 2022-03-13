import { useState } from "react";

import { Button } from "components/Form";
import { NotCards } from "./NotCards";
import { PersonalData } from "./PersonalData";
import { ModalLink } from "modules/Modal";
import { Addresses } from "./Addresses";
import { useAuth } from "modules/Auth";

import unlock from "./unlocked.svg";
import arrow from "./arrow.svg";
import "./personal-area.scss";

export const PersonalArea: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = () => setOpen((state) => !state);

  const { outlets } = useAuth();

  return (
    <div className="personal-area">
      <ModalLink
        to="/password-change"
        className="personal-area__lock personal-area__lock_mobile"
      >
        <img src={unlock} alt="" />
        <span>Сменить пароль</span>
      </ModalLink>
      <div className="personal-area__inner">
        <button
          className={`personal-area__btn ${open ? "active" : ""}`}
          onClick={handleToggle}
        >
          <img src={arrow} alt="" />
        </button>
        <div className="personal-area__item personal-area__item_first">
          <div className="personal-area__head">
            <h4 className="personal-area__title title-18">Личные данные</h4>
          </div>
          <div
            className={`personal-area__body personal-area__body_first ${
              open ? "show" : ""
            }`}
          >
            <PersonalData />
          </div>
        </div>
        <div
          className={`personal-area__item personal-area__item_last ${
            open ? "show" : ""
          }`}
        >
          <div className="personal-area__head">
            <h4
              className={`personal-area__title title-18 hide ${
                open ? "show" : ""
              }`}
            >
              Ваши торговые точки:
            </h4>
          </div>
          <div className={`personal-area__body ${open ? "show" : ""}`}>
            {!outlets?.length ? (
              <NotCards>
                <ModalLink to="/choice-outlet">
                  <Button
                    icon="arrow"
                    color="red"
                    className="personal-area__button"
                  >
                    Выбрать торговые точки
                  </Button>
                </ModalLink>
              </NotCards>
            ) : (
              <Addresses data={outlets} />
            )}
          </div>

          {open && !!outlets?.length && (
            <div className="personal-area__call">
              <ModalLink to="/choice-outlet">Добавить торговые точки</ModalLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

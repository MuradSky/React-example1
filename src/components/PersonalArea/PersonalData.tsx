import { ModalLink } from "modules/Modal";
import { useAuth } from "modules/Auth";

import unlock from "./unlocked.svg";

export const PersonalData: React.FC = () => {
  const { user } = useAuth();

  const beautyPhone = (phone: string) => {
    let cleaned = ("" + phone).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        "+" +
        match[1] +
        "(" +
        match[2] +
        ")" +
        match[3] +
        "-" +
        match[4] +
        "-" +
        match[5]
      );
    }
    return phone;
  };
  const beautySnils = (snils: string) => {
    let cleaned = ("" + snils).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return match[1] + "-" + match[2] + "-" + match[3] + "-" + match[4];
    }
    return snils;
  };

  return (
    <>
      <div className="personal-area__d-flex">
        <div className="personal-data">
          <div className="personal-data__item">
            <p className="personal-data__key">ФИО:</p>
            <p className="personal-data__val">
              {user?.surname} {user?.name} {user?.patronymic}
            </p>
          </div>
          <div className="personal-data__item">
            <p className="personal-data__key">Телефон:</p>
            <p className="personal-data__val">
              {beautyPhone(user?.phone || "")}
            </p>
          </div>
          <ModalLink to="/password-change" className="personal-area__lock">
            <img src={unlock} alt="" />
            <span>Сменить пароль</span>
          </ModalLink>
        </div>
        <div className="personal-data">
          {/* TODO да выведи пока "Резидент другой страны") а там уже по ходу дела разберемся */}
          {/* <div className="personal-data__item">
            <p className="personal-data__key">Гражданство:</p>
            <p className="personal-data__val">
              {user?.is_resident_ru ? "РФ" : "Резидент другой страны"} */}
          {/* </p>
          </div> */}
          {user?.inn && (
            <div className="personal-data__item personal-data__item_last">
              <p className="personal-data__key">ИНН:</p>
              <p className="personal-data__val">{user?.inn}</p>
            </div>
          )}
          {user?.snils && (
            <div className="personal-data__item personal-data__item_last">
              <p className="personal-data__key">СНИЛС</p>
              <p className="personal-data__val">
                {beautySnils(user?.snils || "")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import Tooltip from "rc-tooltip";
import { ReactComponent as Arrow } from "./left.svg";
import zapon from "./zap-on.svg";
import clock from "./clock.svg";
import "rc-tooltip/assets/bootstrap.css";
import { ModalLink } from "modules/Modal";

type TP = {
  id?: number;
  img?: string;
  day?: string;
  title?: string;
  cost?: number;
  zap?: boolean;
  active?: boolean;
  status?: string | null;
};
export const Certificate: React.FC<TP> = ({
  id,
  img,
  day,
  title,
  cost,
  zap,
  active,
  status,
}) => {
  const certStat = status === "user-certificate-new";
  return (
    <div className={`certificate ${certStat ? "disabled" : ""}`}>
      {certStat && (
        <div className="badge">
          <img src={clock} alt="" />
          <p className="badge__text">Сертификат ожидается:</p>
          <p className="badge__day">{day}</p>
        </div>
      )}
      <div className="certificate__img">
        <img src={img} alt="" />
      </div>
      <div className="certificate__bottom">
        <div className="certificate__center">
          <h4 className="certificate__title">{title}</h4>
          {zap && (
            <Tooltip
              placement="top"
              overlay={
                <span>
                  Сертификат будет отправлен вам в течение 3-х дней после заказа
                </span>
              }
            >
              <div className="certificate__zap">
                {" "}
                <img src={zapon} alt="" />{" "}
              </div>
            </Tooltip>
          )}
        </div>
        <div className="certificate__row">
          <div className="certificate__cost">Номинал: {cost} рублей</div>

          <ModalLink to={`/personal/${id}`}>
            <button className="certificate__btn">
              <Arrow />
            </button>
          </ModalLink>
        </div>
      </div>
    </div>
  );
};

import Tooltip from "rc-tooltip";
import { useAuth } from "modules/Auth";
import { ModalLink } from "modules/Modal";
import { useLocation } from "react-router-dom";
import { ReactComponent as ShopBag } from "./shop-bag.svg";
import zap from "./zap.svg";
import "rc-tooltip/assets/bootstrap.css";
interface DataTypes {
  name: string;
  id: number;
  url_image: string;
  min_price?: any;
  max_price?: number;
  is_active?: boolean;
  is_fast_delivery?: any;
  certificates?: any;
}

export const CertificatesItem: React.FC<DataTypes> = ({
  id,
  name,
  url_image,
  min_price,
  max_price,
  is_active,
  is_fast_delivery,
}) => {
  const { user } = useAuth();
  const { search } = useLocation();

  const availability = user && user.amount <= min_price;
 
  return (
    <div className="certificates__item">
      <div className="certificates__item_img">
        <picture>
          <img src={url_image} alt={name} loading="lazy" />
        </picture>
      </div>
      <div className="certificates__item_body">
        <h4 className="certificates__item_title">{name}</h4>
        {is_fast_delivery && (
          <Tooltip
            placement="top"
            overlay={
              <span>
                Сертификат будет отправлен вам в течение 3-х дней после заказа
              </span>
            }
          >
            <div className="certificates__zap">
              {" "}
              <img src={zap} alt="" />{" "}
            </div>
          </Tooltip>
        )}
        <div className="certificates__item_bottom">
          <div className="certificates__cost">
            от {min_price} до {max_price} рублей
          </div>
          <ModalLink
            to={
              !user
                ? "/login"
                : availability
                ? "/not-available"
                : `/certificate`
            }
            search={search}
            hash={user && !availability ? `#${id}` : ""}
          >
            <button className={`certificates__btn ${!is_active && "disabled"}`}>
              <ShopBag className="certificates__btn_icon" />
            </button>
          </ModalLink>
        </div>
      </div>
    </div>
  );
};

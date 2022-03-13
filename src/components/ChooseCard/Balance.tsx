import { Button } from "components/Form";
import { ModalLink } from "modules/Modal";

import gift from "./gift.svg";
import calendar from "./calendar.svg";
import info from "./info.svg";
import help from "./help.svg";
import { useAuth } from "modules/Auth";
import { groupOfThousands } from "helpers/utils";

const GetButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <Button
    color="green"
    className="choose-card__balance_button"
    disabled={disabled}
  >
    <img src={gift} alt="" />
    Получить сертификат
  </Button>
);

export const Balance: React.FC = () => {
  const auth = useAuth();
  const amount = !auth?.user
    ? "0"
    : groupOfThousands(String(auth?.user?.amount));

  return (
    <div className="choose-card__balance">
      <h3 className="choose-card__balance_title title-18">
        Баланс Выбирай card
      </h3>
      <div className="choose-card__balance_num">
        {amount} <span>баллов</span> <img src={info} alt="" />{" "}
      </div>
      <div className="choose-card__balance_point">1 балл = 1 рубль</div>
      {!amount ? (
        <GetButton disabled={!amount} />
      ) : (
        <ModalLink to={`/available-certificates/`}>
          <GetButton disabled={amount === "0"} />
        </ModalLink>
      )}
      <ModalLink to="/history-card" className="choose-card__balance_history">
        <img src={calendar} alt="" />
        <span>История операций</span>
      </ModalLink>
      <ModalLink to="/use-points" className="choose-card__balance_help">
        <img src={help} alt="" />
        <span>Как использовать и копить баллы</span>
      </ModalLink>
    </div>
  );
};

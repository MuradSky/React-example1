import { Button } from "components/Form";
import { ModalLink } from "modules/Modal";

import gift from "./gift.svg";
import calendar from "./calendar.svg";
import { useAuth } from "modules/Auth";
import { groupOfThousands } from "helpers/utils";

const fragment = (
  <>
    <img src={gift} alt="" />
    <span>Получить ВыбирайКарту</span>
  </>
);

export const Balance: React.FC = () => {
  const { user } = useAuth();
  const amount = !user ? "0" : groupOfThousands(String(user?.points_amount));

  return (
    <div className="itg__balance">
      <h3 className="itg__balance_title title-18">баланс в системе ITG</h3>
      <div className="itg__balance_num">
        {amount} <span>баллов</span>
      </div>
      <Button
        color="red"
        className={`itg__balance_button ${
          !user?.points_amount ? "disabled" : ""
        }`}
      >
        {!user?.points_amount ? (
          fragment
        ) : (
          <ModalLink to="/card">{fragment}</ModalLink>
        )}
      </Button>
      {/* <p className="itg__balance_text">Возможность получать подарки откроется: ХХ.06.2021</p> */}
      <ModalLink to="/history-itg" className="itg__balance_history">
        <img src={calendar} alt="" />
        <span>История операций</span>
      </ModalLink>
    </div>
  );
};

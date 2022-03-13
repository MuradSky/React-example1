import { Dialog } from "@reach/dialog";
import { Button } from "components/Form";
import { useOnDimiss } from "modules/Modal";
import { CardList } from "./CardList";

import close from "./close.svg";
import "./History.scss";

export const HistoryCard: React.FC = () => {
  const onDismiss = useOnDimiss();

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="history history_card"
    >
      <button onClick={onDismiss} className="history__close">
        <img src={close} alt="" />
      </button>
      <h3 className="history__title">История операций выбирай карт</h3>
      <ul className="history__head history__head-card">
        <li className="history__head_item">Операция</li>
        <li className="history__head_item">Номинал карты</li>
        <li className="history__head_item">Статус</li>
        <li className="history__head_item">Дата</li>
        <li className="history__head_item">Количество</li>
      </ul>
      <CardList />
      <Button
        color="red"
        type="button"
        className="history-card__btn"
        handleClick={onDismiss}
      >
        Закрыть
      </Button>
    </Dialog>
  );
};

import { Dialog } from "@reach/dialog";
import { Button } from "components/Form";
import { useOnDimiss } from "modules/Modal";
import { ItgList } from "./ItgList";

import close from "./close.svg";
import "./History.scss";

export const HistoryItg: React.FC = () => {
  const onDismiss = useOnDimiss();

  return (
    <Dialog aria-labelledby="label" onDismiss={onDismiss} className="history">
      <button onClick={onDismiss} className="history__close">
        <img src={close} alt="" />
      </button>
      <h3 className="history__title">История операций в системе ITG</h3>
      <ul className="history__head">
        <li className="history__head_item">
          Период
          <br /> программы
        </li>
        <li className="history__head_item">
          Программа
          <span>Торговая точка</span>
        </li>
        <li className="history__head_item">
          Дата получения
          <br /> баллов
        </li>
        <li className="history__head_item">Срок действия до</li>
        <li className="history__head_item">
          Количество
          <br /> баллов
        </li>
      </ul>
      <ItgList />
      <Button
        color="red"
        type="button"
        className="history__btn"
        handleClick={onDismiss}
      >
        Закрыть
      </Button>
    </Dialog>
  );
};

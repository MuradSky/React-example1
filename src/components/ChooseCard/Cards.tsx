import { replaceDate } from "helpers/utils";
import { useAuth } from "modules/Auth";
import { useState } from "react";
import { CardsTableRow } from "./CardsTableRow";

type TPProg = {
  id?: number;
  price?: number;
  balance?: {
    balance: number;
    created_at: string;
    expired_at: string;
  };
};

const renderCardsTableRow = (data?: TPProg[] | any) =>
  !!data?.length ? (
    data.map((item: TPProg, i?: number) => (
      <CardsTableRow
        key={item.id}
        id={item.id}
        created_at={replaceDate(item?.balance?.created_at)}
        expired_at={replaceDate(item?.balance?.expired_at)}
        price={item?.price}
        balance={item?.balance?.balance}
      />
    ))
  ) : (
    <p className="no-card">
      Здесь будет информация о ваших использованных Выбирай Картах
    </p>
  );

const getCards = (cards: any, cb?: any) => cards.filter(cb);

export const Cards: React.FC = () => {
  const { cards } = useAuth();
  const [switched, setSwitched] = useState(0);
  const handleClick = (tab: number) => setSwitched(tab);
  const activeCards =
    cards && getCards(cards, (item: any) => item?.balance?.balance !== 0);
  const archiveCards =
    cards && getCards(cards, (item: any) => item?.balance?.balance === 0);

  return (
    <div className="choose-card__cards">
      <div className="choose-card__cards_head">
        <h3 className="choose-card__cards_title title-18">Выбирай Card</h3>
        <div className="choose-card__cards_tabs">
          <button
            className={`choose-card__cards_tab ${!switched ? "active" : ""}`}
            onClick={() => handleClick(0)}
          >
            Активные
          </button>
          <button
            className={`choose-card__cards_tab ${switched ? "active" : ""}`}
            onClick={() => handleClick(1)}
          >
            Использованные
          </button>
        </div>
      </div>
      <div className="choose-card__table">
        <div className="choose-card__table_item">
          <h4 className="choose-card__table_title">Дата активации</h4>
        </div>
        <div className="choose-card__table_item">
          <h4 className="choose-card__table_title">Использовать до</h4>
        </div>
        <div className="choose-card__table_item">
          <h4 className="choose-card__table_title">Сумма</h4>
        </div>
        <div className="choose-card__table_item">
          <h4 className="choose-card__table_title">Остаток</h4>
        </div>
        <div className="choose-card__table_item">
          <h4 className="choose-card__table_title">Условия</h4>
        </div>
      </div>
      <div className="choose-card__tbody">
        {!switched
          ? renderCardsTableRow(activeCards)
          : renderCardsTableRow(archiveCards)}
      </div>
    </div>
  );
};

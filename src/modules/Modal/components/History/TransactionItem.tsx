import { Contract } from "./Contract";

type TTrans = {
  comment?: string;
  created_at?: string;
  details?: any;
  sum?: any;
  negative_sum?: any;
  user_card_id?: number;
};

const replaceSum = (sum?: string | undefined) => String(sum).replace(/-/i, "");

export const TransactionItem: React.FC<TTrans> = ({
  comment,
  created_at,
  sum,
  negative_sum,
  user_card_id,
}) => {
  return (
    <div className="history__list_item">
      <div className="history__list-card">
        <p className="history__list_cat">Операция</p>
        <span className="red">Активирована карта</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Номинал карты</p>
        <span className="red">{replaceSum(sum)} ₽</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Статус</p>
        <Contract id={user_card_id}/>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Дата</p>
        <span>{replaceSum(created_at)}</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Количество</p>
        <span className="red">+{replaceSum(negative_sum)} баллов</span>
      </div>
    </div>
  );
};

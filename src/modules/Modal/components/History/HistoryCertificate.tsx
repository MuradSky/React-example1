type TPC = {
  name?: string;
  price: number;
  created_at?: string;
  days_left?: string | null;
};

export const HistoryCertificate: React.FC<TPC> = ({
  name,
  price,
  created_at,
  days_left,
}) => {
  return (
    <div className="history__list_item">
      <div className="history__list-card">
        <p className="history__list_cat">Операция</p>
        <span className="green">Сертификат {name}</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Номинал карты</p>
        <span className="green">{price} ₽</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Статус</p>
        {!days_left ? (
          <span>Получен</span>
        ) : (
          <span className="green">Ожидание: {days_left}</span>
        )}
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Дата</p>
        <span>{created_at}</span>
      </div>
      <div className="history__list-card">
        <p className="history__list_cat">Количество</p>
        <span className="green">-{price} баллов</span>
      </div>
    </div>
  );
};

type TP = {
  outlet_id?: number;
  program_period?: string;
  program_name?: string;
  outlet_name?: string;
  created_at?: string;
  expired_at?: string;
  points?: number;
};
export const ItgListItem: React.FC<TP> = ({
  program_period,
  program_name,
  outlet_id,
  outlet_name,
  expired_at,
  created_at,
  points,
}) => {
  return (
    <li className="history__list_item">
      <div className="history__list_period  history__list_col">
        <p className="history__list_cat">
          Период
          <br /> программы
        </p>
        <span>{program_period}</span>
      </div>
      <div className="history__list_center history__list_col">
        <div className="history__list_visit">
          <p className="history__list_cat">Программа</p>
          <span>{program_name}</span>
        </div>
        <div className="history__list_wrap">
          <p className="history__list_cat">Торговая точка</p>
          <div className="history__list_row">
            <div className="history__list_id">{outlet_id}</div>
            <div className="history__list_person">{outlet_name}</div>
          </div>
        </div>
      </div>
      <div className="history__list_date  history__list_col">
        <p className="history__list_cat">
          Дата получения
          <br /> баллов
        </p>
        <span>{created_at}</span>
      </div>
      <div className="history__list_date  history__list_col">
        <p className="history__list_cat">Срок действия до</p>
        <span>{expired_at?.replace(/-/g, ".")}</span>
      </div>
      <div className="history__list_points  history__list_col">
        <p className="history__list_cat">Количество баллов</p>
        <span>{points} баллов</span>
      </div>
    </li>
  );
};

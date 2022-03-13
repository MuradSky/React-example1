import check from "./check.svg";
import minus from "./minus.svg";

type ActivesTP = {
  date?: string;
  status?: string;
  visit?: string;
  id?: number;
  person?: string;
  type?: string;
  sku?: string;
  bvolume?: string;
};

type StatTP = {
  participate: JSX.Element;
  busy: JSX.Element;
};

const statuses: StatTP = {
  participate: (
    <div className="programms__status">
      <img src={check} alt="" />
      Вы участвовали
    </div>
  ),
  busy: (
    <div className="programms__status">
      <img src={minus} alt="" />
      <span>Вы не участвовали</span>
    </div>
  ),
};
export const Archives: React.FC<ActivesTP> = ({
  date,
  status,
  visit,
  id,
  person,
  type,
  sku,
  bvolume,
}) => {
  const fileType: any =
    type === "add-volume"
      ? process.env.PUBLIC_URL + "/program-files/add-volume.pdf"
      : type === "join-visit"
      ? process.env.PUBLIC_URL + "/program-files/joint-visit.pdf"
      : null;

  return (
    <div className="programms">
      <div className="programms__item">
        <div className="programms__wrap">
          <div className="programms__category">Период</div>
          <div className="programms__text mobile">{date}</div>
        </div>
        <div className="programms__wrap">
          <div className="programms__category">Участие</div>
          <div className="mobile">
            {status === "participate" ? statuses.participate : statuses.busy}
            <a
              href={fileType}
              className="programms__link"
              target="_blank"
              rel="noreferrer"
            >
              Читать условия
            </a>
          </div>
        </div>
      </div>
      <div className="programms__item">
        <div className="programms__wrap">
          <div className="programms__category">
            Название
            <br /> программы
          </div>
          <div className="programms__text mobile">{visit}</div>
        </div>
        <div className="programms__wrap">
          <div className="programms__category">Торговая точка</div>
          <div className="programms__item_row mobile">
            <div className="programms__id">{id}</div>
            <div className="programms__text_12">{person}</div>
          </div>
        </div>
      </div>
      <div className="programms__item">
        <div className="programms__wrap">
          <div className="programms__category">Базовый объем</div>
          <div className="programms__id">{!!bvolume ? bvolume : "—"}</div>
        </div>
      </div>
      <div className="programms__item">
        <div className="programms__wrap">
          <div className="programms__category">Показатели</div>
          <div className="programms__text_10 mobile">{sku}</div>
        </div>
      </div>
    </div>
  );
};

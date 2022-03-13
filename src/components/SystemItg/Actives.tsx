import { ModalLink } from "modules/Modal";

import check from "./check.svg";
import plus from "./plus.svg";
import minus from "./minus.svg";

type ActivesTP = {
  programmId?: number;
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
  free: any;
  busy: JSX.Element;
};

const statuses: StatTP = {
  participate: (
    <div className="programms__status">
      <img src={check} alt="" />
      Вы участвуете
    </div>
  ),
  free: (id?: number) => (
    <ModalLink to={`/program-consent/${id}`} className="programms__status">
      <img src={plus} alt="" />
      <span className="green">Участвовать</span>
    </ModalLink>
  ),
  busy: (
    <div className="programms__status">
      <img src={minus} alt="" />
      <span className="busy">Программа занята</span>
    </div>
  ),
};
export const Actives: React.FC<ActivesTP> = ({
  programmId,
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
            {status === "participate"
              ? statuses.participate
              : status === "free"
              ? statuses.free(programmId)
              : status === "busy"
              ? statuses.busy
              : null}
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
          <div className="programms__id">{!!Number(bvolume) ? bvolume : "—"}</div>
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

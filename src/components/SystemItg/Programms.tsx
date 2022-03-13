import { useState } from "react";
import { Actives } from "./Actives";
import { Archives } from "./Archives";
import { useAuth } from "modules/Auth";
import { getProgs } from "helpers/utils";

type TPProg = {
  base_volume: string;
  created_at: string;
  id: number;
  name: string;
  outlet_program_id: number;
  period: string;
  seller_id: number;
  sku: string;
  type: string;
  updated_at: string;
  ext: any;
  status: string;
};

const renderActives = (data?: TPProg[] | any) =>
  !!data[0]?.length ? (
    data.map((dataArray: any) =>
      dataArray.map((item: TPProg, i?: number) => (
        <Actives
          key={item?.id + "_" + item?.seller_id + "_" + i}
          programmId={item?.id}
          date={item?.period}
          status={item?.status}
          visit={item?.name}
          id={item?.ext?.id}
          person={item?.ext?.person}
          type={item?.type}
          bvolume={item?.base_volume}
          sku={item?.sku}
        />
      ))
    )
  ) : (
    <p className="itg__no-programms">Здесь будет информация о программах</p>
  );

const renderArchives = (data?: TPProg[] | any) =>
  !!data[0]?.length ? (
    data.map((dataArray: any) =>
      dataArray.map((item: TPProg, i?: number) => (
        <Archives
          key={item?.id + "_" + item?.seller_id + "_" + i}
          date={item?.period}
          status={item?.status}
          visit={item?.name}
          id={item?.ext?.id}
          person={item?.ext?.person}
          type={item?.type}
          bvolume={item?.base_volume}
          sku={item?.sku}
        />
      ))
    )
  ) : (
    <p className="itg__no-programms">Здесь будет информация о программах</p>
  );

export const Programms: React.FC = () => {
  const { user, outlets } = useAuth();
  const [switched, setSwitched] = useState<number>(0);
  const activeProgs =
    user && outlets && getProgs("active_programs", user.id, outlets);
  const archiveProgs =
    user && outlets && getProgs("archive_programs", user.id, outlets);
  const onlyCurrentUser = archiveProgs?.map((dataArr: any) =>
    dataArr.filter((item: any) => item.seller_id === user.id)
  );

  const handleClick = (tab: number) => setSwitched(tab);

  return (
    <div className="itg__programms">
      <div className="itg__programms_head">
        <h3 className="itg__programms_title title-18">Программы</h3>
        <div className="itg__programms_tabs">
          <button
            className={`itg__programms_tab ${!switched ? "active" : ""}`}
            onClick={() => handleClick(0)}
          >
            Активные
          </button>
          <button
            className={`itg__programms_tab ${switched ? "active" : ""}`}
            onClick={() => handleClick(1)}
          >
            Архивные
          </button>
        </div>
      </div>
      <div className="itg__table">
        <div className="itg__table_item">
          <h4 className="itg__table_title">Период</h4>
          <p className="itg__table_text">Участие</p>
        </div>
        <div className="itg__table_item">
          <h4 className="itg__table_title">Название программы</h4>
          <p className="itg__table_text">Торговая точка</p>
        </div>
        <div className="itg__table_item">
          <h4 className="itg__table_title">Базовый объем</h4>
        </div>
        <div className="itg__table_item">
          <h4 className="itg__table_title">Показатели</h4>
        </div>
      </div>
      <div className="itg__tbody">
        {!switched
          ? renderActives(activeProgs)
          : renderArchives(onlyCurrentUser)}
      </div>
    </div>
  );
};

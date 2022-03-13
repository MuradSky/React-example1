import { useState, useEffect } from "react";
import { replaceDate, routeName } from "helpers/utils";
import axios from "axios";
import { getTokenAuth } from "helpers/utils";
import { Oval } from "react-loader-spinner";
import { ItgListItem } from "./ItgListItem";

type TP = [
  {
    available_at: string;
    comment: string;
    created_at: string;
    id: number;
    outlet_id: string;
    outlet_name: string;
    points: number;
    program_name: string;
    program_period: string;
    seller_id: number;
    type: string;
    user_card: any;
  }
];

export const ItgList: React.FC = () => {
  const token = getTokenAuth();
  const [history, setHistory] = useState<TP | null>(null);

  useEffect(() => {
    axios
      .get(routeName("api.seller.point-transactions"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }: any) => {
        setHistory(data?.data);
      });
  }, [token]);

  return (
    <ul className="history__list">
      {!history ? (
        <div className="history__loader">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      ) : !!history?.length ? (
        history?.map((item: any, i?: number) => {
          return (
            <ItgListItem
              key={item?.outlet_id + "_" + i}
              program_period={item?.program_period}
              program_name={item?.program_name}
              outlet_id={item?.outlet_id}
              outlet_name={item?.outlet_name}
              expired_at={item?.expired_at}
              created_at={replaceDate(item?.created_at)}
              points={item?.points}
            />
          );
        })
      ) : (
        <p className="history__not">
          Здесь будет история операций в системе ITG{" "}
        </p>
      )}
    </ul>
  );
};

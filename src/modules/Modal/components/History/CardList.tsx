import axios from "axios";
import { getTokenAuth, replaceDate, routeName } from "helpers/utils";
import { useAuth } from "modules/Auth";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { HistoryCertificate } from "./HistoryCertificate";
import { TransactionItem } from "./TransactionItem";

type TP = [
  {
    balance_id: number;
    certificate_id: any;
    comment: string;
    created_at: string;
    details: any;
    id: number;
    point_transaction_id: any;
    sum: number;
    updated_at: string;
    user_certificate: boolean;
  }
];

const mapPriceUserCertificate = (data: any, certificates?: any) => {
  
  const certificate = certificates?.find((item: any) => item.id === data?.id);

  return (
    certificate && (
      <>
        <HistoryCertificate
          name={certificate?.certificate?.name}
          price={certificate?.price}
          created_at={replaceDate(certificate?.created_at)}
          days_left={certificate?.days_left}
        />
        {/* {data?.transactions?.map((item: any) => (
          <TransactionItem
            key={item?.id}
            details={item?.details}
            sum={data?.sum}
            negative_sum={item?.sum}
            created_at={replaceDate(item?.created_at)}
          />
        ))} */}
      </>
    )
  );
};

export const CardList: React.FC = () => {
  const { user } = useAuth();
  const token = getTokenAuth();
  const [history, setHistory] = useState<TP | null>(null);
  useEffect(() => {
    axios
      .get(routeName("api.seller.transactions"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }: any) => setHistory(data?.data));
  }, [token]);

  return (
    <>
      {!history ? (
        <div className="history__loader">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      ) : !!history.length ? (
        history?.map((item: any) => (
          <div
            className={`history__list ${history && "setting"}`}
            key={item.id}
          >
            {!item?.certificate_id ? (
              <TransactionItem
                details={item?.details}
                sum={item?.sum}
                negative_sum={item?.sum}
                created_at={replaceDate(item?.created_at)}
                user_card_id={item?.user_card_id}
              />
            ) : (
              mapPriceUserCertificate(item, user?.certificates)
            )}
          </div>
        ))
      ) : (
        <p className="history__not">
          Здесь будет история операций Выбирай Карт
        </p>
      )}
    </>
  );
};

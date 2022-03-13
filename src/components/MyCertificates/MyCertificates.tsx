import { useLayoutEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useAuth } from "modules/Auth";

import { Certificate } from "./Certificate";
import { windowResize, isPad } from "helpers/utils";

import { ReactComponent as Right } from "./right.svg";
import { ReactComponent as Left } from "./left.svg";
import "./MyCertificates.scss";

type CRT = {
  certs?: any;
};
type TP = {
  id?: number;
  days_left?: string;
  status?: {
    code?: string | null;
  };
  certificate?: {
    id?: number;
    is_active?: boolean;
    name?: string;
    url_image?: string;
    price?: number;
    is_fast_delivery?: boolean;
    zap?: boolean;
    day?: boolean;
  };
};

export const MyCertificates: React.FC<CRT> = () => {
  const { user } = useAuth();
  const [mobile, setMobile] = useState<boolean | undefined>(isPad);
  useLayoutEffect(() => {
    windowResize(setMobile, 1024);
  }, []);

  const settingItems = (number: any) => Number((number / 2).toFixed(0));

  const paginationItems = settingItems(user?.certificates?.length);

  return (
    <div className="my-certificates">
      <div className="container">
        <div className="my-certificates__inner">
          <h2 className="my-certificates__title title-18 title-18_green">
            Мои сертификаты
          </h2>
          {!!user?.certificates?.length ? (
            <>
              <div className="my-certificates__wrap">
                {user?.certificates?.map((item?: TP, i?: number) => (
                  <Certificate
                    key={item?.id + "-" + item?.certificate?.id}
                    id={item?.id}
                    active={item?.certificate?.is_active}
                    day={item?.days_left}
                    title={item?.certificate?.name}
                    img={item?.certificate?.url_image}
                    cost={item?.certificate?.price}
                    zap={item?.certificate?.is_fast_delivery}
                    status={item?.status?.code}
                  />
                ))}
              </div>
              {mobile && (
                <ReactPaginate
                  previousLabel={<Right />}
                  nextLabel={<Left />}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageRangeDisplayed={4}
                  pageCount={paginationItems}
                  marginPagesDisplayed={1}
                  containerClassName="pagination green"
                  activeClassName="active"
                />
              )}
            </>
          ) : (
            <p className="no-certificates">Здесь будут ваши сертификаты</p>
          )}
        </div>
      </div>
    </div>
  );
};

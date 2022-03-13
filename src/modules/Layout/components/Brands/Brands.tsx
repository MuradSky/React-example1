import { useLocation } from "react-router-dom";

import { ReactComponent as Brand1 } from "./brand1.svg";
import { ReactComponent as Brand2 } from "./brand2.svg";
import { ReactComponent as Brand3 } from "./brand3.svg";
import { ReactComponent as Brand4 } from "./brand4.svg";
import { ReactComponent as Brand5 } from "./brand5.svg";
import "./Brands.scss";

export const Brands: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <div className={`brands ${pathname !== "/" ? "grey" : ""}`}>
      <div className="container">
        <div className="brands__inner">
          <div className="brands__item">
            <Brand1 />
          </div>
          <div className="brands__item">
            <Brand2 />
          </div>
          <div className="brands__item">
            <Brand3 />
          </div>
          <div className="brands__item">
            <Brand4 />
          </div>
          <div className="brands__item">
            <Brand5 />
          </div>
        </div>
      </div>
    </div>
  );
};

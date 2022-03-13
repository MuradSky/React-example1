import { Link } from "react-router-dom";

import "./Breadcrumb.scss";
import home from "./home.svg";

type TP = {
    crumbs?: any
}

const icons: any = {
    home: home
}

export const Breadcrumb: React.FC<TP> = ({ crumbs }) => {
    const isLast = (index?: number) => index === crumbs.length - 1;
    const beforeLast = (index?: number) => index === crumbs.length - 2;
    return (        
        <nav className="breadcrumb">
            <ul className="breadcrumb__list">
                {crumbs.map((crumb?: any, i?: number)=> {
                    const last = isLast(i);
                    const before = beforeLast(i) ? "last" : ""
                    return (
                        <li key={i} className="breadcrumb__item">
                            {!last ? (
                                <Link to={crumb.link} className={`breadcrumb__link ${before}`}>
                                    <img src={icons[crumb.icon]} alt="" className="breadcrumb__link_icon"/>
                                    <span className="breadcrumb__link_text">{crumb.text}</span>
                                </Link>
                            ) : <p>{crumb.text}</p>}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
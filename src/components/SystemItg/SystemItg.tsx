import { Balance } from "./Balance"
import { Programms } from "./Programms"

import "./SystemItg.scss"

export const SystemItg: React.FC = () => {
    return (
        <div className="itg">
            <div className="itg__wrap">
                <Balance/>
                <Programms/>
            </div>
        </div>
    )
}
import { Balance } from "./Balance"
import { Cards } from "./Cards"

import "./ChooseCard.scss"

export const ChooseCard: React.FC = () => {
    return (
        <div className="choose-card">
            <div className="choose-card__wrap">
                <Balance />
                <Cards />
            </div>
        </div>
    )
}
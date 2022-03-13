import { ModalLink } from "modules/Modal";

type TPdata = {
    id?: number;
    created_at?: string;
    expired_at?: string;
    price?: number;
    balance?: number;
} 

export const CardsTableRow: React.FC<TPdata> = ({
    id,
    created_at,
    expired_at,
    price,
    balance,
}) => {
    return (
        <div className="choose-card__tr">
            <div className="choose-card__tr_item">
                <div className="choose-card__tr_wrap">
                    <div className="choose-card__tr_key">Дата<br/> активации</div>
                    <div className="choose-card__tr_val">{created_at}</div>
                </div>
            </div>
            <div className="choose-card__tr_item">
                <div className="choose-card__tr_wrap">
                    <div className="choose-card__tr_key">Использовать до</div>
                    <div className="choose-card__tr_val">{expired_at}</div>
                </div>
            </div>
            <div className="choose-card__tr_item">
                <div className="choose-card__tr_wrap">
                    <div className="choose-card__tr_key">Сумма</div>
                    <div className="choose-card__tr_val">{price} ₽</div>
                </div>
            </div>
            <div className="choose-card__tr_item">
                <div className="choose-card__tr_wrap">
                    <div className="choose-card__tr_key">Остаток</div>
                    <div className="choose-card__tr_val"><span>{balance} ₽</span></div>
                </div>
            </div>
            <div className="choose-card__tr_item">
                <div className="choose-card__tr_wrap">
                    <div className="choose-card__tr_key">Условия</div>
                    <div className="choose-card__tr_val"><ModalLink to={`/card-detail/${id}`}>Подробнее</ModalLink></div>
                </div>
            </div>
        </div>
    )
}
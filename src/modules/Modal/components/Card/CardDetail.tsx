import { useState } from 'react';
import { Dialog } from '@reach/dialog';
import { Button } from 'components/Form';
import { useOnDimiss } from 'modules/Modal';

import card from "./card.jpg";
import help from "./help.svg";
import loop from "./loop.svg";
import close from "./close.svg"
import down from "./down.svg"

import 'rc-slider/assets/index.css';
import "./Card.scss";
import { useAuth } from 'modules/Auth';
import { useParams } from 'react-router-dom';
import { replaceDate } from 'helpers/utils';

export const CardDetail: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const onDismiss = useOnDimiss()
    const handleOpen = () => setOpen((state?: boolean)  => !state)
    const { cards } = useAuth()
    const { id } = useParams()
    const showCard = cards?.find((item: any) => item?.id === Number(id))
    
    return (
        <Dialog
            aria-labelledby="label"
            onDismiss={onDismiss}
            className="card"
            >
            <button onClick={onDismiss} className="form-modal__close">
                <img src={close} alt="" />
            </button>
            <div className="card__inner">
                <div className="card__row">
                    <div className="card__block">
                        <h3 className="card__title">Выбирай Card</h3>
                        <p className="card__text">Универсальная подарочная карта, которую можно обменять на подарочные карты брендов из каталога.</p>
                        
                        {!!cards.length && 
                            <div className="card__status">
                                <p className="card__text">Дата активации: <span className="card__text_red">{replaceDate(showCard?.card?.created_at)}</span></p>
                                <p className="card__text"><span className="card__text_red">Срок действия: {showCard?.valid_until}</span></p>
                            </div>
                        }
                    </div>
                    <div className="card__img">
                        <img src={card} alt="" />
                    </div>
                </div>
                <p className={`card__text card__text_mobile ${open ? "open" : ""}`} onClick={handleOpen}>
                    <span>Универсальная подарочная карта, которую можно обменять на подарочные карты брендов из каталога.</span>
                    <img src={down} alt="" />    
                </p>
                <div className="form card__form">
                    <div className="card__form_row card__form_row_mr">
                        <div className="card__form_item">
                            <img src={loop} alt="" />
                            <span>Требуется обменять на подарочную карту другого бренда из каталога</span>
                        </div>
                        <div className="card__form_item">
                            <img src={help} alt="" />
                            <span>Ознакомьтесь со списком магазинов, которые входят в Выбирай Card</span>
                        </div>
                    </div>
                    <div className="card__form_row">
                        <Button color="red" handleClick={onDismiss}>Закрыть</Button>
                    </div>
                </div>
            </div>            
        </Dialog>
    )
}
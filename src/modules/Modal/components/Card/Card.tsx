import { useRef, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import NumberFormat from "react-number-format";
import Slider from "rc-slider";
import { Dialog } from "@reach/dialog";
import { Button } from "components/Form";
import { useOnDimiss } from "modules/Modal";

import axios from "axios";

import card from "./card.jpg";
import help from "./help.svg";
import loop from "./loop.svg";
import close from "./close.svg";
import down from "./down.svg";
import box from "./box.svg";
import checked from "./checked.svg";

import "rc-slider/assets/index.css";
import "./Card.scss";

import { useAuth } from "modules/Auth";
import { useModalCallLink } from "helpers/hooks";
import { routeName } from "helpers/utils";
import { TByCard } from "modules/Auth/type";

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data);

export const Card: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const [number, setNumber] = useState<any>("");
  const [chekced, setChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const refInputNominal = useRef<HTMLInputElement>(null);
  const onDismiss = useOnDimiss();
  const auth = useAuth();
  const modalCall = useModalCallLink();
  const { data } = useSWR(routeName("api.card.flexible"), fetcher);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValid(true);
    const card: TByCard = {
      price: { card_price: number },
      id: data?.data?.id,
    };

    number &&
      auth.sallerByCardFlexible(card, (res) => {
        if (res?.data?.message === "Success") modalCall("/success");
        else toast.error(res);
        setFormValid(false);
      });
  };

  const points_amount = auth?.user?.points_amount;

  const onSliderChange = (value?: any) => setNumber(value);
  const onDenominationChange = (prop: { floatValue?: any }) => {
    if (+prop?.floatValue > points_amount) return setNumber(points_amount);
    if (+prop?.floatValue === 0) return setNumber("");
    setNumber(prop?.floatValue);
  };
  const onChecked = () => setChecked((state?: boolean) => !state);
  const handleOpen = () => setOpen((state?: boolean) => !state);

  const formater = (number: number) => {
    let mask = "";
    String(number)
      .split("")
      .forEach(() => (mask += "#"));
    return mask;
  };
  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={refInputNominal}
      onDismiss={onDismiss}
      className="card"
    >
      {formValid && (
        <div className="form-modal__spin">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      )}
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <div className="card__inner">
        <div className="card__row">
          <div className="card__block">
            <h3 className="card__title">Выбирай Card</h3>
            <p className="card__text">
              Универсальная подарочная карта, которую можно обменять на
              подарочные карты брендов из каталога.
            </p>
          </div>
          <div className="card__img">
            <img src={card} alt="" />
          </div>
        </div>
        <p
          className={`card__text card__text_mobile ${open ? "open" : ""}`}
          onClick={handleOpen}
        >
          <span>
            Универсальная подарочная карта, которую можно обменять на подарочные
            карты брендов из каталога.
          </span>
          <img src={down} alt="" />
        </p>
        <form onSubmit={onSubmit} className="form card__form">
          <div className="card__form_row card__form_row-reverse">
            <label
              htmlFor="choose_denomination"
              className="card__form_label form__label"
            >
              <p>Выбрать номинал</p>
              <div className="card__form_input">
                <NumberFormat
                  value={number}
                  defaultValue={number}
                  format={formater(points_amount)}
                  id="choose_denomination"
                  placeholder="0"
                  onValueChange={onDenominationChange}
                />
                <div className="card__form_suffix">₽</div>
              </div>
            </label>

            <div className="card__form_slider">
              <div className="card__form_row">
                <p>{number || "0"} ₽</p>
                <p>{points_amount} ₽</p>
              </div>
              <Slider
                max={points_amount}
                value={number}
                onChange={onSliderChange}
              />
            </div>
          </div>
          <div className="card__form_row card__form_row-margin">
            <div className="card__form_item">
              <img src={loop} alt="" />
              <span>
                Требуется обменять на подарочную карту другого бренда из
                каталога
              </span>
            </div>
            <div className="card__form_item">
              <img src={help} alt="" />
              <span>
                Ознакомьтесь со списком магазинов, которые входят в Выбирай Card
              </span>
            </div>
          </div>
          <div className="card__form_warn">
            Для того, чтобы получить Выбирай-карту, подпишите Договор дарения
            подарка.
          </div>
          <div className="card__form_row">
            <label htmlFor="treaty" className="form__checkbox">
              <div className="form__checkbox_row">
                <input
                  name="treaty"
                  type="checkbox"
                  id="treaty"
                  onChange={onChecked}
                  hidden
                />
                <span className="form__checkbox_figure">
                  <img src={box} alt="" />
                  <img
                    src={checked}
                    alt=""
                    className="form__checkbox_checked"
                  />
                </span>
                <span className="form__text">
                  Я согласен с Договором подарка
                </span>
              </div>
            </label>
            <Button color="red" type="submit" disabled={!chekced || !number}>
              Получить Выбирай Card
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

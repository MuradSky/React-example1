import { useState } from "react";

import NumberFormat from "react-number-format";
import Slider from "rc-slider";
import { Button } from "components/Form";
import { useAuth } from "modules/Auth";

export const FlexiblePrice: React.FC<{
  certificate: {
    id: number;
  };
  openAlert?: any;
  handleSubmit?: any;
}> = ({ openAlert, certificate, handleSubmit }) => {
  const [number, setNumber] = useState<number | undefined>(0);
  const { user } = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(certificate.id, number);
  };

  const onDenominationChange = (prop: { floatValue?: any }) => {
    if (prop?.floatValue > user?.amount) return setNumber(user?.amount);
    setNumber(prop?.floatValue);
  };
  const onSliderChange = (value?: any) => setNumber(value);

  return (
    <form action="" onSubmit={onSubmit} className="form order-form">
      <div className="order__row order__row_reverse">
        <label
          htmlFor="choose_denomination"
          className="order-form__label form__label"
        >
          <p>Выбрать номинал</p>
          <div className="order-form__input">
            <NumberFormat
              value={number}
              defaultValue={number}
              format="#####"
              id="choose_denomination"
              placeholder="0"
              onValueChange={onDenominationChange}
            />
            <div className="order-form__suffix">₽</div>
          </div>
        </label>

        <div className="order-form__slider">
          <div className="order__row order__row_fix">
            <p>{number} ₽</p>
            <p>{user?.amount} ₽</p>
          </div>
          <Slider
            min={0}
            max={user?.amount}
            value={number}
            onChange={onSliderChange}
          />
        </div>
      </div>
      <div className="order__row order-form__btns">
        <Button color="green" type="submit" disabled={!number}>
          Заказать
        </Button>
        <button type="button" className="order__rules" onClick={openAlert}>
          Правила использования
        </button>
      </div>
    </form>
  );
};

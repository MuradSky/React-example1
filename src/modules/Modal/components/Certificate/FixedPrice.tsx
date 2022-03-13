import { Button } from "components/Form";
import { useState } from "react";
import Select from "react-select";

type TP = {
  certificates: object[];
  openAlert?: () => void;
  handleSubmit?: any;
};

export const FixedPrice: React.FC<TP> = ({
  certificates,
  openAlert,
  handleSubmit,
}) => {
  const [priceVal, setPriceVal] = useState<{
    id: number;
    value: number;
    label: number;
  }>({
    id: 0,
    value: 0,
    label: 0,
  });

  const handleChange = (value: any) => setPriceVal(value);
  const onSubmit = () => handleSubmit(priceVal.id, priceVal.value);
  const options = certificates?.map((item: any) => ({
    id: item.id,
    value: item.price,
    label: item.price,
  }));

  return (
    <div className="form order-form">
      <div className="order__row order__row_reverse">
        <div className="order-form__label order-form__label_fix form__label">
          <p>Выбрать номинал</p>
        </div>
        <div className="order-form__select">
          <Select
            placeholder="Выбрать номинал"
            onChange={handleChange}
            options={options}
            classNamePrefix="select"
          />
        </div>
      </div>
      <div className="order__row order-form__btns">
        <Button
          color="green"
          type="submit"
          disabled={!priceVal.value}
          handleClick={onSubmit}
        >
          Заказать
        </Button>
        <button type="button" className="order__rules" onClick={openAlert}>
          Правила использования
        </button>
      </div>
    </div>
  );
};

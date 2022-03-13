import { Controller, useFormContext } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

type TP = {
  id?: any;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

registerLocale("ru", ru);

export const DatePickerInput: React.FC<TP> = ({
  id,
  placeholder,
  value = "",
  disabled,
}) => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (!!value) {
      const date = new Date(value);
      setValue(id, date);
    }
  }, [id, value, setValue]);

  const error = errors[id]?.message;
  const isValid = watch();
  console.log(value);
  return (
    <label
      htmlFor={id}
      className={`form__label ${error ? "error" : ""} ${
        isValid[id] ? "valid" : ""
      }`}
    >
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              locale="ru"
              selected={field.value}
              onChange={(e) => field.onChange(e)}
              disabled={disabled}
              dateFormat="dd.MM.yyyy"
              id={id}
            />
          );
        }}
      />
      <div className="form__placeholder">{placeholder}</div>
      {error && <span className="form__error">{error}</span>}
    </label>
  );
};

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

type TP = {
  id?: any;
  format?: string;
  mask?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
};

export const NumericMask: React.FC<TP> = ({
  id,
  format,
  mask,
  placeholder,
  disabled,
  readOnly,
  value,
}) => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    if (!!value) setValue(id, value);
  }, [id, value, setValue]);

  const error = errors[id]?.message;
  const isValid = watch();

  return (
    <label
      htmlFor={id}
      className={`form__label ${error ? "error" : ""} ${
        isValid[id] ? "valid" : ""
      }`}
    >
      <NumberFormat
        id={id}
        format={format}
        mask={mask}
        onValueChange={(data?: any) => setValue(id, data.value)}
        {...register(id, {
          required: true,
          minLength: 12,
        })}
        disabled={disabled}
        readOnly={readOnly}
        value={getValues(id)}
      />
      <div className="form__placeholder">{placeholder}</div>
      {error && <span className="form__error">{error}</span>}
    </label>
  );
};

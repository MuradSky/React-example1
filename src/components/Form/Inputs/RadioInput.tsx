import { useFormContext } from "react-hook-form";

type TP = {
  id?: any;
  name?: any;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  checked?: boolean;
};

export const RadioInput: React.FC<TP> = ({
  id,
  name,
  type,
  value,
  placeholder,
  disabled,
  checked,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message;
  return (
    <label htmlFor={id} className={`form__radio ${error ? "error" : ""}`}>
      <input
        id={id}
        value={value}
        type={type}
        {...register(name)}
        disabled={disabled}
        checked={checked}
        hidden
      />
      <span className="form__radio_figure"></span>
      <span className="form__text">{placeholder}</span>
    </label>
  );
};

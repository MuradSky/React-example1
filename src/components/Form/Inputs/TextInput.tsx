import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import eye from "./eye.svg";
import eye_hide from "./eye-crossed.svg";

type TP = {
  id?: any;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  serverErrors?: string;
  value?: string;
};

export const TextInput: React.FC<TP> = ({
  id,
  type,
  readOnly,
  disabled,
  placeholder,
  value,
  ...props
}) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [toggleView, setToggleView] = useState<boolean>(false);

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
      <input
        type={!toggleView ? type : "text"}
        id={id}
        readOnly={readOnly}
        disabled={disabled}
        value={getValues(id)}
        {...register(id)}
        {...props}
      />
      <div className="form__placeholder">{placeholder}</div>

      {type === "password" ? (
        <div className="form__eye" onClick={() => setToggleView(!toggleView)}>
          <img src={toggleView ? eye : eye_hide} alt="" />
        </div>
      ) : null}
      {error && <span className="form__error">{error}</span>}
    </label>
  );
};

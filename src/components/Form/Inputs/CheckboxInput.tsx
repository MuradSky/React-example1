import { useController, useFormContext } from "react-hook-form";

type TP = {
  id?: string;
  name?: any;
  type?: string;
  value?: number;
  placeholder?: string;
  reset?: any;
};

export const CheckboxInput: React.FC<TP> = ({
  id,
  name,
  type,
  value,
  placeholder,
  reset,
}) => {
  const { resetField, control, formState: { errors } } = useFormContext()
  const { field: { onChange }, } = useController({name, control});
  const error = errors[name]?.message

  const triggered =(e?: JSX.Element) => {
    onChange(e)
    resetField(reset)
  }

  return (
    <label htmlFor={id} className={`form__radio ${error ? "error" : ""}`}>
      <input
          id={id}
          value={value}
          type={type}
          onChange={(e?: any)=> triggered(e)}
          hidden
        />
      <span className="form__radio_figure"></span>
      <span className="form__text">{placeholder}</span>
    </label>
  );
};

import { useController, useFormContext } from "react-hook-form";

import box from "./box.svg";
import checked from "./checked.svg";

type TP = {
  name?: any;
  handleChange?: any;
};

export const Checkbox: React.FC<TP> = ({ name, handleChange, children }) => {
  const { control, formState: { errors } } = useFormContext()
  const { field: { onChange }, } = useController({ name, control});
  const error = errors[name]?.message
  const trigger = (e: any) => {
     if(name) return onChange(e)
     handleChange()
  }
  
  return (
    <label htmlFor={name} className={`form__checkbox ${error ? "error" : ""}`}>
      <div className="form__checkbox_row">
        <input
          name={name}
          type="checkbox"
          id={name}
          onChange={(e: any) => trigger(e)}
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
           {children}
        </span>
      </div>
    </label>
  );
};

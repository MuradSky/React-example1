import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Inputmask from "inputmask";
type TP = {
  id?: any;
  disabled?: boolean;
  readOnly?: boolean;
};

const regex = '\\+7 \\([0-6,9]{1}[0-9]{2}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
const im = new Inputmask({regex})

export const PhoneMask: React.FC<TP> = ({
  id,
  disabled,
  readOnly,
}) => {
  const inputRef = useRef<any>(null)
  const { register, setValue, formState: { errors } } = useFormContext()
  
  useEffect(()=> {
    im.mask(inputRef.current)
  })

  const error = errors[id]?.message
  const onChange = (e: any) => {
    const sliceVal = e.target.value.replace(/[^\d+]/g, '').slice(1)
    setValue("phone", sliceVal)
  }

  return (
    <label htmlFor={id} className={`form__label ${error ? "error" : ""}`}>
      <input type="text" 
        id={id}
        placeholder="+7 (___) ___-__-__"
        {...register("phone")}
        disabled={disabled}
        readOnly={readOnly}
        ref={inputRef}
        onChange={onChange}
      />
      {error && <span className="form__error"> {error} </span>}
    </label>
  );
};

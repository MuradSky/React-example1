import { useFormContext } from "react-hook-form";

type TP = {
  id?: any
  readOnly?: boolean
  disabled?: boolean
  placeholder?: string
  serverErrors?: string 
}

export const Textarea: React.FC<TP> = ({
  id,
  readOnly,
  disabled,
  placeholder,
  serverErrors,
  ...props
}) => {
  const { register, watch, formState: { errors } } = useFormContext()
  const error = errors[id]?.comment
  const isValid = watch()

  return (
    <label
      htmlFor={id}
      className={`form__label ${error ? "error" : ""} ${isValid[id] ? "valid" : ""}`}
    >
      <textarea
        id={id}
        readOnly={readOnly}
        disabled={disabled}
        {...register(id)}
        {...props}
      ></textarea>
      <div className="form__placeholder">{placeholder}</div>
      {error && <span className="form__error">{error}</span>}
    </label>
  )
}

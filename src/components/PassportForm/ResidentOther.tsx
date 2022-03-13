import { TextInput, NumericMask } from "components/Form";
import { DatePickerInput } from "components/Form/Inputs";

export const ResidentOther: React.FC<{ isValid?: boolean; data?: any }> = ({
  isValid,
  data,
}) => {
  return (
    <>
      <TextInput
        id="citizenship"
        type="text"
        placeholder="Гражданство*"
        disabled={isValid}
        value={data?.citizenship}
      />
      <div className="passport-form__row">
        <NumericMask
          id="series"
          format="####"
          mask="*"
          placeholder="Серия паспорта*"
          disabled={isValid}
          value={data?.series}
        />

        <NumericMask
          id="number"
          format="######"
          mask="*"
          placeholder="Номер паспорта*"
          disabled={isValid}
          value={data?.number}
        />
      </div>
      <TextInput
        id="issued_by"
        type="text"
        placeholder="Кем выдан*"
        disabled={isValid}
        value={data?.issued_by}
      />
      <div className="passport-form__row">
        <DatePickerInput
          id="date_issued_at"
          placeholder="Дата выдачи*"
          disabled={isValid}
          value={data?.date_issued_at}
        />

        <NumericMask
          id="department_code"
          format="###-###"
          mask="*"
          placeholder="Код подразделения*"
          disabled={isValid}
          value={data?.department_code}
        />
      </div>
    </>
  );
};

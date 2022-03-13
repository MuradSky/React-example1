import { NumericMask, TextInput } from "components/Form";
import { DatePickerInput } from "components/Form/Inputs";

export const ResidentRF: React.FC<{ isValid?: boolean; data?: any }> = ({
  isValid,
  data,
}) => {
  return (
    <>
      <div className="passport-form__row">
        <NumericMask
          id="series"
          format="######"
          mask="*"
          placeholder="Серия паспорта*"
          disabled={isValid}
          value={data?.series}
        />
        <NumericMask
          id="number"
          format="####"
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
      <TextInput
        id="registration_address"
        type="text"
        placeholder="Адрес проживания по прописке*"
        disabled={isValid}
        value={data?.registration_address}
      />
      <div className="passport-form__row">
        <NumericMask
          id="snils"
          format="####"
          mask="*"
          placeholder="СНИЛС*"
          disabled={isValid}
          value={data?.snils}
        />

        <NumericMask
          id="inn"
          format="######"
          mask="*"
          placeholder="ИНН*"
          disabled={isValid}
          value={data?.inn}
        />
      </div>
    </>
  );
};

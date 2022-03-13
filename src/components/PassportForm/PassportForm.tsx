import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, RadioInput, Button } from "components/Form";
import { DatePickerInput } from "components/Form/Inputs";
import "./PassportForm.scss";
import { ResidentOther } from "./ResidentOther";
import { ResidentRF } from "./ResidentRF";
import { passportScheme } from "helpers/utils";
import { FileDropZone } from "./FileDropZone";
import { Oval } from "react-loader-spinner";
import { useAuth } from "modules/Auth";
import { dropzones, FOR_RESIDENT_RF, FOR_RESIDENT } from "./types";

let schema: any = {};

export const PassportForm: React.FC = () => {
  const [switched, setSwitched] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passportData, setPassportData] = useState<any>(null);
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    auth.getPassportDetails((res: any) => {
      setPassportData(res?.data?.data);
      if (res?.data?.data?.citizenship !== "Русский") setSwitched(true);
      else setSwitched(false);
    });
  }, [auth]);

  const handleClickRF = () => {
    if (isValid) return;
    FOR_RESIDENT_RF.forEach((item) => methods.resetField(item));
    setSwitched(false);
  };
  const handleClickNoRF = () => {
    if (isValid) return;
    FOR_RESIDENT.forEach((item) => methods.resetField(item));
    setSwitched(true);
  };

  schema = yup.object().shape({
    ...passportScheme,
    otherResident: yup.boolean().default(!!switched),
  });

  const onSubmit = (data?: any): void => {
    setIsValid(true);
    setTimeout(() => setIsValid(false), 3000);
  };

  return (
    <div className="passport-form">
      <div className="passport-form__inner">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
            <TextInput
              id="surname"
              type="text"
              placeholder="Фамилия*"
              disabled={isValid}
              value={passportData?.surname}
            />
            <TextInput
              id="name"
              type="text"
              placeholder="Имя*"
              disabled={isValid}
              value={passportData?.name}
            />
            <TextInput
              id="patronymic"
              type="text"
              placeholder="Отчество*"
              disabled={isValid}
              value={passportData?.patronymic}
            />
            <DatePickerInput
              id="birthday"
              placeholder="Дата рождения*"
              disabled={isValid}
              value={passportData?.birthday}
            />

            <div className="form__d-flex">
              <p>Пол*</p>
              <RadioInput
                id="1"
                type="radio"
                name="gender"
                placeholder="Женщина"
                value="0"
                disabled={isValid}
                checked={passportData?.gender === 0}
              />
              <RadioInput
                id="0"
                type="radio"
                name="gender"
                placeholder="Мужчина"
                value="1"
                disabled={isValid}
                checked={passportData?.gender === 1}
              />
            </div>
            <div className="passport-form__switch">
              <Button
                color="red"
                type="button"
                className={`passport-form__btn ${!switched ? "active" : ""}`}
                handleClick={handleClickRF}
              >
                Гражданин РФ
              </Button>
              <Button
                color="red"
                type="button"
                className={`passport-form__btn ${switched ? "active" : ""}`}
                handleClick={handleClickNoRF}
              >
                Резидент другой страны
              </Button>
            </div>
            <p className="passport-form__text">
              Обратите внимание: Паспортные данные требуются <br />
              для Оформления Акта приема-передачи подарка и оплаты налога.
              <span>
                Неполные или неверно заполненные данные не позволят получить
                подарок.
              </span>
            </p>
            {!switched ? (
              <>
                <ResidentRF isValid={isValid} data={passportData} />
                <FileDropZone
                  data={dropzones}
                  error={methods.formState.errors}
                  isValid={isValid}
                />
              </>
            ) : (
              <>
                <ResidentOther isValid={isValid} data={passportData} />
                <FileDropZone
                  data={[dropzones[0]]}
                  error={methods.formState.errors}
                  isValid={isValid}
                />
              </>
            )}
            <Button
              color="red"
              type="submit"
              className={`passport-form__submit ${isValid ? "valid" : ""}`}
              disabled={isValid}
            >
              {isValid && (
                <Oval
                  color="#98092D"
                  height={35}
                  width={35}
                  secondaryColor="#ab3a57"
                />
              )}
              <span>Сохранить</span>
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

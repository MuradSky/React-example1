import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@reach/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";

import { TextInput, Button, NumericMask } from "components/Form";
import { useOnDimiss } from "modules/Modal";
import { useAuth } from "modules/Auth";
import { confirmRegistrationScheme } from "helpers/utils";

import close from "./close.svg";

const schema = yup.object(confirmRegistrationScheme);

export const ConfirmRegistration: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const [disableConfirm, setDisableConfirm] = useState<boolean>(true);
  const onDismiss = useOnDimiss();
  const auth = useAuth();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const changeForm = (e: any) => {
    const fields = methods.getValues();
    if (fields.code && fields.password.length > 5) {
      setDisableConfirm(false);
    } else {
      setDisableConfirm(true);
    }
  };

  const onSubmit = (data?: any): void => {
    setFormValid(true);
    data &&
      auth.confirmPhone(data, (res: any) => {
        if (res?.data?.token) {
          setFormValid(false);
          navigate("/personal", { replace: true });
        } else {
          setFormValid(false);
          Object.keys(res).forEach((name?: any) =>
            methods.setError(name, { message: res[name][0] })
          );
        }
      });
  };

  const beautyPhone = (phone: string) => {
    let cleaned = ("" + phone).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        "+" +
        match[1] +
        " (" +
        match[2] +
        ") " +
        match[3] +
        "-" +
        match[4] +
        "-" +
        match[5]
      );
    }
    return phone;
  };

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="form-modal"
    >
      {formValid && (
        <div className="form-modal__spin">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      )}
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <h3 className="form-modal__title">подтверждение Регистрация</h3>
      <p className="form__text form__text_mb">
        Кодом подтверждения являются последние 4 цифры нашего номера, с которого
        был совершён вызов на указанный вами номер телефона{" "}
        {beautyPhone(auth?.user?.phone)}.
      </p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form"
          onChange={changeForm}
        >
          <NumericMask
            id="code"
            format="######"
            placeholder="Код подтверждения"
          />
          <TextInput id="password" type="password" placeholder="Новый пароль" />
          <TextInput
            id="password_confirmation"
            type="password"
            placeholder="Новый пароль"
          />
          <Button
            type="submit"
            color="red"
            className="form__submit"
            disabled={disableConfirm}
          >
            Отправить
          </Button>
          {/* <button className="form__btn1" >Позвонить ещё раз</button> */}
        </form>
      </FormProvider>
    </Dialog>
  );
};

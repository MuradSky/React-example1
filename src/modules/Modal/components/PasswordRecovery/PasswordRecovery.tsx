import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@reach/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";

import { useAuth } from "modules/Auth";
import { useModalCallLink } from "helpers/hooks";
import { PhoneMask, Button } from "components/Form";
import { ModalLink, useOnDimiss } from "modules/Modal";
import { passwordRecoveryScheme } from "helpers/utils";

import close from "./close.svg";
import share from "./share.svg";

const schema = yup.object(passwordRecoveryScheme);

export const PasswordRecovery: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const modalCall = useModalCallLink();
  const auth = useAuth();
  const onDismiss = useOnDimiss();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data?: any): void => {
    setFormValid(true);
    data &&
      auth.passwordRecovery(data, (res: any) => {
        if (res?.data?.message === "Success") {
          setFormValid(false);
          modalCall("/confirm-registration");
        } else {
          setFormValid(false);
          methods.setError("phone", { message: res });
        }
      });
  };

  const { phone } = methods.watch();

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="form-modal"
    >
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
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
      <h3 className="form-modal__title">Восстановление пароля</h3>
      <p className="form__text form__text_mb">
        Кодом подтверждения являются последние 4 цифры нашего номера, с которого
        был совершён вызов на указанный вами номер телефона.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <PhoneMask id="phone" />
          <Button
            type="submit"
            color="red"
            className="form__submit"
            disabled={phone?.length < 11}
          >
            Отправить
          </Button>
        </form>
      </FormProvider>
      <ModalLink to="/login" className="form__login">
        <img src={share} alt="" />
        <span>Войти</span>
      </ModalLink>
    </Dialog>
  );
};

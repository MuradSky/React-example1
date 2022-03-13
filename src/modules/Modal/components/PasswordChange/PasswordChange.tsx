import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@reach/dialog";
import { Oval } from "react-loader-spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextInput, Button } from "components/Form";
import { useOnDimiss } from "modules/Modal";
import { useAuth } from "modules/Auth";
import { passwordChangeScheme } from "helpers/utils";
import { useModalCallLink } from "helpers/hooks";

import close from "./close.svg";

const schema = yup.object(passwordChangeScheme);

export const PasswordChange: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const [disableChange, setDisableChange] = useState<boolean>(true);
  const onDismiss = useOnDimiss();
  const modalCall = useModalCallLink();
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const changeForm = (e: any) => {
    const fields = methods.getValues();
    if (fields?.password?.length > 5) {
      setDisableChange(false);
    } else {
      setDisableChange(true);
    }
  };

  const onSubmit = (data?: any): void => {
    setFormValid(true);
    data &&
      auth.changePass(data, (res: any) => {
        if (res?.data?.message === "Success") {
          setFormValid(false);
          modalCall("/password-change-succes");
        } else {
          Object.keys(res).forEach((name?: any) =>
            methods.setError(name, { message: res[name][0] })
          );
          setFormValid(false);
        }
      });
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
      <h3 className="form-modal__title">Смена пароля</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form"
          onChange={changeForm}
        >
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
            disabled={disableChange}
          >
            Сменить пароль
          </Button>
        </form>
      </FormProvider>
    </Dialog>
  );
};

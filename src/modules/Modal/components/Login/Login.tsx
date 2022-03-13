import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@reach/dialog";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "modules/Auth";
import { ModalLink, useOnDimiss } from "modules/Modal";
import { Button } from "components/Form/Button";
import { PhoneMask, TextInput } from "components/Form/Inputs";
import { TLoginForm } from "modules/Auth/type";
import { loginScheme } from "helpers/utils";

import user from "./user.svg";
import close from "./close.svg";

const schema = yup.object(loginScheme);

export const Login: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const [disableLogin, setDisableLogin] = useState<boolean>(true);
  const navigate = useNavigate();
  const refInputPhone = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const onDismiss = useOnDimiss();

  const methods = useForm<TLoginForm>({
    resolver: yupResolver(schema),
  });

  const changeForm = (e: any) => {
    const fields = methods.getValues();
    if (fields.phone && fields.password.length > 5) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  };

  const onSubmit = (data: TLoginForm): void => {
    setFormValid(true);
    data &&
      auth.signin(data, (res: any) => {
        if (res?.data?.user?.id) {
          setTimeout(() => {
            setFormValid(false);
            navigate("/personal", { replace: true });
          }, 2000);
        } else {
          setFormValid(false);
          methods.setError("phone", { message: res });
          methods.setError("password", { message: res });
        }
      });
  };

  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={refInputPhone}
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
      <h3 className="form-modal__title">Вход</h3>
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onChange={changeForm}
          className="form"
        >
          <PhoneMask id="phone" />
          <TextInput id="password" type="password" placeholder="Пароль" />
          <ModalLink to="/password-recovery" className="form__btn1">
            Восстановить пароль
          </ModalLink>
          <Button
            type="submit"
            color="red"
            className="form__submit"
            disabled={disableLogin}
          >
            Войти
          </Button>
          <ModalLink to="/registration" className="form__btn2">
            <img src={user} alt="" />
            Зарегистрироваться
          </ModalLink>
        </form>
      </FormProvider>
    </Dialog>
  );
};

import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@reach/dialog";
import { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "modules/Auth";
import { ModalLink, useOnDimiss } from "modules/Modal";
import {
  PhoneMask,
  TextInput,
  CheckboxInput,
  Checkbox,
  Button,
} from "components/Form";
import { TRegisterForm } from "modules/Auth/type";
import { registrationScheme } from "helpers/utils";
import { useModalCallLink } from "helpers/hooks";
import share from "./share.svg";
import close from "./close.svg";

const schema = yup.object().shape(registrationScheme);

export const Registration: React.FC = () => {
  const [formValid, setFormValid] = useState<boolean>(false);
  const [disableReg, setDisableReg] = useState<boolean>(true);
  const [disablePart, setDisablePart] = useState<boolean>(false);
  const refInputSurname = useRef<HTMLInputElement>(null);
  const onDismiss = useOnDimiss();
  const auth = useAuth();
  const modalCall = useModalCallLink();
  const methods = useForm<TRegisterForm>({
    resolver: yupResolver(schema),
  });

  const changeForm = (e: any) => {
    const fields = methods.getValues();
    if (fields?.no_patronymic) {
      setDisablePart(true);
    } else {
      setDisablePart(false);
    }
    if (
      fields?.name &&
      fields?.surname &&
      fields?.phone &&
      fields?.personaly &&
      ((fields?.no_patronymic && !fields?.patronymic) ||
        (!fields?.no_patronymic && fields?.patronymic))
    ) {
      setDisableReg(false);
    } else {
      setDisableReg(true);
    }
  };

  const onSubmit = (data: TRegisterForm, event?: any): void => {
    setFormValid(true);
    data &&
      auth.register(data, (res: any) => {
        if (res?.data?.message === "Success")
          modalCall("/confirm-registration");
        else
          Object.keys(res).forEach((name?: any) =>
            methods.setError(name, { message: res[name][0] })
          );
        setFormValid(false);
      });
  };

  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={refInputSurname}
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
      <h3 className="form-modal__title">??????????????????????</h3>
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onChange={changeForm}
          className="form"
        >
          <TextInput id="surname" type="text" placeholder="??????????????*" />
          <TextInput id="name" type="text" placeholder="??????*" />
          <TextInput
            id="patronymic"
            type="text"
            placeholder="????????????????*"
            disabled={disablePart}
          />
          <CheckboxInput
            id="no_patronymic"
            name="no_patronymic"
            type="checkbox"
            placeholder="?????? ????????????????"
            reset="patronymic"
          />
          <PhoneMask id="phone" />
          <p className="form__text">
            ?????? ???????????????? ???????????????? ???????????? ?? ???????????? ????????????, ?????????????????? 4 ??????????
            ???????????????? ?????????? ???????????????? ?????????? ??????????????????????????.
          </p>

          <Checkbox name="personaly">
            ???????????????? ???? <a href="/">?????????????????? ???????????????????????? ????????????</a>
          </Checkbox>

          <Button
            type="submit"
            color="red"
            className="form__submit"
            disabled={disableReg}
          >
            ????????????????????????????????????
          </Button>
          <ModalLink to="/login" className="form__login">
            <img src={share} alt="" />
            <span>??????????</span>
          </ModalLink>
        </form>
      </FormProvider>
    </Dialog>
  );
};

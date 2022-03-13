import { Dialog } from "@reach/dialog";
import { useOnDimiss } from "modules/Modal";
import close from "./close.svg";

export const PasswordChangeSucces: React.FC = () => {
  const onDismiss = useOnDimiss();

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="form-modal"
    >
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <h3 className="form-modal__title">Пароль успешно изменен</h3>
    </Dialog>
  );
};

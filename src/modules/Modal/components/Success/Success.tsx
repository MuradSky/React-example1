import Dialog from "@reach/dialog";
import { Button } from "components/Form";
import { useAuth } from "modules/Auth";
import { useOnDimiss } from "modules/Modal";
import close from "./close.svg";

export const Success: React.FC = () => {
  const onDismiss = useOnDimiss();
  const { success } = useAuth();

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="form-modal form-modal_success"
    >
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>
      <h3 className="form-modal__title">{success}</h3>
      <Button
        type="button"
        color="red"
        className="form__submit"
        handleClick={onDismiss}
      >
        Закрыть
      </Button>
    </Dialog>
  );
};

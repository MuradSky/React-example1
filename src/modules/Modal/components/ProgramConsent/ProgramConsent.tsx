import { useState } from "react";
import Dialog from "@reach/dialog";
import { getProgs } from "helpers/utils";
import { useAuth } from "modules/Auth";
import { useOnDimiss } from "modules/Modal/useOnDimiss";
import { useParams } from "react-router-dom";
import { Button } from "components/Form";
import { useModalCallLink } from "helpers/hooks";

import close from "./close.svg";
import box from "./box.svg";
import checked from "./checked.svg";

import "./ProgramConsent.scss";
import { Oval } from "react-loader-spinner";

export const ProgramConsent: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [chekced, setChecked] = useState<boolean>(true);
  const { id } = useParams();
  const { user, outlets, outletProgramJoin } = useAuth();
  const onDismiss = useOnDimiss();
  const modalCall = useModalCallLink();
  const activeProgs =
    user && outlets && getProgs("active_programs", user.id, outlets)[0];
  const freeSoftware =
    activeProgs && activeProgs.find((item: any) => item.id === Number(id));

  const onChecked = () => setChecked((state?: boolean) => !state);

  const onSubscribeProgram = (id?: number) => {
    setIsValid(true);
    outletProgramJoin(id, (res: any) => {
      setIsValid(false);
      modalCall("/success");
    });
  };

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      className="program-consent"
    >
      <button onClick={onDismiss} className="history__close">
        <img src={close} alt="" />
      </button>
      <div className="program-consent__inner">
        <div className="program-consent__head">
          <div className="program-consent__item">
            Период
            <br /> программы
          </div>
          <div className="program-consent__item">
            Программа
            <span>Торговая точка</span>
          </div>
          <div className="program-consent__item">Показатели</div>
        </div>
        <div className="program-consent__body">
          <div className="program-consent__item">
            <div className="program-consent__item_hide">Период программы</div>
            <div className="program-consent__item_period">
              {freeSoftware?.period}
            </div>
          </div>
          <div className="program-consent__item">
            <div className="program-consent__item_hide">Программа</div>
            <div className="program-consent__item_name">
              {freeSoftware?.name}
            </div>
            <div className="program-consent__item_row">
              <div className="program-consent__item_hide">Торговая точка</div>
              <div className="program-consent__item_id">
                {freeSoftware?.ext?.id}
              </div>
              <div className="program-consent__item_person">
                {freeSoftware?.ext?.person}
              </div>
            </div>
          </div>
          <div className="program-consent__item">
            <div className="program-consent__item_hide">Показатели</div>
            <p className="program-consent__item_sku">{freeSoftware?.sku}</p>
          </div>
        </div>

        <div className="form program-consent__form">
          <label htmlFor="treaty" className="form__checkbox">
            <div className="form__checkbox_row">
              <input
                name="treaty"
                type="checkbox"
                id="treaty"
                onChange={onChecked}
                hidden
              />
              <span className="form__checkbox_figure">
                <img src={box} alt="" />
                <img src={checked} alt="" className="form__checkbox_checked" />
              </span>
              <span className="form__text">
                Я согласен с{" "}
                <a
                  href={process.env.PUBLIC_URL + "/program-files/rules.pdf"}
                  target="_blank"
                  rel="noreferrer"
                >
                  правилами программы
                </a>
              </span>
            </div>
          </label>
          <Button
            color="red"
            type="button"
            disabled={isValid}
            className={`${chekced ? "disabled" : ""}`}
            handleClick={() =>
              onSubscribeProgram(freeSoftware?.outlet_program_id)
            }
          >
            {isValid && (
              <Oval
                color="#98092D"
                height={35}
                width={35}
                secondaryColor="#ab3a57"
              />
            )}
            <span>Участвовать</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

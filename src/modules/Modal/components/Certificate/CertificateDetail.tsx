import { Dialog } from "@reach/dialog";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useOnDimiss } from "modules/Modal";
import { Instruction } from "./Instruction";
import { useAuth } from "modules/Auth";
import { Button } from "components/Form";

import close from "./close.svg";
import down from "./down.svg";
import clock from "./clock.svg";
import download from "./download.svg";

import "./Certificate.scss";
import { replaceDate } from "helpers/utils";

export const CertificateDetail: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const refInputNominal = useRef<HTMLInputElement>(null);
  const { certificate_id } = useParams();
  const { user } = useAuth();

  const onDismiss = useOnDimiss();

  const handleOpen = () => setOpen((state?: boolean) => !state);

  const currentCertificate =
    user &&
    user?.certificates.find((item: any) => item.id === Number(certificate_id));

  const changeAlert = () => setShowDialog((state: boolean) => !state);

  const rules = (desc?: string) => desc?.replace(/<\/?[^>]+(>|$)/g, "");

  console.log(currentCertificate)

  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={refInputNominal}
      onDismiss={onDismiss}
      className="order"
    >
      <div className="order__inner">
        <div className="order__row">
          <div className="order__block">
            <h3 className="order__title">
              {currentCertificate?.certificate?.name}
            </h3>
            <p className="order__text">
              {currentCertificate?.certificate?.description}
            </p>
          </div>
          <div className="order__img">
            <img src={currentCertificate?.certificate?.url_image} alt="" />
          </div>
        </div>
        <p
          className={`order__text order__text_mobile ${open ? "open" : ""}`}
          onClick={handleOpen}
        >
          <span>{currentCertificate?.certificate?.description}</span>
          <img src={down} alt="" />
        </p>
        <div className="ordered">
          {currentCertificate?.received_at ? (
            <div className="ordered__row">
              <div className="ordered__item">
                <p>
                  Дата активации:{" "}
                  <span>{replaceDate(currentCertificate?.received_at)}</span>
                </p>
              </div>
              {currentCertificate.card && (
                <div className="ordered__item">
                  <p>Код карты: {currentCertificate?.code}</p>
                </div>
              )}
            </div>
          ) : null}
          <div className="ordered__row">
            <div className="ordered__item">
              <p>
                <span>Срок действия: {currentCertificate?.valid_until}</span>
              </p>
            </div>
            <div className="ordered__item">
              <p>Номинал: {currentCertificate?.price} рублей</p>
            </div>
          </div>

          {!currentCertificate?.received_at ? (
            <div className="ordered__row">
              <div className="ordered__item ordered__item_red">
                <p>Осталось {currentCertificate?.days_left}</p>
                <img src={clock} alt="" />
              </div>
            </div>
          ) : (
            <div className="ordered__row">
              <div className="ordered__item">
                {!!currentCertificate?.files?.length ? 
                
                  currentCertificate?.files?.map((item: any) => (
                    <a
                      href={item?.path}
                      className="ordered__pin"
                      download={true}
                      key={item?.id}
                    >
                      <img src={download} alt="" />
                      Cкачать сертификат
                    </a>
                  ))
                : null}
                
              </div>
              <div className="ordered__item">
                {currentCertificate?.pin && (
                  <div className="ordered__pin">
                    Пин-код <span>{currentCertificate?.pin}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Instruction />

        <div className="order__row">
          <Button className="order__rules" handleClick={changeAlert}>
            Правила использования
          </Button>
          <Button color="green" handleClick={onDismiss}>
            Закрыть
          </Button>
        </div>
      </div>
      <button onClick={onDismiss} className="form-modal__close">
        <img src={close} alt="" />
      </button>

      <Dialog
        isOpen={showDialog}
        aria-labelledby="label"
        className="instruction-modal"
        onDismiss={changeAlert}
      >
        <button onClick={changeAlert} className="form-modal__close">
          <img src={close} alt="" />
        </button>
        <div className="instruction-modal__wrap">
          <h3 className="instruction-modal__title">
            Правила использования сертификата: {currentCertificate?.name}
          </h3>
          <div className="instruction-modal__text">
            <p>{rules(currentCertificate?.certificate?.rules)}</p>
          </div>
        </div>
      </Dialog>
    </Dialog>
  );
};

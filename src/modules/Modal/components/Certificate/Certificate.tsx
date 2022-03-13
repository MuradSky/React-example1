import { Dialog } from "@reach/dialog";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOnDimiss } from "modules/Modal";
import close from "./close.svg";
import down from "./down.svg";

import "./Certificate.scss";
import { FlexiblePrice } from "./FlexiblePrice";
import { Instruction } from "./Instruction";
import { getTokenAuth, routeName } from "helpers/utils";
import { useCertificateList, useModalCallLink } from "helpers/hooks";
import { FixedPrice } from "./FixedPrice";
import { useAuth } from "modules/Auth";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";

const router = routeName("api.certificates.all");

const token = getTokenAuth()

const findCurrentCert = (data?: any, hash?: any) => {
  const certificate = data?.find((item: any) => item.id === Number(hash.slice(1)));
  certificate.priceType = certificate?.certificates[0]?.type;
  return certificate;
};

export const Certificate: React.FC = () => {
  const [send, setSend] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const refInputNominal = useRef<HTMLInputElement>(null);
  const { search, hash, state }: any = useLocation();
  const { certificates } = useCertificateList(router + decodeURI(search));
  const [certs, setCerts ] = useState<any>([])
  const { buyCertificate, user } = useAuth();
  const modalCall = useModalCallLink();
  const onDismiss = useOnDimiss();
  
  const backgroundPath = state?.backgroundLocation?.pathname 
  const amount = user?.amount
  useEffect(()=> {
    if(backgroundPath === "/personal") {
      axios.get(routeName("api.seller.suitable-certificates", amount), {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        setCerts(res?.data?.data)
      })
    } else {
      setCerts(certificates)
    }
  }, [backgroundPath, amount, certificates])

  const handleOpen = () => setOpen((state?: boolean) => !state);
  const changeAlert = () => setShowDialog((state: boolean) => !state);

  const onSubmit = (id: number, value: number) => {
    const data = {
      id: id,
      price: { certificate_price: value },
    };
    setSend(true);
    buyCertificate(data, (res) => {
      if (res?.data?.message) {
        modalCall("/success");
      } else {
        setSend(false);
        toast.error(res);
      }
    });
  };
  console.log(!certs.length)
  const certificate = !!certs.length && findCurrentCert(certs, hash);
  
  return (
    <Dialog
      aria-labelledby="label"
      initialFocusRef={refInputNominal}
      onDismiss={onDismiss}
      className="order"
    >
      {send ? (
        <div className="form-modal__spin">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      ) : null}

      <div className="order__inner">
        <div className="order__row">
          <div className="order__block">
            <h3 className="order__title">{certificate?.name}</h3>
            <p className="order__text">{certificate?.description}</p>
          </div>
          <div className="order__img">
            <img src={certificate?.url_image} alt="" />
          </div>
        </div>
        <p
          className={`order__text order__text_mobile ${open ? "open" : ""}`}
          onClick={handleOpen}
        >
          <span>{certificate?.description}</span>
          <img src={down} alt="" />
        </p>

        {certificate?.priceType === "flexible_price" ? (
          <FlexiblePrice
            certificate={certificate?.certificates[0]}
            openAlert={changeAlert}
            handleSubmit={onSubmit}
          />
        ) : (
          <FixedPrice
            certificates={certificate?.certificates}
            openAlert={changeAlert}
            handleSubmit={onSubmit}
          />
        )}
        <Instruction />
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
            Правила использования сертификата: {certificate?.name}
          </h3>
          <div className="instruction-modal__text" dangerouslySetInnerHTML={{ __html: certificate.rules }} />
        </div>
      </Dialog>
    </Dialog>
  );
};

import Dialog from "@reach/dialog";
import { getTokenAuth, routeName } from "helpers/utils";
import { Certificates } from "components";

import { useOnDimiss } from "modules/Modal/useOnDimiss";

import "./AvailableCertificates.scss";
import { Oval } from "react-loader-spinner";
import close from "./close.svg";
import { useEffect, useState } from "react";
import { useAuth } from "modules/Auth";
import axios from "axios";

const token = getTokenAuth()

export const AvailableCertificates = () => {
  const [certificates, setCertificates ] = useState<any>([])
  const [isLoading, setIsLoading ] = useState<boolean>(true)
  const { user } = useAuth()
 
  const onDismiss = useOnDimiss();

  const amount = user?.amount

  useEffect(()=> {
    if(amount && isLoading) {
      axios.get(routeName("api.seller.suitable-certificates", amount), {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        setCertificates(res?.data?.data)
        setIsLoading(false)
      })
    }
  }, [isLoading, amount])

  return (
    <Dialog aria-labelledby="label" className="available" onDismiss={onDismiss}>
      <button onClick={onDismiss} className="available__close">
        <img src={close} alt="" />
      </button>
      <div className="available__top">
        <div className="available__title">
          Обменяй Выбирай Card на любые сертификаты
        </div>
        <div className="available__balance">
          баланс:
          <span>{amount} рублей</span>
        </div>
      </div>
      {isLoading ? (
        <div className="available__loader">
          <Oval
            color="#98092D"
            height={50}
            width={50}
            secondaryColor="#E0B5C0"
          />
        </div>
      ) : certificates?.length === 0 ? (
        <p>К сожалению, нет доступных сертификатов</p>
      ) : (
        <Certificates
          className="certificate-more"
          data={certificates}
          carousel={false}
        />
      )}
    </Dialog>
  );
};

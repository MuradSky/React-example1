import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import { ModalLink } from "modules/Modal";
import { useAuth } from "modules/Auth";
import { Certificates } from "components/Certificates";
import { Button } from "components/Form/Button";
import { useCertificateList } from "helpers/hooks/useCertificateList";
import { routeName } from "helpers/utils";

import promo from "./promo.png";
import "./Home.scss";
import { ToastContainer } from "react-toastify";

const Home: React.FC = (props) => {
  const auth = useAuth();
  const { certificates, isLoading } = useCertificateList(
    routeName("api.certificates.popular")
  );

  return (
    <div>
      <section className="face">
        <div className="face__rect">
          <h1>Империал Тобакко Россия</h1>
          <div className="description">
            Imperial Tobacco — часть четвертой по величине международной
            табачной компании Imperial Brands, работающей на 120 рынках.
            Imperial Tobacco работает в России с 1997 года и представлена двумя
            предприятиями: фабрикой ООО «Империал Тобакко Волга» (Волгоград) и
            ООО «Империал Тобакко Продажа и Маркетинг». На российском рынке
            компания производит и реализует международные сигаретные бренды
            Davidoff, West, Jadé, P&S, а также ведущую локальную марку «Максим».
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="container">
          <div className="promo__inner">
            <div className="promo__text">
              <h2 className="promo__text_title">
                Получайте универсальные сертификаты Выбирай Card
              </h2>
              <div className="promo__text_descr">
                Все лучшие магазины в одном сертификате.
              </div>
              <div className="promo__text_buttons">
                {!auth.token && (
                  <ModalLink to="/registration">
                    <Button color="red" className="promo__btn">
                      Зарегистрироваться
                    </Button>
                  </ModalLink>
                )}
                {auth.token ? (
                  <Link to="/personal">
                    <Button color="green" className="promo__btn">
                      Личный кабинет
                    </Button>
                  </Link>
                ) : (
                  <ModalLink to="/login">
                    <Button color="green" className="promo__btn">
                      Войти в личный кабинет
                    </Button>
                  </ModalLink>
                )}
              </div>
            </div>
            <div className="promo__image">
              <img
                src={promo}
                alt="Получайте универсальные сертификаты Выбирай Card"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pop">
        <div className="container pop__inner">
          <h3 className="pop__title">Популярные сертификаты</h3>
          {isLoading ? (
            <div className="pop__spin">
              <Oval
                color="#98092D"
                height={50}
                width={50}
                secondaryColor="#E0B5C0"
              />
            </div>
          ) : (
            <Certificates
              className="pop__certificates"
              data={certificates}
              carousel={true}
            />
          )}
          <Link to="/certificate">
            <Button icon="arrow" color="red" className="pop__btn">
              Смотреть все сертификаты
            </Button>
          </Link>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={1}
      />
    </div>
  );
};

export default Home;

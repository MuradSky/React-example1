import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "components/Breadcrumb";
import { personalCrumbs } from "helpers/utils";
import { useAuth } from "modules/Auth";
import { PersonalArea } from "components/PersonalArea";
import { SystemItg } from "components/SystemItg";
import { ChooseCard } from "components/ChooseCard";
import { MyCertificates } from "components/MyCertificates";

import { ReactComponent as Share } from "./share.svg";
import "./Personal.scss";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const Personal: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () =>
    auth.signout(() => navigate("/", { replace: true }));

  return (
    <section className="personal">
      <div className="container">
        <Breadcrumb crumbs={personalCrumbs} />
        {!auth?.user ? (
          <div className="personal__spin">
            <Oval
              color="#98092D"
              height={80}
              width={80}
              secondaryColor="#E0B5C0"
            />
          </div>
        ) : (
          <>
            <div className="personal__top">
              <h2 className="personal__name title">
                Добрый день, {auth?.user?.name}!
              </h2>
              <button onClick={handleLogout} className="personal__logout">
                <span>Выйти</span>
                <Share />
              </button>
            </div>
            <PersonalArea />
            <SystemItg />
            <ChooseCard />
            <MyCertificates />
          </>
        )}
      </div>
    </section>
  );
};

export default Personal;

import { useLocation, useRoutes } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { Certificate, CertificateDetail } from "./components/Certificate";
import { Card, CardDetail } from "./components/Card";
import { Feedback } from "./components/Feedback";
import { HistoryItg, HistoryCard } from "./components/History";
import { Menu } from "./components/Menu";
import { ConfirmRegistration } from "./components/ConfirmRegistration";
import { PasswordRecovery } from "./components/PasswordRecovery";
import { PasswordChange } from "./components/PasswordChange";
import { PasswordChangeSucces } from "./components/PasswordChangeSucces";
import { ChoiceOfOutlets } from "./components/ChoiceOfOutlets/";
import { Success } from "./components/Success";
import { AvailableCertificates } from "./components/AvailableCertificates";
import { GlobalAlert } from "./components/GlobalAlert";

import "@reach/dialog/styles.css";
import { ProgramConsent } from "./components/ProgramConsent";

const modalRoutes = (search: any) => [
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
  { path: "/certificate", search, element: <Certificate /> },
  { path: "personal/:certificate_id", element: <CertificateDetail /> },
  { path: "/available-certificates/", element: <AvailableCertificates /> },
  { path: "/card", element: <Card /> },
  { path: "card-detail/:id", element: <CardDetail /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/history-itg", element: <HistoryItg /> },
  { path: "/history-card", element: <HistoryCard /> },
  { path: "/menu", element: <Menu /> },
  { path: "/confirm-registration", element: <ConfirmRegistration /> },
  { path: "/password-recovery", element: <PasswordRecovery /> },
  { path: "/password-change", element: <PasswordChange /> },
  { path: "/password-change-succes", element: <PasswordChangeSucces /> },
  { path: "/choice-outlet", element: <ChoiceOfOutlets /> },
  { path: "/success", element: <Success /> },
  { path: "/:global", element: <GlobalAlert /> },
  { path: "/program-consent/:id", element: <ProgramConsent /> },
];

export const Modal: React.FC = () => {
  const { search } = useLocation();
  const routes = modalRoutes(search);
  const element = useRoutes(routes);
  return <div className="modal">{element}</div>;
};

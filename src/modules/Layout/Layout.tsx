import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "modules/Auth";
import { Header } from "./components/Header";
import { Router } from "./components/Router";
import { Brands } from "./components/Brands";
import { Footer } from "./components/Footer";
import { ToastContainer } from "react-toastify";

export const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Router />
        <Brands />
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          limit={1}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

import { useState, useEffect } from "react";
import axios from "axios";

import { heplperAuthProvider } from "./auth";
import { AuthContext } from "./context";
import { getTokenAuth, setTokenAuth } from "helpers/utils";
import {
  TLoginForm,
  TRegisterForm,
  TConfirmForm,
  TFeedBackForm,
  TChangePassForm,
  TSaveOutlet,
  TPasswordRecovery,
  TByCard,
} from "./type";
import { routeName } from "helpers/utils";
import { toast } from "react-toastify";

export const AuthProvider: React.FC = ({ children }) => {
  const [query, setQuery] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [outlets, setOutlets] = useState<any>([]);
  const [cards, setCards] = useState<any>([]);

  const [token, setToken] = useState<any>(getTokenAuth());
  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");

  const xhrParams = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const updateProfile = () => {
    axios.get(routeName("api.seller.profile"), xhrParams).then((data) => {
      setUser(data?.data?.data?.user);
      setCards(data?.data?.data?.cards);
      setOutlets(data?.data?.data?.outlets);
    });
  };

  useEffect(() => {
    if (token)
      return heplperAuthProvider.signin(() => {
        axios
          .get(routeName("api.seller.profile"), {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((data) => {
            setUser(data.data.data.user);
            setOutlets(data.data.data.outlets);
            setQuery(true);
            setCards(data.data.data.cards);
          })
          .catch(() => {
            heplperAuthProvider.signout(() => {
              setUser(null);
              setOutlets(null);
              setToken(null);
              toast.error("Пожалуйста попробуйте войти в систему заново");
            });
          });
        setLoader(false);
      });
    setQuery(true);
    setLoader(false);
  }, [token]);

  const signin = (user: TLoginForm, callback: any) => {
    return heplperAuthProvider.signin(() => {
      axios
        .post(routeName("api.seller.login"), user)
        .then((res) => {
          setTokenAuth(res.data.token);
          setToken(res.data.token);
          callback(res);
        })
        .catch((error) => {
          if (error.response) {
            callback(error?.response?.data?.message);
          }
        });
    });
  };

  const signout = (callback: VoidFunction) => {
    return heplperAuthProvider.signout(() => {
      setUser(null);
      setOutlets(null);
      setToken(null);
      callback();
    });
  };

  const register = (registerData: TRegisterForm, callback: any) => {
    return heplperAuthProvider.register(() => {
      axios
        .post(routeName("api.seller.register"), registerData)
        .then((res) => {
          setUser(registerData);
          callback(res);
        })
        .catch((error) => {
          if (error.response) {
            callback(error?.response?.data?.errors);
          }
        });
    });
  };

  const confirmPhone = (confirmData: TConfirmForm, callback: any) => {
    return heplperAuthProvider.confirmPhone(() => {
      confirmData.phone = user.phone;
      axios
        .post(routeName("api.seller.confirm-phone"), confirmData)
        .then((res) => {
          setTokenAuth(res.data.token);
          setToken(res.data.token);
          callback(res);
        })
        .catch((error) => {
          if (error.response) {
            callback(error?.response?.data?.errors);
          }
        });
    });
  };

  const changePass = (passData: TChangePassForm, callback: any) => {
    passData.token = token;
    return heplperAuthProvider.changePass(() => {
      axios
        .post(routeName("api.seller.change-password"), passData, xhrParams)
        .then((res) => callback(res))
        .catch((error) => {
          if (error.response) callback(error?.response?.data?.errors);
        });
    });
  };

  const feedback = (feedbackData: TFeedBackForm, callback: any) => {
    return heplperAuthProvider.feedback(() => {
      axios
        .post(routeName("api.feedback"), feedbackData)
        .then((res) => {
          setSuccess(res?.data?.message);
          callback(res);
        })
        .catch((err) => callback(err));
    });
  };

  const saveOutlets = (outletsData: TSaveOutlet, callback: any) => {
    return heplperAuthProvider.saveOutlets(() => {
      axios
        .post(routeName("api.seller.outlet.join"), outletsData, xhrParams)
        .then((res) => {
          updateProfile();
          callback(res);
        })
        .catch((error) => {
          if (error.response) {
            callback(error?.response?.data?.message);
          }
        });
    });
  };

  const passwordRecovery = (phone: TPasswordRecovery, callback: any) => {
    return heplperAuthProvider.passwordRecovery(() => {
      axios
        .post(routeName("api.seller.reset-password"), phone)
        .then((res) => {
          setUser(phone);
          callback(res);
        })
        .catch((error) => {
          if (error.response) {
            callback(error?.response?.data?.message);
          }
        });
    });
  };

  const sallerByCardFlexible = (card: TByCard, callback: any) => {
    return heplperAuthProvider.sallerByCardFlexible(() => {
      axios
        .post(
          routeName("api.seller.buy-card", String(card.id)),
          card.price,
          xhrParams
        )
        .then((res) => {
          setSuccess("Спасибо, Ваша ВыбирайКарта выпущена");
          updateProfile();
          callback(res);
        })
        .catch((error) =>
          callback(error?.response?.data?.errors?.card_price[0])
        );
    });
  };

  const buyCertificate = (data: any, callback: any) => {
    return heplperAuthProvider.buyCertificate(() => {
      axios
        .post(routeName("api.seller.buy-certificate", data.id), data.price, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          callback(res);
          updateProfile();
          setSuccess(res?.data?.message);
        })
        .catch((res) => callback(res?.response?.data?.message));
    });
  };

  const outletProgramJoin = (id: any, callback: any) => {
    return heplperAuthProvider.outletProgramJoin(() => {
      axios
        .post(routeName("api.seller.outlet-program.join", id), {}, xhrParams)
        .then(() => {
          updateProfile();
          callback();
          setSuccess("Спасибо, Вы подписались на программу");
        })
        .catch((res) => {
          callback();
          setSuccess(
            res?.response?.data?.message === ""
              ? "Ошибка запроса"
              : res?.response?.data?.message
          );
        });
    });
  };

  const getPassportDetails = (callback: any) => {
    return heplperAuthProvider.heplperAuthProvider(() => {
      axios
        .get(routeName("api.seller.passport"), xhrParams)
        .then((res) => callback(res));
    });
  };

  const value = {
    user,
    outlets,
    query,
    success,
    token,
    cards,
    signin,
    signout,
    register,
    confirmPhone,
    changePass,
    feedback,
    saveOutlets,
    passwordRecovery,
    sallerByCardFlexible,
    buyCertificate,
    outletProgramJoin,
    getPassportDetails,
  };

  return loader ? null : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

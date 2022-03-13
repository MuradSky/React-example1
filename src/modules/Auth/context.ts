import React from "react";
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

interface AuthContextType {
  user: any;
  outlets: any;
  query: any;
  success: string;
  token: any;
  cards: any;
  signin: (user: TLoginForm, callback: (res: any) => void) => void;
  signout: (callback: VoidFunction) => void;
  register: (registerData: TRegisterForm, callback: (res: any) => void) => void;
  confirmPhone: (
    confirmData: TConfirmForm,
    callback: (res: any) => void
  ) => void;
  changePass: (passData: TChangePassForm, callback: (res: any) => void) => void;
  feedback: (feedbackData: TFeedBackForm, callback: (res: any) => void) => void;
  saveOutlets: (outletsData: TSaveOutlet, callback: (res: any) => void) => void;
  passwordRecovery: (
    phone: TPasswordRecovery,
    callback: (res: any) => void
  ) => void;
  sallerByCardFlexible: (cost: TByCard, callback: (res: any) => void) => void;
  buyCertificate: (id: any, callback: (res: any) => void) => void;
  outletProgramJoin: (id: any, callback: (res: any) => void) => void;
  getPassportDetails: (callback?: any) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

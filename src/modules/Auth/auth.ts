import { removeTokenAuth } from "helpers/utils";

export const heplperAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    heplperAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: VoidFunction) {
    heplperAuthProvider.isAuthenticated = false;
    removeTokenAuth();
    setTimeout(callback, 100);
  },
  register(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  confirmPhone(callback: VoidFunction) {
    heplperAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  changePass(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  feedback(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  saveOutlets(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  passwordRecovery(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  sallerByCardFlexible(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  buyCertificate(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  outletProgramJoin(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
  heplperAuthProvider(callback: VoidFunction) {
    setTimeout(callback, 100);
  },
};

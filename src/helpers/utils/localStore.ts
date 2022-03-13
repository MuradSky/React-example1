enum Keys {
  token = "token",
}

export const setTokenAuth = (token: string) => {
  localStorage.setItem(Keys.token, token);
};

export const removeTokenAuth = () => {
  localStorage.removeItem(Keys.token);
};

export const getTokenAuth = () => {
  return localStorage.getItem(Keys.token);
};

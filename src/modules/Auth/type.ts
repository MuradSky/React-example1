export type TLoginForm = {
  phone: string;
  password: string;
};

export type TRegisterForm = {
  surname: string;
  name: string;
  patronymic: string;
  inn: string;
  phone: string;
  is_resident_ru: string;
  personaly: boolean;
  no_patronymic: boolean;
};

export type TConfirmForm = {
  phone: string;
  code: string;
  password: string;
  password_confirmation: string;
};

export type TChangePassForm = {
  token: string;
  password: string;
  password_confirmation: string;
};

export type TFeedBackForm = {
  name: string;
  phone: string;
  comment: string;
};

export type TSaveOutlet = {
  outlet_ids: string[];
};

export type TPasswordRecovery = {
  phone: string;
};

export type TByCard = {
  price?: {
    card_price: number;
  };
  id?: number | undefined;
};

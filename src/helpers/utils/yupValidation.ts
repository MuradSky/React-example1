import { setLocale } from "yup";
import * as yup from "yup";

setLocale({
  mixed: {
    required: "Это обязательное поле",
  },
});

export const registrationScheme = {
  surname: yup.string().required().min(2, "Заполните корректно это поле"),
  name: yup.string().required().min(2, "Заполните корректно это поле"),
  no_patronymic: yup.boolean(),
  patronymic: yup.string().when("no_patronymic", {
    is: (no_patronymic?: boolean) => !no_patronymic,
    then: yup.string().required(),
  }),
  phone: yup.string().required().min(11, "Заполните корректно это поле"),
  personaly: yup.boolean().oneOf([true]).required(),
};

export const loginScheme = {
  phone: yup.string().required().min(11, "Заполните корректно это поле"),
  password: yup.string().required().min(6),
};

export const passwordChangeScheme = {
  password: yup.string(),
  // .required("Это обязательное поле")
  // .matches(/^[a-zA-Z\d]{5,}$/, "Пароль должен содержать минимум 6 символов"),
  password_confirmation: yup.string(),
  // .required("Это обязательное поле")
  // .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
};

export const passwordRecoveryScheme = {
  phone: yup.string().required().min(11, "Заполните корректно это поле"),
};

export const confirmRegistrationScheme = {
  code: yup.string().required("Пожалуйста введите полученный код"),
};

export const passportScheme = {
  surname: yup.string().required().min(2, "Заполните корректно это поле"),
  name: yup.string().required().min(2, "Заполните корректно это поле"),
  no_patronymic: yup.boolean(),
  patronymic: yup.string().required(),
  birthday: yup.string().required(),
  gender: yup.string().required(),
  series: yup.string().required().min(4, "Заполните корректно это поле"),
  number: yup.string().required().min(6, "Заполните корректно это поле"),
  issued_by: yup.string().required(),
  date_issued_at: yup.string().nullable().required(),
  department_code: yup
    .string()
    .required()
    .min(6, "Заполните корректно это поле"),
  registration_address: yup.string().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.string().required(),
  }),
  snils: yup.string().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.string().required(),
  }),
  inn: yup.string().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.string().required().min(6, "Заполните корректно это поле"),
  }),
  citizenship: yup.string().when("otherResident", {
    is: (state?: boolean) => state,
    then: yup.string().required(),
  }),

  main_image: yup.mixed().required(),
  location_image: yup.mixed().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.mixed().required(),
  }),
  inn_image: yup.mixed().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.mixed().required(),
  }),
  snils_image: yup.mixed().when("otherResident", {
    is: (state?: boolean) => !state,
    then: yup.mixed().required(),
  }),
};

export const feedbackScheme = {
  name: yup.string().required().min(4, "Заполните корректно это поле"),
  phone: yup.string().required().min(11, "Заполните корректно это поле"),
  comment: yup.string().required(),
};

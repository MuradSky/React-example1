export const dropzones: { id?: string; title?: string }[] = [
  {
    id: "main_image",
    title: "Разворот первой страницы паспорта",
  },
  {
    id: "location_image",
    title: "Разворот с регистрацией",
  },
  {
    id: "inn_image",
    title: "Снилс (при наличии)",
  },
  {
    id: "snils_image",
    title: "ИНН (при наличии)",
  },
];

export const FOR_RESIDENT_RF: string[] = [
  "series",
  "number",
  "issued_by",
  "date_issued_at",
  "department_code",
  "registration_address",
  "snils",
  "inn",
  "main_image",
  "location_image",
  "inn_image",
  "snils_image",
];

export const FOR_RESIDENT: string[] = [
  "citizenship",
  "series",
  "number",
  "issued_by",
  "date_issued_at",
  "department_code",
  "main_image",
  "location_image",
  "inn_image",
  "snils_image",
];

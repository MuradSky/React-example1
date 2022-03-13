type TP = {
  link?: string; 
  text?: string; 
  icon?: string; 
}

export const certificatesCrumbs: TP[] = [
    { 
      link: "/",
      text: "Главная",
      icon: "home"
    },
    {
      text: "Сертификаты"
    }
]

export const personalCrumbs: TP[] = [
  { 
    link: "/",
    text: "Главная",
    icon: "home"
  },
  {
    text: "Личный кабинет"
  }
]

export const passportCrumbs: TP[] = [
  { 
    link: "/",
    text: "Главная",
    icon: "home"
  },
  { 
    link: "/personal",
    text: "Личный кабинет",
    icon: ""
  },
  {
    text: "Паспортные данные"
  }
]
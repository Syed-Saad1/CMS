import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import engishen from "./locales/en.json";
import germande from "./locales/de.json";
import arabicar from "./locales/ar.json";

const resources = {
  en: { translation: engishen },
  de: { translation: germande },
  ar: { translation: arabicar },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  default: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

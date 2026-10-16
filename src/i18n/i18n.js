import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import de from "./locales/de.json";
import ar from "./locales/ar.json";

const savedLanguage = typeof window !== "undefined" ? window.localStorage.getItem("language") : null;
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, de: { translation: de }, ar: { translation: ar } },
  lng: ["en", "de", "ar"].includes(savedLanguage) ? savedLanguage : "en",
  fallbackLng: "en",
  supportedLngs: ["en", "de", "ar"],
  interpolation: { escapeValue: false },
});

const updateDocumentLanguage = (language) => {
  if (typeof document === "undefined") return;
  const selected = ["en", "de", "ar"].includes(language) ? language : "en";
  document.documentElement.lang = selected;
  document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";
  document.documentElement.style.textAlign = selected === "ar" ? "right" : "";
  window.localStorage.setItem("language", selected);
};
i18n.on("languageChanged", updateDocumentLanguage);
updateDocumentLanguage(i18n.resolvedLanguage || i18n.language);

export default i18n;

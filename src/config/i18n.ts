import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranlate from "../translations/en.json";
import urTranslation from "../translations/ur.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enTranlate },
    ur: { ...urTranslation },
  }, // Where we're gonna put translations' files
  lng: "en", // Set the initial language of the App
});

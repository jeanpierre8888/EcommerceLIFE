import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const fallbackLng = ["es_EC"];
const availableLanguages = ["es_EC", "en_US"];

// const resources = {
//   es_EC: {
//     translation: translationES_EC,
//   },
//   en_US: {
//     translation: translationEN_US,
//   },
// };

i18n
  .use(Backend) // load translations using http (default public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    react: {
      useSuspense: false,
    },
    resources: {}, // es importante para añadir las traducciones desde la base más adelante
    fallbackLng, // fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;

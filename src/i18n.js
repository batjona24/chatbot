import i18n from "i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"
import {languages} from "./utilities/constants/app"
import resources from "./translations"

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        supportedLngs: Object.values(languages),
        nonExplicitSupportedLngs: true,
        fallbackLng: languages.ENGLISH,
        resources,
        ns: ["alerts", "auth", "common"],
        detection: {
            order: ["localStorage"],
            lookupLocalStorage: "lang",
        },
        react: {
            useSuspense: false
        }
    })
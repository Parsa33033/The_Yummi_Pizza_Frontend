
import en_translation from "../i18n/en/translation.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: en_translation
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: resources,
        lng: "en"
    })

export default i18n;
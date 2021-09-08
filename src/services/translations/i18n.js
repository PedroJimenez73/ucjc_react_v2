import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 
import { TRANSLATIONS_ES } from "./es/translations";
import { TRANSLATIONS_EN } from "./en/translations";

import generalInfo from '../../data/generalInfo';
 
i18n
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     es: {
       translation: TRANSLATIONS_ES
     }
   }
 });
 
i18n.changeLanguage(generalInfo.language);

export default i18n;
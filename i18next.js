import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationsInUz from './public/locales/uz/translation.json';
import translationsInRu from './public/locales/ru/translation.json';
import translationsInEn from './public/locales/en/translation.json';

// Define translations
const resources = {
  Uz: { translation: translationsInUz },
  Ru: { translation: translationsInRu },
  En: { translation: translationsInEn },
};

// Function to safely get the saved language from localStorage
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang') || 'Uz';
  }
  return 'Uz'; // Default to Uzbek if SSR
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getSavedLanguage(), // Use client-only function to access localStorage
    fallbackLng: 'Uz',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: 'translation',
    defaultNS: 'translation',
  });

export default i18n;

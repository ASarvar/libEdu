// Site-specific i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import default/main site translations
import translationsInUz from '../public/locales/uz/translation.json';
import translationsInRu from '../public/locales/ru/translation.json';
import translationsInEn from '../public/locales/en/translation.json';

// Default resources for main site
const defaultResources = {
  Uz: { translation: translationsInUz },
  Ru: { translation: translationsInRu },
  En: { translation: translationsInEn },
};

// Function to safely get the saved language from localStorage
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang') || 'Uz';
  }
  return 'Uz';
};

// Function to load site-specific translations
interface Translation {
  [key: string]: string | Translation;
}

interface LanguageResource {
  translation: Translation;
}

interface I18nResources {
  Uz: LanguageResource;
  Ru: LanguageResource;
  En: LanguageResource;
}

export async function loadSiteTranslations(subdomain: string): Promise<I18nResources> {
  if (!subdomain) return defaultResources;

  try {
    // Try to load site-specific translations
    const siteTranslationsUz = await import(
      `../public/locales/sites/${subdomain}/uz/translation.json`
    ).catch(() => null);
    
    const siteTranslationsRu = await import(
      `../public/locales/sites/${subdomain}/ru/translation.json`
    ).catch(() => null);
    
    const siteTranslationsEn = await import(
      `../public/locales/sites/${subdomain}/en/translation.json`
    ).catch(() => null);

    // Merge site-specific translations with default translations
    // Site-specific translations override default ones
    return {
      Uz: {
        translation: {
          ...defaultResources.Uz.translation,
          ...(siteTranslationsUz?.default || {}),
        },
      },
      Ru: {
        translation: {
          ...defaultResources.Ru.translation,
          ...(siteTranslationsRu?.default || {}),
        },
      },
      En: {
        translation: {
          ...defaultResources.En.translation,
          ...(siteTranslationsEn?.default || {}),
        },
      },
    };
  } catch (error) {
    console.warn(`Site-specific translations not found for: ${subdomain}, using defaults`);
    return defaultResources;
  }
}

// Initialize i18n with default resources
i18n.use(initReactI18next).init({
  resources: defaultResources,
  lng: getSavedLanguage(),
  fallbackLng: 'Uz',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  ns: 'translation',
  defaultNS: 'translation',
});

// Function to update i18n resources for a specific site
export function updateI18nResources(resources: I18nResources) {
  (Object.keys(resources) as Array<keyof I18nResources>).forEach((lang) => {
    i18n.addResourceBundle(lang, 'translation', resources[lang].translation, true, true);
  });
}

export default i18n;

// Page metadata management with i18n support
// Since Next.js metadata export is static at build time, we use a default language
// and provide a helper for client components to dynamically set meta tags if needed

export interface PageMetadata {
  title: string;
  description: string;
}

// Metadata for all pages - in default language (Uzbek)
// Translations are stored in public/locales/{lang}/translation.json under "metadata" section
const pageMetadataUz: Record<string, PageMetadata> = {
  home: {
    title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
    description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
  },
  events: {
    title: "Tadbirlar - Raqamli Kutubxona",
    description: "Kutubxonalarda o'tkaziladigan tadbirlar, seminar va o'quv dasturlari haqida ma'lumot.",
  },
  news: {
    title: "Yangiliklar - Raqamli Kutubxona",
    description: "Raqamli kutubxona va kutubxona xizmatlari haqidagi oxirgi yangiliklar.",
  },
  contact: {
    title: "Aloqa - Raqamli Kutubxona",
    description: "Biz bilan bog'lanish. Savollar va takliflar uchun biz bilan muloqot qiling.",
  },
  about: {
    title: "Biz Haqimizda - Raqamli Kutubxona",
    description: "O'zbekiston Milliy Kutubxonasi va uning raqamli xizmatlari haqida bilib oling.",
  },
  faq: {
    title: "Tez-tez Soʻraladigan Savollar - Raqamli Kutubxona",
    description: "Raqamli kutubxona xizmatlari, bronlash va boshqa savollar boʻyicha javoblar.",
  },
  pricing: {
    title: "Tarif Rejalar - Raqamli Kutubxona",
    description: "Kutubxona xizmatlari uchun mavjud bo'lgan tarif rejalarini tanish.",
  },
  services: {
    title: "Xizmatlari - Raqamli Kutubxona",
    description: "Raqamli kutubxona orqali taqdim etilayotgan xizmatlari o'rganing.",
  },
  shop: {
    title: "Magazin - Raqamli Kutubxona",
    description: "Kutubxona mahsulotlari va e-resurslarini sotib olin.",
  },
  notFound: {
    title: "Sahifa Topilmadi - 404",
    description: "Izlayotgan sahifani topa olmasdik. Bosh sahifaga qaytish.",
  },
};

const pageMetadataRu: Record<string, PageMetadata> = {
  home: {
    title: "Цифровая библиотека - Национальная библиотека Узбекистана",
    description: "Единая цифровая платформа для областных и районных библиотек Узбекистана. Электронный каталог, бронирование книг, цифровая библиотека и мероприятия.",
  },
  events: {
    title: "Мероприятия - Цифровая библиотека",
    description: "Информация о мероприятиях, семинарах и образовательных программах, проводимых в библиотеках.",
  },
  news: {
    title: "Новости - Цифровая библиотека",
    description: "Последние новости о цифровой библиотеке и услугах библиотеки.",
  },
  contact: {
    title: "Контакты - Цифровая библиотека",
    description: "Свяжитесь с нами. Отправьте нам свои вопросы и предложения.",
  },
  about: {
    title: "О нас - Цифровая библиотека",
    description: "Узнайте о Национальной библиотеке Узбекистана и её цифровых услугах.",
  },
  faq: {
    title: "Часто задаваемые вопросы - Цифровая библиотека",
    description: "Ответы на вопросы об услугах цифровой библиотеки, бронировании и многом другом.",
  },
  pricing: {
    title: "Тарифные планы - Цифровая библиотека",
    description: "Ознакомьтесь с доступными тарифными планами для услуг библиотеки.",
  },
  services: {
    title: "Услуги - Цифровая библиотека",
    description: "Узнайте об услугах, предоставляемых через цифровую библиотеку.",
  },
  shop: {
    title: "Магазин - Цифровая библиотека",
    description: "Купите продукты и электронные ресурсы библиотеки.",
  },
  notFound: {
    title: "Страница не найдена - 404",
    description: "Страница, которую вы ищете, не найдена. Вернитесь на главную.",
  },
};

const pageMetadataEn: Record<string, PageMetadata> = {
  home: {
    title: "Digital Library - National Library of Uzbekistan",
    description: "Unified digital platform for regional and district libraries of Uzbekistan. Electronic catalog, book reservation, digital library and events.",
  },
  events: {
    title: "Events - Digital Library",
    description: "Information about events, seminars and educational programs held at libraries.",
  },
  news: {
    title: "News - Digital Library",
    description: "Latest news about the digital library and library services.",
  },
  contact: {
    title: "Contact - Digital Library",
    description: "Get in touch with us. Send us your questions and feedback.",
  },
  about: {
    title: "About Us - Digital Library",
    description: "Learn about the National Library of Uzbekistan and its digital services.",
  },
  faq: {
    title: "Frequently Asked Questions - Digital Library",
    description: "Answers to questions about digital library services, booking and more.",
  },
  pricing: {
    title: "Pricing Plans - Digital Library",
    description: "View the available pricing plans for library services.",
  },
  services: {
    title: "Services - Digital Library",
    description: "Learn about the services provided through the digital library.",
  },
  shop: {
    title: "Shop - Digital Library",
    description: "Purchase library products and electronic resources.",
  },
  notFound: {
    title: "Page Not Found - 404",
    description: "The page you are looking for could not be found. Go back to home.",
  },
};

/**
 * Get metadata for a page in the specified language
 * @param pageName - Page identifier (e.g., 'home', 'events', 'contact')
 * @param language - Language code: 'uz', 'ru', or 'en' (defaults to 'uz')
 * @returns Page metadata with title and description
 */
export function getPageMetadata(
  pageName: string,
  language: 'uz' | 'ru' | 'en' = 'uz'
): PageMetadata {
  const metadataMap = {
    uz: pageMetadataUz,
    ru: pageMetadataRu,
    en: pageMetadataEn,
  };

  return (
    metadataMap[language][pageName] || {
      title: "Raqamli Kutubxona",
      description: "O'zbekiston Milliy Kutubxonasi",
    }
  );
}

/**
 * Helper to set dynamic meta tags in client components
 * Use this to update title/description when language changes
 */
export function setPageMeta(metadata: PageMetadata) {
  if (typeof window !== 'undefined') {
    document.title = metadata.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metadata.description);
    }
  }
}

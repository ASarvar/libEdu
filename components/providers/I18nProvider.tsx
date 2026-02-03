"use client";

import { I18nextProvider } from "react-i18next";
import i18n, { loadSiteTranslations, updateI18nResources } from "../../lib/siteI18n";
import { useSite } from "@/lib/useSite";
import { type ReactNode, useEffect, useState } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { site, loading } = useSite();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Load site-specific translations when site is available
    async function loadTranslations() {
      if (!loading && site) {
        const siteResources = await loadSiteTranslations(site.subdomain);
        updateI18nResources(siteResources);
        setTranslationsLoaded(true);
      } else if (!loading && !site) {
        // No site (main site), translations already loaded
        setTranslationsLoaded(true);
      }
    }

    if (isClient) {
      loadTranslations();
    }
  }, [site, loading, isClient]);

  if (!isClient || !translationsLoaded) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

// Hook to access site context in client components
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Site {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  logo_path?: string;
  primary_color: string;
  secondary_color: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  is_active: boolean;
  header_style?: string;
  footer_style?: string;
  home_style?: string;
  enable_dark_mode?: boolean;
  custom_css?: string;
}

interface SiteContextValue {
  site: Site | null;
  loading: boolean;
  error: string | null;
}

const SiteContext = createContext<SiteContextValue>({
  site: null,
  loading: true,
  error: null,
});

// Cache site data to avoid repeated API calls
let cachedSite: Site | null | undefined = undefined;
let cachePromise: Promise<Site | null> | null = null;

async function fetchSiteData(): Promise<Site | null> {
  // Return cached value if available
  if (cachedSite !== undefined) {
    return cachedSite;
  }

  // Return existing promise if fetch is in progress
  if (cachePromise) {
    return cachePromise;
  }

  // Start new fetch
  cachePromise = fetch('/api/site/current', {
    // Add cache headers for better performance
    headers: {
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    },
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        cachedSite = data.site;
        return data.site;
      } else if (response.status === 404) {
        cachedSite = null;
        return null;
      } else {
        throw new Error('Failed to load site');
      }
    })
    .catch((err) => {
      console.error('Site loading error:', err);
      // Don't cache errors
      cachePromise = null;
      throw err;
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [site, setSite] = useState<Site | null>(cachedSite || null);
  const [loading, setLoading] = useState(cachedSite === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if already loaded
    if (cachedSite !== undefined) {
      setSite(cachedSite);
      setLoading(false);
      return;
    }

    async function loadSite() {
      try {
        const siteData = await fetchSiteData();
        setSite(siteData);
      } catch (err) {
        setError('Error loading site');
      } finally {
        setLoading(false);
      }
    }

    loadSite();
  }, []);

  return (
    <SiteContext.Provider value={{ site, loading, error }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

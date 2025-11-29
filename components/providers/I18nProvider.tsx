"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../../i18next";
import { type ReactNode, useEffect, useState } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

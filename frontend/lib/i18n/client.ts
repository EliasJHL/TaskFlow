"use client";

import i18next from "i18next";
import { initReactI18next, useTranslation as useI18nTranslation } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((lng: string, ns: string) =>
      import(`../../public/locales/${lng}/${ns}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es", "ru", "ch", "de", "it"],
    defaultNS: "common",
    ns: ["common"],
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export const useTranslation = useI18nTranslation;
export default i18next;

import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

export async function getTranslation(locale: string, ns: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((lng, ns) => import(`../../public/locales/${lng}/${ns}.json`)))
    .init({
      lng: locale,
      fallbackLng: "en",
      ns: [ns],
    });

  return {
    t: i18nInstance.getFixedT(locale, ns),
  };
}

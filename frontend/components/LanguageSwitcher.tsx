"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  // Fonction pour changer la langue
  const changeLanguage = (lng: string) => {
    // Reconstruire l'URL locale en remplaçant la locale dans le path (ex: /fr/ => /en/)
    let newPath = pathname;

    // Si la route commence par une locale, on la remplace
    const currentLangPrefix = `/${i18n.language}`;
    if (pathname.startsWith(currentLangPrefix)) {
      newPath = pathname.replace(currentLangPrefix, `/${lng}`);
    } else {
      // Sinon on prepend la langue
      newPath = `/${lng}${pathname}`;
    }

    // Conserver les query params si présence
    const params = searchParams.toString();
    const destination = params ? `${newPath}?${params}` : newPath;

    router.push(destination);
  };

  return (
    <div>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          disabled={code === i18n.language}
          style={{
            marginRight: 8,
            fontWeight: code === i18n.language ? 'bold' : 'normal',
            textDecoration: code === i18n.language ? 'underline' : 'none',
            cursor: code === i18n.language ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'inherit',
            fontSize: 'inherit',
          }}
          aria-current={code === i18n.language ? 'page' : undefined}
          aria-label={`Switch language to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

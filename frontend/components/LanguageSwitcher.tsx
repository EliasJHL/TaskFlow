"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ru", label: "Русский" },
  { code: "ch", label: "中文" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    let newPath = pathname;
    const currentLangPrefix = `/${i18n.language}`;

    if (pathname.startsWith(currentLangPrefix)) {
      newPath = pathname.replace(currentLangPrefix, `/${lng}`);
    } else {
      newPath = `/${lng}${pathname}`;
    }
    const params = searchParams.toString();
    const destination = params ? `${newPath}?${params}` : newPath;
    router.push(destination);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{i18n.language.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M2.5 12h19" />
            <path d="M12 2.5v19" />
            <path d="M4.5 4.5c3 3 3 7 0 10" />
            <path d="M19.5 4.5c-3 3-3 7 0 10" />
          </svg>
          {i18n.t("select_language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            disabled={code === i18n.language}
            aria-current={code === i18n.language ? "page" : undefined}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

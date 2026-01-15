/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** i18n
*/

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import de from '@/locales/de.json';
import ru from '@/locales/ru.json';
import es from '@/locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],      
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
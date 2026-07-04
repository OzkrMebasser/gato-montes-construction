'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { fallbackLng, languages, cookieName } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@/public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: fallbackLng,
    fallbackLng,
    supportedLngs: languages,
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns?: string) {
  const ret = useTranslationOrg(ns);
  return ret;
}

export function useChangeLanguage() {
  const { i18n } = useTranslationOrg();

  return (lng: string) => {
    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') {
      document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000`;
      document.documentElement.lang = lng;
    }
  };
}

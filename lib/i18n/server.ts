import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { fallbackLng, languages } from './settings';

const initI18next = async (lng: string, ns: string = 'common') => {
  const i18nInstance = createInstance();
  await i18nInstance
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
      ns: [ns],
      interpolation: { escapeValue: false },
    });
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: string = 'common',
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

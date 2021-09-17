import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJson from '../assets/locale/en.json';
import ltJson from '../assets/locale/lt.json';

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: enJson,
    lt: ltJson,
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },
  react: {
    useSuspense: true,
  },
});

export const locale = i18n;

import { createIntl, createIntlCache } from 'react-intl';
import tr from './laguages/tr.json';
import de from './laguages/de.json';

export const messages = {
  tr: tr,
  de:de
};

const getIntlContext = (locale) => {
  const cache = createIntlCache();
  return createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache
  );
};

export const firebaseError = (error, locale) => {
  const intl = getIntlContext(locale);
  return intl.formatMessage({
    id: error,
    defaultMessage: messages[locale]['utils.default'],
  });
};

export const availableLocales = Object.keys(messages);

export const browserLocale = navigator.language.split(/[-_]/)[0];

import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { setUserLocale } from './state/actions/preferences.js';
import { messages } from './Utils';

const LanguageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  let { locale } = useSelector(
    (state) => ({
      locale: state.preferences.locale,
    }),
    shallowEqual
  );

  if (!locale) {
    // locale = availableLocales.includes(browserLocale) ? browserLocale : 'de';
    locale = 'tr';
    dispatch(setUserLocale(locale));
  }

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="tr"
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default LanguageWrapper;

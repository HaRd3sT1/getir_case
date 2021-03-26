import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { setUserLocale } from '../state/actions/preferences.js';
import { availableLocales, browserLocale, messages } from '../Utils';
import {defaultLanguage} from "../Settings"

const LanguageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  let { locale } = useSelector(
    (state) => ({
      locale: state.preferences.locale,
    }),
    shallowEqual
  );
 
  if(locale !== defaultLanguage){
    locale = availableLocales.includes(browserLocale) ? browserLocale : defaultLanguage;
    dispatch(setUserLocale(defaultLanguage));
  }
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLanguage}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default LanguageWrapper;

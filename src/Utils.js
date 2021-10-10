import turkce from './languages/tr.json';
import english from './languages/en.json';

export const messages = {
  tr: turkce,
  en:english
};
export const availableLocales = Object.keys(messages);

export const browserLocale = navigator.language.split(/[-_]/)[0];

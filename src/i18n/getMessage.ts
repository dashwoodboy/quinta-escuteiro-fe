import type { Locale, Messages } from './types';
import { messagesEn } from './messages/en';
import { messagesFr } from './messages/fr';
import { messagesPt } from './messages/pt';

const catalogs: Record<Locale, Messages> = {
  pt: messagesPt,
  en: messagesEn,
  fr: messagesFr,
};

export function getCatalog(locale: Locale): Messages {
  return catalogs[locale] ?? messagesPt;
}

export function getMessage(locale: Locale, path: string): string {
  const parts = path.split('.');
  let current: unknown = getCatalog(locale);

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : path;
}

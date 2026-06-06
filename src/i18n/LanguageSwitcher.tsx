import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { LOCALES, type Locale } from './types';
import { useI18n } from './I18nProvider';
import './LanguageSwitcher.scss';

const localeLabels: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  fr: 'FR',
};

type Props = {
  className?: string;
  variant?: 'header' | 'form';
};

type ThumbRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const emptyThumb: ThumbRect = { left: 0, top: 0, width: 0, height: 0 };

export function LanguageSwitcher({ className = '', variant = 'header' }: Props) {
  const { locale, setLocale, t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState<ThumbRect>(emptyThumb);

  const activeIndex = LOCALES.indexOf(locale);

  const syncThumb = useCallback(() => {
    const container = containerRef.current;
    const btn = btnRefs.current[activeIndex];
    if (!container || !btn) {
      setThumb(emptyThumb);
      return;
    }
    const cr = container.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setThumb({
      left: br.left - cr.left,
      top: br.top - cr.top,
      width: br.width,
      height: br.height,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    syncThumb();
  }, [syncThumb]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => syncThumb());
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncThumb]);

  return (
    <div
      ref={containerRef}
      className={`lang-switch lang-switch--${variant} ${className}`.trim()}
      role="group"
      aria-label={t('lang.label')}
    >
      <span
        className="lang-switch__thumb"
        aria-hidden
        style={{
          left: thumb.left,
          top: thumb.top,
          width: thumb.width,
          height: thumb.height,
        }}
      />
      {LOCALES.map((code, i) => (
        <button
          key={code}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          type="button"
          className={`lang-switch__btn${locale === code ? ' lang-switch__btn--active' : ''}`}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { logo } from '../../assets';
import { site } from '../../data/site';
import { LanguageSwitcher } from '../../i18n/LanguageSwitcher';
import { useI18n } from '../../i18n/I18nProvider';
import './Header.scss';

/** Igual a `$bp-nav` em `_variables.scss` — menu em coluna + portal. */
const NAV_MOBILE_MQ = '(max-width: 767px)';

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(NAV_MOBILE_MQ).matches : false,
  );
  const { scrollY } = useScroll();

  const items = useMemo(
    () => [
      { href: '#inicio', label: t('nav.home') },
      { href: '#sobre', label: t('nav.about') },
      { href: '#atividades', label: t('nav.activities') },
      { href: '#reservations', label: t('nav.reserve') },
      { href: '#contactos', label: t('nav.contact') },
    ],
    [t],
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia(NAV_MOBILE_MQ);
    const sync = () => {
      setIsNarrow(mq.matches);
      if (!mq.matches) setOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!open || !isNarrow) return;
    const y = window.scrollY;
    const { body, documentElement: html } = document;
    const prevBody = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width };
    const prevHtmlOverflow = html.style.overflow;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';
    html.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prevBody.overflow;
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.width = prevBody.width;
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, y);
    };
  }, [open, isNarrow]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  const navEl = useMemo(
    () => (
      <nav
        className={`header__nav header__nav--sheet ${open ? 'header__nav--open' : ''}`}
        id="site-nav-drawer"
        aria-hidden={!open}
      >
        <div className="header__nav-main">
          {items.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="header__link"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
        <div className="header__nav-footer">
          <LanguageSwitcher />
          <a href="#reservations" className="btn btn--primary header__cta" onClick={() => setOpen(false)}>
            {t('nav.reserve')}
          </a>
        </div>
      </nav>
    ),
    [items, open, t],
  );

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''} ${open && isNarrow ? 'header--menu-open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header__inner container">
        <a href="#inicio" className="header__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt={site.name} className="header__logo" />
          <span className="header__title">{site.name}</span>
        </a>

        {!isNarrow ? navEl : null}

        <button
          type="button"
          className={`header__toggle${open ? ' header__toggle--open' : ''}`}
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
          aria-controls="site-nav-drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isNarrow ? createPortal(navEl, document.body) : null}
    </motion.header>
  );
}

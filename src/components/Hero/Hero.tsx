import { motion } from 'framer-motion';
import { hero } from '../../assets';
import { useI18n } from '../../i18n/I18nProvider';
import './Hero.scss';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="inicio" className="hero">
      <div className="hero__bg">
        <motion.img
          src={hero}
          alt={t('hero.imageAlt')}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="hero__overlay" />
        <div className="hero__grain" aria-hidden />
      </div>

      <div className="hero__content container">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t('hero.lead')}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <a href="#atividades" className="btn btn--primary btn--lg">
            {t('hero.ctaActivities')}
          </a>
          <a href="#sobre" className="btn btn--ghost btn--lg">
            {t('hero.ctaAbout')}
          </a>
        </motion.div>
      </div>

      <div className="hero__scroll-wrap">
        <motion.a
          href="#sobre"
          className="hero__scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.8, duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-label={t('hero.scrollAria')}
        >
          <span className="hero__scroll-label">{t('hero.scrollLabel')}</span>
          <span className="hero__scroll-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.a>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { site } from '../../data/site';
import { useI18n } from '../../i18n/I18nProvider';
import './Reservations.scss';

export function Reservations() {
  const { t } = useI18n();

  return (
    <section id="reservations" className="reservations section">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{t('reservations.label')}</span>
          <h2>{t('reservations.title')}</h2>
          <p>{t('reservations.intro')}</p>
        </motion.div>

        <motion.div
          className="reservations__panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <div className="reservations__panel-header">
            <div>
              <h3>{t('reservations.formTitle')}</h3>
              <p>{t('reservations.formSubtitle')}</p>
            </div>
            <div className="reservations__panel-actions">
              <a
                href={site.reservationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost reservations__open-link"
              >
                {t('reservations.openGoogle')}
              </a>
            </div>
          </div>

          <div className="reservations__form-body">
            <div className="reservations__iframe-wrap">
              <iframe
                title={t('reservations.iframeTitle')}
                src={site.reservationFormEmbedUrl}
                className="reservations__iframe"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

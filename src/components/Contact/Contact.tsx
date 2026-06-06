import { motion } from 'framer-motion';
import { site } from '../../data/site';
import { useI18n } from '../../i18n/I18nProvider';
import { ContactMap } from './ContactMap';
import './Contact.scss';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contactos" className="contact section">
      <div className="container">
        <motion.div
          className="contact__card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact__info">
            <span className="section-label">{t('contact.label')}</span>
            <h2>{t('contact.title')}</h2>
            <p>{site.address}</p>
            <ul className="contact__list">
              <li>
                <span>{t('contact.phone')}</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span>{t('contact.email')}</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span>{t('contact.location')}</span>
                <strong>{site.location}</strong>
              </li>
            </ul>
            <div className="contact__social">
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                {t('contact.facebook')}
              </a>
              <a href={site.website} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                {t('contact.officialSite')}
              </a>
            </div>
          </div>
          <ContactMap />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { qe_camp } from '../../assets';
import { site } from '../../data/site';
import { useI18n } from '../../i18n/I18nProvider';
import './About.scss';

export function About() {
  const { t, messages } = useI18n();

  return (
    <section id="sobre" className="about section">
      <div className="container about__grid">
        <div className="about__visual">
          <motion.div
            className="about__image-wrap"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <img src={qe_camp} alt={t('about.imageAlt')} loading="lazy" />
            <div className="about__image-accent" />
          </motion.div>
        </div>

        <div className="about__text">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('about.label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('about.title')}
          </motion.h2>
          {messages.about.paragraphs.map((p, i) => (
            <motion.p
              key={p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
          <motion.ul
            className="about__links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            {site.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {t('about.linkRegional')} →
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

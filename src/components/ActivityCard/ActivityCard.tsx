import { motion } from 'framer-motion';
import type { KeyboardEvent } from 'react';
import type { Activity } from '../../types';
import { useI18n } from '../../i18n/I18nProvider';
import { useLocalizedActivity, useCategoryLabel } from '../../i18n/useLocalizedActivity';
import { getCardPricePillLabel, pricePillClass } from '../../utils/pricePill';
import './ActivityCard.scss';

interface Props {
  activity: Activity;
  index: number;
  onSelect: (a: Activity) => void;
}

export function ActivityCard({ activity, index, onSelect }: Props) {
  const { t, messages } = useI18n();
  const localized = useLocalizedActivity(activity);
  const categoryLabel = useCategoryLabel(localized.category);
  const priceLabels = {
    free: messages.activities.priceFree,
    paid: messages.activities.pricePaid,
    paidPrefix: messages.activities.pricePaidPrefix,
    onRequest: messages.activities.priceOnRequest,
  };

  const open = () => onSelect(activity);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  return (
    <motion.article
      className="activity-card"
      layout
      role="button"
      tabIndex={0}
      aria-label={`${t('activities.learnMoreAria')} ${localized.title}`}
      onClick={open}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <div className="activity-card__media">
        <img src={localized.image} alt={localized.imageAlt} loading="lazy" />
        <div className="activity-card__overlay" />
        <span className={`tag ${pricePillClass[localized.priceType]}`}>
          {getCardPricePillLabel(localized, priceLabels)}
        </span>
        {localized.badge && <span className="activity-card__badge">{localized.badge}</span>}
      </div>
      <div className="activity-card__body">
        <span className="activity-card__category">{categoryLabel}</span>
        <h3>{localized.title}</h3>
        <p>{localized.summary}</p>
        <div className="activity-card__meta">
          {localized.duration && <span>⏱ {localized.duration}</span>}
          {localized.sections && <span>🎗 {localized.sections}</span>}
        </div>
        <span className="activity-card__cta">
          {t('activities.learnMore')}
          <span aria-hidden>→</span>
        </span>
      </div>
    </motion.article>
  );
}

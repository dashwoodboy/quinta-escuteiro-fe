import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { Activity } from '../../types';
import { useI18n } from '../../i18n/I18nProvider';
import { useLocalizedActivity, useCategoryLabel } from '../../i18n/useLocalizedActivity';
import { getModalPricePillLabel, pricePillClass } from '../../utils/pricePill';
import { renderContactText } from './renderContact';
import './ActivityModal.scss';

interface Props {
  activity: Activity | null;
  onClose: () => void;
}

function ActivityModalDialog({ activity, onClose }: { activity: Activity; onClose: () => void }) {
  const { t, messages } = useI18n();
  const localized = useLocalizedActivity(activity);
  const categoryLabel = useCategoryLabel(localized.category);
  const priceLabels = {
    free: messages.activities.priceFree,
    paid: messages.activities.pricePaid,
    paidPrefix: messages.activities.pricePaidPrefix,
    onRequest: messages.activities.priceOnRequest,
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-layer">
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label={t('activities.closeModal')}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="modal__scroll">
          <div className="modal__hero">
            <img src={localized.image} alt={localized.imageAlt} />
            <div className="modal__hero-overlay">
              <span className="modal__category">{categoryLabel}</span>
              <h2 id="modal-title">{localized.title}</h2>
              <span className={`tag ${pricePillClass[localized.priceType]} modal__price-tag`}>
                {getModalPricePillLabel(localized, priceLabels)}
              </span>
            </div>
          </div>
          <div className="modal__content">
            <p className="modal__summary">{localized.summary}</p>
            <ul className="modal__details">
              {localized.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {(localized.duration || localized.sections) && (
              <div className="modal__meta">
                {localized.duration && (
                  <p>
                    <strong>{t('activities.durationLabel')}</strong> {localized.duration}
                  </p>
                )}
                {localized.sections && (
                  <p>
                    <strong>{t('activities.sectionsLabel')}</strong> {localized.sections}
                  </p>
                )}
              </div>
            )}

            {(localized.contact || localized.links?.length) ? (
              <div className="modal__footer">
                {localized.contact && (
                  <div className="modal__contact">
                    <span className="modal__contact-label">{t('activities.contactLabel')}</span>
                    <p className="modal__contact-value">{renderContactText(localized.contact)}</p>
                  </div>
                )}
                {localized.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal__footer-link"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ActivityModal({ activity, onClose }: Props) {
  return (
    <AnimatePresence>
      {activity ? <ActivityModalDialog activity={activity} onClose={onClose} /> : null}
    </AnimatePresence>
  );
}

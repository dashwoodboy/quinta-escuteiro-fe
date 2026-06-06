import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { activities, categories } from '../../data/activities';
import type { Activity } from '../../types';
import { useCategoryLabel } from '../../i18n/useLocalizedActivity';
import { useI18n } from '../../i18n/I18nProvider';
import { ActivityCard } from '../ActivityCard';
import { ActivityModal } from '../ActivityModal';
import './Activities.scss';

export function Activities() {
  const { t } = useI18n();
  const [filter, setFilter] = useState('Todas');
  const [selected, setSelected] = useState<Activity | null>(null);

  const filtered = useMemo(
    () =>
      filter === 'Todas'
        ? activities
        : activities.filter((a) => a.category === filter),
    [filter],
  );

  const freeCount = activities.filter((a) => a.priceType === 'free').length;
  const paidCount = activities.filter((a) => a.priceType === 'paid').length;

  return (
    <section id="atividades" className="activities section">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">{t('activities.label')}</span>
          <h2>{t('activities.title')}</h2>
          <p>{t('activities.intro')}</p>
          <div className="activities__counts">
            <span className="tag tag--free">
              {freeCount} {t('activities.freeCount')}
            </span>
            <span className="tag tag--paid">
              {paidCount} {t('activities.paidCount')}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="activities__filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <CategoryFilterPill
              key={cat}
              category={cat}
              active={filter === cat}
              onSelect={() => setFilter(cat)}
            />
          ))}
        </motion.div>

        <motion.div className="activities__grid" layout>
          {filtered.map((activity, i) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </motion.div>
      </div>
      <ActivityModal activity={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function CategoryFilterPill({
  category,
  active,
  onSelect,
}: {
  category: string;
  active: boolean;
  onSelect: () => void;
}) {
  const label = useCategoryLabel(category === 'Todas' ? 'Todas' : category);

  return (
    <button
      type="button"
      className={`filter-pill ${active ? 'filter-pill--active' : ''}`}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

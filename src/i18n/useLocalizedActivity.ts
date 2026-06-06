import { useMemo } from 'react';
import type { Activity } from '../types';
import { getActivityTranslation } from './activityTranslations';
import { useI18n } from './I18nProvider';

export function useLocalizedActivity(activity: Activity): Activity {
  const { locale } = useI18n();

  return useMemo(() => {
    const tr = getActivityTranslation(locale, activity.id);
    if (!tr) return activity;

    return {
      ...activity,
      title: tr.title ?? activity.title,
      summary: tr.summary ?? activity.summary,
      imageAlt: tr.imageAlt ?? activity.imageAlt,
      category: tr.category ?? activity.category,
      badge: tr.badge ?? activity.badge,
      details: tr.details ?? activity.details,
      links: tr.links ?? activity.links,
      contact: tr.contact ?? activity.contact,
    };
  }, [activity, locale]);
}

export function useCategoryLabel(category: string): string {
  const { messages } = useI18n();
  return messages.categories[category] ?? category;
}

import type { Activity } from '../types';

const EURO_RE = /\d+[,.]?\d*\s*€/g;
const GENERIC_PAID_PREFIX = /^paga(\s|$|—|-|–)/i;

export type PricePillLabels = {
  free: string;
  paid: string;
  paidPrefix: string;
  onRequest: string;
};

/** Pill na grelha de cards: só Gratuito ou Pago */
export function getCardPricePillLabel(activity: Activity, labels: PricePillLabels): string {
  if (activity.priceType === 'free') {
    return labels.free;
  }
  return labels.paid;
}

/** Pill no modal: Gratuito ou Paga — {informação} */
export function getModalPricePillLabel(activity: Activity, labels: PricePillLabels): string {
  if (activity.priceType === 'free') {
    return labels.free;
  }
  return `${labels.paidPrefix} - ${getPaidDetail(activity, labels.onRequest)}`;
}

function getPaidDetail(activity: Activity, onRequest: string): string {
  const label = activity.priceLabel.trim();

  if (label && !/^paga$/i.test(label)) {
    const stripped = label.replace(/^paga\s*(—|-|–)\s*/i, '').trim();
    if (stripped) return stripped;
    if (!GENERIC_PAID_PREFIX.test(label)) return label;
  }

  const fromDetails = extractCostFromDetails(activity.details);
  if (fromDetails) return fromDetails;

  return onRequest;
}

function extractCostFromDetails(details: string[]): string | null {
  for (const line of details) {
    if (!/€|preço|custo|price|cost|prix/i.test(line)) continue;

    const matches = line.match(EURO_RE);
    if (!matches?.length) continue;

    if (matches.length > 1) {
      return `${matches[0]} – ${matches[matches.length - 1]}`;
    }

    return matches[0];
  }

  return null;
}

export const pricePillClass: Record<Activity['priceType'], string> = {
  free: 'tag--free',
  paid: 'tag--paid',
  info: 'tag--info',
};

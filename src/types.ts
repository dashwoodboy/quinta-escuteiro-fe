export type PriceType = 'free' | 'paid' | 'info';

export interface Activity {
  id: string;
  title: string;
  category: string;
  priceType: PriceType;
  priceLabel: string;
  duration?: string;
  sections?: string;
  image: string;
  imageAlt: string;
  summary: string;
  details: string[];
  links?: { label: string; href: string }[];
  contact?: string;
  badge?: string;
}

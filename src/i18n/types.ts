export const LOCALES = ['pt', 'en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';
export const LOCALE_STORAGE_KEY = 'qe-locale';

export type Messages = {
  lang: {
    label: string;
    pt: string;
    en: string;
    fr: string;
  };
  nav: {
    home: string;
    about: string;
    activities: string;
    reserve: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    imageAlt: string;
    title: string;
    lead: string;
    ctaActivities: string;
    ctaAbout: string;
    scrollLabel: string;
    scrollAria: string;
  };
  highlights: {
    history: string;
    trails: string;
    activities: string;
    cne: string;
  };
  about: {
    label: string;
    title: string;
    imageAlt: string;
    paragraphs: string[];
    linkRegional: string;
  };
  activities: {
    label: string;
    title: string;
    intro: string;
    freeCount: string;
    paidCount: string;
    learnMore: string;
    learnMoreAria: string;
    filterAll: string;
    closeModal: string;
    priceFree: string;
    pricePaid: string;
    pricePaidPrefix: string;
    priceOnRequest: string;
    durationLabel: string;
    sectionsLabel: string;
    contactLabel: string;
  };
  categories: Record<string, string>;
  reservations: {
    label: string;
    title: string;
    intro: string;
    formTitle: string;
    formSubtitle: string;
    openGoogle: string;
    /** Título acessível do `<iframe>` do Google Forms. */
    iframeTitle: string;
  };
  contact: {
    label: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    facebook: string;
    officialSite: string;
    mapTitle: string;
    mapLegendTitle: string;
    mapCampo: string;
    mapMonastery: string;
    mapSupermarket: string;
    mapRouteMonastery: string;
    mapRouteSupermarket: string;
    mapOpenInMaps: string;
    mapAttribution: string;
  };
  footer: {
    regionalLogoAlt: string;
  };
};

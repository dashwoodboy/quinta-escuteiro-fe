import type { Activity } from '../types';
import type { Locale } from './types';

type ActivityTranslation = Partial<
  Pick<
    Activity,
    'title' | 'summary' | 'imageAlt' | 'category' | 'badge' | 'details' | 'links' | 'contact'
  >
>;

const en: Record<string, ActivityTranslation> = {
  'percursos-pedestres': {
    title: 'Batalha Walking Trails',
    category: 'Nature',
    imageAlt: 'Hiking trail in nature',
    summary:
      'Four walking routes in Batalha municipality to discover the region’s landscapes and hidden spots.',
  },
  'atividades-radicais': {
    title: 'Adventure Activities',
    category: 'Adventure',
    imageAlt: 'Rock climbing',
    summary:
      'Quinta do Escuteiro × Leiria Speleology Club (NEL). Add caving, climbing and rappelling in the Aire and Candeeiros range.',
  },
  'vocalizacao-aves': {
    title: 'Game — Bird Vocalization',
    category: 'Games',
    imageAlt: 'Bird on a branch',
    summary:
      'Match local bird species to their songs — trains identification by ear, as scouts should be ready to do.',
  },
  'jogo-vila': {
    title: 'Village Game by Section',
    category: 'Games',
    imageAlt: 'Historic Portuguese village',
    summary: 'Not sure where to start? A game that guides you through Batalha and its hidden corners.',
  },
  'ninho-madeira': {
    title: 'Wooden Nest Box Building',
    category: 'Environment',
    imageAlt: 'Wooden bird nest box',
    summary:
      'Build a nest box with your patrol/team and place it near the centre or leave it for birds at the Quinta.',
  },
  'marias-way': {
    title: "Maria's Way",
    category: 'Pilgrimage',
    imageAlt: 'Hills at sunrise',
    summary:
      'Route linking Quinta do Escuteiro to the Sanctuary of Fátima — discover Fátima’s message while you walk.',
  },
  'missao-impossivel': {
    title: 'Mission Impossible',
    category: 'Games',
    imageAlt: 'Mysterious forest',
    summary:
      'Discover the Quinta’s secrets — 30 minutes and 30 challenges. Can you complete them all?',
  },
  yoga: {
    title: 'Yoga',
    category: 'Wellbeing',
    imageAlt: 'Outdoor yoga practice',
    badge: 'To be confirmed with instructor',
    summary:
      'A philosophy uniting body, mind and spirit — postures, conscious breathing and guided relaxation.',
  },
  pilates: {
    title: 'Pilates',
    category: 'Wellbeing',
    imageAlt: 'Pilates exercise',
    badge: 'To be confirmed with instructor',
    summary:
      'Exercise system for posture, strength and flexibility — mindful practice with guided relaxation.',
  },
  meditacao: {
    title: 'Meditation',
    category: 'Wellbeing',
    imageAlt: 'Calm meditation setting',
    summary:
      'Regulate the mind and mental patterns — greater focus, clarity and emotional stability.',
  },
  surf: {
    title: 'Surf Lesson',
    category: 'Sport',
    imageAlt: 'Surfing at the beach',
    summary:
      'Surf adrenaline at São Pedro de Moel beach — all levels with qualified instructors.',
  },
  'jogo-4x4': {
    title: '4×4 Game — Discover Your Planet',
    category: 'Games',
    imageAlt: 'Natural landscape with river',
    summary:
      'Four elements — fire, air, water, earth — with 16 games to earn the badge.',
  },
  'fornos-solares': {
    title: 'Solar Ovens',
    category: 'Environment',
    imageAlt: 'Solar energy and nature',
    summary:
      'Cook sustainably using only sunlight — renewable energy and environmental awareness.',
  },
  'servico-quinta': {
    title: 'Service at Quinta do Escuteiro',
    category: 'Service',
    imageAlt: 'Team work outdoors',
    summary:
      'Help preserve the scout campsite — maintenance, repairs and improvements to shared spaces.',
  },
  'ciba-arborismo': {
    title: 'CIBA / Tree Climbing',
    category: 'Culture & Adventure',
    imageAlt: 'Historic Portuguese monument',
    summary:
      'Aljubarrota Battle Interpretation Centre — interactive history of 1385, with optional tree climbing.',
  },
  'empreitada-iv': {
    title: 'Rover Service Weekend',
    category: 'Service',
    imageAlt: 'Team field work',
    summary:
      'Large-scale service weekend — structural maintenance and new projects. For Rovers, candidates and leaders.',
  },
};

const fr: Record<string, ActivityTranslation> = {
  'percursos-pedestres': {
    title: 'Sentiers pédestres de Batalha',
    category: 'Nature',
    imageAlt: 'Sentier de randonnée',
    summary:
      'Quatre itinéraires dans la commune de Batalha pour découvrir les paysages et coins secrets de la région.',
  },
  'atividades-radicais': {
    title: 'Activités radicales',
    category: 'Aventure',
    imageAlt: 'Escalade',
    summary:
      'Quinta do Escuteiro × Núcleo de Espeleologia de Leiria (NEL). Spéléologie, escalade et rappel dans la Serra de Aire et Candeeiros.',
  },
  'vocalizacao-aves': {
    title: 'Jeu — Vocalisation des oiseaux',
    category: 'Jeux',
    imageAlt: 'Oiseau sur une branche',
    summary:
      'Associe les espèces d’oiseaux locales à leurs chants — entraîne l’identification à l’oreille.',
  },
  'jogo-vila': {
    title: 'Jeu de village par section',
    category: 'Jeux',
    imageAlt: 'Village historique',
    summary:
      'Tu ne sais pas par où commencer ? Un jeu pour découvrir Batalha et ses recoins.',
  },
  'ninho-madeira': {
    title: 'Construction de nichoir en bois',
    category: 'Environnement',
    imageAlt: 'Nichoir en bois',
    summary:
      'Construis un nichoir avec ta patrouille/équipe et installe-le près du centre ou pour les oiseaux de la Quinta.',
  },
  'marias-way': {
    title: "Maria's Way",
    category: 'Pèlerinage',
    imageAlt: 'Collines au lever du soleil',
    summary:
      'Itinéraire reliant la Quinta au Sanctuaire de Fátima — découvre le message de Fátima en marchant.',
  },
  'missao-impossivel': {
    title: 'Mission impossible',
    category: 'Jeux',
    imageAlt: 'Forêt mystérieuse',
    summary:
      'Découvre les secrets de la Quinta — 30 minutes et 30 défis. Seras-tu à la hauteur ?',
  },
  yoga: {
    title: 'Yoga',
    category: 'Bien-être',
    imageAlt: 'Yoga en plein air',
    badge: "À confirmer avec l'instructrice",
    summary:
      'Philosophie unissant corps, esprit et âme — postures, respiration consciente et relaxation guidée.',
  },
  pilates: {
    title: 'Pilates',
    category: 'Bien-être',
    imageAlt: 'Exercice de pilates',
    badge: "À confirmer avec l'instructrice",
    summary:
      'Système d’exercices pour posture, force et souplesse — pratique consciente avec relaxation.',
  },
  meditacao: {
    title: 'Méditation',
    category: 'Bien-être',
    imageAlt: 'Méditation au calme',
    summary:
      'Réguler l’esprit — plus de concentration, clarté et stabilité émotionnelle.',
  },
  surf: {
    title: 'Cours de surf',
    category: 'Sport',
    imageAlt: 'Surf à la plage',
    summary:
      'Surf à la plage de São Pedro de Moel — tous niveaux avec instructeurs qualifiés.',
  },
  'jogo-4x4': {
    title: 'Jeu 4×4 — Découvre ta planète',
    category: 'Jeux',
    imageAlt: 'Paysage naturel',
    summary:
      'Quatre éléments — feu, air, eau, terre — avec 16 jeux pour obtenir l’insigne.',
  },
  'fornos-solares': {
    title: 'Fours solaires',
    category: 'Environnement',
    imageAlt: 'Énergie solaire',
    summary:
      'Cuisiner de façon durable avec la lumière du soleil — énergies renouvelables et conscience environnementale.',
  },
  'servico-quinta': {
    title: 'Service à la Quinta do Escuteiro',
    category: 'Service',
    imageAlt: 'Travail d’équipe',
    summary:
      'Contribue à la préservation du terrain scout — entretien, réparations et améliorations des espaces communs.',
  },
  'ciba-arborismo': {
    title: 'CIBA / Arborisme',
    category: 'Culture & Aventure',
    imageAlt: 'Monument historique',
    summary:
      "Centre d'interprétation de la bataille d'Aljubarrota — histoire interactive de 1385, avec arborisme en option.",
  },
  'empreitada-iv': {
    title: 'Week-end de service Rover',
    category: 'Service',
    imageAlt: 'Équipe sur le terrain',
    summary:
      'Week-end de service de grande envergure — maintenance structurelle et nouveaux projets. Pour Routiers et animateurs.',
  },
};

const byLocale: Record<Exclude<Locale, 'pt'>, Record<string, ActivityTranslation>> = {
  en,
  fr,
};

export function getActivityTranslation(
  locale: Locale,
  id: string,
): ActivityTranslation | undefined {
  if (locale === 'pt') return undefined;
  return byLocale[locale][id];
}

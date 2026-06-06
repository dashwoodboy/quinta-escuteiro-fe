import { birdsHouse, mosteiro, trail, mariaWay, pilates, meditation, solar, teamWork } from '../assets';
import type { Activity } from '../types';


/** Imagens via Unsplash (licença livre — unsplash.com/license) */
const img = {
  hiking: trail,
  climbing: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80',
  caving: 'https://images.unsplash.com/photo-1504280390367-361c66d9e989?w=1200&q=80',
  birds: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80',
  village: mosteiro,
  birdhouse: birdsHouse,
  pilgrimage: mariaWay,
  forest: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80',
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
  pilates,
  meditation,
  surf: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80',
  nature: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
  solar,
  gardening: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
  castle: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80',
  teamWork,
  trails: trail,
};

export const activities: Activity[] = [
  {
    id: 'percursos-pedestres',
    title: 'Percursos Pedestres da Batalha',
    category: 'Natureza',
    priceType: 'free',
    priceLabel: 'Gratuito',
    duration: '1h45 — 3h',
    sections: 'Todas',
    image: img.trails,
    imageAlt: 'Trilho pedestre na natureza',
    summary:
      'No concelho da Batalha existem 4 percursos pedestres para descobrir os encantos e recantos da região.',
    details: [
      'PR1 — Mata do Cerejal: Partida/Chegada junto à Capela de São Mateus · 6 km · ~2h20 · Dificuldade média',
      'PR2 — Buraco Roto: Partida/Chegada no Largo da Fonte · 6 km · ~2h20 · Dificuldade média',
      'PR3 — Rota dos Moinhos: Partida/Chegada junto à Escola Básica dos Crespos · 6,7 km · ~3h · Dificuldade média',
      'PR4 — Caminho de Ferro Mineiro do Lena: Ponte da Boitaca ou Minas das Barrojeiras · 6 km · ~1h45 · Dificuldade baixa',
    ],
    links: [
      {
        label: 'Escolher trilho — Descobrir Batalha',
        href: 'https://www.descobrirbatalha.pt/visitar/pedestrianismo/',
      },
    ],
  },
  {
    id: 'atividades-radicais',
    title: 'Atividades Radicais',
    category: 'Aventura',
    priceType: 'paid',
    priceLabel: 'Paga',
    sections: 'II, III, IV (conforme atividade)',
    image: img.climbing,
    imageAlt: 'Escalada em rocha',
    summary:
      'Parceria Quinta do Escuteiro × Núcleo de Espeleologia de Leiria (NEL). Complementa a estadia com atividades radicais na Serra de Aire e Candeeiros.',
    details: [
      'Escalada / Rapel',
      'Espeleologia (Visita)',
      'Espeleologia (Curso NI)',
      'Espeleologia + Escalada / Rapel',
      'Atividades asseguradas por associados do NEL com formação e experiência.',
      'Zona: Reguengo do Fetal e Serra de Aire e Candeeiros.',
    ],
    contact: 'Preço, disponibilidade e marcação: nel.leiria@gmail.com',
  },
  {
    id: 'vocalizacao-aves',
    title: 'Jogo — Vocalização de Aves',
    category: 'Jogos',
    priceType: 'free',
    priceLabel: 'Gratuito',
    duration: '30 min — 1h',
    sections: 'I e II secção',
    image: img.birds,
    imageAlt: 'Pássaro num ramo',
    summary:
      'Associa espécies de aves da região aos seus cantos — desenvolve a identificação pela audição, como os escuteiros devem estar preparados para fazer.',
    details: [
      'O grupo prepara materiais para reprodução dos sons (enviados em anexo na reserva).',
      'Cartas com imagens e características das aves disponibilizadas em campo — solicitar ao staff.',
    ],
  },
  {
    id: 'jogo-vila',
    title: 'Jogo de Vila por Secção',
    category: 'Jogos',
    priceType: 'free',
    priceLabel: 'Gratuito',
    duration: '1h — 1h30',
    sections: 'I, II, III, IV',
    image: img.village,
    imageAlt: 'Cidade histórica portuguesa',
    summary: 'Não sabes por onde começar? Um jogo que te leva a conhecer a cidade da Batalha e os seus recantos.',
    details: [
      'Mapa da cidade e ficha de jogo disponíveis em anexo na reserva.',
    ],
  },
  {
    id: 'ninho-madeira',
    title: 'Construção de Ninho de Madeira',
    category: 'Ambiente',
    priceType: 'paid',
    priceLabel: '3€',
    duration: '30 min — 1h',
    sections: 'I, II, III, IV',
    image: img.birdhouse,
    imageAlt: 'Ninho de aves em madeira',
    summary:
      'Constrói um ninho com o teu bando/patrulha/equipa/tribo e coloca-o numa árvore perto da sede ou deixa-o para as aves da Quinta.',
    details: [
      'Inclui todos os materiais e utensílios.',
      'Informações aquando da solicitação na reserva.',
    ],
  },
  {
    id: 'marias-way',
    title: "Maria's Way",
    category: 'Peregrinação',
    priceType: 'free',
    priceLabel: 'Gratuito',
    sections: 'I, II, III, IV',
    image: img.pilgrimage,
    imageAlt: 'Caminho entre colinas ao amanhecer',
    summary:
      'Percurso que liga a Quinta do Escuteiro ao Santuário de Fátima — descobre a mensagem de Fátima enquanto peregrinas.',
    details: [
      '"Peregrinar é uma forma de procurar, de avançar, de olhar o horizonte — essa linha onde a Terra e o Céu se tocam."',
      'Distância aproximada: 26 km.',
    ],
  },
  {
    id: 'missao-impossivel',
    title: 'Missão Impossível',
    category: 'Jogos',
    priceType: 'free',
    priceLabel: 'Gratuito',
    duration: '30 min',
    sections: 'Todas',
    image: img.forest,
    imageAlt: 'Floresta misteriosa',
    summary:
      'Descobre os encantos e segredos da Quinta do Escuteiro — 30 minutos e 30 desafios. Serás capaz?',
    details: [
      'Imprimir o jogo para cada equipa (anexo na reserva).',
      'Soluções disponíveis junto da equipa de Staff ao terminar.',
    ],
  },
  {
    id: 'yoga',
    title: 'Yoga',
    category: 'Bem-estar',
    priceType: 'paid',
    priceLabel: 'Paga — a confirmar',
    badge: 'A confirmar com instrutora',
    duration: '60 ou 90 min',
    sections: 'I, II, III, IV',
    image: img.yoga,
    imageAlt: 'Prática de yoga ao ar livre',
    summary:
      'Filosofia de vida que une corpo, mente e espírito — posturas psicofísicas, respiração consciente e relaxamento guiado.',
    details: [
      '60 min: yoga com posturas de força, equilíbrio e flexibilidade.',
      '90 min: yoga seguida de meditação à escolha.',
      'Trazer roupa prática. Informações na reserva.',
    ],
  },
  {
    id: 'pilates',
    title: 'Pilates',
    category: 'Bem-estar',
    priceType: 'paid',
    priceLabel: '20€ / grupo',
    badge: 'A confirmar com instrutora',
    duration: '60 ou 90 min',
    sections: 'I, II, III, IV',
    image: img.pilates,
    imageAlt: 'Exercício de pilates',
    summary:
      'Sistema de exercício para postura, força e flexibilidade — prática consciente com relaxamento corporal guiado.',
    details: [
      '60 min: sequência típica de pilates.',
      '90 min: pilates + meditação à escolha.',
      'Preço: 20€ por grupo. Roupa prática.',
    ],
  },
  {
    id: 'meditacao',
    title: 'Meditação',
    category: 'Bem-estar',
    priceType: 'paid',
    priceLabel: 'A combinar',
    duration: '30 min',
    sections: 'I, II, III, IV',
    image: img.meditation,
    imageAlt: 'Meditação em ambiente calmo',
    summary:
      'Regular a mente e os padrões mentais — maior concentração, clareza e estabilidade emocional.',
    details: [
      'Estilos à escolha: relaxamento guiado, concentração num som/objeto, visualização, audição de poema/mensagem, foco na respiração.',
      'Preço e disponibilidade com a instrutora Daniela Gomes (contacto na reserva). Roupa prática.',
    ],
  },
  {
    id: 'surf',
    title: 'Aula de Surf',
    category: 'Desporto',
    priceType: 'paid',
    priceLabel: 'Paga',
    sections: 'III e IV secção',
    image: img.surf,
    imageAlt: 'Surf na praia',
    summary:
      'Adrenalina do surf na Praia de São Pedro de Moel — todos os níveis, com instrutores qualificados.',
    details: [
      'Preço e reserva mediante disponibilidade com a escola de surf.',
      'Contacto: 913 814 470 — indicar que vem por parte da QE.',
    ],
    contact: '913 814 470 (mencionar Quinta do Escuteiro)',
  },
  {
    id: 'jogo-4x4',
    title: 'Jogo 4×4 — Descobre o Teu Planeta',
    category: 'Jogos',
    priceType: 'paid',
    priceLabel: '1,50€',
    duration: '30 min — 2h',
    sections: 'I, II, III, IV',
    image: img.nature,
    imageAlt: 'Paisagem natural com rio',
    summary:
      'Dinâmica em quatro elementos — fogo, ar, água, terra — com 16 jogos para conquistar a insígnia.',
    details: [
      '4 jogos por elemento (16 no total). Temáticas práticas e de reflexão.',
      'Fichas disponíveis em campo — solicitar ao Staff. Escolher jogos conforme o tempo disponível.',
      'Custo: 1,25€–1,50€ (cartão + insígnia).',
    ],
  },
  {
    id: 'fornos-solares',
    title: 'Fornos Solares',
    category: 'Ambiente',
    priceType: 'paid',
    priceLabel: '5€ / forno',
    sections: 'I, II, III, IV',
    image: img.solar,
    imageAlt: 'Energia solar e natureza',
    summary:
      'Cozinhar de forma sustentável usando apenas a luz do sol — energias renováveis e consciência ambiental.',
    details: [
      'Construção de fornos com materiais simples e experiência prática de cozinha solar.',
      'Custo: 5€ por forno. Informações na reserva.',
    ],
  },
  {
    id: 'servico-quinta',
    title: 'Serviço à Quinta do Escuteiro',
    category: 'Serviço',
    priceType: 'free',
    priceLabel: 'Gratuito',
    sections: 'III e IV secção',
    image: img.gardening,
    imageAlt: 'Trabalho de equipa na natureza',
    summary:
      'Contribui para a preservação do campo escutista — manutenção, reparos e melhorias nos espaços comuns.',
    details: [
      'Reforça espírito de equipa, responsabilidade e valorização do espaço partilhado.',
      'Levar luvas de proteção individual (não disponibilizamos para todos).',
    ],
  },
  {
    id: 'empreitada-iv',
    title: 'Empreitada à IV',
    category: 'Serviço',
    priceType: 'info',
    priceLabel: 'Atividade QE',
    sections: 'Caminheiros, candidatos e dirigentes',
    image: img.teamWork,
    imageAlt: 'Equipa em trabalho de campo',
    summary:
      'Fim de semana de serviço de maior dimensão — manutenção estrutural e novos projetos no campo. Espírito de serviço para quem lidera.',
    details: [
      'Não é oferta pedagógica — atividade dedicada à IV e dirigentes.',
      'Reparações, melhorias e desenvolvimento do espaço ao longo de um fim de semana.',
    ],
  },
];

export const categories = [
  'Todas',
  ...Array.from(new Set(activities.map((a) => a.category))),
];

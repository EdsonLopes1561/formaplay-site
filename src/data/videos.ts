export type VideoCategory = 
  | 'apresentacao' 
  | 'empreenda-senac' 
  | 'formaplay-na-pratica';

export interface VideoCategoryMeta {
  id: VideoCategory;
  name: string;
  shortLabel: string;
  description: string;
}

export interface VideoItem {
  id: string; // YouTube ID (e.g. 'fs2an3x7TXs')
  slug: string;
  url: string;
  title: string;
  seoTitle: string;
  h1: string;
  badge: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  contentUrl: string;
  duration: string; // ISO 8601 (PT1M, PT2M)
  durationFormatted: string;
  category: VideoCategory;
  categoryName: string;
  publishedDateFormatted: string;
  
  // Reusable fields for "FormaPlay na Prática" and future school application videos
  instituicao?: string;
  cidadeUf?: string;
  educadorResponsavel?: string;
  creditos?: string;

  contextoPedagogico: {
    problema: string;
    solucao: string;
    competencias: string[];
    aplicabilidade: string;
  };
  destaques: string[];
  etapaEmpreendaSenac?: string;
}

export const VIDEO_CATEGORIES: VideoCategoryMeta[] = [
  {
    id: 'apresentacao',
    name: 'Apresentação do Desafio Logístico',
    shortLabel: 'Apresentação',
    description: 'Apresentação oficial, dinâmica das regras e visão geral da proposta pedagógica do Desafio Logístico.'
  },
  {
    id: 'empreenda-senac',
    name: 'Trajetória no Empreenda Senac',
    shortLabel: 'Empreenda Senac',
    description: 'Registros da participação, validação de protótipos e avanço nas etapas do programa Empreenda Senac 2026.'
  },
  {
    id: 'formaplay-na-pratica',
    name: 'FormaPlay na Prática',
    shortLabel: 'Na Prática',
    description: 'Vídeos reais de aplicação dos jogos em instituições de ensino, com professores, turmas e mediação didática.'
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'fs2an3x7TXs',
    slug: 'apresentacao-desafio-logistico',
    url: '/videos/apresentacao-desafio-logistico',
    title: 'Desafio Logístico: Apresentação Oficial e 1ª Fase do Empreenda Senac',
    seoTitle: 'Apresentação do Desafio Logístico: Vídeo Oficial | FormaPlay',
    h1: 'Apresentação do Desafio Logístico: da ideia à validação prática',
    badge: 'Apresentação Oficial & 1ª Fase',
    description: 'Assista à apresentação do Desafio Logístico em 1 minuto. Conheça a concepção do jogo de tabuleiro didático da FormaPlay, a proposta submetida na 1ª fase do Empreenda Senac e como a dinâmica transforma a teoria logística em tomadas de decisão participativas.',
    shortDescription: 'Apresentação oficial de 1 minuto do Desafio Logístico e proposta inicial submetida à 1ª fase do Empreenda Senac.',
    thumbnailUrl: 'https://img.youtube.com/vi/fs2an3x7TXs/hqdefault.jpg',
    uploadDate: '2024-06-01T00:00:00Z',
    embedUrl: 'https://www.youtube.com/embed/fs2an3x7TXs',
    contentUrl: 'https://youtu.be/fs2an3x7TXs',
    duration: 'PT1M',
    durationFormatted: '1 min',
    category: 'apresentacao',
    categoryName: 'Apresentação do Desafio Logístico',
    publishedDateFormatted: '1 de junho de 2024',
    contextoPedagogico: {
      problema: 'Aulas tradicionais de logística enfrentam dificuldade para demonstrar na prática os impactos das decisões operacionais sobre custos, prazos de entrega e atendimento.',
      solucao: 'O Desafio Logístico coloca os alunos no controle de redes de transporte simuladas, exigindo cálculo de frete, definição de rotas, gestão de frota e enfrentamento de gargalos em tempo real.',
      competencias: [
        'Planejamento de rotas e redes de distribuição física',
        'Gestão de orçamento operacional e fluxo de recursos',
        'Avaliação de trade-offs entre custo, prazo e nível de serviço',
        'Tomada de decisão estratégica sob cenários de concorrência'
      ],
      aplicabilidade: 'Indicado para turmas de cursos técnicos em Logística, graduações em Administração e Engenharia de Produção, além de treinamentos corporativos.'
    },
    destaques: [
      'Visão geral da mecânica de tabuleiro e componentes de transporte',
      'Demonstração da dinâmica de tomada de decisão entre 2 a 4 participantes',
      'Pitch inicial de validação do problema pedagógico na 1ª fase do Empreenda Senac',
      'Avanço da proposta para as fases subsequentes de desenvolvimento'
    ],
    etapaEmpreendaSenac: '1ª fase do Empreenda Senac: apresentação da ideia, identificação do problema e proposta de valor'
  },
  {
    id: 'Y1DsO5okIPU',
    slug: 'semifinal-empreenda-senac',
    url: '/videos/semifinal-empreenda-senac',
    title: 'Desafio Logístico na Semifinal do Empreenda Senac 2026: Evolução do Projeto',
    seoTitle: 'Desafio Logístico na Semifinal do Empreenda Senac 2026 | FormaPlay',
    h1: 'Desafio Logístico na semifinal do Empreenda Senac 2026: evolução do projeto',
    badge: 'Semifinal Empreenda Senac 2026',
    description: 'Vídeo desenvolvido para a etapa de avaliação da 2ª fase (semifinal) do programa Empreenda Senac 2026. Acompanhe a evolução do protótipo físico, o refinamento das regras operacionais e a validação metodológica com turmas reais de logística.',
    shortDescription: 'Vídeo da semifinal do Empreenda Senac 2026 apresentando a evolução do protótipo, dinâmica de regras e testes práticos.',
    thumbnailUrl: 'https://img.youtube.com/vi/Y1DsO5okIPU/hqdefault.jpg',
    uploadDate: '2024-08-01T00:00:00Z',
    embedUrl: 'https://www.youtube.com/embed/Y1DsO5okIPU',
    contentUrl: 'https://youtu.be/Y1DsO5okIPU',
    duration: 'PT2M',
    durationFormatted: '2 min',
    category: 'empreenda-senac',
    categoryName: 'Trajetória no Empreenda Senac',
    publishedDateFormatted: '1 de agosto de 2024',
    contextoPedagogico: {
      problema: 'Transformar uma ideia em um recurso didático funcional exige testes práticos de equilíbrio de regras, tempo de partida compatível com a aula e engajamento autêntico dos estudantes.',
      solucao: 'Nesta fase de evolução, o Desafio Logístico teve seu tabuleiro, cartas de eventos e balanço econômico testados e aprimorados com o apoio de docentes da área de logística.',
      competencias: [
        'Gestão de imprevistos em tempo real (quebra de veículos, manutenções e atrasos)',
        'Controle financeiro de despesas variáveis e receitas de fretes',
        'Estratégia de investimento na modernização da frota',
        'Análise crítica de desempenho logístico ao término da simulação'
      ],
      aplicabilidade: 'Validado em aplicações práticas com turmas de formação profissional, demonstrando alta receptividade dos estudantes e facilidade de mediação.'
    },
    destaques: [
      'Evolução do protótipo físico e maturidade visual dos componentes',
      'Demonstração da dinâmica de cartas de eventos e impactos na malha',
      'Registros de aplicação prática em ambiente educacional',
      'Classificação para a etapa semifinal do programa Empreenda Senac 2026'
    ],
    etapaEmpreendaSenac: '2ª fase (Semifinal) do Empreenda Senac 2026: validação de protótipo e consistência do projeto'
  }
];

export const getVideoBySlug = (slug: string): VideoItem | undefined => {
  return VIDEOS.find((v) => v.slug === slug);
};

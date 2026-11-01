import { MUSICA_OFICIAL_META } from './musicaOficialLyrics';

export type MusicCollectionId =
  | 'todas'
  | 'desafio-logistico'
  | 'trilhas-da-jornada'
  | 'institucional';

export type MusicPublicationStatus =
  | 'disponivel'
  | 'aguardando_audio'
  | 'aguardando_revisao'
  | 'em_producao';

export interface MusicCollectionMeta {
  id: MusicCollectionId;
  label: string;
  tagline: string;
  description: string;
  accentColor: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  subtitle?: string;
  collection: 'desafio-logistico' | 'trilhas-da-jornada' | 'institucional';
  collectionLabel: string;
  genre: string;
  description: string;
  duration: string;
  durationSeconds: number;
  audioSrc?: string;
  fallbackAudioSrc?: string;
  coverImage?: string;
  lyrics?: string;
  lyricsNote?: string;
  versionInfo?: string;
  isAvailable: boolean;
  status: MusicPublicationStatus;
  statusLabel: string;
  isOfficial?: boolean;
  badge?: string;
}

export const MUSIC_COLLECTIONS: MusicCollectionMeta[] = [
  {
    id: 'desafio-logistico',
    label: 'Desafio Logístico em Todos os Ritmos',
    tagline: 'A trilha sonora do jogo de tabuleiro',
    description:
      'Coleção das gravações criadas para ambientar as partidas do Desafio Logístico, explorando diferentes ritmos para cada etapa da jornada pedagógica.',
    accentColor: '#38bdf8',
  },
  {
    id: 'trilhas-da-jornada',
    label: 'Trilhas da Nossa Jornada',
    tagline: 'Empreenda Senac & Trajetória Educacional',
    description:
      'Músicas que contam a história do Empreenda Senac, homenagens a professores e mentores e a celebração da nossa caminhada empreendedora.',
    accentColor: '#f97316',
  },
];

export const OFFICIAL_TRACK_ID = 'forma-play-musica-oficial';

/**
 * Trilha oficial da FormaPlay integrada ao catálogo unificado.
 */
export const MUSICA_OFICIAL_TRACK: MusicTrack = {
  id: OFFICIAL_TRACK_ID,
  title: MUSICA_OFICIAL_META.title,
  subtitle: MUSICA_OFICIAL_META.subtitle,
  collection: 'institucional',
  collectionLabel: 'Música Oficial FormaPlay',
  genre: 'Hino Institucional',
  description:
    'Identidade sonora oficial da FormaPlay, com visualizador de ondas dinâmicas e letra sincronizada em tempo real.',
  duration: '3:44',
  durationSeconds: MUSICA_OFICIAL_META.durationSeconds,
  audioSrc: MUSICA_OFICIAL_META.audioSrc,
  fallbackAudioSrc: MUSICA_OFICIAL_META.fallbackAudioSrc,
  coverImage: '/universo-musical-hero.webp',
  isAvailable: true,
  status: 'disponivel',
  statusLabel: 'Disponível',
  isOfficial: true,
  badge: 'Destaque Oficial',
};

/**
 * Catálogo centralizado das gravações da Biblioteca Musical FormaPlay.
 * Todos os arquivos MP3 foram convertidos a 192 kbps estéreo e preparados
 * em public/audio/biblioteca/ prontos para reprodução imediata no navegador.
 */
export const MUSIC_CATALOG: MusicTrack[] = [
  // =========================================================================
  // COLEÇÃO 1: DESAFIO LOGÍSTICO EM TODOS OS RITMOS
  // =========================================================================
  {
    id: 'arena-do-rock-desafio-logistico',
    title: 'Arena do Rock — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Rock',
    duration: '2:58',
    durationSeconds: 178,
    description:
      'Arranjo de rock de arena potente e enérgico, perfeito para rodadas com imprevistos de trânsito, viradas táticas e decisões de alto impacto.',
    versionInfo:
      'Gravação com arranjo de arena, compartilhando a base composicional de Rock — Desafio Logístico com dinâmica sonora ampliada.',
    audioSrc: '/audio/biblioteca/arena-do-rock-desafio-logistico.mp3',
    coverImage: '/caminhoes-chegada-desafio-logistico.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Rock de Arena',
  },
  {
    id: 'rock-desafio-logistico',
    title: 'Rock — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Rock',
    duration: '2:59',
    durationSeconds: 179,
    description:
      'Pegada clássica de rock de estrada com guitarras dinâmicas. Impulsiona a velocidade de raciocínio e a superação de gargalos nas rotas de distribuição.',
    versionInfo:
      'Gravação clássica de estúdio da composição-base Rock, com mixagem direta e foco no ritmo contínuo da rodovia.',
    audioSrc: '/audio/biblioteca/rock-desafio-logistico.mp3',
    coverImage: '/caminhoes-desafio-logistico-componentes.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Rock de Estrada',
  },
  {
    id: 'pop-rap-desafio-logistico',
    title: 'Pop Rap — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Pop Rap',
    duration: '2:38',
    durationSeconds: 158,
    description:
      'Batida urbana contemporânea com rimas ágeis conectando cálculo de fretes, inteligência de malha rodoviária e estratégia cooperativa.',
    audioSrc: '/audio/biblioteca/pop-rap-desafio-logistico.mp3',
    coverImage: '/desafio-logistico-2.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Urbano & Dinâmico',
  },
  {
    id: 'pop-rock-desafio-8',
    title: 'Pop Rock — Desafio 8',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Pop Rock',
    duration: '2:25',
    durationSeconds: 145,
    description:
      'Melodia contagiante e ritmo pulsante em pop rock, ideal para rodadas cooperativas aceleradas e celebração de metas alcançadas na mesa.',
    audioSrc: '/audio/biblioteca/pop-rock-desafio-8.mp3',
    coverImage: '/desafio-logistico-cidade-futura.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Pop Rock',
  },
  {
    id: 'pop-fem-desafio-logistico',
    title: 'Pop Fem — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Pop',
    duration: '2:54',
    durationSeconds: 174,
    description:
      'Interpretação vocal marcante em arranjo pop envolvente, destacando o dinamismo, a liderança e a integração de equipes na logística.',
    audioSrc: '/audio/biblioteca/pop-fem-desafio-logistico.mp3',
    coverImage: '/grupo-desafio-logistico-produto-completo.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Pop Vocal',
  },
  {
    id: 'dance-desafio-logistico',
    title: 'Dance — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Dance / Eletrônico',
    duration: '2:09',
    durationSeconds: 129,
    description:
      'Sintetizadores dinâmicos e batida contínua simbolizando a automação de centros de distribuição, inteligência de dados e rotas expressas.',
    audioSrc: '/audio/biblioteca/dance-desafio-logistico.mp3',
    coverImage: '/desafio-logistico-cidade-futura.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Eletrônico',
  },
  {
    id: 'musica-calma-desafio-logistico',
    title: 'Música Calma — Desafio Logístico',
    collection: 'desafio-logistico',
    collectionLabel: 'Desafio Logístico',
    genre: 'Acústico / Calma',
    duration: '1:09',
    durationSeconds: 69,
    description:
      'Arranjo acústico suave e sereno, propício para momentos de reflexão, análise criteriosa de orçamentos e tomada de decisão estratégica.',
    audioSrc: '/audio/biblioteca/musica-calma-desafio-logistico.mp3',
    coverImage: '/desafio-logistico-produto-mesa.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Acústico Suave',
  },

  // =========================================================================
  // COLEÇÃO 2: TRILHAS DA NOSSA JORNADA
  // =========================================================================
  {
    id: 'nossa-eterna-gratidao-senac-professores',
    title: 'Nossa Eterna Gratidão — Obrigado, Senac e Professores',
    collection: 'trilhas-da-jornada',
    collectionLabel: 'Trilhas da Nossa Jornada',
    genre: 'Homenagem / Emocionante',
    duration: '4:47',
    durationSeconds: 287,
    description:
      'Composição especial em homenagem e agradecimento aos professores, mentores e à instituição Senac pela caminhada formativa e pelo Empreenda Senac 2026.',
    lyricsNote:
      'A letra oficial definitiva desta faixa será disponibilizada após a transcrição integral e conferência direta com a voz cantada no vídeo original, preservando a fidelidade à obra gravada.',
    audioSrc: '/audio/biblioteca/nossa-eterna-gratidao-senac-professores.mp3',
    coverImage: '/professor-mediando-desafio-logistico-em-aula.webp',
    isAvailable: true,
    status: 'disponivel',
    statusLabel: 'Disponível',
    badge: 'Homenagem',
  },
  {
    id: 'plano-em-acao-empreenda-senac',
    title: 'Plano em Ação — Empreenda Senac',
    collection: 'trilhas-da-jornada',
    collectionLabel: 'Trilhas da Nossa Jornada',
    genre: 'Motivacional',
    duration: 'Em breve',
    durationSeconds: 0,
    description:
      'Composição em produção dedicada à energia do Empreenda Senac 2026, inspirando a coragem de empreender e transformar projetos em realidade.',
    isAvailable: false,
    status: 'em_producao',
    statusLabel: 'Em Produção',
    badge: 'Empreenda 2026',
  },
];

/**
 * Retorna todos os gêneros únicos cadastrados na biblioteca.
 */
export const getAvailableGenres = (): string[] => {
  const genres = new Set<string>();
  MUSIC_CATALOG.forEach((track) => {
    if (track.genre) {
      genres.add(track.genre);
    }
  });
  return Array.from(genres);
};

/**
 * Busca uma música do catálogo pelo ID (incluindo a Oficial).
 */
export const getTrackById = (trackId: string): MusicTrack | undefined => {
  if (trackId === OFFICIAL_TRACK_ID) {
    return MUSICA_OFICIAL_TRACK;
  }
  return MUSIC_CATALOG.find((track) => track.id === trackId);
};

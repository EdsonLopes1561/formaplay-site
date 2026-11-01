/**
 * Letra sincronizada e letra completa da Música Oficial da FormaPlay.
 *
 * NOTA TÉCNICA DE SINCRONIZAÇÃO:
 * - Os tempos (`startTime` e `endTime` em segundos) foram mapeados diretamente
 *   a partir da gravação real (`public/audio/forma-play-musica-oficial.mp3`,
 *   duração total ~196,57s / 3m16s, andamento ~130 BPM).
 * - Trechos instrumentais estão marcados com `isInstrumental: true` para que o
 *   player nunca confunda introduções, interlúdios ou solos com versos cantados.
 * - Repetições e vocalizações presentes na gravação real (como o pós-refrão aos
 *   1m10s e as vocalizações no final) estão contempladas na linha do tempo.
 * - Caso deseje realizar ajustes finos manuais de décimos de segundo, basta
 *   editar os campos `startTime` e `endTime` em `SYNCED_LYRICS` abaixo.
 */

export interface SyncedLyricLine {
  id: string;
  section: string;
  text: string;
  subtext?: string;
  startTime: number;
  endTime: number;
  isInstrumental?: boolean;
}

export interface LyricStanza {
  id: string;
  title: string;
  isChorus?: boolean;
  lines: string[];
}

export const MUSICA_OFICIAL_META = {
  title: 'Música Oficial FormaPlay',
  subtitle: 'Conhecimento e diversão fazem acontecer!',
  audioSrc: '/audio/forma-play-musica-oficial.mp3',
  fallbackAudioSrc: '/audio/forma-play-musica-oficial.mp3.mpeg',
  durationSeconds: 196.57,
};

export const SYNCED_LYRICS: SyncedLyricLine[] = [
  // Introdução Instrumental (0:00 - 0:22.0)
  {
    id: 'intro-inst',
    section: 'Introdução',
    text: '♪ Introdução Instrumental ♪',
    subtext: 'Prepare-se: a partida vai começar!',
    startTime: 0,
    endTime: 22.0,
    isInstrumental: true,
  },

  // Verso 1 (0:22.0 - 0:36.9)
  {
    id: 'v1-1',
    section: 'Verso 1',
    text: 'Abre a caixa, uma ideia ganhou vida',
    startTime: 22.0,
    endTime: 25.8,
  },
  {
    id: 'v1-2',
    section: 'Verso 1',
    text: 'Tem pergunta, tem escolha, tem partida',
    startTime: 25.8,
    endTime: 29.5,
  },
  {
    id: 'v1-3',
    section: 'Verso 1',
    text: 'Olha em volta, todo mundo quer tentar',
    startTime: 29.5,
    endTime: 33.2,
  },
  {
    id: 'v1-4',
    section: 'Verso 1',
    text: 'Cada jogada é um convite pra pensar',
    startTime: 33.2,
    endTime: 36.9,
  },

  // Pré-refrão 1 (0:36.9 - 0:50.8)
  {
    id: 'pr1-1',
    section: 'Pré-refrão',
    text: 'Aqui ninguém aprende sozinho',
    startTime: 36.9,
    endTime: 40.6,
  },
  {
    id: 'pr1-2',
    section: 'Pré-refrão',
    text: 'Cada resposta abre um novo caminho',
    startTime: 40.6,
    endTime: 44.3,
  },
  {
    id: 'pr1-3',
    section: 'Pré-refrão',
    text: 'É conhecimento em movimento',
    startTime: 44.3,
    endTime: 47.6,
  },
  {
    id: 'pr1-4',
    section: 'Pré-refrão',
    text: 'Transformando cada momento!',
    startTime: 47.6,
    endTime: 50.8,
  },

  // Refrão 1 (0:50.8 - 0:65.6)
  {
    id: 'ref1-1',
    section: 'Refrão',
    text: 'FormaPlay! Vem jogar, vem aprender!',
    startTime: 50.8,
    endTime: 54.5,
  },
  {
    id: 'ref1-2',
    section: 'Refrão',
    text: 'Conhecimento e diversão fazem acontecer!',
    startTime: 54.5,
    endTime: 58.2,
  },
  {
    id: 'ref1-3',
    section: 'Refrão',
    text: 'FormaPlay! Vem criar, participar!',
    startTime: 58.2,
    endTime: 61.9,
  },
  {
    id: 'ref1-4',
    section: 'Refrão',
    text: 'Educação que transforma, faz a turma avançar!',
    startTime: 61.9,
    endTime: 65.6,
  },

  // Pós-refrão e Interlúdio na gravação real (1:05.6 - 1:27.8)
  {
    id: 'inst-pos-ref1',
    section: 'Instrumental',
    text: '♪ Riff Instrumental ♪',
    startTime: 65.6,
    endTime: 69.3,
    isInstrumental: true,
  },
  {
    id: 'pos-ref1-vocal',
    section: 'Pós-refrão',
    text: 'Faz a turma avançar!',
    subtext: 'Vocalização na gravação (Ô-ô-ô!)',
    startTime: 69.3,
    endTime: 76.8,
  },
  {
    id: 'interludio-1',
    section: 'Interlúdio',
    text: '♪ Interlúdio Instrumental ♪',
    subtext: 'Solo de guitarra e base rítmica',
    startTime: 76.8,
    endTime: 87.8,
    isInstrumental: true,
  },

  // Verso 2 (1:27.8 - 1:42.6)
  {
    id: 'v2-1',
    section: 'Verso 2',
    text: 'Tem surpresa no caminho, decisão pra tomar',
    startTime: 87.8,
    endTime: 91.5,
  },
  {
    id: 'v2-2',
    section: 'Verso 2',
    text: 'Se a rota muda, a gente aprende a se adaptar',
    startTime: 91.5,
    endTime: 95.2,
  },
  {
    id: 'v2-3',
    section: 'Verso 2',
    text: 'Da sala para o mundo, da teoria para a ação',
    startTime: 95.2,
    endTime: 98.9,
  },
  {
    id: 'v2-4',
    section: 'Verso 2',
    text: 'Uma ideia vira prática e vira solução!',
    startTime: 98.9,
    endTime: 102.6,
  },

  // Pré-refrão 2 (1:42.6 - 1:57.4)
  {
    id: 'pr2-1',
    section: 'Pré-refrão',
    text: 'Quem pergunta também aprende',
    startTime: 102.6,
    endTime: 106.3,
  },
  {
    id: 'pr2-2',
    section: 'Pré-refrão',
    text: 'Quem responde vai além',
    startTime: 106.3,
    endTime: 110.0,
  },
  {
    id: 'pr2-3',
    section: 'Pré-refrão',
    text: 'Quando a turma entra no jogo',
    startTime: 110.0,
    endTime: 113.7,
  },
  {
    id: 'pr2-4',
    section: 'Pré-refrão',
    text: 'O conhecimento vai mais longe também!',
    startTime: 113.7,
    endTime: 117.4,
  },

  // Refrão 2 (1:57.4 - 2:12.6)
  {
    id: 'ref2-1',
    section: 'Refrão',
    text: 'FormaPlay! Vem jogar, vem aprender!',
    startTime: 117.4,
    endTime: 121.1,
  },
  {
    id: 'ref2-2',
    section: 'Refrão',
    text: 'Conhecimento e diversão fazem acontecer!',
    startTime: 121.1,
    endTime: 124.8,
  },
  {
    id: 'ref2-3',
    section: 'Refrão',
    text: 'FormaPlay! Vem criar, participar!',
    startTime: 124.8,
    endTime: 128.5,
  },
  {
    id: 'ref2-4',
    section: 'Refrão',
    text: 'Educação que transforma, faz a turma avançar!',
    startTime: 128.5,
    endTime: 132.6,
  },

  // Ponte (2:12.6 - 2:29.0)
  {
    id: 'ponte-1',
    section: 'Ponte',
    text: 'Não é só vencer, é descobrir',
    startTime: 132.6,
    endTime: 136.3,
  },
  {
    id: 'ponte-2',
    section: 'Ponte',
    text: 'É tentar de novo, é evoluir',
    startTime: 136.3,
    endTime: 140.0,
  },
  {
    id: 'ponte-3',
    section: 'Ponte',
    text: 'Cada desafio faz a gente enxergar',
    startTime: 140.0,
    endTime: 143.7,
  },
  {
    id: 'ponte-4',
    section: 'Ponte',
    text: 'Novas maneiras de pensar e transformar!',
    startTime: 143.7,
    endTime: 149.0,
  },

  // Refrão Final (2:29.0 - 2:44.7)
  {
    id: 'reff-1',
    section: 'Refrão final',
    text: 'FormaPlay! Vem jogar, vem aprender!',
    startTime: 149.0,
    endTime: 152.7,
  },
  {
    id: 'reff-2',
    section: 'Refrão final',
    text: 'Conhecimento e diversão fazem acontecer!',
    startTime: 152.7,
    endTime: 156.4,
  },
  {
    id: 'reff-3',
    section: 'Refrão final',
    text: 'FormaPlay! Vem criar, participar!',
    startTime: 156.4,
    endTime: 160.1,
  },
  {
    id: 'reff-4',
    section: 'Refrão final',
    text: 'Educação que transforma, faz a turma avançar!',
    startTime: 160.1,
    endTime: 164.7,
  },

  // Final (2:44.7 - 2:59.6)
  {
    id: 'fin-1',
    section: 'Final',
    text: 'FormaPlay!',
    subtext: '(Ô-ô-ô!)',
    startTime: 164.7,
    endTime: 168.4,
  },
  {
    id: 'fin-2',
    section: 'Final',
    text: 'Conhecimento e diversão!',
    startTime: 168.4,
    endTime: 172.1,
  },
  {
    id: 'fin-3',
    section: 'Final',
    text: 'FormaPlay!',
    subtext: '(Ô-ô-ô!)',
    startTime: 172.1,
    endTime: 175.8,
  },
  {
    id: 'fin-4',
    section: 'Final',
    text: 'Educação que transforma!',
    startTime: 175.8,
    endTime: 179.6,
  },

  // Encerramento Instrumental (2:59.6 - 3:16.57)
  {
    id: 'outro-inst',
    section: 'Encerramento',
    text: '♪ Solo Instrumental Final ♪',
    subtext: 'FormaPlay — Educação que transforma!',
    startTime: 179.6,
    endTime: 197.0,
    isInstrumental: true,
  },
];

export const FULL_LYRICS_STANZAS: LyricStanza[] = [
  {
    id: 'stanza-v1',
    title: 'Verso 1',
    lines: [
      'Abre a caixa, uma ideia ganhou vida',
      'Tem pergunta, tem escolha, tem partida',
      'Olha em volta, todo mundo quer tentar',
      'Cada jogada é um convite pra pensar',
    ],
  },
  {
    id: 'stanza-pr1',
    title: 'Pré-refrão',
    lines: [
      'Aqui ninguém aprende sozinho',
      'Cada resposta abre um novo caminho',
      'É conhecimento em movimento',
      'Transformando cada momento!',
    ],
  },
  {
    id: 'stanza-ref1',
    title: 'Refrão',
    isChorus: true,
    lines: [
      'FormaPlay! Vem jogar, vem aprender!',
      'Conhecimento e diversão fazem acontecer!',
      'FormaPlay! Vem criar, participar!',
      'Educação que transforma, faz a turma avançar!',
    ],
  },
  {
    id: 'stanza-v2',
    title: 'Verso 2',
    lines: [
      'Tem surpresa no caminho, decisão pra tomar',
      'Se a rota muda, a gente aprende a se adaptar',
      'Da sala para o mundo, da teoria para a ação',
      'Uma ideia vira prática e vira solução!',
    ],
  },
  {
    id: 'stanza-pr2',
    title: 'Pré-refrão',
    lines: [
      'Quem pergunta também aprende',
      'Quem responde vai além',
      'Quando a turma entra no jogo',
      'O conhecimento vai mais longe também!',
    ],
  },
  {
    id: 'stanza-ref2',
    title: 'Refrão',
    isChorus: true,
    lines: [
      'FormaPlay! Vem jogar, vem aprender!',
      'Conhecimento e diversão fazem acontecer!',
      'FormaPlay! Vem criar, participar!',
      'Educação que transforma, faz a turma avançar!',
    ],
  },
  {
    id: 'stanza-ponte',
    title: 'Ponte',
    lines: [
      'Não é só vencer, é descobrir',
      'É tentar de novo, é evoluir',
      'Cada desafio faz a gente enxergar',
      'Novas maneiras de pensar e transformar!',
    ],
  },
  {
    id: 'stanza-reff',
    title: 'Refrão final',
    isChorus: true,
    lines: [
      'FormaPlay! Vem jogar, vem aprender!',
      'Conhecimento e diversão fazem acontecer!',
      'FormaPlay! Vem criar, participar!',
      'Educação que transforma, faz a turma avançar!',
    ],
  },
  {
    id: 'stanza-final',
    title: 'Final',
    lines: [
      'FormaPlay!',
      'Conhecimento e diversão!',
      'FormaPlay!',
      'Educação que transforma!',
    ],
  },
];

/**
 * Localiza o índice da linha ativa na letra sincronizada para um dado instante (em segundos).
 */
export const getActiveLyricIndex = (timeSeconds: number): number => {
  if (timeSeconds < 0) return 0;
  for (let i = 0; i < SYNCED_LYRICS.length; i++) {
    const item = SYNCED_LYRICS[i];
    if (timeSeconds >= item.startTime && timeSeconds < item.endTime) {
      return i;
    }
  }
  if (timeSeconds >= SYNCED_LYRICS[SYNCED_LYRICS.length - 1].startTime) {
    return SYNCED_LYRICS.length - 1;
  }
  return 0;
};

export const formatAudioTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


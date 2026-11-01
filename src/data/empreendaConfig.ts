/**
 * Configuração centralizada do destaque e contagem regressiva
 * para eventos e marcos da FormaPlay (atualmente Empreenda Senac 2026).
 *
 * Arquitetura flexível e reutilizável:
 * - O componente `EmpreendaCountdown` aceita qualquer objeto aderente a `CountdownEventConfig`.
 * - Novos eventos, lançamentos e competições podem ser adicionados facilmente aqui.
 * - Quando a URL pública específica dos finalistas for divulgada pelo Senac,
 *   basta preencher o campo `finalistsPublicUrl` abaixo para atualizar o botão
 *   "Consultar resultado oficial" automaticamente.
 */

export interface CountdownEventConfig {
  /** Identificador do evento */
  id?: string;
  /** Data e hora de referência para o fim da contagem no fuso America/Sao_Paulo (UTC-03:00) */
  targetDateIso: string;
  /** Título exibido durante a contagem regressiva */
  title: string;
  /** Subtítulo exibido durante a contagem regressiva */
  subtitle: string;
  /** Badge exibido no topo do card */
  badgeLabel?: string;
  /** Nota explicativa sobre o horário de referência */
  disclaimerText: string;
  /** Mensagem exibida automaticamente após atingir o horário-alvo */
  reachedMessage: string;
  /** Texto do botão de consulta ao resultado oficial */
  officialButtonLabel: string;
  /** Página oficial principal do evento */
  officialMainUrl: string;
  /**
   * URL pública específica da lista de resultados/finalistas (quando divulgada).
   * Enquanto for `null` ou vazia, o botão direciona para `officialMainUrl`.
   */
  finalistsPublicUrl?: string | null;
  /**
   * URL pública histórica dos classificados da etapa anterior (apenas referência).
   */
  semifinalClassifiedsUrl?: string;
}

export type EmpreendaConfig = CountdownEventConfig;

export const EMPREENDA_CONFIG: CountdownEventConfig = {
  id: 'empreenda-senac-2026',
  targetDateIso: '2026-11-03T09:00:00-03:00',
  title: 'Empreenda Senac 2026 — Rumo à Final!',
  subtitle: 'Contagem regressiva para a data de divulgação dos finalistas.',
  badgeLabel: 'Jornada Empreenda Senac 2026',
  disclaimerText:
    'Resultado previsto para 3 de novembro de 2026. A contagem até as 9h é uma referência observada no contador do portal do participante, não constituindo um horário oficialmente anunciado de publicação.',
  reachedMessage: 'Chegou o dia de conhecer os finalistas do Empreenda Senac 2026!',
  officialButtonLabel: 'Consultar resultado oficial',
  officialMainUrl: 'https://empreendasenac.azurewebsites.net/',
  finalistsPublicUrl: null,
  semifinalClassifiedsUrl: 'https://empreenda.digito1.com.br/Home/Classificados',
};

/**
 * Retorna a URL oficial ativa para o botão "Consultar resultado oficial".
 * Prioriza a URL pública específica quando configurada; caso contrário, utiliza a página principal.
 */
export const getOfficialEmpreendaResultUrl = (
  config: CountdownEventConfig = EMPREENDA_CONFIG
): string => {
  if (
    config.finalistsPublicUrl &&
    config.finalistsPublicUrl.trim().length > 0
  ) {
    return config.finalistsPublicUrl.trim();
  }
  return config.officialMainUrl;
};

export interface CountdownTimeLeft {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
}

export const calculateEmpreendaTimeLeft = (
  nowMs: number = Date.now(),
  targetIso: string = EMPREENDA_CONFIG.targetDateIso
): CountdownTimeLeft => {
  const targetMs = new Date(targetIso).getTime();
  const diff = targetMs - nowMs;

  if (Number.isNaN(targetMs) || diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isReached: false,
  };
};


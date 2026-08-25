export interface PresencaCidade {
  key: string;
  cidade: string;
  estado: string;
  lat: number;
  lng: number;
  primaryType: 'vendas' | 'orcamentos' | 'solicitacoes' | 'interesses';
  vendas: number;
  unidadesVendidas: number;
  orcamentos: number;
  solicitacoes: number;
  interesses: number;
  totalSinais: number;
}

export type MetricType = 'todos' | 'vendas' | 'orcamentos' | 'solicitacoes' | 'interesses';

export const presencaCidadesData: PresencaCidade[] = [
  {
    key: 'BR|SP|Jau',
    cidade: 'Jaú',
    estado: 'SP',
    lat: -22.2963,
    lng: -48.5586,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 1,
    orcamentos: 4,
    solicitacoes: 10,
    interesses: 2,
    totalSinais: 17
  },
  {
    key: 'BR|SP|SantaBarbaraDOeste',
    cidade: "Santa Bárbara d'Oeste",
    estado: 'SP',
    lat: -22.7547,
    lng: -47.4144,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 2,
    orcamentos: 3,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 4
  },
  {
    key: 'BR|SP|MogiGuacu',
    cidade: 'Mogi Guaçu',
    estado: 'SP',
    lat: -22.3708,
    lng: -46.9428,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 10,
    orcamentos: 2,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 3
  },
  {
    key: 'BR|PI|Teresina',
    cidade: 'Teresina',
    estado: 'PI',
    lat: -5.0919,
    lng: -42.8034,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 1,
    orcamentos: 1,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 2
  },
  {
    key: 'BR|SP|Guarulhos',
    cidade: 'Guarulhos',
    estado: 'SP',
    lat: -23.4542,
    lng: -46.5333,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 1,
    orcamentos: 1,
    solicitacoes: 1,
    interesses: 0,
    totalSinais: 3
  },
  {
    key: 'BR|SP|Jundiai',
    cidade: 'Jundiaí',
    estado: 'SP',
    lat: -23.1857,
    lng: -46.8978,
    primaryType: 'vendas',
    vendas: 1,
    unidadesVendidas: 1,
    orcamentos: 1,
    solicitacoes: 1,
    interesses: 0,
    totalSinais: 3
  },
  {
    key: 'BR|SP|Barueri',
    cidade: 'Barueri',
    estado: 'SP',
    lat: -23.5105,
    lng: -46.8761,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 1,
    interesses: 1,
    totalSinais: 3
  },
  {
    key: 'BR|SP|SantaRosaDeViterbo',
    cidade: 'Santa Rosa de Viterbo',
    estado: 'SP',
    lat: -21.4728,
    lng: -47.3622,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 1,
    interesses: 0,
    totalSinais: 2
  },
  {
    key: 'BR|SP|Suzano',
    cidade: 'Suzano',
    estado: 'SP',
    lat: -23.5425,
    lng: -46.3108,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 1
  },
  {
    key: 'BR|SP|PariqueraAcu',
    cidade: 'Pariquera-Açu',
    estado: 'SP',
    lat: -24.7144,
    lng: -47.8814,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 1
  },
  {
    key: 'BR|SP|Itapira',
    cidade: 'Itapira',
    estado: 'SP',
    lat: -22.4344,
    lng: -46.8222,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 1,
    interesses: 0,
    totalSinais: 2
  },
  {
    key: 'BR|SP|Araraquara',
    cidade: 'Araraquara',
    estado: 'SP',
    lat: -21.7944,
    lng: -48.1764,
    primaryType: 'orcamentos',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 1,
    solicitacoes: 0,
    interesses: 0,
    totalSinais: 1
  },
  {
    key: 'BR|SP|Bauru',
    cidade: 'Bauru',
    estado: 'SP',
    lat: -22.3147,
    lng: -49.0606,
    primaryType: 'solicitacoes',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 0,
    solicitacoes: 1,
    interesses: 0,
    totalSinais: 1
  },
  {
    key: 'BR|BA|Salvador',
    cidade: 'Salvador',
    estado: 'BA',
    lat: -12.9714,
    lng: -38.5014,
    primaryType: 'interesses',
    vendas: 0,
    unidadesVendidas: 0,
    orcamentos: 0,
    solicitacoes: 0,
    interesses: 1,
    totalSinais: 1
  }
];

export const ufsComPresenca = ['SP', 'PI', 'BA'];

export interface IndicadorPresenca {
  id: string;
  valor: number;
  sufixo: string;
  titulo: string;
  descricao: string;
  cor: string;
  tipo: 'vendas' | 'orcamentos' | 'solicitacoes' | 'interesses';
}

export const indicadoresPresencaReal: IndicadorPresenca[] = [
  {
    id: 'vendas',
    valor: 16,
    sufixo: '',
    titulo: 'Vendas realizadas',
    descricao: 'Unidades do jogo comercializadas',
    cor: '#22c55e',
    tipo: 'vendas'
  },
  {
    id: 'orcamentos',
    valor: 22,
    sufixo: '+',
    titulo: 'Orçamentos emitidos',
    descricao: 'Propostas enviadas para escolas e instituições',
    cor: '#f97316',
    tipo: 'orcamentos'
  },
  {
    id: 'solicitacoes',
    valor: 16,
    sufixo: '',
    titulo: 'Solicitações',
    descricao: 'Pedidos de orçamento recebidos pelo site e canais',
    cor: '#3b82f6',
    tipo: 'solicitacoes'
  },
  {
    id: 'interesses',
    valor: 5,
    sufixo: '',
    titulo: 'Interessados nos jogos em desenvolvimento',
    descricao: 'Pessoas que registraram interesse nas próximas experiências FormaPlay',
    cor: '#a855f7',
    tipo: 'interesses'
  }
];

export const totalCidadesAtuacao = 9;

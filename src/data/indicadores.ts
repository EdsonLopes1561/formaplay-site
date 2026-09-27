export interface Indicador {
  id: string;
  valor: number;
  sufixo: string;
  label: string;
  descricao?: string;
}

export const fallbackIndicadoresTracao: Indicador[] = [
  { 
    id: 'vendas', 
    valor: 24, 
    sufixo: '+', 
    label: 'Unidades comercializadas' 
  },
  { 
    id: 'cidades_vendas', 
    valor: 7, 
    sufixo: '', 
    label: 'Cidades com vendas realizadas' 
  },
  { 
    id: 'cidades_alcancadas', 
    valor: 9, 
    sufixo: '', 
    label: 'Cidades alcançadas', 
    descricao: 'presença considerando vendas, solicitações e manifestações de interesse' 
  },
  { 
    id: 'orcamentos', 
    valor: 22, 
    sufixo: '+', 
    label: 'Orçamentos emitidos' 
  }
];

export const indicadoresTracao = fallbackIndicadoresTracao;


import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { fallbackIndicadoresTracao, type Indicador } from '../data/indicadores';

export interface PublicIndicadoresTracaoResponse {
  unidadesVendidas: number;
  vendasRealizadas: number;
  cidadesComVendas: number;
}

export function usePublicIndicadores() {
  const [indicadores, setIndicadores] = useState<Indicador[]>(fallbackIndicadoresTracao);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchIndicadores() {
      try {
        const { data, error } = await supabase.rpc('get_public_indicadores_tracao');

        if (error) {
          // Fallback seguro permanece ativo
          if (import.meta.env.DEV) {
            console.warn('[usePublicIndicadores] RPC fallback ativo:', error.message);
          }
          return;
        }

        if (data && typeof data === 'object' && isMounted) {
          const rpcResult = data as PublicIndicadoresTracaoResponse;

          setIndicadores([
            {
              id: 'vendas',
              valor: typeof rpcResult.unidadesVendidas === 'number' ? rpcResult.unidadesVendidas : 24,
              sufixo: '+',
              label: 'Unidades comercializadas'
            },
            {
              id: 'cidades_vendas',
              valor: typeof rpcResult.cidadesComVendas === 'number' ? rpcResult.cidadesComVendas : 7,
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
          ]);
          setIsLive(true);
        }
      } catch (err) {
        // Fallback resiliente
        if (import.meta.env.DEV) {
          console.warn('[usePublicIndicadores] Falha na conexão:', err);
        }
      }
    }

    fetchIndicadores();

    return () => {
      isMounted = false;
    };
  }, []);

  return { indicadores, isLive };
}

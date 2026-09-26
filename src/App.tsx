import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { HomePage } from './pages/HomePage';
import { DesafioLogisticoPage } from './pages/DesafioLogisticoPage';
import { LogisticaSalaDeAulaPage } from './pages/LogisticaSalaDeAulaPage';
import { ConteudosHubPage } from './pages/ConteudosHubPage';
import { GamificacaoLogisticaArticle } from './pages/articles/GamificacaoLogisticaArticle';
import { AtividadesPraticasArticle } from './pages/articles/AtividadesPraticasArticle';
import { TomadaDecisaoArticle } from './pages/articles/TomadaDecisaoArticle';

const AppRoutes: React.FC = () => {
  const { currentPath } = useRouter();

  if (currentPath === '/desafio-logistico') {
    return <DesafioLogisticoPage />;
  }

  if (currentPath === '/logistica-em-sala-de-aula') {
    return <LogisticaSalaDeAulaPage />;
  }

  if (currentPath === '/conteudos') {
    return <ConteudosHubPage />;
  }

  if (currentPath === '/conteudos/gamificacao-no-ensino-de-logistica') {
    return <GamificacaoLogisticaArticle />;
  }

  if (currentPath === '/conteudos/atividades-praticas-para-aulas-de-logistica') {
    return <AtividadesPraticasArticle />;
  }

  if (currentPath === '/conteudos/tomada-de-decisao-em-logistica') {
    return <TomadaDecisaoArticle />;
  }

  return <HomePage />;
};

const App: React.FC = () => {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
};

export default App;

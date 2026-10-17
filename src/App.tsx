import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { HomePage } from './pages/HomePage';
import { DesafioLogisticoPage } from './pages/DesafioLogisticoPage';
import { LogisticaSalaDeAulaPage } from './pages/LogisticaSalaDeAulaPage';
import { ConteudosHubPage } from './pages/ConteudosHubPage';
import { GamificacaoLogisticaArticle } from './pages/articles/GamificacaoLogisticaArticle';
import { AtividadesPraticasArticle } from './pages/articles/AtividadesPraticasArticle';
import { TomadaDecisaoArticle } from './pages/articles/TomadaDecisaoArticle';
import { VideosHubPage } from './pages/VideosHubPage';
import { VideoDetailPage } from './pages/VideoDetailPage';
import { getVideoBySlug } from './data/videos';

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

  if (currentPath === '/videos') {
    return <VideosHubPage />;
  }

  // Redirecionamento de rota legada para a página canônica consolidada
  if (currentPath === '/videos/primeira-fase-empreenda-senac') {
    if (typeof window !== 'undefined') {
      window.location.replace('/videos/apresentacao-desafio-logistico');
    }
    return null;
  }

  if (currentPath.startsWith('/videos/')) {
    const slug = currentPath.replace('/videos/', '');
    const video = getVideoBySlug(slug);
    if (video) {
      return <VideoDetailPage video={video} />;
    }
    return <VideosHubPage />;
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

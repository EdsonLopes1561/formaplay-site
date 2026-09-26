import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { HomePage } from './pages/HomePage';
import { DesafioLogisticoPage } from './pages/DesafioLogisticoPage';
import { LogisticaSalaDeAulaPage } from './pages/LogisticaSalaDeAulaPage';

const AppRoutes: React.FC = () => {
  const { currentPath } = useRouter();

  if (currentPath === '/desafio-logistico') {
    return <DesafioLogisticoPage />;
  }

  if (currentPath === '/logistica-em-sala-de-aula') {
    return <LogisticaSalaDeAulaPage />;
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

import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { HomePage } from './pages/HomePage';
import { DesafioLogisticoPage } from './pages/DesafioLogisticoPage';

const AppRoutes: React.FC = () => {
  const { currentPath } = useRouter();

  if (currentPath === '/desafio-logistico') {
    return <DesafioLogisticoPage />;
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

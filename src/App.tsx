import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Sobre } from './components/Sobre';
import { ConhecaFormaPlay } from './components/ConhecaFormaPlay';
import { ExperienciasFormaPlay } from './components/ExperienciasFormaPlay';
import { Destaque } from './components/Destaque';
import { ComoFunciona } from './components/ComoFunciona';
import { BeneficiosEducacionais } from './components/BeneficiosEducacionais';
import { ParaQuemEIndicado } from './components/ParaQuemEIndicado';
import { ComponentesDoJogo } from './components/ComponentesDoJogo';
import { ProvaSocial } from './components/ProvaSocial';
import { ChamadaFinal } from './components/ChamadaFinal';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <Sobre />
        <ConhecaFormaPlay />
        <ExperienciasFormaPlay />
        <Destaque />
        <ComoFunciona />
        <BeneficiosEducacionais />
        <ParaQuemEIndicado />
        <ComponentesDoJogo />
        <ProvaSocial />
        <ChamadaFinal />
      </main>
      <Footer />
    </>
  );
};

export default App;

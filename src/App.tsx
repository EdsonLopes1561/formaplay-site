import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IndicadoresTracao } from './components/IndicadoresTracao';
import { VideoSection } from './components/VideoSection';
import { Sobre } from './components/Sobre';
import { ExperienciasFormaPlay } from './components/ExperienciasFormaPlay';
import { Destaque } from './components/Destaque';
import { ParaQuemEIndicado } from './components/ParaQuemEIndicado';
import { ProvaSocial } from './components/ProvaSocial';
import { ChamadaFinal } from './components/ChamadaFinal';
import { Footer } from './components/Footer';
import { WhatsappFloat } from './components/WhatsappFloat';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IndicadoresTracao />
        <Sobre />
        <ExperienciasFormaPlay />
        <Destaque />
        <ParaQuemEIndicado />
        <ProvaSocial />
        <VideoSection />
        <ChamadaFinal />
      </main>
      <WhatsappFloat />
      <Footer />
    </>
  );
};

export default App;

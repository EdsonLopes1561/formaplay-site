import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Sobre } from './components/Sobre';
import { ExperienciasFormaPlay } from './components/ExperienciasFormaPlay';
import { Destaque } from './components/Destaque';
import { ParaQuemEIndicado } from './components/ParaQuemEIndicado';
import { PresencaValidacao } from './components/PresencaValidacao';
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
        <Sobre />
        <ExperienciasFormaPlay />
        <Destaque />
        <ParaQuemEIndicado />
        <PresencaValidacao />
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

import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { IndicadoresTracao } from '../components/IndicadoresTracao';
import { Destaque } from '../components/Destaque';
import { Sobre } from '../components/Sobre';
import { ParaQuemEIndicado } from '../components/ParaQuemEIndicado';
import { PresencaValidacao } from '../components/PresencaValidacao';
import { ProvaSocial } from '../components/ProvaSocial';
import { VideoSection } from '../components/VideoSection';
import { ConhecaFormaPlay } from '../components/ConhecaFormaPlay';
import { ExperienciasFormaPlay } from '../components/ExperienciasFormaPlay';
import { ChamadaFinal } from '../components/ChamadaFinal';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';

export const HomePage: React.FC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    legalName: 'FormaPlay Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: 'https://www.formaplayjogos.com.br/icone.png',
    image: 'https://www.formaplayjogos.com.br/hero.png',
    description: 'Empresa especializada no desenvolvimento de jogos educacionais físicos e experiências práticas de aprendizagem para escolas, professores e instituições de ensino.',
    email: 'contato@formaplayjogos.com.br',
    telephone: '+55-14-99844-2917',
    taxID: '66.710.107/0001-31',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR'
    },
    knowsAbout: [
      'Jogos Educacionais',
      'Metodologias Ativas',
      'Ensino de Logística',
      'Gamificação na Educação'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    inLanguage: 'pt-BR'
  };

  return (
    <>
      <SEOHead
        title="FormaPlay | Jogos Educacionais para Aprender na Prática"
        description="Conheça a FormaPlay, criadora do Desafio Logístico. Desenvolvemos jogos educacionais que transformam o conhecimento em experiências práticas e envolventes."
        canonicalUrl="https://www.formaplayjogos.com.br/"
        ogImage="https://www.formaplayjogos.com.br/hero.png"
        ogType="website"
        schema={[organizationSchema, websiteSchema]}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <IndicadoresTracao />
        <Destaque />
        <Sobre />
        <ParaQuemEIndicado />
        <PresencaValidacao />
        <ProvaSocial />
        <VideoSection />
        <ConhecaFormaPlay />
        <ExperienciasFormaPlay />
        <ChamadaFinal />
      </main>
      <WhatsappFloat />
      <Footer />
    </>
  );
};

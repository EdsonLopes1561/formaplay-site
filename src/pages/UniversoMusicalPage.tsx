import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { MusicaOficialSection } from '../components/MusicaOficialSection';
import { BibliotecaMusicalSection } from '../components/BibliotecaMusicalSection';
import { Link } from '../router/RouterContext';
import {
  Music,
  Truck,
  ArrowRight,
  ExternalLink,
  Play,
  Radio,
} from 'lucide-react';
import styles from './UniversoMusicalPage.module.css';

export const UniversoMusicalPage: React.FC = () => {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Universo Musical FormaPlay | Na estrada, cada rota tem sua trilha sonora!',
    description:
      'Uma experiência musical que conecta criatividade, conhecimento e o universo da logística rodoviária. Ouça a Música Oficial FormaPlay e conheça a Biblioteca Musical do Desafio Logístico.',
    url: 'https://www.formaplayjogos.com.br/musica',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'FormaPlay – Jogos Educacionais',
      url: 'https://www.formaplayjogos.com.br',
      logo: 'https://www.formaplayjogos.com.br/icone.webp',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://www.formaplayjogos.com.br/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Universo Musical',
        item: 'https://www.formaplayjogos.com.br/musica',
      },
    ],
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Universo Musical FormaPlay | Na estrada, cada rota tem sua trilha sonora!"
        description="Conheça o Universo Musical FormaPlay: a trilha sonora do Desafio Logístico inspirada no transporte rodoviário, caminhoneiros e metodologia ativa."
        canonicalUrl="https://www.formaplayjogos.com.br/musica"
        ogImage="https://www.formaplayjogos.com.br/universo-musical-hero.webp"
        ogType="website"
        schema={[pageSchema, breadcrumbSchema]}
      />

      <Header />

      <main id="main-content" className={styles.mainContent}>
        {/* HERO PRINCIPAL: CAMINHÃO NA RODOVIA, ATMOSFERA CINEMATOGRÁFICA & ONDAS */}
        <section className={styles.heroSection} aria-label="Apresentação do Universo Musical">
          <div className={styles.heroBackdrop}>
            <picture>
              <source srcSet="/universo-musical-hero.webp" type="image/webp" />
              <img
                src="/universo-musical-hero.jpg"
                alt="Caminhão moderno trafegando em uma ampla rodovia ao entardecer sob feixes de luz e ondas sonoras luminosas"
                className={styles.heroImage}
                loading="eager"
                width={1376}
                height={768}
              />
            </picture>
            <div className={styles.heroOverlayGradient} aria-hidden="true" />
            <div className={styles.heroLightStreak} aria-hidden="true" />
          </div>

          <div className={`container ${styles.heroContainer}`}>
            {/* Breadcrumbs integrados no topo do Hero */}
            <nav aria-label="Navegação estrutural" className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>
                Início
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Universo Musical</span>
            </nav>

            <div className={styles.heroContent}>
              <div className={styles.badgeHero}>
                <Truck size={16} className={styles.badgeIconTruck} />
                <span className={styles.badgeDivider} aria-hidden="true">|</span>
                <Music size={15} />
                <span>Trilha Sonora da Estrada & Logística</span>
              </div>

              <h1 className={styles.titleHero}>Universo Musical FormaPlay</h1>

              <div className={styles.highlightPhraseBox}>
                <span className={styles.highlightQuoteMark} aria-hidden="true">“</span>
                <p className={styles.highlightPhrase}>
                  Na estrada, cada rota tem sua trilha sonora!
                </p>
                <span className={styles.highlightQuoteMark} aria-hidden="true">”</span>
              </div>

              <p className={styles.complementaryText}>
                Do rock ao samba, do pagode ao eletrônico, o Desafio Logístico também ganhou seus
                próprios ritmos. Uma experiência musical que conecta criatividade, conhecimento e o
                universo da logística.
              </p>

              <div className={styles.truckerConnectionCard}>
                <p className={styles.truckerQuote}>
                  A música é companheira inseparável de quem vive a estrada: transforma longas
                  viagens em jornadas de foco, supera o cansaço e celebra cada entrega concluída.
                  No <strong>Desafio Logístico</strong>, essa mesma energia impulsiona a cooperação,
                  o raciocínio rápido e a imersão em sala de aula.
                </p>
              </div>

              <div className={styles.heroCtaGroup}>
                <button
                  type="button"
                  onClick={() => scrollToSection('musica-oficial')}
                  className={styles.btnHeroPrimary}
                  aria-label="Ir para o player da Música Oficial"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Ouvir Música Oficial</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('biblioteca-desafio-logistico')}
                  className={styles.btnHeroSecondary}
                  aria-label="Ver os estilos da Biblioteca Musical"
                >
                  <Radio size={18} />
                  <span>Explorar Biblioteca Musical</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DA MÚSICA OFICIAL FORMAPLAY (PLAYER COMPLETO JÁ APROVADO) */}
        <div className={styles.officialPlayerStage}>
          <MusicaOficialSection />
        </div>

        {/* SEÇÃO DA BIBLIOTECA MUSICAL (CATÁLOGO DINÂMICO DE GRAVAÇÕES REAIS) */}
        <BibliotecaMusicalSection />

        {/* EQUILÍBRIO EDUCACIONAL & CONEXÃO COM O JOGO */}
        <section className={styles.eduBalanceSection} aria-label="Integração Pedagógica">
          <div className="container">
            <div className={styles.eduCard}>
              <div className={styles.eduGlow} aria-hidden="true" />
              <div className={styles.eduBadge}>
                <Truck size={16} />
                <span>Metodologias Ativas & Aprendizado Prático</span>
              </div>
              <h2 className={styles.eduTitle}>
                A música como extensão criativa do aprendizado logístico
              </h2>
              <p className={styles.eduDescription}>
                Na FormaPlay, unimos a vivência real do transporte de cargas, a tomada de decisão
                estratégica e a ambientação sonora envolvente. Uma combinação planejada para engajar
                estudantes, facilitar a mediação docente e transformar salas de aula em centros
                vibrantes de inteligência logística.
              </p>

              <div className={styles.eduActions}>
                <Link href="/desafio-logistico" className={styles.btnPrimaryGame}>
                  <span>Conhecer o Desafio Logístico</span>
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondaryOrcamento}
                >
                  <span>Solicitar Orçamento</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsappFloat />
      <Footer />
    </div>
  );
};

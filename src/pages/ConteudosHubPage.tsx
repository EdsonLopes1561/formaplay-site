import React from 'react';
import styles from './ConteudosHubPage.module.css';
import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { Link } from '../router/RouterContext';
import { ARTICLES, CATEGORIES } from '../data/articles';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  GraduationCap,
  Boxes,
  Compass,
  Gamepad2,
  Brain,
  Layers,
  PackageCheck
} from 'lucide-react';

export const ConteudosHubPage: React.FC = () => {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Conteúdos sobre Logística, Educação e Aprendizagem | FormaPlay',
    description: 'Conteúdos sobre ensino de logística, atividades práticas, gamificação, metodologias ativas e aprendizagem para professores e instituições.',
    url: 'https://www.formaplayjogos.com.br/conteudos',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'FormaPlay – Jogos Educacionais',
      url: 'https://www.formaplayjogos.com.br',
      logo: 'https://www.formaplayjogos.com.br/icone.png'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://www.formaplayjogos.com.br/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Conteúdos',
        item: 'https://www.formaplayjogos.com.br/conteudos'
      }
    ]
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'Ensino de Logística': <GraduationCap size={22} />,
    'Atividades Práticas': <Compass size={22} />,
    'Gamificação': <Gamepad2 size={22} />,
    'Jogos Educacionais': <Boxes size={22} />,
    'Tomada de Decisão': <Brain size={22} />,
    'Metodologias Ativas': <Layers size={22} />
  };

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Conteúdos sobre Logística, Educação e Aprendizagem | FormaPlay"
        description="Conteúdos sobre ensino de logística, atividades práticas, gamificação, metodologias ativas e aprendizagem para professores e instituições."
        canonicalUrl="https://www.formaplayjogos.com.br/conteudos"
        ogImage="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png"
        ogType="website"
        schema={[webPageSchema, breadcrumbSchema]}
      />

      <Header />

      <main className={styles.mainContent}>
        {/* HERO EDITORIAL */}
        <section className={styles.heroSection} aria-label="Apresentação da Central de Conteúdos">
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.breadcrumb}>
              <Link href="/">Início</Link> <span>/</span> <span className={styles.currentBreadcrumb}>Conteúdos</span>
            </div>

            <div className={styles.hubBadge}>
              <BookOpen size={16} />
              <span>BIBLIOTECA & METODOLOGIAS DIDÁTICAS</span>
            </div>

            <h1 className={styles.heroTitle}>
              Conteúdos para transformar conhecimento em aprendizagem prática
            </h1>

            <p className={styles.heroSubtitle}>
              Artigos, ideias práticas e reflexões pedagógicas desenvolvidas pela FormaPlay sobre ensino de logística, gamificação, tomada de decisão, atividades em grupo e metodologias ativas para professores e instituições.
            </p>

            <div className={styles.topicsPills}>
              <span className={styles.topicPill}>Ensino de Logística</span>
              <span className={styles.topicPill}>Atividades Práticas</span>
              <span className={styles.topicPill}>Gamificação Docente</span>
              <span className={styles.topicPill}>Tomada de Decisão</span>
              <span className={styles.topicPill}>Jogos de Tabuleiro</span>
              <span className={styles.topicPill}>Educação Profissional</span>
            </div>
          </div>
        </section>

        {/* ARTIGOS EM DESTAQUE */}
        <section className={styles.articlesSection} aria-label="Artigos em Destaque">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>PUBLICAÇÕES RECENTES</span>
              <h2 className={styles.sectionTitle}>Artigos e Guias Pedagógicos</h2>
              <p className={styles.sectionLead}>
                Textos estruturados com propostas didáticas aplicáveis e foco no aprendizado de logística.
              </p>
            </div>

            <div className={styles.articlesGrid}>
              {ARTICLES.map((article) => (
                <Link key={article.slug} href={article.url} className={styles.articleCard}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className={styles.cardImage}
                      loading="lazy"
                      width="400"
                      height="220"
                    />
                    <span className={styles.categoryTag}>{article.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <div className={styles.cardMetaItem}>
                        <Calendar size={14} />
                        <span>{article.formattedDate}</span>
                      </div>
                      <div className={styles.cardMetaItem}>
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardExcerpt}>{article.excerpt}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.readMoreLink}>
                        Ler conteúdo <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TEMAS E CATEGORIAS */}
        <section className={styles.categoriesSection} aria-label="Categorias e Temas">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>ÁREAS DE EXPLORAÇÃO</span>
              <h2 className={styles.sectionTitle}>Temas Abordados</h2>
              <p className={styles.sectionLead}>
                Explore os principais eixos temáticos desenvolvidos no ecossistema educacional da FormaPlay.
              </p>
            </div>

            <div className={styles.categoriesGrid}>
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className={styles.categoryCard}>
                  <div className={styles.categoryIconBox}>
                    {categoryIcons[cat.name] || <Sparkles size={22} />}
                  </div>
                  <div className={styles.categoryInfo}>
                    <strong>{cat.name}</strong>
                    <span>{cat.count} publicações relacionadas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCOS PARA EDUCADORES & DESAFIO LOGISTICO */}
        <section className={styles.bannersSection} aria-label="Recursos Complementares">
          <div className="container">
            <div className={styles.bannersGrid}>
              
              {/* Bloco Educadores */}
              <div className={styles.bannerCard}>
                <div>
                  <div className={styles.bannerBadge}>
                    <GraduationCap size={16} />
                    <span>GUIA DIDÁTICO</span>
                  </div>
                  <h3 className={styles.bannerTitle}>Para Educadores: Logística em Sala de Aula</h3>
                  <p className={styles.bannerDesc}>
                    Veja ideias práticas, passo a passo para dinâmicas em grupo e orientações pedagógicas para conduzir atividades participativas em turmas técnicas e superiores.
                  </p>
                </div>
                <Link href="/logistica-em-sala-de-aula" className={styles.bannerLink}>
                  <span>Acessar o guia completo para educadores</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Bloco Desafio Logístico */}
              <div className={styles.bannerCard}>
                <div>
                  <div className={styles.bannerBadge}>
                    <PackageCheck size={16} />
                    <span>JOGO DE TABULEIRO FÍSICO</span>
                  </div>
                  <h3 className={styles.bannerTitle}>Desafio Logístico: O Jogo Educacional</h3>
                  <p className={styles.bannerDesc}>
                    Conheça a ferramenta didática completa da FormaPlay. Uma partida prática de 30 a 60 minutos que reúne planejamento de rotas, custos, imprevistos e tomada de decisão.
                  </p>
                </div>
                <Link href="/desafio-logistico" className={styles.bannerLink}>
                  <span>Conhecer o Desafio Logístico</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.ctaSection} aria-label="Chamada para Ação">
          <div className="container">
            <div className={styles.ctaCard}>
              <span className={styles.ctaBadge}>EDUCAÇÃO PRÁTICA</span>
              <h2 className={styles.ctaTitle}>Leve novas dinâmicas para o ensino de logística</h2>
              <p className={styles.ctaDesc}>
                Descubra como aliar conteúdos teóricos a experiências participativas que desenvolvem o raciocínio estratégico e a visão sistêmica dos seus alunos.
              </p>

              <div className={styles.ctaButtons}>
                <Link href="/logistica-em-sala-de-aula" className={`btn btn-primary ${styles.btnCtaPrimary}`}>
                  <span>Ver Guia para Educadores</span>
                  <ArrowRight size={20} />
                </Link>

                <Link href="/desafio-logistico" className={styles.btnCtaSecondary}>
                  Conhecer o Desafio Logístico
                </Link>

                <a
                  href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCtaSecondary}
                >
                  Solicitar Orçamento
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

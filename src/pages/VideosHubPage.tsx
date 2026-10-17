import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../router/RouterContext';
import type { VideoCategory } from '../data/videos';
import { VIDEOS, VIDEO_CATEGORIES } from '../data/videos';
import { getWhatsAppLink } from '../constants';
import { 
  PlayCircle, 
  Clock, 
  ArrowRight, 
  Video, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  Layers,
  MessageCircle
} from 'lucide-react';
import styles from './VideosHubPage.module.css';

export const VideosHubPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'todos' | VideoCategory>('todos');

  const filteredVideos = activeCategory === 'todos' 
    ? VIDEOS 
    : VIDEOS.filter((v) => v.category === activeCategory);

  const activeCategoryMeta = VIDEO_CATEGORIES.find((c) => c.id === activeCategory);

  const hubWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vídeos sobre Jogos Educacionais e Logística | FormaPlay',
    description: 'Assista aos vídeos oficiais da FormaPlay: apresentação do Desafio Logístico, trajetória e validação na 1ª fase e semifinal do Empreenda Senac 2026.',
    url: 'https://www.formaplayjogos.com.br/videos',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'FormaPlay – Jogos Educacionais',
      url: 'https://www.formaplayjogos.com.br',
      logo: 'https://www.formaplayjogos.com.br/icone.webp'
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
        name: 'Vídeos',
        item: 'https://www.formaplayjogos.com.br/videos'
      }
    ]
  };

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Vídeos sobre Jogos Educacionais e Logística | FormaPlay"
        description="Assista aos vídeos oficiais da FormaPlay: apresentação do Desafio Logístico, trajetória e validação na 1ª fase e semifinal do Empreenda Senac 2026."
        canonicalUrl="https://www.formaplayjogos.com.br/videos"
        ogImage="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.webp"
        ogType="website"
        schema={[hubWebPageSchema, breadcrumbSchema]}
      />

      <Header />

      <main id="main-content" className={styles.mainContent}>
        <div className="container">
          
          {/* Breadcrumbs */}
          <nav aria-label="Navegação estrutural" className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Vídeos</span>
          </nav>

          {/* Hero Section */}
          <section className={styles.heroSection} aria-label="Apresentação da Central de Vídeos">
            <div className={styles.heroBadge}>
              <Video size={16} />
              <span>Central de Vídeos FormaPlay</span>
            </div>
            <h1 className={styles.heroTitle}>
              Vídeos da FormaPlay: Aprendizagem Prática em Ação
            </h1>
            <p className={styles.heroSubtitle}>
              Conheça a proposta didática do Desafio Logístico, acompanhe nossa participação no Empreenda Senac 2026 e veja como metodologias ativas transformam o ensino de logística.
            </p>
          </section>

          {/* Barra de Filtro de Categorias */}
          <nav className={styles.categoryFilterBar} aria-label="Filtrar vídeos por categoria">
            <button
              type="button"
              className={`${styles.filterPill} ${activeCategory === 'todos' ? styles.filterPillActive : ''}`}
              onClick={() => setActiveCategory('todos')}
            >
              <Layers size={14} />
              <span>Todos os Vídeos</span>
            </button>
            {VIDEO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.filterPill} ${activeCategory === cat.id ? styles.filterPillActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.id === 'formaplay-na-pratica' ? <GraduationCap size={14} /> : <Video size={14} />}
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>

          {/* Descritivo da Categoria Ativa */}
          {activeCategoryMeta && (
            <div className={styles.categoryInfoBox}>
              <strong>{activeCategoryMeta.name}:</strong> {activeCategoryMeta.description}
            </div>
          )}

          {/* Grid de Vídeos com Páginas Dedicadas */}
          <section className={styles.videosSection} aria-label="Lista de vídeos oficiais">
            <div className={styles.sectionHeaderRow}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {activeCategory === 'todos' 
                    ? 'Vídeos Oficiais do Projeto' 
                    : activeCategoryMeta?.name}
                </h2>
                <p className={styles.sectionSubtitle}>
                  Cada vídeo possui uma página exclusiva com exibição em destaque e análise pedagógica completa.
                </p>
              </div>
            </div>

            {filteredVideos.length > 0 ? (
              <div className={styles.videosGrid}>
                {filteredVideos.map((video) => (
                  <article key={video.slug} className={styles.videoCard}>
                    <Link href={video.url} className={styles.thumbContainer} aria-label={`Assistir: ${video.title}`}>
                      <img
                        src={video.thumbnailUrl}
                        alt={`Miniatura do vídeo: ${video.title}`}
                        className={styles.thumbImg}
                        loading="lazy"
                        width="480"
                        height="360"
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playCircle}>
                          <PlayCircle size={32} />
                        </div>
                      </div>
                      <div className={styles.durationBadge}>
                        <Clock size={12} />
                        <span>{video.durationFormatted}</span>
                      </div>
                    </Link>

                    <div className={styles.cardBody}>
                      <div className={styles.cardBadgesRow}>
                        <span className={styles.tagBadge}>{video.badge}</span>
                        <span className={styles.categoryTag}>{video.categoryName}</span>
                      </div>

                      <h3 className={styles.cardTitle}>
                        <Link href={video.url} style={{ color: 'inherit' }}>
                          {video.title}
                        </Link>
                      </h3>

                      <p className={styles.cardExcerpt}>{video.shortDescription}</p>

                      <div className={styles.cardFooter}>
                        <Link href={video.url} className={styles.linkWatchPage}>
                          <span>Ver página dedicada</span>
                          <ArrowRight size={16} />
                        </Link>
                        <a
                          href={video.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.categoryTag}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                          aria-label="Assistir no YouTube"
                        >
                          YouTube <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {/* SEÇÃO REUTILIZÁVEL: FORMAPLAY NA PRÁTICA */}
            {(activeCategory === 'todos' || activeCategory === 'formaplay-na-pratica') && (
              <div className={styles.practicalShowcase}>
                <div>
                  <span className={styles.practicalHeaderBadge}>
                    <GraduationCap size={14} />
                    FormaPlay na Prática
                  </span>
                  <h3 className={styles.practicalTitle}>
                    Aplicação real em instituições de ensino parceiras
                  </h3>
                  <p className={styles.practicalDesc}>
                    Esta seção é dedicada a vídeos documentando o Desafio Logístico em funcionamento com turmas e professores reais. Os conteúdos registram a dinâmica das partidas, a mediação em sala de aula e a evolução do raciocínio estratégico dos alunos.
                  </p>
                  <p className={styles.practicalDesc} style={{ color: '#94a3b8' }}>
                    Novas produções com turmas parceiras estão em processo de edição e validação didática para posterior publicação.
                  </p>
                </div>

                <div className={styles.practicalCardActionBox}>
                  <div className={styles.practicalStatusTitle}>
                    <Sparkles size={18} color="#f97316" />
                    <span>Espaço para Educadores Parceiros</span>
                  </div>
                  <p className={styles.practicalStatusText}>
                    Você é professor, instrutor ou coordenador e realizou uma partida do Desafio Logístico com sua turma? Entre em contato para compartilhar sua experiência didática com a comunidade FormaPlay.
                  </p>
                  <a
                    href={getWhatsAppLink('Olá! Sou educador e gostaria de compartilhar uma experiência de aplicação com o Desafio Logístico.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ color: '#ffffff', borderColor: '#f97316', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <MessageCircle size={16} />
                    <span>Falar sobre Aplicação em Aula</span>
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* Seção Pedagógica: Por que registros reais importam */}
          <section className={styles.pedagogySection} aria-label="Metodologia ativa e demonstração prática">
            <div className={styles.pedagogyGrid}>
              <div>
                <h2 className={styles.pedagogyTitle}>
                  Como o registro em vídeo apoia educadores e coordenadores
                </h2>
                <p className={styles.pedagogyText}>
                  A adoção de metodologias ativas requer clareza sobre como os alunos interagem com a ferramenta. Nossos vídeos demonstram o Desafio Logístico em funcionamento, evidenciando:
                </p>
                <ul className={styles.featuresList}>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.featureIcon} />
                    <span><strong>Dinâmica de tomada de decisão:</strong> alunos calculando custos de frete, definindo rotas e administrando imprevistos de transporte.</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.featureIcon} />
                    <span><strong>Mediação docente facilitada:</strong> o professor atua como orientador estratégico, estimulando a reflexão pós-jogo.</span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.featureIcon} />
                    <span><strong>Validação com turmas reais:</strong> metodologia desenvolvida a partir de testes com turmas de formação técnica e profissional.</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '0.75rem', padding: '1.75rem' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    Guia Prático para Professores
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    Veja dinâmicas completas de 50 minutos para aplicar com o Desafio Logístico em aulas de cursos técnicos e superiores.
                  </p>
                  <Link href="/logistica-em-sala-de-aula" className="btn btn-outline" style={{ color: '#ffffff', borderColor: '#f97316' }}>
                    Ver Logística em Sala de Aula
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.75rem', padding: '1.75rem' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    Central de Conteúdos & Artigos
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    Artigos sobre gamificação, atividades práticas e tomada de decisão no ensino de logística.
                  </p>
                  <Link href="/conteudos" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Explorar Central de Conteúdos
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Banner CTA Institucional */}
          <section className={styles.ctaBanner} aria-label="Chamada para ação institucional">
            <h2 className={styles.ctaTitle}>FormaPlay — Jogos Educacionais</h2>
            <p className={styles.ctaSlogan}>"Educação que transforma."</p>
            <p className={styles.ctaText}>
              Jogos educacionais que transformam conhecimento em experiências práticas de aprendizagem. Leve o Desafio Logístico para sua escola técnica, universidade ou treinamento corporativo.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Solicitar Orçamento do Jogo
                <ArrowRight size={18} />
              </a>
              <Link href="/desafio-logistico" className="btn btn-outline" style={{ color: '#ffffff', borderColor: '#f97316' }}>
                Ver Componentes do Jogo
              </Link>
            </div>
          </section>

        </div>
      </main>

      <WhatsappFloat />
      <Footer />
    </div>
  );
};

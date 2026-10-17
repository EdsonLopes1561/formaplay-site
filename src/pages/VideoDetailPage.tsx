import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../router/RouterContext';
import type { VideoItem } from '../data/videos';
import { VIDEOS } from '../data/videos';
import { 
  PlayCircle, 
  Clock, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  BookOpen, 
  Award, 
  Building2 
} from 'lucide-react';
import styles from './VideoDetailPage.module.css';

interface VideoDetailPageProps {
  video: VideoItem;
}

export const VideoDetailPage: React.FC<VideoDetailPageProps> = ({ video }) => {
  const videoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    contentUrl: video.contentUrl,
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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: video.title,
        item: `https://www.formaplayjogos.com.br${video.url}`
      }
    ]
  };

  const otherVideos = VIDEOS.filter((v) => v.slug !== video.slug);

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title={video.seoTitle}
        description={video.description}
        canonicalUrl={`https://www.formaplayjogos.com.br${video.url}`}
        ogImage={video.thumbnailUrl}
        ogType="website"
        schema={[videoObjectSchema, breadcrumbSchema]}
      />

      <Header />

      <main id="main-content" className={styles.mainContent}>
        <div className="container">
          
          {/* Navegação Estruturada (Breadcrumbs) */}
          <nav aria-label="Navegação estrutural" className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/videos" className={styles.breadcrumbLink}>Vídeos</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{video.badge}</span>
          </nav>

          {/* VÍDEO PRINCIPAL EM DESTAQUE */}
          <section className={styles.videoHeroSection} aria-label={`Vídeo principal: ${video.title}`}>
            <article className={styles.videoCardContainer}>
              <div className={styles.playerWrapper}>
                <iframe
                  className={styles.playerIframe}
                  src={`${video.embedUrl}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="eager"
                />
              </div>

              <div className={styles.videoHeaderInfo}>
                <div className={styles.badgeRow}>
                  <span className={styles.badgePrimary}>
                    <Award size={14} />
                    {video.badge}
                  </span>
                  <span className={styles.badgeSecondary}>
                    <BookOpen size={14} />
                    {video.category}
                  </span>
                  <span className={styles.badgeSecondary}>
                    <Clock size={14} />
                    {video.durationFormatted}
                  </span>
                </div>

                <h1 className={styles.videoTitle}>{video.h1}</h1>
                <p className={styles.videoLead}>{video.description}</p>

                <div className={styles.videoMetaBar}>
                  <div className={styles.metaInfoGroup}>
                    <span className={styles.metaItem}>
                      <Calendar size={16} />
                      Publicado em {video.publishedDateFormatted}
                    </span>
                    <span className={styles.metaItem}>
                      <Building2 size={16} />
                      FormaPlay — Jogos Educacionais
                    </span>
                  </div>

                  <div className={styles.actionsGroup}>
                    <a
                      href={video.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnActionOutline}
                      aria-label="Abrir e assistir diretamente no YouTube"
                    >
                      <PlayCircle size={16} />
                      Assistir no YouTube
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnActionPrimary}
                    >
                      Solicitar Orçamento
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* CONTEXTUALIZAÇÃO PEDAGÓGICA E METODOLÓGICA */}
          <section className={styles.contentSection} aria-label="Contextualização pedagógica e metodológica">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionPretitle}>Metodologia Ativa</span>
              <h2 className={styles.sectionTitle}>Contextualização pedagógica e prática</h2>
            </div>

            <div className={styles.cardsGrid2}>
              {/* O Problema */}
              <div className={styles.pedagogicalCard}>
                <div className={styles.cardIconHeader}>
                  <div className={styles.cardIconBadge}>
                    <Target size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>O Desafio em Sala de Aula</h3>
                </div>
                <p className={styles.cardBodyText}>
                  {video.contextoPedagogico.problema}
                </p>
              </div>

              {/* A Solução */}
              <div className={styles.pedagogicalCard}>
                <div className={styles.cardIconHeader}>
                  <div className={styles.cardIconBadge}>
                    <BookOpen size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>A Abordagem do Desafio Logístico</h3>
                </div>
                <p className={styles.cardBodyText}>
                  {video.contextoPedagogico.solucao}
                </p>
              </div>

              {/* Competências Desenvolvidas */}
              <div className={styles.pedagogicalCard}>
                <div className={styles.cardIconHeader}>
                  <div className={styles.cardIconBadge}>
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>Competências em Ação</h3>
                </div>
                <ul className={styles.competenciesList}>
                  {video.contextoPedagogico.competencias.map((comp, idx) => (
                    <li key={idx} className={styles.competencyItem}>
                      <CheckCircle2 size={16} className={styles.competencyIcon} />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aplicabilidade */}
              <div className={styles.pedagogicalCard}>
                <div className={styles.cardIconHeader}>
                  <div className={styles.cardIconBadge}>
                    <Building2 size={20} />
                  </div>
                  <h3 className={styles.cardTitle}>Onde Aplicar</h3>
                </div>
                <p className={styles.cardBodyText}>
                  {video.contextoPedagogico.aplicabilidade}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <Link href="/logistica-em-sala-de-aula" className={styles.btnActionOutline} style={{ display: 'inline-flex' }}>
                    Ver Guia para Educadores
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* TRAJETÓRIA INSTITUCIONAL & EMPREENDA SENAC */}
            <div className={styles.institutionalBox}>
              <h3 className={styles.institutionalTitle}>
                <Award size={22} color="#f97316" />
                Validação Institucional & Trajetória
              </h3>
              <p className={styles.institutionalText}>
                O Desafio Logístico foi concebido pela FormaPlay a partir de vivências com metodologias ativas no ensino e participou do programa <strong>Empreenda Senac 2026</strong>, no qual foi selecionado e classificado para a <strong>2ª fase (semifinal)</strong> de avaliação do projeto.
              </p>
              {video.etapaEmpreendaSenac && (
                <p className={styles.institutionalText} style={{ color: '#f97316', fontWeight: 600 }}>
                  Contexto demonstrado neste vídeo: {video.etapaEmpreendaSenac}
                </p>
              )}

              <div className={styles.destaquesList}>
                {video.destaques.map((item, idx) => (
                  <div key={idx} className={styles.destaqueItem}>
                    <span className={styles.destaqueDot} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FICHA TÉCNICA */}
            <div className={styles.technicalSheet}>
              <h3 className={styles.techTitle}>Ficha Técnica do Conteúdo Audiovisual</h3>
              <div className={styles.techGrid}>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Tema Principal</span>
                  <span className={styles.techValue}>Desafio Logístico — Jogo Educacional</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Categoria</span>
                  <span className={styles.techValue}>{video.categoryName}</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Duração</span>
                  <span className={styles.techValue}>{video.durationFormatted} ({video.duration})</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Canal Oficial</span>
                  <span className={styles.techValue}>YouTube (@formaplayjogos)</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Desenvolvimento</span>
                  <span className={styles.techValue}>FormaPlay — Jogos Educacionais</span>
                </div>
                {video.instituicao && (
                  <div className={styles.techField}>
                    <span className={styles.techLabel}>Instituição Parceira</span>
                    <span className={styles.techValue}>{video.instituicao}</span>
                  </div>
                )}
                {video.educadorResponsavel && (
                  <div className={styles.techField}>
                    <span className={styles.techLabel}>Educador Responsável</span>
                    <span className={styles.techValue}>{video.educadorResponsavel}</span>
                  </div>
                )}
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Público-Alvo</span>
                  <span className={styles.techValue}>Professores, Coordenadores e Estudantes</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Distribuição Oficial</span>
                  <span className={styles.techValue}>YouTube / Canal Oficial FormaPlay</span>
                </div>
                <div className={styles.techField}>
                  <span className={styles.techLabel}>Finalidade</span>
                  <span className={styles.techValue}>Demonstração Pedagógica e Institucional</span>
                </div>
              </div>
            </div>
          </section>

          {/* OUTROS VÍDEOS RELACIONADOS */}
          {otherVideos.length > 0 && (
            <section className={styles.relatedSection} aria-label="Outros vídeos educacionais da FormaPlay">
              <h2 className={styles.relatedTitle}>Outros vídeos da FormaPlay</h2>
              <div className={styles.relatedGrid}>
                {otherVideos.map((other) => (
                  <Link key={other.slug} href={other.url} className={styles.relatedCard}>
                    <div className={styles.relatedThumbWrapper}>
                      <img
                        src={other.thumbnailUrl}
                        alt={`Miniatura do vídeo: ${other.title}`}
                        className={styles.relatedThumbImg}
                        loading="lazy"
                        width="480"
                        height="360"
                      />
                      <div className={styles.relatedThumbOverlay}>
                        <div className={styles.playIconWrapper}>
                          <PlayCircle size={28} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.relatedCardBody}>
                      <span className={styles.relatedBadge}>{other.badge}</span>
                      <h3 className={styles.relatedCardTitle}>{other.title}</h3>
                      <p className={styles.relatedCardExcerpt}>{other.shortDescription}</p>
                    </div>
                  </Link>
                ))}

                {/* Card para acessar a Central de Vídeos completa */}
                <Link href="/videos" className={styles.relatedCard} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem', background: 'rgba(30, 41, 59, 0.4)', border: '1px dashed rgba(249, 115, 22, 0.35)' }}>
                  <div className={styles.playIconWrapper} style={{ marginBottom: '1rem' }}>
                    <BookOpen size={24} />
                  </div>
                  <span className={styles.relatedBadge} style={{ color: '#f97316' }}>Catálogo Audiovisual</span>
                  <h3 className={styles.relatedCardTitle} style={{ fontSize: '1.125rem' }}>Explorar a Central de Vídeos</h3>
                  <p className={styles.relatedCardExcerpt} style={{ marginTop: '0.5rem' }}>
                    Veja todas as categorias: Apresentação, Trajetória no Empreenda Senac e FormaPlay na Prática.
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#f97316', fontWeight: 600, fontSize: '0.875rem', marginTop: '1rem' }}>
                    Ver Central de Vídeos <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </section>
          )}

          {/* BANNER CTA INSTITUCIONAL */}
          <section className={styles.ctaBanner} aria-label="Chamada para ação institucional">
            <h2 className={styles.ctaTitle}>FormaPlay — Jogos Educacionais</h2>
            <p className={styles.ctaSlogan}>"Educação que transforma."</p>
            <p className={styles.ctaText}>
              Jogos educacionais que transformam conhecimento em experiências práticas de aprendizagem. Leve o Desafio Logístico para as turmas da sua escola ou faculdade.
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
                Conhecer Detalhes do Tabuleiro
              </Link>
              <Link href="/conteudos" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Ver Artigos Pedagógicos
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

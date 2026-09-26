import React from 'react';
import styles from '../ArticlePage.module.css';
import { SEOHead } from '../../components/SEOHead';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { WhatsappFloat } from '../../components/WhatsappFloat';
import { Link } from '../../router/RouterContext';
import { ARTICLES } from '../../data/articles';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Brain,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export const TomadaDecisaoArticle: React.FC = () => {
  const currentArticle = ARTICLES[2];
  const relatedArticles = ARTICLES.filter((a) => a.slug !== currentArticle.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: currentArticle.title,
    description: currentArticle.description,
    image: `https://www.formaplayjogos.com.br${currentArticle.image}`,
    datePublished: '2026-09-25T10:00:00Z',
    dateModified: '2026-09-25T10:00:00Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.formaplayjogos.com.br${currentArticle.url}`
    },
    author: {
      '@type': 'Organization',
      name: currentArticle.author,
      url: 'https://www.formaplayjogos.com.br'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FormaPlay – Jogos Educacionais',
      url: 'https://www.formaplayjogos.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.formaplayjogos.com.br/icone.png'
      }
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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: currentArticle.title,
        item: `https://www.formaplayjogos.com.br${currentArticle.url}`
      }
    ]
  };

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title={currentArticle.seoTitle}
        description={currentArticle.description}
        canonicalUrl={`https://www.formaplayjogos.com.br${currentArticle.url}`}
        ogImage={`https://www.formaplayjogos.com.br${currentArticle.image}`}
        ogType="article"
        schema={[articleSchema, breadcrumbSchema]}
      />

      <Header />

      <main className={styles.mainContent}>
        <article>
          <header className={styles.articleHeader}>
            <div className={`container ${styles.headerContainer}`}>
              <div className={styles.breadcrumb}>
                <Link href="/">Início</Link> <span>/</span> <Link href="/conteudos">Conteúdos</Link> <span>/</span> <span className={styles.currentBreadcrumb}>Tomada de Decisão</span>
              </div>

              <div className={styles.categoryTag}>
                <Brain size={16} />
                <span>{currentArticle.category}</span>
              </div>

              <h1 className={styles.articleTitle}>{currentArticle.h1}</h1>

              <p className={styles.articleSubtitle}>
                Como trabalhar raciocínio estratégico, gestão de riscos, análise de trade-offs e justificativas técnicas em cursos técnicos e faculdades de logística.
              </p>

              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <User size={15} />
                  <span>Por <strong>{currentArticle.author}</strong></span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={15} />
                  <span>{currentArticle.formattedDate}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={15} />
                  <span>{currentArticle.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          <section className={styles.articleBodySection}>
            <div className={`container ${styles.bodyContainer}`}>
              
              <div className={styles.featuredImageCard}>
                <img
                  src={currentArticle.image}
                  alt={currentArticle.imageAlt}
                  className={styles.featuredImage}
                  width="840"
                  height="460"
                  loading="eager"
                />
                <div className={styles.imageCaption}>
                  Simulações de rotas e malhas logísticas utilizadas para estimular o raciocínio e a tomada de decisão.
                </div>
              </div>

              <div className={styles.articleContent}>
                <p>
                  No ambiente corporativo da cadeia de suprimentos, raramente existe uma resposta perfeita ou única. Um gestor logístico precisa constantemente equilibrar objetivos concorrentes: entregar no menor prazo possível mantendo os custos sob controle, ou reduzir o nível de estoque sem correr o risco de ruptura de fornecimento.
                </p>

                <p>
                  Por essa razão, a habilidade de <strong>tomar decisões embasadas sob cenários de incerteza</strong> é uma das competências mais exigidas pelo mercado de trabalho. No entanto, em muitas salas de aula, os exercícios ainda se concentram em problemas fechados, onde há apenas uma resposta correta no gabarito.
                </p>

                <div className={styles.calloutBox}>
                  <p>
                    Aprender a tomar decisões em logística exige que o estudante vivencie o impacto prático de suas escolhas, seja confrontado com imprevistos e consiga justificar tecnicamente o caminho adotado.
                  </p>
                </div>

                <h2>Por que a tomada de decisão é o núcleo da competência logística?</h2>
                <p>
                  As operações de transporte, armazenagem e distribuição envolvem variáveis dinâmicas interligadas. Ao alterar uma única decisão, o profissional desencadeia reações em cadeia:
                </p>
                <ul>
                  <li><strong>Prazos e nível de serviço:</strong> atrasos em entregas impactam contratos com clientes e geram multas.</li>
                  <li><strong>Custos operacionais:</strong> pedágios, horas extras de motoristas, combustível e diárias de armazenagem.</li>
                  <li><strong>Capacidade de carga e frota:</strong> veículos subutilizados encarecem o frete por tonelada, enquanto sobrecargas aumentam o desgaste mecânico e os riscos de acidentes.</li>
                  <li><strong>Gestão de riscos:</strong> condições climáticas desfavoráveis, quebras de caminhões e variações repentinas de demanda.</li>
                </ul>

                <h2>Decisão não significa apenas apontar uma resposta: o valor da justificativa</h2>
                <p>
                  Na prática pedagógica, o foco não deve ser unicamente se a equipe escolheu a Rota A ou a Rota B, mas a solidez do raciocínio que fundamentou essa escolha.
                </p>
                <p>
                  Ao propor uma dinâmica de decisão, estimule os alunos a responderem estruturadamente a 5 perguntas essenciais:
                </p>
                <ol>
                  <li><strong>O que vocês decidiram?</strong> (Qual alternativa foi selecionada).</li>
                  <li><strong>Por que essa decisão foi tomada?</strong> (Quais dados e conceitos justificam a escolha).</li>
                  <li><strong>Quais riscos foram assumidos?</strong> (O que pode dar errado se as condições mudarem).</li>
                  <li><strong>Qual foi a principal alternativa descartada e por quê?</strong> (Demonstrar análise comparativa de trade-offs).</li>
                  <li><strong>Qual é o plano de contingência se o cenário piorar?</strong> (Capacidade de adaptação a imprevistos).</li>
                </ol>

                <h2>4 dinâmicas práticas para trabalhar tomada de decisão em aula</h2>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>1. Escolha de Rota e Modal sob Incerteza</span>
                  </div>
                  <p>
                    Apresente duas rotas para transportar uma carga perecível: a Rota 1 é asfaltada, com pedágios caros e prazo garantido de 6 horas; a Rota 2 não tem pedágios, economiza 20% em custos, mas passa por trecho com histórico frequente de congestionamento e prazo estimado entre 5 e 9 horas.
                  </p>
                  <p>
                    Peça aos grupos que calculem os custos totais e defendam qual rota escolheriam se a carga tivesse prazo de validade curto ou longo.
                  </p>
                </div>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>2. Gestão de Fluxo de Caixa e Investimentos Preventivos</span>
                  </div>
                  <p>
                    Cada equipe recebe um saldo financeiro fictício. Antes de cada rodada de pedidos, os alunos precisam decidir onde alocar recursos: manter um fundo de reserva, contratar seguro contra roubo ou investir em revisão mecânica preventiva.
                  </p>
                  <p>
                    Ao final de cada ciclo, o professor sorteia cartas de eventos e verifica quais grupos se prepararam adequadamente para os riscos operacionais.
                  </p>
                </div>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>3. Resposta Rápida a Crises e Imprevistos</span>
                  </div>
                  <p>
                    Durante uma atividade prática, introduza uma restrição súbita: um cliente urgente solicita antecipação de entrega em 4 horas, oferecendo um bônus financeiro substancial, mas desorganizando a rota dos demais clientes.
                  </p>
                  <p>
                    As equipes têm 8 minutos para analisar a viabilidade, calcular o impacto nas demais entregas e decidir se aceitam ou recusam a proposta.
                  </p>
                </div>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>4. Debate Estruturado de Trade-offs (Role-play)</span>
                  </div>
                  <p>
                    Divida a turma em áreas técnicas da mesma empresa: <em>Gerência de Operações</em> (quer frotas novas), <em>Gerência Financeira</em> (quer corte de custos imediatos) e <em>Atendimento ao Cliente</em> (quer pontualidade absoluta).
                  </p>
                  <p>
                    Os grupos precisam entrar em consenso sobre o orçamento anual de transportes, defendendo seus argumentos com indicadores de desempenho (KPIs).
                  </p>
                </div>

                <h2>Critérios de avaliação formativa em atividades de decisão</h2>
                <p>
                  Em metodologias ativas, a avaliação deve ter caráter formativo e processual, e não puramente punitivo. Sugerimos avaliar os seguintes aspectos:
                </p>
                <ul>
                  <li><strong>Coerência lógica:</strong> a decisão adotada faz sentido diante dos dados disponíveis?</li>
                  <li><strong>Qualidade da justificativa técnica:</strong> os alunos utilizaram conceitos de custos, rotas e prazos para embasar sua postura?</li>
                  <li><strong>Visão sistêmica:</strong> o grupo compreendeu os impactos da decisão nas outras etapas da cadeia?</li>
                  <li><strong>Trabalho em equipe e escuta ativa:</strong> houve debate equilibrado entre todos os integrantes da mesa?</li>
                </ul>

                {/* BLOCO CONTEXTUAL PRODUTO */}
                <div className={styles.contextualProductBox}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f97316', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <PackageCheck size={18} />
                      <span>SIMULAÇÃO PRÁTICA EM TABULEIRO</span>
                    </div>
                    <h3>Tomada de decisão em cada rodada com o Desafio Logístico</h3>
                    <p>
                      No jogo educacional <strong>Desafio Logístico</strong>, a tomada de decisão é a mecânica central: a cada avanço no tabuleiro, os alunos precisam gerenciar seu orçamento, escolher caminhos na malha de transporte, responder a perguntas conceituais e reagir a cartas de imprevistos do mercado. Uma ferramenta didática física completa para turmas de 2 a 4 jogadores.
                    </p>
                  </div>
                  <div className={styles.contextualButtons}>
                    <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnContextualPrimary}`}>
                      <span>Ver o Desafio Logístico</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link href="/logistica-em-sala-de-aula" className={styles.btnContextualSecondary}>
                      Guia para Educadores
                    </Link>
                  </div>
                </div>

                <h2>Conclusão</h2>
                <p>
                  Trabalhar tomada de decisão em cursos de logística prepara os alunos para a realidade do mercado. Ao colocar os estudantes diante de cenários abertos, com restrições e consequências práticas, o processo de ensino deixa de ser uma transmissão mecânica de conteúdo e passa a ser uma formação sólida de raciocínio crítico e responsabilidade operacional.
                </p>
              </div>

            </div>
          </section>
        </article>

        {/* CONTEÚDOS RELACIONADOS */}
        <section className={styles.relatedSection} aria-label="Conteúdos Relacionados">
          <div className={`container ${styles.relatedContainer}`}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Conteúdos Relacionados</h2>
              <Link href="/conteudos" className={styles.allConteudosLink}>
                <ArrowLeft size={16} />
                <span>Voltar para todos os conteúdos</span>
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((art) => (
                <Link key={art.slug} href={art.url} className={styles.relatedCard}>
                  <div className={styles.relatedCardImgWrapper}>
                    <img src={art.image} alt={art.imageAlt} className={styles.relatedCardImg} loading="lazy" />
                  </div>
                  <div className={styles.relatedCardBody}>
                    <span className={styles.relatedCardCategory}>{art.category}</span>
                    <h3 className={styles.relatedCardTitle}>{art.title}</h3>
                    <p className={styles.relatedCardDesc}>{art.excerpt}</p>
                    <span className={styles.relatedReadMore}>
                      Ler artigo <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <WhatsappFloat />
      <Footer />
    </div>
  );
};

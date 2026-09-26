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
  Gamepad2,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export const GamificacaoLogisticaArticle: React.FC = () => {
  const currentArticle = ARTICLES[0];
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
        {/* HEADER DO ARTIGO */}
        <article>
          <header className={styles.articleHeader}>
            <div className={`container ${styles.headerContainer}`}>
              <div className={styles.breadcrumb}>
                <Link href="/">Início</Link> <span>/</span> <Link href="/conteudos">Conteúdos</Link> <span>/</span> <span className={styles.currentBreadcrumb}>Gamificação</span>
              </div>

              <div className={styles.categoryTag}>
                <Gamepad2 size={16} />
                <span>{currentArticle.category}</span>
              </div>

              <h1 className={styles.articleTitle}>{currentArticle.h1}</h1>

              <p className={styles.articleSubtitle}>
                Como o uso estratégico de mecânicas de jogos — regras, objetivos, consequências e tomadas de decisão — pode transformar conceitos abstratos de logística em experiências práticas e participativas na sala de aula.
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

          {/* CORPO DO ARTIGO */}
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
                  Alunos em dinâmica prática aplicando conceitos de logística através de mecânicas ativas e colaborativas.
                </div>
              </div>

              <div className={styles.articleContent}>
                <p>
                  O ensino de logística frequentemente desafia professores a explicar dinâmicas que só fazem sentido quando vistas em movimento: custos variáveis que mudam com a rota, estoques que geram despesas diárias de armazenagem, imprevistos nas rodovias e prazos rígidos de entrega.
                </p>

                <p>
                  Quando esses temas são apresentados exclusivamente em fórmulas ou exposições teóricas, muitos alunos têm dificuldade em visualizar como uma pequena escolha operacional reverbera por toda a cadeia de suprimentos. É nesse cenário que a <strong>gamificação no ensino de logística</strong> surge como uma metodologia ativa capaz de aproximar o estudante de decisões autênticas.
                </p>

                <div className={styles.calloutBox}>
                  <p>
                    Gamificação não significa apenas "jogar por jogar". Trata-se de utilizar elementos estruturados de jogos — regras, metas, restrições, decisões com consequências e feedback rápido — em um contexto pedagógico intencional.
                  </p>
                </div>

                <h2>O que é gamificação no contexto educacional?</h2>
                <p>
                  A gamificação educacional consiste em aplicar a lógica e a mecânica dos jogos em situações de aprendizagem. Seu objetivo central não é o entretenimento descompromissado, mas o aumento do engajamento, da reflexão crítica e da autonomia do aluno diante de um problema a ser resolvido.
                </p>
                <p>
                  Entre os principais elementos que compõem uma atividade gamificada, destacam-se:
                </p>
                <ul>
                  <li><strong>Objetivos claros:</strong> o aluno sabe exatamente qual meta precisa atingir (ex.: entregar mercadorias no menor tempo ou com o menor custo).</li>
                  <li><strong>Regras e restrições:</strong> limitações de orçamento, capacidades de carga, prazos ou regras de tráfego.</li>
                  <li><strong>Tomada de decisão com consequências:</strong> cada escolha acarreta ganhos ou penalidades imediatas no fluxo operacional.</li>
                  <li><strong>Feedback contínuo:</strong> o estudante percebe imediatamente se sua decisão gerou economia ou prejuízo.</li>
                  <li><strong>Interação e cooperação:</strong> equipes comparam desempenhos, debatem alternativas e negociam recursos.</li>
                </ul>

                <h2>Por que a logística combina naturalmente com a gamificação?</h2>
                <p>
                  Poucas áreas do conhecimento são tão inerentemente estratégicas quanto a logística. No cotidiano das operações de transporte e distribuição, os profissionais lidam diariamente com dilemas como:
                </p>
                <ul>
                  <li><em>"Compensa pagar pedágio para economizar combustível e tempo?"</em></li>
                  <li><em>"Qual é o impacto financeiro de manter um caminhão parado por manutenção preventiva versus o risco de quebra na estrada?"</em></li>
                  <li><em>"Como priorizar entregas com janelas de atendimento incompatíveis?"</em></li>
                </ul>
                <p>
                  Esses dilemas logísticos possuem exatamente a estrutura de um desafio gamificado. Ao transformar tais variáveis em regras de sala de aula, os estudantes deixam de ser ouvintes passivos e passam a atuar como gestores operacionais.
                </p>

                <h2>Exemplos simples de mecânicas gamificadas para aulas de logística</h2>
                <p>
                  O professor não precisa de ferramentas digitais complexas para iniciar. Pequenas dinâmicas analógicas já proporcionam ótimos resultados pedagógicos:
                </p>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>1. Desafio de Roteirização com Pontuação por Eficiência</span>
                  </div>
                  <p>
                    Apresente à turma um mapa com 5 pontos de entrega e suas respectivas distâncias e pedágios. Cada grupo recebe um orçamento de 100 pontos. A cada quilômetro percorrido ou atraso na entrega, perdem-se pontos. Ganha destaque a equipe que desenhar a rota mais balanceada.
                  </p>
                </div>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>2. Gestão de Imprevistos com Cartas de Eventos</span>
                  </div>
                  <p>
                    Durante a execução de um exercício de transporte, o professor retira uma "carta surpresa" (ex.: pneu furado, chuva forte ou greve de posto de combustível). As equipes precisam recalcular o tempo estimado e remanejar os veículos em até 5 minutos.
                  </p>
                </div>

                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>3. Missão Logística em Grupos com Papéis Definidos</span>
                  </div>
                  <p>
                    Divida cada equipe em funções especializadas: um aluno atua como <em>Analista de Rotas</em>, outro como <em>Controlador de Custos</em> e o terceiro como <em>Gestor de Frotas</em>. As decisões precisam do aval unânime da mesa.
                  </p>
                </div>

                <h2>Gamificação é a mesma coisa que jogo educacional?</h2>
                <p>
                  Embora os termos sejam frequentemente usados juntos, há uma diferença sutil:
                </p>
                <ul>
                  <li><strong>Gamificação:</strong> utiliza elementos pontuais de jogos (pontuações, rankings, missões ou restrições de tempo) em atividades tradicionais ou exercícios normais.</li>
                  <li><strong>Jogos Educacionais:</strong> são ambientes fechados e completos, com tabuleiros, peças, regras integradas e condições claras de início, meio e fim da partida.</li>
                </ul>
                <p>
                  Ambas as abordagens se complementam. Enquanto a gamificação pode ser aplicada em pequenos momentos da aula, os jogos educacionais estruturados proporcionam uma imersão profunda e dinâmica em projetos temáticos.
                </p>

                <h2>Passo a passo para o professor aplicar em sala</h2>
                <ol>
                  <li><strong>Defina o foco temático:</strong> determine com precisão o que deseja reforçar (ex.: custos fixos vs. variáveis, modais de transporte ou gestão de frota).</li>
                  <li><strong>Estabeleça regras simples e transparentes:</strong> regras confusas desviam a atenção do conteúdo principal.</li>
                  <li><strong>Organize a sala em equipes equilibradas:</strong> grupos de 2 a 4 alunos incentivam a participação de todos.</li>
                  <li><strong>Acompanhe como mediador:</strong> circule entre as mesas, faça perguntas instigantes e observe os raciocínios adotados.</li>
                  <li><strong>Dedique tempo ao fechamento pedagógico (debriefing):</strong> reserve os últimos 15 minutos da aula para debater as escolhas das equipes e conectá-las à teoria.</li>
                </ol>

                <h2>Cuidados importantes ao utilizar gamificação</h2>
                <p>
                  Para que a atividade não perca seu propósito formativo, alguns cuidados devem ser observados:
                </p>
                <ul>
                  <li><strong>Evite o excesso de foco na competição:</strong> o objetivo principal é o aprendizado coletivo, e não a vitória a qualquer custo.</li>
                  <li><strong>Não deixe a atividade sem reflexão:</strong> jogar sem analisar os erros e acertos reduz o impacto pedagógico.</li>
                  <li><strong>Valorize as justificativas:</strong> uma equipe que tomou uma decisão arriscada, mas soube justificar seus motivos técnicos, aprendeu tanto quanto aquela que obteve o menor custo.</li>
                </ul>

                {/* BLOCO CONTEXTUAL PRODUTO */}
                <div className={styles.contextualProductBox}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f97316', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <PackageCheck size={18} />
                      <span>FERRAMENTA DIDÁTICA PRONTA</span>
                    </div>
                    <h3>Conheça o Desafio Logístico: gamificação pronta para sua aula</h3>
                    <p>
                      Para instituições e professores que desejam aplicar uma experiência gamificada completa sem precisar elaborar tabuleiros e regras do zero, a FormaPlay desenvolveu o <strong>Desafio Logístico</strong>. Um jogo de tabuleiro físico com cartas de desafios reais, malha de transporte, dinheiro fictício e gestão de frotas para 2 a 4 jogadores por partida.
                    </p>
                  </div>
                  <div className={styles.contextualButtons}>
                    <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnContextualPrimary}`}>
                      <span>Ver Detalhes do Desafio Logístico</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link href="/logistica-em-sala-de-aula" className={styles.btnContextualSecondary}>
                      Guia para Educadores
                    </Link>
                  </div>
                </div>

                <h2>Conclusão</h2>
                <p>
                  A gamificação no ensino de logística oferece um caminho consistente para tornar as aulas mais participativas, dinâmicas e conectadas aos desafios reais da profissão. Ao experimentar na prática o peso de cada decisão, o aluno desenvolve não apenas o conhecimento técnico, mas também a postura analítica necessária para o mercado de trabalho.
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

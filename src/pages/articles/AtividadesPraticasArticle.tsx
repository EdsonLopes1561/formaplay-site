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
  Compass,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export const AtividadesPraticasArticle: React.FC = () => {
  const currentArticle = ARTICLES[1];
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
                <Link href="/">Início</Link> <span>/</span> <Link href="/conteudos">Conteúdos</Link> <span>/</span> <span className={styles.currentBreadcrumb}>Atividades Práticas</span>
              </div>

              <div className={styles.categoryTag}>
                <Compass size={16} />
                <span>{currentArticle.category}</span>
              </div>

              <h1 className={styles.articleTitle}>{currentArticle.h1}</h1>

              <p className={styles.articleSubtitle}>
                Cinco propostas estruturadas e aplicáveis para professores de cursos técnicos e superiores que desejam trabalhar rotas, custos, imprevistos e tomada de decisão de forma participativa.
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
                  Recursos didáticos e componentes utilizados para simular operações logísticas na prática.
                </div>
              </div>

              <div className={styles.articleContent}>
                <p>
                  Ensinar logística requer mais do que apresentar definições sobre cadeia de suprimentos, tipos de veículos e fórmulas de ponto de pedido. O verdadeiro desafio do futuro profissional está na capacidade de avaliar cenários sob pressão, identificar trade-offs (custo versus nível de serviço) e tomar decisões operacionais conscientes.
                </p>

                <p>
                  Para apoiar professores, instrutores e coordenadores pedagógicos, reunimos <strong>cinco atividades práticas originais</strong> que podem ser adaptadas para diferentes níveis de formação — desde turmas de cursos técnicos até graduações em Administração e Engenharia de Produção.
                </p>

                <div className={styles.calloutBox}>
                  <p>
                    Uma boa atividade prática não precisa de equipamentos caros: ela precisa de um objetivo pedagógico bem delimitado, regras transparentes e espaço para debate entre os alunos.
                  </p>
                </div>

                <h2>1. Planejamento de Rotas com Janelas de Horário e Restrições</h2>
                <p>
                  <strong>Objetivo:</strong> Compreender a complexidade da roteirização de entregas em malhas urbanas e regionais.
                </p>
                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>Como estruturar em sala:</span>
                  </div>
                  <p>
                    Distribua para cada equipe um mapa simplificado com um centro de distribuição (CD) e 6 clientes numerados. Cada cliente possui um volume de caixas, uma janela rígida de recebimento (ex.: Cliente A recebe apenas das 08h às 10h) e uma tarifa de pedágio no trajeto.
                  </p>
                  <p>
                    Os grupos dispõem de veículos com capacidade máxima limitada. Eles devem calcular a melhor sequência de paradas para atender a todos os clientes sem estourar o limite de carga nem as janelas de tempo.
                  </p>
                  <div className={styles.tipBox}>
                    <strong>Ponto de reflexão para o professor:</strong>
                    Pergunte aos alunos: <em>"Se o cliente que paga o melhor frete tiver uma janela de entrega incompatível com os demais, o que compensa mais financeiramente?"</em>
                  </div>
                </div>

                <h2>2. Gestão de Orçamento Limitado: Custos Fixos vs. Variáveis</h2>
                <p>
                  <strong>Objetivo:</strong> Desenvolver raciocínio financeiro aplicado à gestão de transportes e armazenagem.
                </p>
                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>Como estruturar em sala:</span>
                  </div>
                  <p>
                    Cada equipe recebe um montante inicial fictício de R$ 50.000 para administrar ao longo de 4 rodadas (representando 4 semanas de operação). Em cada rodada, surgem despesas fixas (folha, locação de galpão) e despesas variáveis conforme o número de entregas realizadas.
                  </p>
                  <p>
                    Os alunos precisam decidir se contratam frotistas agregados, compram seguro de carga ou investem em manutenção preventiva para evitar quebras futuras.
                  </p>
                  <div className={styles.tipBox}>
                    <strong>Ponto de reflexão para o professor:</strong>
                    Evidencie como a economia imediata na manutenção de um caminhão pode se transformar em um prejuízo três vezes maior em caso de reboque na rodovia.
                  </div>
                </div>

                <h2>3. Análise de Imprevistos e Resolução de Crises Operacionais</h2>
                <p>
                  <strong>Objetivo:</strong> Estimular a adaptação rápida e a gestão de contingências.
                </p>
                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>Como estruturar em sala:</span>
                  </div>
                  <p>
                    Inicie a aula apresentando um plano de entrega previamente calculado e aprovado pelas equipes. Após 10 minutos, o professor lança um evento inesperado sorteado:
                  </p>
                  <ul>
                    <li>Interdição total de uma ponte principal por chuvas.</li>
                    <li>Quebra mecânica súbita do veículo de maior capacidade.</li>
                    <li>Cancelamento repentino do pedido de um cliente de grande porte.</li>
                  </ul>
                  <p>
                    As equipes têm 12 minutos para apresentar um plano B por escrito, informando novos prazos, custos extras e comunicação com os clientes afetados.
                  </p>
                </div>

                <h2>4. Estudo de Caso Rápido com Defesa de Proposta Técnica</h2>
                <p>
                  <strong>Objetivo:</strong> Fortalecer a argumentação técnica fundamentada em indicadores logísticos.
                </p>
                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>Como estruturar em sala:</span>
                  </div>
                  <p>
                    Apresente um dilema de negócios em uma folha: uma rede varejista regional precisa decidir se constrói um novo centro de distribuição no interior ou se amplia o galpão já existente na capital.
                  </p>
                  <p>
                    Divida a turma em dois blocos de equipes: metade deve defender a centralização e a outra metade a descentralização. Cada grupo tem 3 minutos para expor seus argumentos de custo de frete, tempo de resposta (lead time) e custos de armazenagem.
                  </p>
                </div>

                <h2>5. Dinâmica com Jogos Educacionais de Tabuleiro</h2>
                <p>
                  <strong>Objetivo:</strong> Integrar todas as variáveis logísticas em uma dinâmica imersiva, lúdica e contínua.
                </p>
                <div className={styles.activityBox}>
                  <div className={styles.activityBoxTitle}>
                    <CheckCircle2 size={20} />
                    <span>Como estruturar em sala:</span>
                  </div>
                  <p>
                    Jogos estruturados reúnem tabuleiro com malhas de transporte, dados de avanço, cartas de perguntas operacionais, cédulas de dinheiro fictício e penalidades automáticas. Os alunos jogam em mesas de 2 a 4 participantes, atuando como operadores logísticos concorrentes.
                  </p>
                  <p>
                    O professor atua como facilitador e árbitro pedagógico, intervindo para esclarecer dúvidas de regras e pontuar como as ocorrências do tabuleiro refletem situações reais de mercado.
                  </p>
                </div>

                {/* BLOCO CONTEXTUAL PRODUTO */}
                <div className={styles.contextualProductBox}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f97316', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <PackageCheck size={18} />
                      <span>RECURSO PRONTO PARA SALA DE AULA</span>
                    </div>
                    <h3>Desafio Logístico: uma atividade prática pronta para suas aulas</h3>
                    <p>
                      Se você procura uma atividade completa, resistente e com regras pedagógicas já testadas e validadas em ambiente real, conheça o <strong>Desafio Logístico</strong> da FormaPlay. O jogo reúne planejamento, cálculo de custos, eventos operacionais e tomada de decisão em partidas de 30 a 60 minutos.
                    </p>
                  </div>
                  <div className={styles.contextualButtons}>
                    <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnContextualPrimary}`}>
                      <span>Conhecer o Desafio Logístico</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link href="/logistica-em-sala-de-aula" className={styles.btnContextualSecondary}>
                      Guia para Educadores
                    </Link>
                  </div>
                </div>

                <h2>Como escolher a melhor atividade para sua turma?</h2>
                <p>
                  Para selecionar a proposta mais adequada, considere os seguintes fatores pedagógicos:
                </p>
                <ul>
                  <li><strong>Tempo de aula disponível:</strong> para aulas de 50 minutos, estudos de caso rápidos ou simulações focadas de rotas funcionam muito bem. Para blocos de 100 minutos ou oficinas, jogos de tabuleiro e simulações com imprevistos oferecem maior profundidade.</li>
                  <li><strong>Nível de maturidade dos estudantes:</strong> turmas em início de curso se beneficiam de regras mais simples e dinâmicas com cartas; turmas avançadas respondem melhor a restrições numéricas rigorosas e defesa de estudos de caso.</li>
                  <li><strong>Espaço físico da sala:</strong> mesas agrupadas em ilhas de 4 a 5 alunos facilitam a interação e a cooperação.</li>
                </ul>

                <h2>A importância do fechamento pedagógico (debriefing)</h2>
                <p>
                  O momento mais valioso de qualquer atividade prática acontece nos minutos finais. Ao encerrar a dinâmica, o professor deve conduzir um fechamento estruturado com perguntas como:
                </p>
                <ul>
                  <li><em>"Qual foi a decisão mais difícil tomada pelo seu grupo?"</em></li>
                  <li><em>"Em que momento a estratégia inicial precisou ser alterada?"</em></li>
                  <li><em>"O que vocês fariam diferente se a partida recomeçasse agora?"</em></li>
                </ul>
                <p>
                  Essa etapa consolida a ponte entre a experiência vivida e os conceitos teóricos do plano de ensino.
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

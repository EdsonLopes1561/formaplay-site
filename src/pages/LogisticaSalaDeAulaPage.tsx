import React, { useState } from 'react';
import styles from './LogisticaSalaDeAulaPage.module.css';
import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { getWhatsAppLink } from '../constants';
import { Link } from '../router/RouterContext';
import { ARTICLES } from '../data/articles';
import {
  GraduationCap,
  Users,
  Compass,
  ArrowRight,
  AlertTriangle,
  Wallet,
  Gamepad2,
  CheckCircle2,
  ChevronDown,
  Brain,
  MessagesSquare,
  TrendingUp,
  Layers,
  Award,
  PackageCheck,
  Clock,
  ExternalLink
} from 'lucide-react';

export const LogisticaSalaDeAulaPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Structured Data (WebPage & BreadcrumbList)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Logística em Sala de Aula | Atividades Práticas para Professores',
    description: 'Conheça atividades práticas, dinâmicas e jogos educacionais para tornar o ensino de logística mais participativo e próximo de situações reais de tomada de decisão.',
    url: 'https://www.formaplayjogos.com.br/logistica-em-sala-de-aula',
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
        name: 'Logística em Sala de Aula',
        item: 'https://www.formaplayjogos.com.br/logistica-em-sala-de-aula'
      }
    ]
  };

  const competencias = [
    {
      icon: <Compass size={24} />,
      title: 'Planejamento Estratégico',
      desc: 'Capacidade de estruturar etapas, definir prazos e prever rotas antes de iniciar a operação.'
    },
    {
      icon: <Brain size={24} />,
      title: 'Tomada de Decisão sob Pressão',
      desc: 'Escolha rápida e racional de alternativas diante de cenários imprevistos e restrições.'
    },
    {
      icon: <AlertTriangle size={24} />,
      title: 'Análise de Problemas e Riscos',
      desc: 'Identificação de gargalos operacionais e antecipação de impactos na cadeia de suprimentos.'
    },
    {
      icon: <Users size={24} />,
      title: 'Trabalho em Equipe e Negociação',
      desc: 'Comunicação clara, divisão de papéis e alinhamento tático entre os participantes.'
    },
    {
      icon: <Wallet size={24} />,
      title: 'Gestão de Recursos',
      desc: 'Administração de fluxo de caixa, controle de despesas e alocação consciente de ativos.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Avaliação de Custos Operacionais',
      desc: 'Compreensão do peso dos fretes, manutenção, armazenagem e pedágios no preço final.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Visão Sistêmica de Processos',
      desc: 'Percepção prática de que cada etapa logística afeta os resultados das etapas seguintes.'
    },
    {
      icon: <MessagesSquare size={24} />,
      title: 'Argumentação Técnica',
      desc: 'Defesa fundamentada de escolhas logísticas utilizando conceitos e métricas da disciplina.'
    }
  ];

  const atividades = [
    {
      index: '01',
      tag: 'Simulação Estratégica',
      title: 'Simulação de Roteirização e Rotas de Entrega',
      desc: 'O professor apresenta um mapa com múltiplos destinos, prazos de entrega, janelas de horário e restrições de veículos. Em equipes, os alunos devem traçar a sequência ótima de paradas considerando custos de pedágio, combustível e tempo de percurso.',
      execution: 'Como aplicar: Divida a turma em grupos, entregue o mapa com as restrições e dê 20 minutos para a elaboração do trajeto. Ao final, cada grupo apresenta sua rota e justifica por que priorizou custo, prazo ou quilometragem.'
    },
    {
      index: '02',
      tag: 'Gestão de Crise',
      title: 'Análise de Imprevistos e Riscos Operacionais',
      desc: 'Durante uma operação simulada já em andamento, o docente introduz eventos inesperados: quebra mecânica de um caminhão, chuva forte bloqueando a rodovia principal ou aumento súbito na demanda de um cliente prioritário.',
      execution: 'Como aplicar: Os grupos recebem a ocorrência em tempo real e têm 10 minutos para recalcular o impacto orçamentário, remanejar veículos e apresentar um plano de contingência viável.'
    },
    {
      index: '03',
      tag: 'Gestão Financeira',
      title: 'Gestão de Recursos com Orçamento Limitado',
      desc: 'Cada grupo inicia com um montante fixo de recursos fictícios para gerenciar um ciclo de 3 rodadas de pedidos. Eles precisam decidir onde investir: manutenção preventiva, aquisição de novas frotas, seguro de carga ou estoque de segurança.',
      execution: 'Como aplicar: Avalie como os alunos equilibram economia com prevenção de riscos. A atividade evidencia na prática que cortes excessivos de custo podem gerar perdas maiores diante de falhas operacionais.'
    },
    {
      index: '04',
      tag: 'Estudo de Caso Ativo',
      title: 'Estudo de Caso Orientado com Defesa de Proposta',
      desc: 'Apresente uma situação real de empresa que precisa decidir entre operar com frota própria ou terceirizar suas entregas em determinada região geográfica.',
      execution: 'Como aplicar: Cada grupo assume uma área técnica (Operações, Controladoria ou Atendimento ao Cliente). As equipes debatem dados de custos fixos vs. variáveis e elaboram um parecer técnico para a diretoria.'
    },
    {
      index: '05',
      tag: 'Metodologia Gamificada',
      title: 'Jogos Educacionais de Tabuleiro e Simulações Práticas',
      desc: 'A utilização de jogos físicos com regras claras, recursos contados e consequências imediatas coloca o aluno no papel de gestor logístico, onde cada decisão reflete no avanço na malha, saldo em dinheiro e sucesso da entrega.',
      execution: 'Como aplicar: Os estudantes jogam em rodadas estruturadas, respondendo a desafios conceituais e administrando sua frota. O aprendizado ocorre tanto nas decisões individuais quanto na mediação coletiva da partida.'
    }
  ];

  const stepsWorkflow = [
    {
      step: '01',
      title: 'Definir o Objetivo Pedagógico',
      desc: 'Escolha com clareza o conteúdo-chave que será trabalhado (ex.: roteirização, custos, imprevistos ou estoques).'
    },
    {
      step: '02',
      title: 'Organizar a Turma em Grupos',
      desc: 'Forme pequenas equipes de 2 a 4 alunos para favorecer a participação ativa e o debate de ideias.'
    },
    {
      step: '03',
      title: 'Apresentar as Regras e Cenário',
      desc: 'Explique de forma objetiva o funcionamento, os recursos disponíveis e os critérios de decisão.'
    },
    {
      step: '04',
      title: 'Disponibilizar o Material',
      desc: 'Entregue o tabuleiro, mapas, cartas de eventos ou planilhas de apoio para cada equipe.'
    },
    {
      step: '05',
      title: 'Debate Interno e Estratégia',
      desc: 'Permita que os alunos analisem as alternativas, façam contas e cheguem a um consenso no grupo.'
    },
    {
      step: '06',
      title: 'Execução da Rodada Prática',
      desc: 'Os alunos realizam as jogadas ou entregam as decisões simuladas conforme as regras estabelecidas.'
    },
    {
      step: '07',
      title: 'Comparação de Resultados',
      desc: 'Coloque em evidência as diferentes escolhas feitas pelos grupos e os respectivos impactos.'
    },
    {
      step: '08',
      title: 'Fechamento Pedagógico (Debriefing)',
      desc: 'O professor conduz a reflexão final, conectando as vivências do jogo aos conceitos teóricos da matéria.'
    }
  ];

  const faqs = [
    {
      q: 'Que tipo de atividade prática pode ser usada em aulas de logística?',
      a: 'É possível aplicar desde simulações de roteirização com mapas, dinâmicas de gerenciamento de imprevistos e estudos de caso com tomada de decisão, até jogos educacionais estruturados, que integram regras de mercado, gestão de recursos e interação entre os alunos.'
    },
    {
      q: 'Jogos educacionais substituem aulas teóricas?',
      a: 'Não. Os jogos educacionais e as dinâmicas práticas atuam como excelentes complementos pedagógicos. Eles servem para ilustrar, fixar, aplicar e consolidar os conceitos teóricos apresentados pelo professor, proporcionando vivência participativa aos alunos.'
    },
    {
      q: 'Como trabalhar jogos práticos com uma turma com muitos alunos?',
      a: 'O professor pode organizar a sala em pequenos grupos de trabalho. No caso de jogos de tabuleiro, turmas maiores podem trabalhar com múltiplos tabuleiros simultâneos, duplas por posição ou oficinas com rodízios de atividades práticas ao longo da aula.'
    },
    {
      q: 'Quais conteúdos de logística podem ser abordados em atividades práticas?',
      a: 'Planejamento de rotas e modais de transporte, gestão de frotas e armazenagem, custos fixos e variáveis, cálculo de fretes, gestão de imprevistos operacionais, fluxo de caixa e visão sistêmica da cadeia de suprimentos.'
    },
    {
      q: 'O Desafio Logístico pode ser utilizado em cursos técnicos e faculdades?',
      a: 'Sim. O Desafio Logístico foi desenvolvido especificamente com base em conteúdos de logística e administração, sendo recomendado para cursos técnicos, faculdades, centros de educação profissional e treinamentos corporativos para participantes a partir de 16 anos.'
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Logística em Sala de Aula | Atividades Práticas para Professores"
        description="Conheça atividades práticas, dinâmicas e jogos educacionais para tornar o ensino de logística mais participativo e próximo de situações reais de tomada de decisão."
        canonicalUrl="https://www.formaplayjogos.com.br/logistica-em-sala-de-aula"
        ogImage="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png"
        ogType="website"
        schema={[webPageSchema, breadcrumbSchema]}
      />

      <Header />

      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section id="hero" className={styles.heroSection} aria-label="Apresentação do Guia de Atividades Práticas">
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroText}>
              <div className={styles.breadcrumb}>
                <Link href="/">Início</Link> <span>/</span> <span className={styles.currentBreadcrumb}>Logística em Sala de Aula</span>
              </div>

              <div className={styles.educatorBadge}>
                <GraduationCap size={16} />
                <span>GUIA PARA PROFESSORES & EDUCADORES</span>
              </div>

              <h1 className={styles.heroTitle}>
                Logística em sala de aula: atividades práticas para ensinar além da teoria
              </h1>

              <p className={styles.heroSubtitle}>
                Conteúdos técnicos de logística ganham mais significado quando os alunos precisam analisar cenários reais, calcular custos, tomar decisões táticas e lidar com as consequências de suas escolhas.
              </p>

              {/* Highlights */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <Brain size={20} className={styles.specIcon} />
                  <div>
                    <strong>Tomada de Decisão</strong>
                    <span>Resolução de problemas</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <Users size={20} className={styles.specIcon} />
                  <div>
                    <strong>Dinâmicas em Grupo</strong>
                    <span>Metodologias ativas</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <Award size={20} className={styles.specIcon} />
                  <div>
                    <strong>Cursos Técnicos & Superiores</strong>
                    <span>Ensino profissional</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className={styles.heroActions}>
                <a href="#atividades-praticas" className={`btn btn-primary ${styles.btnPrimaryLg}`}>
                  <span>Ver sugestões de atividades</span>
                  <ArrowRight size={20} />
                </a>
                <Link href="/desafio-logistico" className={styles.btnOutlineLg}>
                  Conheça o Desafio Logístico
                </Link>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <div className={styles.imageCard}>
                <div className={styles.statusPill}>Prática Docente</div>
                <img
                  src="/hero.png"
                  alt="Alunos participando de atividade prática de logística com jogo educacional em sala de aula"
                  className={styles.heroImg}
                  width="600"
                  height="450"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* O DESAFIO DE TRANSFORMAR TEORIA EM PRÁTICA */}
        <section id="desafio-teoria-pratica" className={styles.theoryChallengeSection} aria-label="O Desafio da Teoria e Prática">
          <div className="container">
            <div className={styles.theoryGrid}>
              <div className={styles.theoryText}>
                <span className={styles.subTitleBadge}>REALIDADE DO ENSINO</span>
                <h2 className={styles.sectionTitle}>O desafio de aproximar a logística da tomada de decisão real</h2>
                <p>
                  A área de logística é repleta de variáveis dinâmicas: prazos apertados, rotas imprevisíveis, flutuação de fretes, quebras de veículos e restrições financeiras. No entanto, quando ensinada apenas em slides ou fórmulas estáticas, esses conceitos podem parecer distantes da rotina profissional.
                </p>
                <p>
                  Atividades práticas e metodologias ativas não buscam substituir a exposição teórica do professor, mas sim complementá-la. Ao colocar os estudantes diante de escolhas operacionais com consequências imediatas, o aprendizado se torna muito mais participativo e duradouro.
                </p>
                
                <div className={styles.theoryHighlightBox}>
                  <p>
                    Quando o aluno vivencia o impacto de um atraso de entrega ou de um custo imprevisto no orçamento, o conceito teórico de gestão de riscos passa a fazer sentido prático.
                  </p>
                </div>
              </div>

              <div className={styles.conceptsBadgeGrid}>
                {[
                  'Planejamento de Rotas',
                  'Gestão de Custos',
                  'Controle de Estoque',
                  'Modais de Transporte',
                  'Gestão de Riscos',
                  'Tomada de Decisão',
                  'Definição de Prioridades',
                  'Imprevistos Operacionais',
                  'Negociação em Equipe'
                ].map((concept, idx) => (
                  <div key={idx} className={styles.conceptBadge}>
                    <CheckCircle2 size={18} className={styles.conceptBadgeIcon} />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* O QUE UMA BOA ATIVIDADE PODE DESENVOLVER */}
        <section id="competencias" className={styles.skillsSection} aria-label="Competências Desenvolvidas">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>HABILIDADES & COMPETÊNCIAS</span>
              <h2 className={styles.sectionTitle}>O que uma boa atividade prática de logística desenvolve</h2>
              <p className={styles.sectionLead}>
                Integrando conhecimentos técnicos da cadeia de suprimentos ao desenvolvimento de competências socioemocionais.
              </p>
            </div>

            <div className={styles.skillsGrid}>
              {competencias.map((item, idx) => (
                <div key={idx} className={styles.skillCard}>
                  <div className={styles.skillIconBox}>{item.icon}</div>
                  <h3 className={styles.skillTitle}>{item.title}</h3>
                  <p className={styles.skillDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IDEIAS DE ATIVIDADES PRÁTICAS */}
        <section id="atividades-praticas" className={styles.activitiesSection} aria-label="Ideias de Atividades Práticas">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>METODOLOGIAS APLICÁVEIS</span>
              <h2 className={styles.sectionTitle}>5 ideias de atividades práticas para suas aulas de logística</h2>
              <p className={styles.sectionLead}>
                Sugestões adaptáveis que professores podem aplicar em sala de aula, oficinas e projetos integradores.
              </p>
            </div>

            <div className={styles.activitiesList}>
              {atividades.map((act, idx) => (
                <div key={idx} className={styles.activityCard}>
                  <div className={styles.activityIndexBadge}>{act.index}</div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityHeader}>
                      <h3 className={styles.activityTitle}>{act.title}</h3>
                      <span className={styles.activityTag}>{act.tag}</span>
                    </div>
                    <p className={styles.activityDescription}>{act.desc}</p>
                    <div className={styles.activityExecutionBox}>
                      <strong>Dica de Aplicação Pedagógica:</strong>
                      <p>{act.execution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO TRABALHAR UMA ATIVIDADE EM GRUPOS */}
        <section id="como-trabalhar" className={styles.workflowSection} aria-label="Como trabalhar em grupos">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>PASSO A PASSO DOCENTE</span>
              <h2 className={styles.sectionTitle}>Como conduzir uma dinâmica em grupo com a turma</h2>
              <p className={styles.sectionLead}>
                Uma sequência estruturada e flexível para garantir que a atividade prática atinja seus objetivos de aprendizagem.
              </p>
            </div>

            <div className={styles.stepsTimeline}>
              {stepsWorkflow.map((st, idx) => (
                <div key={idx} className={styles.stepCard}>
                  <div className={styles.stepNumBadge}>Passo {st.step}</div>
                  <h3 className={styles.stepTitle}>{st.title}</h3>
                  <p className={styles.stepDesc}>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O PAPEL DO PROFESSOR & QUANDO UTILIZAR */}
        <section id="papel-professor" className={styles.teacherRoleSection} aria-label="O Papel do Professor e Aplicação">
          <div className="container">
            <div className={styles.teacherRoleGrid}>
              
              {/* O Papel do Professor */}
              <div className={styles.roleCardCol}>
                <div className={styles.colHeader}>
                  <GraduationCap size={28} className={styles.colHeaderIcon} />
                  <h2 className={styles.colTitle}>O papel do professor como mediador</h2>
                </div>
                <div className={styles.roleList}>
                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Contextualizar antes de começar:</strong>
                      <p>Apresentar os conceitos da aula para que os estudantes compreendam o embasamento teórico da dinâmica.</p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Fazer perguntas provocativas:</strong>
                      <p>Instigar os alunos durante a tomada de decisão: <em>"Por que escolheram essa rota?", "Qual é o risco dessa economia?"</em></p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Comparar decisões divergentes:</strong>
                      <p>Mostrar como grupos diferentes adotaram estratégias distintas para resolver o mesmo problema logístico.</p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Conduzir o debriefing final:</strong>
                      <p>Realizar o fechamento pedagógico, conectando as vivências do exercício ao plano de aula do curso.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quando Utilizar Jogos */}
              <div className={styles.roleCardCol}>
                <div className={styles.colHeader}>
                  <Gamepad2 size={28} className={styles.colHeaderIcon} />
                  <h2 className={styles.colTitle}>Quando utilizar jogos educacionais?</h2>
                </div>
                <div className={styles.roleList}>
                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Introdução de Novos Conteúdos:</strong>
                      <p>Despertar o interesse da turma e criar uma base intuitiva antes de aprofundar teorias complexas.</p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Revisão e Consolidação de Módulos:</strong>
                      <p>Excelente recurso para fixar conceitos após aulas expositivas de custos, transporte ou armazenagem.</p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Avaliação Formativa e Prática:</strong>
                      <p>Permite observar a capacidade de raciocínio, lógica de custos e trabalho em equipe dos estudantes.</p>
                    </div>
                  </div>

                  <div className={styles.roleItem}>
                    <CheckCircle2 size={20} className={styles.roleItemIcon} />
                    <div className={styles.roleItemText}>
                      <strong>Semanas Acadêmicas & Oficinas:</strong>
                      <p>Ideal para eventos integradores, competições pedagógicas saudáveis e projetos práticos.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DESTAQUE: DESAFIO LOGÍSTICO */}
        <section id="desafio-logistico-destaque" className={styles.productHighlightSection} aria-label="Destaque Desafio Logístico">
          <div className="container">
            <div className={styles.productHighlightGrid}>
              <div className={styles.productHighlightText}>
                <span className={styles.subTitleBadge}>SOLUÇÃO DIDÁTICA PRONTA</span>
                <h2 className={styles.productHighlightTitle}>Uma atividade prática pronta: Desafio Logístico</h2>
                <p className={styles.productHighlightLead}>
                  O <strong>Desafio Logístico</strong> é um jogo educacional de tabuleiro desenvolvido pela FormaPlay para transformar conceitos de logística em situações práticas de decisão durante uma partida envolvente.
                </p>
                <p className={styles.productHighlightLead}>
                  Em vez de criar uma dinâmica do zero, os professores contam com uma ferramenta didática completa, estruturada com regras testadas, malha de rotas, eventos imprevistos e fluxo financeiro integrado.
                </p>

                <div className={styles.productSpecsList}>
                  <div className={styles.productSpecCard}>
                    <Users size={20} className={styles.productSpecIcon} />
                    <div>
                      <strong>2 a 4 jogadores</strong>
                      <span>por partida ou pequenos grupos</span>
                    </div>
                  </div>
                  <div className={styles.productSpecCard}>
                    <Clock size={20} className={styles.productSpecIcon} />
                    <div>
                      <strong>30 a 60 minutos</strong>
                      <span>duração ideal para a aula</span>
                    </div>
                  </div>
                  <div className={styles.productSpecCard}>
                    <GraduationCap size={20} className={styles.productSpecIcon} />
                    <div>
                      <strong>A partir de 16 anos</strong>
                      <span>Ensino técnico e superior</span>
                    </div>
                  </div>
                  <div className={styles.productSpecCard}>
                    <PackageCheck size={20} className={styles.productSpecIcon} />
                    <div>
                      <strong>Jogo Físico Completo</strong>
                      <span>Pronto para uso em sala</span>
                    </div>
                  </div>
                </div>

                <div className={styles.productHighlightActions}>
                  <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnPrimaryLg}`}>
                    <span>Conheça o Desafio Logístico</span>
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnOutlineLg}
                  >
                    Solicitar Proposta para sua Escola
                  </a>
                </div>
              </div>

              <div className={styles.productHighlightMedia}>
                <div className={styles.productMediaCard}>
                  <img
                    src="/desafio-logistico-produto-mesa.png"
                    alt="Desafio Logístico utilizado como atividade prática em aula sobre a mesa"
                    className={styles.productMediaImg}
                    width="600"
                    height="450"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMO APLICAR O DESAFIO LOGÍSTICO EM AULA */}
        <section id="aplicacao-pratica" className={styles.applicationSection} aria-label="Aplicação do Desafio Logístico">
          <div className="container">
            <div className={styles.appGrid}>
              <div className={styles.appContent}>
                <span className={styles.subTitleBadge}>DINÂMICA DE SALA</span>
                <h2 className={styles.sectionTitle}>Como aplicar o Desafio Logístico na rotina da turma</h2>
                <p className={styles.sectionLead}>
                  A dinâmica do jogo foi planejada para colocar os alunos no centro da experiência:
                </p>

                <div className={styles.appStepsList}>
                  <div className={styles.appStepItem}>
                    <div className={styles.appStepNum}>1</div>
                    <div>
                      <strong>Participação Ativa e Mediação Compartilhada:</strong>
                      <p>Enquanto um jogador planeja sua jogada, outro participante retira a carta de desafio e lê a questão, mantendo todos engajados.</p>
                    </div>
                  </div>

                  <div className={styles.appStepItem}>
                    <div className={styles.appStepNum}>2</div>
                    <div>
                      <strong>Conferência Coletiva das Respostas:</strong>
                      <p>Os próprios alunos conferem as alternativas corretas e aplicam as consequências em dinheiro ou movimentação na malha.</p>
                    </div>
                  </div>

                  <div className={styles.appStepItem}>
                    <div className={styles.appStepNum}>3</div>
                    <div>
                      <strong>Aprendizagem em Dupla Direção:</strong>
                      <p>O aprendizado ocorre tanto para o aluno que responde quanto para os colegas que acompanham a pergunta e debatem a solução.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.appContextLinkBox}>
                  <Link href="/desafio-logistico" className={styles.appContextLink}>
                    <span>Veja como funciona o Desafio Logístico em detalhes</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div className={styles.appMedia}>
                <div className={styles.appMediaCard}>
                  <img
                    src="/desafio-logistico-2.png"
                    alt="Componentes e cartas do jogo educacional Desafio Logístico da FormaPlay"
                    className={styles.appMediaImg}
                    width="550"
                    height="420"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVIDÊNCIAS E VALIDAÇÃO REAL */}
        <section id="validacao" className={styles.validationSection} aria-label="Validação e Evidências">
          <div className="container">
            <div className={styles.validationCard}>
              <div className={styles.validationTextCol}>
                <div className={styles.validationBadge}>
                  <Award size={18} />
                  <span>DESENVOLVIDO POR QUEM VIVE A SALA DE AULA</span>
                </div>
                <h2 className={styles.validationTitle}>Criado a partir da vivência pedagógica real</h2>
                <p className={styles.validationText}>
                  A proposta do Desafio Logístico nasceu diretamente da necessidade sentida por estudantes e educadores de tornar as aulas de logística mais interativas, práticas e conectadas aos desafios do mercado.
                </p>
                <p className={styles.validationText}>
                  O projeto foi testado em ambiente educacional com turmas reais e conquistou aprovação para a <strong>2ª fase do programa Empreenda Senac</strong>, comprovando sua relevância como recurso didático para a formação técnica e profissional.
                </p>
              </div>

              <div className={styles.validationImageWrapper}>
                <img
                  src="/hero.png"
                  alt="Alunos de logística interagindo com o jogo educacional em sala de aula"
                  className={styles.validationImg}
                  width="500"
                  height="340"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDOS E ARTIGOS PARA PROFESSORES */}
        <section className={styles.articlesSectionBlock} aria-label="Artigos e Conteúdos Pedagógicos">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>BIBLIOTECA PEDAGÓGICA</span>
              <h2 className={styles.sectionTitle}>Conteúdos e guias para professores de logística</h2>
              <p className={styles.sectionLead}>
                Aprofunde seus conhecimentos em gamificação, metodologias ativas e tomada de decisão com nossos artigos e reflexões didáticas.
              </p>
            </div>

            <div className={styles.teacherArticlesGrid}>
              {ARTICLES.map((art) => (
                <Link key={art.slug} href={art.url} className={styles.teacherArticleCard}>
                  <div className={styles.teacherArticleImgWrapper}>
                    <img src={art.image} alt={art.imageAlt} className={styles.teacherArticleImg} loading="lazy" />
                    <span className={styles.teacherCategoryBadge}>{art.category}</span>
                  </div>
                  <div className={styles.teacherArticleBody}>
                    <h3 className={styles.teacherArticleTitle}>{art.title}</h3>
                    <p className={styles.teacherArticleDesc}>{art.excerpt}</p>
                    <span className={styles.teacherArticleReadMore}>
                      Ler conteúdo completo <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/conteudos" className={styles.allConteudosBtn}>
                <span>Acessar a Central de Conteúdos da FormaPlay</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section id="faq" className={styles.faqSection} aria-label="Perguntas Frequentes">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>DÚVIDAS FREQUENTES</span>
              <h2 className={styles.sectionTitle}>Perguntas comuns sobre atividades e jogos de logística</h2>
              <p className={styles.sectionLead}>
                Respostas para dúvidas frequentes de professores, coordenadores e gestores educacionais.
              </p>
            </div>

            <div className={styles.faqAccordion}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.ctaSection} aria-label="Chamada para Ação">
          <div className="container">
            <div className={styles.ctaCard}>
              <span className={styles.ctaBadge}>TRANSFORME SUA SALA DE AULA</span>
              <h2 className={styles.ctaTitle}>Leve a aprendizagem prática para sua aula de logística</h2>
              <p className={styles.ctaDesc}>
                Enriqueça a experiência pedagógica dos seus alunos com dinâmicas participativas e ferramentas estruturadas de tomada de decisão.
              </p>

              <div className={styles.ctaButtons}>
                <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnCtaPrimary}`}>
                  <span>Conheça o Desafio Logístico</span>
                  <ArrowRight size={20} />
                </Link>

                <a
                  href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCtaSecondary}
                >
                  <ExternalLink size={18} />
                  Solicite um Orçamento Institucional
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCtaSecondary}
                >
                  <MessagesSquare size={18} />
                  Falar no WhatsApp
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

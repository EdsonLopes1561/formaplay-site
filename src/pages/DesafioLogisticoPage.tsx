import React, { useState } from 'react';
import styles from './DesafioLogisticoPage.module.css';
import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsappFloat } from '../components/WhatsappFloat';
import { getWhatsAppLink } from '../constants';
import {
  Users,
  Clock,
  GraduationCap,
  Package,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Dices,
  AlertTriangle,
  Wallet,
  Trophy,
  Brain,
  ShieldAlert,
  Building2,
  ChevronDown,
  PlayCircle,
  Award,
  BookOpen,
  MessageCircle,
  Truck,
  LayoutDashboard,
  ScrollText,
  Banknote,
  PackageOpen
} from 'lucide-react';

export const DesafioLogisticoPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // WebPage structured data (preserves valid BreadcrumbList and VideoObject without incomplete Product)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Desafio Logístico | Jogo Educacional de Logística – FormaPlay',
    description: 'Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão.',
    url: 'https://www.formaplayjogos.com.br/desafio-logistico',
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
        name: 'Desafio Logístico',
        item: 'https://www.formaplayjogos.com.br/desafio-logistico'
      }
    ]
  };

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Apresentação do Desafio Logístico – FormaPlay',
    description: 'Conheça o Desafio Logístico em 1 minuto: jogo educacional de logística para aprender na prática.',
    thumbnailUrl: 'https://img.youtube.com/vi/fs2an3x7TXs/hqdefault.jpg',
    uploadDate: '2024-06-01T00:00:00Z',
    embedUrl: 'https://www.youtube.com/embed/fs2an3x7TXs',
    contentUrl: 'https://youtu.be/fs2an3x7TXs'
  };

  const steps = [
    {
      icon: <MapPin size={28} />,
      num: '01',
      title: 'Planeje sua rota e recursos',
      desc: 'Cada jogador inicia com orçamento financeiro e peças de transporte, definindo sua rota inicial e calculando investimentos.'
    },
    {
      icon: <Dices size={28} />,
      num: '02',
      title: 'Lance o dado e avance na malha',
      desc: 'O avanço na malha logística coloca o jogador diante de diferentes situações operacionais de transporte, armazenagem e prazos.'
    },
    {
      icon: <AlertTriangle size={28} />,
      num: '03',
      title: 'Enfrente eventos e desafios reais',
      desc: 'Cartas com imprevistos de tráfego, manutenções, demandas urgentes e custos operacionais testam o raciocínio sob pressão.'
    },
    {
      icon: <Wallet size={28} />,
      num: '04',
      title: 'Controle fluxo de caixa e custos',
      desc: 'É necessário equilibrar despesas com combustível, pedágios, multas e manutenções com os lucros obtidos nas entregas concluídas.'
    },
    {
      icon: <Trophy size={28} />,
      num: '05',
      title: 'Vença pela melhor gestão estratégica',
      desc: 'A vitória não é apenas de quem chega primeiro, mas de quem gerencia recursos com eficiência, equilíbrio financeiro e inteligência.'
    }
  ];

  const competencias = [
    {
      icon: <Brain size={24} />,
      title: 'Raciocínio Logístico e Fluxos',
      desc: 'Compreensão intuitiva sobre rotas, tempos de entrega, gargalos e distribuição de cargas.'
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: 'Tomada de Decisão sob Incerteza',
      desc: 'Avaliação de riscos operacionais e escolha rápida de alternativas diante de cenários imprevistos.'
    },
    {
      icon: <Wallet size={24} />,
      title: 'Controle Financeiro e Custos',
      desc: 'Administração de fluxo de caixa, despesas fixas/variáveis e maximização da margem operacional.'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'Gestão de Riscos e Contingências',
      desc: 'Capacidade de adaptação a quebras, atrasos climáticos, congestionamentos e variações de mercado.'
    },
    {
      icon: <Users size={24} />,
      title: 'Negociação e Trabalho em Equipe',
      desc: 'Desenvolvimento de comunicação clara, persuasão e respeito a regras em dinâmicas de grupo.'
    },
    {
      icon: <Award size={24} />,
      title: 'Visão Sistêmica de Processos',
      desc: 'Percepção clara de que cada etapa da cadeia de suprimentos impacta o resultado final do negócio.'
    }
  ];

  const componentes = [
    { icon: <LayoutDashboard size={24} />, title: 'Tabuleiro Estratégico', desc: 'Mapa impresso em alta definição com malhas e conexões logísticas.' },
    { icon: <ScrollText size={24} />, title: 'Cartas de Desafios e Eventos', desc: 'Situações operacionais autênticas elaboradas com base na rotina logística.' },
    { icon: <Truck size={24} />, title: 'Peões de Caminhão', desc: 'Marcadores tridimensionais personalizados para os jogadores.' },
    { icon: <Dices size={24} />, title: 'Dado de Movimentação', desc: 'Define o ritmo e avanço dos veículos pelas rotas.' },
    { icon: <Banknote size={24} />, title: 'Cédulas de Dinheiro Fictício', desc: 'Para simular fluxo de caixa, pagamentos de despesas e recebimento de fretes.' },
    { icon: <BookOpen size={24} />, title: 'Manual de Regras Ilustrado', desc: 'Guia didático de fácil compreensão para professores e alunos.' },
    { icon: <PackageOpen size={24} />, title: 'Embalagem Personalizada', desc: 'Caixa resistente e organizada para transporte e conservação nas salas de aula.' }
  ];

  const faqs = [
    {
      q: 'Quantas pessoas podem jogar por partida?',
      a: 'O jogo oficial foi desenvolvido para 2 a 4 jogadores por partida. Em sala de aula, o professor pode também organizar adaptações pedagógicas com pequenos grupos de alunos debatendo estratégias ao redor de cada tabuleiro.'
    },
    {
      q: 'Qual é a duração média de uma partida?',
      a: 'Uma partida completa dura entre 30 e 60 minutos, tornando-se perfeitamente compatível com o tempo de uma ou duas aulas regulares.'
    },
    {
      q: 'Para quais cursos e faixas etárias o jogo é indicado?',
      a: 'É indicado principalmente para estudantes a partir de 16 anos, em Cursos Técnicos de Logística, Administração, Gestão da Produção, Comércio Exterior, Graduações e programas de capacitação profissional.'
    },
    {
      q: 'Como o professor utiliza o Desafio Logístico em sala de aula?',
      a: 'O professor atua como mediador pedagógico, introduzindo conceitos teóricos antes da partida e orientando debates no fechamento. Os próprios alunos retiram as cartas, formulam perguntas aos adversários, conferem respostas e aplicam as consequências, estimulando autonomia e protagonismo.'
    },
    {
      q: 'A FormaPlay emite Nota Fiscal e atende instituições de ensino?',
      a: 'Sim. A FormaPlay é uma empresa devidamente formalizada (CNPJ: 66.710.107/0001-31), emitindo Nota Fiscal completa para compras institucionais de escolas técnicas, faculdades, centros de formação profissional e empresas privadas.'
    },
    {
      q: 'Como posso solicitar um orçamento ou proposta institucional?',
      a: 'Você pode solicitar um orçamento formal diretamente pelo nosso sistema online em poucos cliques ou entrar em contato direto com nossa equipe via WhatsApp ou e-mail institucional (contato@formaplayjogos.com.br).'
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Desafio Logístico | Jogo Educacional de Logística – FormaPlay"
        description="Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão."
        canonicalUrl="https://www.formaplayjogos.com.br/desafio-logistico"
        ogImage="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png"
        ogType="website"
        schema={[webPageSchema, breadcrumbSchema, videoSchema]}
      />

      <Header />

      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section id="hero" className={styles.heroSection} aria-label="Apresentação do Produto Desafio Logístico">
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroText}>
              <div className={styles.breadcrumb}>
                <a href="/">Início</a> <span>/</span> <span className={styles.currentBreadcrumb}>Desafio Logístico</span>
              </div>

              <div className={styles.productBadge}>
                <Sparkles size={16} />
                <span>JOGO EDUCACIONAL DE TABULEIRO</span>
              </div>

              <h1 className={styles.heroTitle}>
                Desafio Logístico: jogo educacional de logística para aprender na prática
              </h1>

              <p className={styles.heroSubtitle}>
                Uma metodologia ativa e imersiva que transforma conceitos teóricos de logística, rotas, custos e imprevistos em uma experiência prática de planejamento estratégico e tomada de decisão.
              </p>

              {/* Quick Specs Badges */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <Users size={20} className={styles.specIcon} />
                  <div>
                    <strong>2 a 4 jogadores</strong>
                    <span>por partida</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <Clock size={20} className={styles.specIcon} />
                  <div>
                    <strong>30 a 60 min</strong>
                    <span>tempo de partida</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <GraduationCap size={20} className={styles.specIcon} />
                  <div>
                    <strong>A partir de 16 anos</strong>
                    <span>Ensino Técnico & Superior</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <Package size={20} className={styles.specIcon} />
                  <div>
                    <strong>Jogo Físico</strong>
                    <span>Material completo</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className={styles.heroActions}>
                <a
                  href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary ${styles.btnPrimaryLg}`}
                >
                  <span>Solicitar Orçamento Institucional</span>
                  <ArrowRight size={20} />
                </a>
                <a href="#como-funciona" className={`btn btn-outline ${styles.btnOutlineLg}`}>
                  Ver como funciona
                </a>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <div className={styles.imageCard}>
                <div className={styles.statusPill}>Disponível para Envio</div>
                <img
                  src="/desafio-logistico-produto-mesa.png"
                  alt="Jogo de tabuleiro educacional Desafio Logístico da FormaPlay completo sobre a mesa"
                  className={styles.productImg}
                  width="600"
                  height="450"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* O QUE É O DESAFIO LOGÍSTICO */}
        <section id="o-jogo" className={styles.aboutSection} aria-label="Sobre o Desafio Logístico">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>METODOLOGIAS ATIVAS</span>
              <h2 className={styles.sectionTitle}>O que é o Desafio Logístico?</h2>
              <p className={styles.sectionLead}>
                Uma ferramenta didática criada especialmente para aproximar a sala de aula do dinamismo e dos desafios do mercado logístico real.
              </p>
            </div>

            <div className={styles.aboutGrid}>
              <div className={styles.aboutCard}>
                <div className={styles.cardIconBox}>
                  <Brain size={28} />
                </div>
                <h3>Aprendizagem Baseada em Experiência</h3>
                <p>
                  O conhecimento deixa de ser abstrato e passa a ser vivenciado. Cada rodada exige que os alunos apliquem lógica, planejem etapas, façam contas e tomem decisões táticas.
                </p>
              </div>

              <div className={styles.aboutCard}>
                <div className={styles.cardIconBox}>
                  <AlertTriangle size={28} />
                </div>
                <h3>Simulação de Cenários Reais</h3>
                <p>
                  Trânsito, quebras mecânicas, variações de demanda, pedágios, custos extras e oportunidades súbitas reproduzem o dia a dia da gestão de transporte e distribuição.
                </p>
              </div>

              <div className={styles.aboutCard}>
                <div className={styles.cardIconBox}>
                  <Users size={28} />
                </div>
                <h3>Engajamento e Protagonismo</h3>
                <p>
                  A gamificação eleva a participação e o foco dos alunos. Todos participam ativamente da partida, interagindo com as regras, debatendo estratégias e conferindo decisões.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA (PASSO A PASSO) */}
        <section id="como-funciona" className={styles.howItWorksSection} aria-label="Como funciona o Desafio Logístico">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>DINÂMICA DA PARTIDA</span>
              <h2 className={styles.sectionTitle}>Como funciona o jogo</h2>
              <p className={styles.sectionLead}>
                Uma jornada estratégica estruturada para desafiar o raciocínio logístico do início ao fim.
              </p>
            </div>

            <div className={styles.stepsTimeline}>
              {steps.map((step, idx) => (
                <div key={idx} className={styles.stepCard}>
                  <div className={styles.stepNumBadge}>{step.num}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O QUE O ALUNO APRENDE & COMPETÊNCIAS */}
        <section id="aprendizado" className={styles.skillsSection} aria-label="Competências desenvolvidas">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>HABILIDADES & COMPETÊNCIAS</span>
              <h2 className={styles.sectionTitle}>O que o aluno aprende com o Desafio Logístico</h2>
              <p className={styles.sectionLead}>
                Desenvolvimento integrado de competências técnicas (Hard Skills) e socioemocionais (Soft Skills).
              </p>
            </div>

            <div className={styles.competenciasGrid}>
              {competencias.map((comp, idx) => (
                <div key={idx} className={styles.competenciaCard}>
                  <div className={styles.compIcon}>{comp.icon}</div>
                  <div className={styles.compInfo}>
                    <h3>{comp.title}</h3>
                    <p>{comp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO UTILIZAR EM SALA DE AULA */}
        <section id="sala-de-aula" className={styles.classroomSection} aria-label="Aplicação em sala de aula">
          <div className="container">
            <div className={styles.classroomGrid}>
              <div className={styles.classroomText}>
                <span className={styles.subTitleBadge}>PARA PROFESSORES E COORDENADORES</span>
                <h2 className={styles.sectionTitle}>Como utilizar o jogo em sala de aula</h2>
                <p className={styles.classroomParagraph}>
                  O Desafio Logístico foi pensado para ser flexível e se adaptar com facilidade à rotina escolar e aos planos de aula de cursos técnicos e superiores.
                </p>

                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <CheckCircle2 className={styles.featIcon} size={22} />
                    <div>
                      <strong>Professor como mediador pedagógico:</strong>
                      <p>O docente contextualiza os temas antes do início e conduz o fechamento com um momento de reflexão sobre as decisões tomadas.</p>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <CheckCircle2 className={styles.featIcon} size={22} />
                    <div>
                      <strong>Alunos protagonistas e ativos:</strong>
                      <p>Os próprios estudantes retiram as cartas, fazem perguntas aos colegas de mesa, conferem as respostas corretas e aplicam as consequências do jogo.</p>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <CheckCircle2 className={styles.featIcon} size={22} />
                    <div>
                      <strong>Adaptação pedagógica para turmas:</strong>
                      <p>Além da dinâmica padrão de 2 a 4 jogadores por partida, o professor pode organizar os alunos em pequenos grupos para debater as escolhas antes de cada jogada.</p>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <CheckCircle2 className={styles.featIcon} size={22} />
                    <div>
                      <strong>Ideal para projetos integradores e oficinas:</strong>
                      <p>Excelente recurso para semanas acadêmicas, oficinas temáticas e avaliações práticas de desempenho.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.classroomMedia}>
                <img
                  src="/desafio-logistico-2.png"
                  alt="Cartas e tabuleiro do jogo educacional Desafio Logístico em detalhes"
                  className={styles.classroomImg}
                  loading="lazy"
                  width="550"
                  height="420"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUAIS CURSOS É INDICADO */}
        <section id="para-escolas" className={styles.targetSection} aria-label="Cursos e públicos indicados">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>PÚBLICO-ALVO</span>
              <h2 className={styles.sectionTitle}>Para quais cursos e instituições é indicado?</h2>
              <p className={styles.sectionLead}>
                Projetado para atender às matrizes curriculares de formação profissional e técnica.
              </p>
            </div>

            <div className={styles.targetGrid}>
              <div className={styles.targetCard}>
                <Truck className={styles.targetIcon} size={32} />
                <h3>Cursos Técnicos em Logística</h3>
                <p>Ensino prático de transportes, distribuição, armazenagem, roteirização, custos de frete e cadeia de suprimentos.</p>
              </div>

              <div className={styles.targetCard}>
                <Building2 className={styles.targetIcon} size={32} />
                <h3>Administração e Gestão</h3>
                <p>Planejamento estratégico, tomada de decisão em negócios, fluxo de caixa, gestão de pessoas e visão sistêmica.</p>
              </div>

              <div className={styles.targetCard}>
                <GraduationCap className={styles.targetIcon} size={32} />
                <h3>Escolas Técnicas & Faculdades</h3>
                <p>Ideal para cursos técnicos, faculdades, centros de educação profissional e instituições de ensino que valorizam metodologias ativas.</p>
              </div>

              <div className={styles.targetCard}>
                <Users className={styles.targetIcon} size={32} />
                <h3>Treinamentos e Oficinas</h3>
                <p>Dinâmicas de integração e capacitação prática de equipes nas áreas de operações, compras e processos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTES FÍSICOS DO JOGO */}
        <section id="componentes" className={styles.componentsSection} aria-label="Componentes físicos do jogo">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>UNBOXING & MATERIAIS</span>
              <h2 className={styles.sectionTitle}>O que acompanha o Desafio Logístico</h2>
              <p className={styles.sectionLead}>
                Componentes de alta qualidade produzidos para suportar o uso contínuo em ambiente escolar.
              </p>
            </div>

            <div className={styles.componentsGrid}>
              {componentes.map((comp, idx) => (
                <div key={idx} className={styles.compBox}>
                  <div className={styles.compBoxIcon}>{comp.icon}</div>
                  <h4>{comp.title}</h4>
                  <p>{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VÍDEO E VALIDAÇÃO REAL */}
        <section className={styles.videoValidationSection} aria-label="Vídeo e validação real">
          <div className="container">
            <div className={styles.videoValGrid}>
              <div className={styles.valTextCol}>
                <div className={styles.badgeSuccess}>
                  <Award size={18} />
                  <span>RECONHECIMENTO & VALIDAÇÃO</span>
                </div>
                <h2 className={styles.valTitle}>Criado e validado em ambiente educacional real</h2>
                <p className={styles.valDesc}>
                  O Desafio Logístico nasceu da vivência pedagógica de estudantes e professores de logística, buscando solucionar a falta de dinamismo no ensino de conceitos complexos.
                </p>
                <p className={styles.valDesc}>
                  O projeto foi testado com turmas reais e conquistou aprovação para a <strong>2ª fase do programa Empreenda Senac</strong>, consolidando-se como uma ferramenta inovadora de aprendizagem prática.
                </p>

                <div className={styles.valActions}>
                  <a
                    href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-primary ${styles.btnPrimary}`}
                  >
                    Solicitar Proposta para sua Escola
                  </a>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-outline ${styles.btnOutline}`}
                  >
                    <MessageCircle size={18} />
                    Falar com Consultor
                  </a>
                </div>
              </div>

              <div className={styles.videoCol}>
                <div className={styles.videoFrameWrapper}>
                  <iframe
                    className={styles.videoIframe}
                    src="https://www.youtube.com/embed/fs2an3x7TXs"
                    title="Apresentação do jogo Desafio Logístico FormaPlay"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className={styles.videoCaption}>
                  <PlayCircle size={16} /> Apresentação rápida do jogo e demonstração dos componentes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section id="faq" className={styles.faqSection} aria-label="Perguntas Frequentes">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitleBadge}>DÚVIDAS COMUNS</span>
              <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
              <p className={styles.sectionLead}>
                Tire suas dúvidas sobre o Desafio Logístico, processo de aquisição e aplicação pedagógica.
              </p>
            </div>

            <div className={styles.faqAccordion}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestion}
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

        {/* CTA FINAL DE CONVERSÃO */}
        <section className={styles.ctaSection} aria-label="Solicitação de orçamento">
          <div className="container">
            <div className={styles.ctaCard}>
              <span className={styles.ctaBadge}>ATENDIMENTO INSTITUCIONAL</span>
              <h2 className={styles.ctaTitle}>Leve o Desafio Logístico para sua instituição</h2>
              <p className={styles.ctaDesc}>
                Proporcione aos seus alunos uma experiência marcante de aprendizagem prática, estratégia e tomada de decisão. Solicite uma proposta comercial personalizada para sua turma ou escola.
              </p>
              <div className={styles.ctaButtons}>
                <a
                  href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary ${styles.btnCtaPrimary}`}
                >
                  <span>Solicitar Orçamento Agora</span>
                  <ArrowRight size={20} />
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-outline ${styles.btnCtaSecondary}`}
                >
                  <MessageCircle size={20} />
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

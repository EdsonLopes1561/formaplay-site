import React, { useState, useEffect, useRef } from 'react';
import styles from './PresencaValidacao.module.css';
import { MapaBrasil } from './MapaBrasil';
import { MapaModal } from './MapaModal';
import {
  presencaCidadesData,
  ufsComPresenca,
  indicadoresPresencaReal,
  totalCidadesAtuacao
} from '../data/presencaData';
import type { MetricType } from '../data/presencaData';
import {
  CheckCircle2,
  MapPin,
  ShoppingCart,
  FileText,
  Mail,
  Users
} from 'lucide-react';

export const PresencaValidacao: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMetric, setActiveMetric] = useState<MetricType>('todos');
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTerritoryActive, setIsTerritoryActive] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Animated counters state
  const [metricCounts, setMetricCounts] = useState<number[]>(
    indicadoresPresencaReal.map(() => 0)
  );
  const [cidadesAnimated, setCidadesAnimated] = useState(0);

  // IntersectionObserver to start animation once when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Sequential Card Animation (Card 1 -> Card 2 -> Card 3 -> Card 4 -> Territory)
  useEffect(() => {
    if (!hasStarted || hasFinished) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetMetrics = indicadoresPresencaReal.map((item) => item.valor);
    const targetCidades = totalCidadesAtuacao;

    if (prefersReducedMotion) {
      setMetricCounts([...targetMetrics]);
      setCidadesAnimated(targetCidades);
      setHasFinished(true);
      return;
    }

    let currentIndex = 0;
    let startTime: number | null = null;
    let animationFrameId: number;
    let timeoutId: number;

    const durationPerCardMs = 750;
    const pauseBetweenCardsMs = 280;

    setActiveIndex(0);

    const animateCard = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationPerCardMs, 1);

      // Smooth ease-out quad curve
      const easing = progress * (2 - progress);

      if (currentIndex < targetMetrics.length) {
        const target = targetMetrics[currentIndex];
        const val = Math.floor(easing * target);
        const idx = currentIndex;

        setMetricCounts((prev) => {
          const next = [...prev];
          next[idx] = val;
          return next;
        });

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateCard);
        } else {
          setMetricCounts((prev) => {
            const next = [...prev];
            next[idx] = target;
            return next;
          });

          setActiveIndex(null);
          currentIndex++;

          if (currentIndex < targetMetrics.length) {
            timeoutId = window.setTimeout(() => {
              setActiveIndex(currentIndex);
              startTime = null;
              animationFrameId = requestAnimationFrame(animateCard);
            }, pauseBetweenCardsMs);
          } else {
            timeoutId = window.setTimeout(() => {
              startTime = null;
              animateTerritory();
            }, pauseBetweenCardsMs);
          }
        }
      }
    };

    const animateTerritory = () => {
      let tStart: number | null = null;
      const tDuration = 600;
      setIsTerritoryActive(true);

      const stepTerritory = (tTimestamp: number) => {
        if (!tStart) tStart = tTimestamp;
        const tElapsed = tTimestamp - tStart;
        const tProgress = Math.min(tElapsed / tDuration, 1);
        const tEasing = tProgress * (2 - tProgress);

        setCidadesAnimated(Math.floor(tEasing * targetCidades));

        if (tProgress < 1) {
          animationFrameId = requestAnimationFrame(stepTerritory);
        } else {
          setCidadesAnimated(targetCidades);
          setIsTerritoryActive(false);
          setHasFinished(true);
        }
      };

      animationFrameId = requestAnimationFrame(stepTerritory);
    };

    animationFrameId = requestAnimationFrame(animateCard);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [hasStarted, hasFinished]);

  const getMetricIcon = (tipo: string) => {
    switch (tipo) {
      case 'vendas':
        return <ShoppingCart size={20} />;
      case 'orcamentos':
        return <FileText size={20} />;
      case 'solicitacoes':
        return <Mail size={20} />;
      case 'interesses':
        return <Users size={20} />;
      default:
        return <CheckCircle2 size={20} />;
    }
  };

  const getIconClass = (tipo: string) => {
    switch (tipo) {
      case 'vendas':
        return styles.iconVendas;
      case 'orcamentos':
        return styles.iconOrcamentos;
      case 'solicitacoes':
        return styles.iconSolicitacoes;
      case 'interesses':
        return styles.iconInteresses;
      default:
        return styles.iconVendas;
    }
  };

  const getNumClass = (tipo: string) => {
    switch (tipo) {
      case 'vendas':
        return styles.numVendas;
      case 'orcamentos':
        return styles.numOrcamentos;
      case 'solicitacoes':
        return styles.numSolicitacoes;
      case 'interesses':
        return styles.numInteresses;
      default:
        return styles.numVendas;
    }
  };

  const getActiveClass = (index: number, tipo: string) => {
    if (activeIndex !== index) return '';
    switch (tipo) {
      case 'vendas':
        return styles.cardActiveVendas;
      case 'orcamentos':
        return styles.cardActiveOrcamentos;
      case 'solicitacoes':
        return styles.cardActiveSolicitacoes;
      case 'interesses':
        return styles.cardActiveInteresses;
      default:
        return '';
    }
  };

  return (
    <section id="validacao" ref={sectionRef} className={styles.section} aria-label="Presença e validação nacional FormaPlay">
      <div className={`container ${styles.container}`}>
        <div className={styles.mainGrid}>
          {/* Coluna Esquerda: Identificação, Título, Descrição e Legenda */}
          <div className={styles.leftCol}>
            <div className={styles.badge}>
              <CheckCircle2 size={16} />
              <span>VALIDAÇÃO E PRESENÇA</span>
            </div>

            <h2 className={styles.title}>
              Presença que cresce. <br />
              Impacto que <span className={styles.highlightGreen}>transforma.</span>
            </h2>

            <p className={styles.description}>
              O Desafio Logístico já chegou a diferentes cidades do Brasil, impactando alunos,
              professores e instituições por meio do aprendizado prático e da inovação pedagógica.
            </p>

            {/* Legenda de Categorias (Interativa) */}
            <div className={styles.legendGrid}>
              <button
                type="button"
                className={`${styles.legendPill} ${
                  activeMetric === 'vendas' ? styles.legendPillActive : ''
                }`}
                onClick={() =>
                  setActiveMetric((prev) => (prev === 'vendas' ? 'todos' : 'vendas'))
                }
              >
                <span className={styles.dotGreen}></span>
                <span>Vendas realizadas</span>
              </button>

              <button
                type="button"
                className={`${styles.legendPill} ${
                  activeMetric === 'orcamentos' ? styles.legendPillActive : ''
                }`}
                onClick={() =>
                  setActiveMetric((prev) => (prev === 'orcamentos' ? 'todos' : 'orcamentos'))
                }
              >
                <span className={styles.dotOrange}></span>
                <span>Orçamentos emitidos</span>
              </button>

              <button
                type="button"
                className={`${styles.legendPill} ${
                  activeMetric === 'solicitacoes' ? styles.legendPillActive : ''
                }`}
                onClick={() =>
                  setActiveMetric((prev) => (prev === 'solicitacoes' ? 'todos' : 'solicitacoes'))
                }
              >
                <span className={styles.dotBlue}></span>
                <span>Solicitações</span>
              </button>

              <button
                type="button"
                className={`${styles.legendPill} ${
                  activeMetric === 'interesses' ? styles.legendPillActive : ''
                }`}
                onClick={() =>
                  setActiveMetric((prev) => (prev === 'interesses' ? 'todos' : 'interesses'))
                }
              >
                <span className={styles.dotPurple}></span>
                <span>Interesses registrados</span>
              </button>
            </div>

            {/* Card Territorial da Esquerda com Número Animado e Destaque */}
            <div
              className={`${styles.territoryCard} ${
                isTerritoryActive ? styles.territoryCardActive : ''
              }`}
              data-cidades={totalCidadesAtuacao}
            >
              <div className={styles.pinIconCircle}>
                <MapPin size={22} />
              </div>
              <div className={styles.territoryTexts}>
                <span className={styles.territoryLabel}>Atuação em</span>
                <data value={totalCidadesAtuacao} className={styles.territoryValue}>
                  {cidadesAnimated} cidades
                </data>
                <span className={styles.territorySub}>em diferentes estados</span>
              </div>
            </div>
          </div>

          {/* Coluna Central: Mapa Protagonista */}
          <div className={styles.centerCol}>
            <MapaBrasil
              nodes={presencaCidadesData}
              metric={activeMetric}
              ufs={ufsComPresenca}
              onExpand={() => setIsMapModalOpen(true)}
            />
          </div>

          {/* Coluna Direita: Cards de Indicadores com Destaque Sequencial (NOSSOS NÚMEROS) */}
          <div className={styles.rightCol}>
            <div className={styles.rightHeader}>NOSSOS NÚMEROS</div>

            {indicadoresPresencaReal.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={`${styles.metricCard} ${getActiveClass(index, item.tipo)}`}
                  data-metric={item.tipo}
                  data-value={item.valor}
                  data-suffix={item.sufixo}
                >
                  <div className={`${styles.metricIconCircle} ${getIconClass(item.tipo)}`}>
                    {getMetricIcon(item.tipo)}
                  </div>
                  <div className={styles.metricTexts}>
                    <data value={item.valor} className={`${styles.metricNumber} ${getNumClass(item.tipo)}`}>
                      {metricCounts[index]}
                      {metricCounts[index] === item.valor ? item.sufixo : ''}
                    </data>
                    <span className={styles.metricTitle}>{item.titulo}</span>
                    <p className={styles.metricDesc}>{item.descricao}</p>
                  </div>
                </div>
              );
            })}

            <div className={styles.updatedFooter}>Dados consolidados da operação FormaPlay</div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização Ampliada do Mapa */}
      <MapaModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        nodes={presencaCidadesData}
        metric={activeMetric}
        ufs={ufsComPresenca}
      />
    </section>
  );
};

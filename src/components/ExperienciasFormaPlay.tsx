import React, { useState, useRef, useEffect } from 'react';
import styles from './ExperienciasFormaPlay.module.css';

import { Users, Package, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RegistroInteresseModal } from './RegistroInteresseModal';


interface CardData {
  id: string;
  title: string;
  text: React.ReactNode;
  image?: string;
  Icon?: LucideIcon;
  badgeText?: string;
  badgeType?: 'available' | 'development';
  actionType?: 'orcamento' | 'interesse';
  buttonText?: string;
}

const cardsData: CardData[] = [
  {
    id: 'main',
    title: 'Desafio Logístico',
    text: 'Estratégia, planejamento e tomada de decisão aplicados à logística. Uma experiência prática em que cada escolha influencia o resultado da jornada.',
    image: '/desafio-logistico-2.png',
    badgeText: 'DISPONÍVEL PARA COMPRA',
    badgeType: 'available',
    actionType: 'orcamento',
    buttonText: 'Solicitar orçamento',
  },
  {
    id: 'premium',
    title: 'Desafio Logístico Premium',
    text: 'Em desenvolvimento. A experiência de nível avançado do Desafio Logístico, pensada para quem busca desafios intensos, com situações logísticas complexas, perguntas mais exigentes e decisões que colocam o conhecimento à prova. A proposta contará também com acabamento diferenciado.',
    image: '/desafio-premium-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
    actionType: 'interesse',
    buttonText: 'Registrar interesse',
  },
  {
    id: 'kids',
    title: 'Desafio Kids',
    text: 'Em desenvolvimento. Uma jornada da casa até a escola, repleta de situações do cotidiano. Proposta pensada para unir crianças e famílias no aprendizado sobre cidadania, segurança e convivência.',
    image: '/desafio-kids-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
    actionType: 'interesse',
    buttonText: 'Registrar interesse',
  },
  {
    id: 'teacher',
    title: 'Edição do Professor',
    text: 'Em desenvolvimento. Dinâmica redesenhada para o formato coletivo. O professor atua como mediador em uma experiência de equipes, competição saudável e participação ativa da turma.',
    image: '/edicao-professor-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
    actionType: 'interesse',
    buttonText: 'Registrar interesse',
  },
  {
    id: 'class',
    title: 'Aplicação em sala',
    text: 'Transforme aulas e oficinas em experiências práticas e colaborativas.',
    Icon: Users,
  },
  {
    id: 'components',
    title: 'Componentes do jogo',
    text: 'Tabuleiro, cartas, caminhões, dado, dinheiro fictício e embalagem personalizada.',
    Icon: Package,
  },
  {
    id: 'budget',
    title: 'Orçamento institucional',
    text: 'Solicite uma proposta para escolas, cursos técnicos e instituições de ensino.',
    Icon: Building2,
  }
];

export const ExperienciasFormaPlay: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>(cardsData[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Monitora o scroll para atualizar o tema e o dot ativo
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      const centerPosition = scrollLeft + containerWidth / 2;

      const cards = scrollRef.current.children;
      let closestIndex = visibleIndex;
      let closestCardId = activeTheme;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(centerPosition - cardCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
          const id = card.getAttribute('data-id');
          if (id) closestCardId = id;
        }
      }

      if (closestIndex !== visibleIndex) {
        setVisibleIndex(closestIndex);
      }

      if (closestCardId !== activeTheme && minDistance < containerWidth / 3) {
        setActiveTheme(closestCardId);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Call once to set initial
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTheme, visibleIndex]);

  // Autoplay Logic
  useEffect(() => {
    // Respeita prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Se usuário interagiu, paramos definitivamente o autoplay para não disputar controle
    if (hasInteracted) return;

    let isSectionVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        isSectionVisible = entries[0].isIntersecting;
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const interval = setInterval(() => {
      if (document.visibilityState === 'hidden' || !isSectionVisible) return;

      // Carrossel horizontal só existe abaixo de 768px
      if (window.innerWidth >= 768) return;

      setVisibleIndex((prev) => {
        // Se já viu os 4 principais produtos, recomeça do primeiro (índice 0)
        // Isso atende à regra: Desafio -> Premium -> Kids -> Professor -> Desafio
        const nextIndex = prev >= 3 ? 0 : prev + 1;

        if (scrollRef.current) {
          const cards = scrollRef.current.children;
          if (cards[nextIndex]) {
            cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
        return nextIndex;
      });
    }, 4500); // 4.5s por produto, tempo confortável para leitura

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [hasInteracted]);

  const handleAction = (card: CardData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.actionType === 'orcamento') {
      window.open('https://formaplay-orcamento.vercel.app/solicitar-orcamento', '_blank');
    } else if (card.actionType === 'interesse') {
      setSelectedModel(card.title);
      setModalOpen(true);
    }
  };

  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  const scrollToCard = (index: number) => {
    handleUserInteraction();
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[index]) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      cards[index].scrollIntoView({ behavior, block: 'nearest', inline: 'center' });
    }
  };

  // Os dots representam apenas os 4 produtos principais (ou todos se preferir, mas o requisito foca nos 4)
  // Como temos 7 cards e o autoplay gira nos 4, criaremos dots apenas para os 4 produtos (índices 0 a 3)
  const productCards = cardsData.slice(0, 4);

  return (
    <section
      id="jogos"
      ref={sectionRef}
      className={`${styles.section} ${styles[`theme_${activeTheme}`]}`}
    >
      <div className={styles.backgroundOverlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Uma marca. Diferentes formas de aprender jogando.</h2>
          <p className={styles.subtitle}>
            Conheça o nosso ecossistema de experiências. Cada produto possui uma proposta, dinâmica e contexto próprios para transformar a aprendizagem.
          </p>
          <p className={styles.subtitleComplement}>
            Interessados nas experiências em desenvolvimento podem registrar seu interesse para acompanhar novidades e ter acesso antecipado no lançamento.
          </p>
        </div>

        <div
          className={styles.cardsWrapper}
          ref={scrollRef}
          onTouchStart={handleUserInteraction}
          onPointerDown={handleUserInteraction}
          onWheel={handleUserInteraction}
        >
          {cardsData.map((card) => (
            <div
              key={card.id}
              data-id={card.id}
              className={`${styles.card} ${
                card.image ? styles.productCard : styles.infoCard
              } ${
                activeTheme === card.id ? styles.active : ''
              }`}
              onMouseEnter={() => {
                setActiveTheme(card.id);
                handleUserInteraction();
              }}
              onFocus={() => {
                setActiveTheme(card.id);
                handleUserInteraction();
              }}
              onClick={() => setActiveTheme(card.id)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.cardContent}>
                {card.image && (
                  <div className={styles.imageContainer}>
                    {card.badgeText && (
                      <span className={`${styles.badge} ${styles[`badge_${card.badgeType}`]}`}>
                        {card.badgeText}
                      </span>
                    )}
                    <img src={card.image} alt={card.title} className={styles.cardImage} />
                  </div>
                )}
                {card.Icon && (
                  <div className={styles.iconContainer}>
                    <card.Icon className={styles.cardIcon} size={48} />
                  </div>
                )}
                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                  
                  {card.buttonText && (
                    <button 
                      className={`${styles.cardButton} ${card.actionType === 'interesse' ? styles.cardButtonOutline : ''}`}
                      onClick={(e) => handleAction(card, e)}
                    >
                      {card.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dotsContainer} aria-hidden="true">
          {productCards.map((card, index) => (
            <button
              key={`dot-${card.id}`}
              className={`${styles.dot} ${visibleIndex === index ? styles.dotActive : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Ir para ${card.title}`}
              title={`Ir para ${card.title}`}
            />
          ))}
        </div>

        <div className={styles.disclaimerContainer}>
          <p className={styles.disclaimerText}>
            Importante: atualmente, somente o jogo Desafio Logístico está disponível para comercialização. As versões Premium, Kids e Edição do Professor encontram-se em fase de desenvolvimento. O registro de interesse não representa reserva, compra ou obrigação de pagamento.
          </p>
        </div>
      </div>

      <RegistroInteresseModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        modeloSelecionado={selectedModel} 
      />
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import styles from './ExperienciasFormaPlay.module.css';

import { Users, Package, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


interface CardData {
  id: string;
  title: string;
  text: React.ReactNode;
  image?: string;
  Icon?: LucideIcon;
}

const cardsData: CardData[] = [
  {
    id: 'main',
    title: 'Desafio Logístico',
    text: 'O jogo clássico de tabuleiro. Planeje custos, rotas e vença pela estratégia.',
    image: '/desafio-logistico-2.png',
  },
  {
    id: 'premium',
    title: 'Desafio Logístico Premium',
    text: 'Acabamento superior e apresentação marcante para instituições exigentes.',
    image: '/desafio-premium-2.png',
  },
  {
    id: 'kids',
    title: 'Desafio Kids',
    text: 'Rotas, decisões e segurança ensinadas de forma lúdica para crianças.',
    image: '/desafio-kids-2.png',
  },
  {
    id: 'teacher',
    title: 'Edição do Professor',
    text: 'Guia, dinâmicas e roteiros para aplicar o jogo em sala de aula.',
    image: '/edicao-professor-2.png',
  },
  {
    id: 'class',
    title: 'Aplicação em sala',
    text: 'Transforme aulas e treinamentos em experiências práticas e colaborativas.',
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
    text: 'Solicite uma proposta para escolas, cursos técnicos, empresas e instituições.',
    Icon: Building2,
  }
];

export const ExperienciasFormaPlay: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>(cardsData[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optional: detect center card on scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      const centerPosition = scrollLeft + containerWidth / 2;

      const cards = scrollRef.current.children;
      let closestCardId = activeTheme;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(centerPosition - cardCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          const id = card.getAttribute('data-id');
          if (id) closestCardId = id;
        }
      }

      if (closestCardId !== activeTheme && minDistance < containerWidth / 3) {
        setActiveTheme(closestCardId);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTheme]);

  return (
    <section id="jogos" className={`${styles.section} ${styles[`theme_${activeTheme}`]}`}>
      <div className={styles.backgroundOverlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore o Desafio Logístico</h2>
          <p className={styles.subtitle}>
            Veja as versões, aplicações e diferenciais que tornam o jogo uma experiência educacional completa.
          </p>
        </div>

        <div className={styles.cardsWrapper} ref={scrollRef}>
          {cardsData.map((card) => (
            <div
              key={card.id}
              data-id={card.id}
              className={`${styles.card} ${activeTheme === card.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveTheme(card.id)}
              onFocus={() => setActiveTheme(card.id)}
              onClick={() => setActiveTheme(card.id)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.cardContent}>
                {card.image && (
                  <div className={styles.imageContainer}>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

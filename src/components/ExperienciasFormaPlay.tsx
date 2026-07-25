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
  badgeText?: string;
  badgeType?: 'available' | 'development';
}

const cardsData: CardData[] = [
  {
    id: 'main',
    title: 'Desafio Logístico',
    text: 'O jogo educacional de logística já disponível para comercialização. Planeje custos, enfrente imprevistos, tome decisões estratégicas e vença o desafio.',
    image: '/desafio-logistico-2.png',
    badgeText: 'DISPONÍVEL PARA COMPRA',
    badgeType: 'available',
  },
  {
    id: 'premium',
    title: 'Desafio Logístico Premium',
    text: 'Versão premium em desenvolvimento, com acabamento superior, componentes diferenciados e apresentação voltada a instituições e ambientes corporativos.',
    image: '/desafio-premium-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
  },
  {
    id: 'kids',
    title: 'Desafio Kids',
    text: 'Versão infantil em desenvolvimento, com rotas, decisões e conceitos básicos de logística apresentados de forma lúdica para crianças.',
    image: '/desafio-kids-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
  },
  {
    id: 'teacher',
    title: 'Edição do Professor',
    text: 'Versão pedagógica em desenvolvimento, com guia, dinâmicas e materiais de apoio para aplicação do jogo em sala de aula.',
    image: '/edicao-professor-2.png',
    badgeText: 'EM DESENVOLVIMENTO',
    badgeType: 'development',
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
            Conheça o Desafio Logístico, já disponível para comercialização, e acompanhe as novas versões que estão sendo desenvolvidas pela FormaPlay.
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.disclaimerContainer}>
          <p className={styles.disclaimerText}>
            Importante: atualmente, somente o jogo Desafio Logístico está disponível para comercialização. As versões Premium, Kids e Edição do Professor encontram-se em fase de desenvolvimento.
          </p>
        </div>
      </div>
    </section>
  );
};

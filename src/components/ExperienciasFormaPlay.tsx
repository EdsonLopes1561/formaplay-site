import React, { useState, useRef, useEffect } from 'react';
import styles from './ExperienciasFormaPlay.module.css';

interface CardData {
  id: string;
  title: string;
  text: string;
}

const cardsData: CardData[] = [
  {
    id: 'main',
    title: 'Desafio Logístico',
    text: 'O jogo principal da FormaPlay para desenvolver estratégia, planejamento, custos e tomada de decisão.',
  },
  {
    id: 'premium',
    title: 'Desafio Logístico Premium',
    text: 'Uma versão especial com apresentação superior, ideal para instituições que buscam uma experiência mais marcante.',
  },
  {
    id: 'kids',
    title: 'Desafio Kids',
    text: 'Uma proposta lúdica para trabalhar decisões, rotas e segurança de forma simples e divertida.',
  },
  {
    id: 'teacher',
    title: 'Edição do Professor',
    text: 'Uma solução pensada para educadores que desejam aplicar o jogo em aulas, dinâmicas e projetos de aprendizagem.',
  },
  {
    id: 'class',
    title: 'Aplicação em sala',
    text: 'Ideal para cursos técnicos, escolas, treinamentos corporativos e atividades práticas de aprendizagem.',
  },
  {
    id: 'components',
    title: 'Componentes do jogo',
    text: 'Tabuleiro, cartas, caminhões, dado, dinheiro fictício e embalagem personalizada para uma experiência completa.',
  },
  {
    id: 'budget',
    title: 'Orçamento institucional',
    text: 'Solicite uma proposta para escolas, SENAI, SENAC, empresas e instituições de ensino.',
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
    <section className={`${styles.section} ${styles[`theme_${activeTheme}`]}`}>
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
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

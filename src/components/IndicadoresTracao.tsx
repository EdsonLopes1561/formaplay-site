import React, { useEffect, useRef, useState } from 'react';
import styles from './IndicadoresTracao.module.css';
import { indicadoresTracao } from '../data/indicadores';

export const IndicadoresTracao: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(indicadoresTracao.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Observer to trigger animation when visible
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
      { threshold: 0.15 } // Trigger when 15% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Animation logic
  useEffect(() => {
    if (!hasStarted || hasFinished) return;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = indicadoresTracao.map(i => i.valor);

    if (prefersReducedMotion) {
      setCounts([...targets]);
      setActiveIndex(null);
      setHasFinished(true);
      return;
    }

    let currentIndex = 0;
    let startTime: number | null = null;
    let animationFrameId: number;
    let timeoutId: number;
    
    // Timing configuration (requested: 650ms duration, 150ms delay)
    const durationPerItemMs = 650;
    const delayBetweenItemsMs = 150;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percent = Math.min(progress / durationPerItemMs, 1);
      const easing = percent * (2 - percent);
      
      const currentTarget = targets[currentIndex];
      const currentValue = Math.floor(easing * currentTarget);
      
      // We must capture the index synchronously to avoid React state batching closure bugs
      const indexToUpdate = currentIndex;
      
      setCounts(prev => {
        const next = [...prev];
        next[indexToUpdate] = currentValue;
        return next;
      });

      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Guarantee final exact value
        setCounts(prev => {
          const next = [...prev];
          next[indexToUpdate] = currentTarget;
          return next;
        });
        
        setActiveIndex(null); // Turn off glow for current
        currentIndex++; // Move to next
        
        if (currentIndex < targets.length) {
          timeoutId = setTimeout(() => {
            setActiveIndex(currentIndex);
            startTime = null; 
            animationFrameId = requestAnimationFrame(animate);
          }, delayBetweenItemsMs);
        } else {
          setHasFinished(true); 
        }
      }
    };

    setActiveIndex(0);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [hasStarted, hasFinished]);

  return (
    <section className={styles.section} ref={sectionRef} id="indicadores-tracao">
      <div className={styles.container}>
        <div className={styles.grid}>
          {indicadoresTracao.map((ind, index) => {
            const isActive = activeIndex === index;
            
            // Construir o texto estático de acessibilidade
            let a11yText = `${ind.valor}${ind.sufixo === '+' ? ' ou mais' : ''} ${ind.label}`;
            if (ind.descricao) {
              a11yText += ` considerando ${ind.descricao.replace('presença considerando ', '')}`;
            }

            return (
              <div 
                key={ind.id} 
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                aria-label={a11yText}
              >
                <div className={styles.numberWrapper} aria-hidden="true">
                   <span className={styles.number}>
                     {counts[index]}
                   </span>
                   {/* Mostra o sufixo desde o começo, conforme exigência */}
                   {ind.sufixo && (
                     <span className={styles.suffix}>{ind.sufixo}</span>
                   )}
                </div>
                <h3 className={styles.label} aria-hidden="true">{ind.label}</h3>
                {ind.descricao && (
                  <p className={styles.descricao} aria-hidden="true">{ind.descricao}</p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className={styles.updateInfo}>
          <p>Dados atualizados em agosto de 2026</p>
        </div>
      </div>
    </section>
  );
};

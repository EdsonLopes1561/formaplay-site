import React, { useEffect, useRef, useState } from 'react';
import styles from './IndicadoresTracao.module.css';
import { indicadoresTracao } from '../data/indicadores';

export const IndicadoresTracao: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(indicadoresTracao.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Observer to trigger animation when section enters viewport
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Sequential counter animation: counts from 0 to actual value smoothly
  useEffect(() => {
    if (!hasStarted || hasFinished) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = indicadoresTracao.map((i) => i.valor);
    let animationFrameId: number;
    let timeoutId: number;

    if (prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(() => {
        setCounts([...targets]);
        setActiveIndex(null);
        setHasFinished(true);
      });

      return () => cancelAnimationFrame(animationFrameId);
    }

    let currentIndex = 0;
    let startTime: number | null = null;
    const durationPerItemMs = 650;
    const delayBetweenItemsMs = 150;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percent = Math.min(progress / durationPerItemMs, 1);
      const easing = percent * (2 - percent);

      const currentTarget = targets[currentIndex];
      const currentValue = Math.floor(easing * currentTarget);
      const indexToUpdate = currentIndex;

      setCounts((prev) => {
        const next = [...prev];
        next[indexToUpdate] = currentValue;
        return next;
      });

      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCounts((prev) => {
          const next = [...prev];
          next[indexToUpdate] = currentTarget;
          return next;
        });

        setActiveIndex(null);
        currentIndex++;

        if (currentIndex < targets.length) {
          timeoutId = window.setTimeout(() => {
            setActiveIndex(currentIndex);
            startTime = null;
            animationFrameId = requestAnimationFrame(animate);
          }, delayBetweenItemsMs);
        } else {
          setHasFinished(true);
        }
      }
    };

    animationFrameId = requestAnimationFrame((timestamp) => {
      setActiveIndex(0);
      animate(timestamp);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [hasStarted, hasFinished]);

  return (
    <section className={styles.section} ref={sectionRef} id="indicadores-tracao" aria-label="Indicadores de impacto FormaPlay">
      <div className={styles.container}>
        <div className={styles.grid}>
          {indicadoresTracao.map((ind, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={ind.id}
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                data-value={ind.valor}
                data-suffix={ind.sufixo}
              >
                <data value={ind.valor} className={styles.numberWrapper}>
                  <span className={styles.number}>{counts[index]}</span>
                  {ind.sufixo && <span className={styles.suffix}>{ind.sufixo}</span>}
                </data>

                <h3 className={styles.label}>{ind.label}</h3>
                {ind.descricao && <p className={styles.descricao}>{ind.descricao}</p>}
              </div>
            );
          })}
        </div>

        <div className={styles.updateInfo}>
          <p>Dados consolidados da operação FormaPlay</p>
        </div>
      </div>
    </section>
  );
};

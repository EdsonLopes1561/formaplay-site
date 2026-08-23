import React from 'react';
import styles from './Sobre.module.css';
import { Target, Lightbulb, Users } from 'lucide-react';
import { FormaPlayText } from './FormaPlayText';

export const Sobre: React.FC = () => {
  return (
    <section id="sobre" className={`section ${styles.sobre}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.textContent} animate-fade-in-up`}>
            <div className={styles.labelSection}>Propósito FormaPlay</div>
            <h2 className="section-title">
              Quando a teoria encontra a experiência, o aprendizado ganha vida.
            </h2>
            <p className={styles.paragraph}>
              A <FormaPlayText /> cria experiências educacionais que ajudam escolas, professores e instituições a aproximar conteúdo, participação e prática.
            </p>
            <p className={styles.paragraph}>
              Por meio do jogo, o conhecimento deixa de ser apenas explicado e passa também a ser experimentado, discutido e colocado em ação.
            </p>
          </div>
          
          <div className={`${styles.cardsGrid} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Lightbulb className={styles.icon} />
              </div>
              <h3>Aprender fazendo</h3>
              <p>Transformar conceitos em experiências.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Target className={styles.icon} />
              </div>
              <h3>Participar e decidir</h3>
              <p>Estimular estratégia, colaboração e tomada de decisão.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Users className={styles.icon} />
              </div>
              <h3>Dar sentido ao aprendizado</h3>
              <p>Aproximar conhecimento de situações que fazem parte da realidade.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

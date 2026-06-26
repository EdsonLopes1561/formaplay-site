import React from 'react';
import styles from './ConhecaFormaPlay.module.css';
import { FormaPlayText } from './FormaPlayText';

export const ConhecaFormaPlay: React.FC = () => {
  return (
    <section id="conheca" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Conheça a <FormaPlayText /></h2>
          <p className={styles.subtitle}>Educação que transforma. Diversão que ensina.</p>
        </div>
        
        <div className={styles.content}>
          <p className={styles.text}>
            A <FormaPlayText /> cria jogos educacionais para tornar o aprendizado mais prático, participativo e memorável.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Origem</h4>
              <p>O projeto nasceu em ambiente educacional, a partir da necessidade de tornar a logística mais visual e prática.</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Criação</h4>
              <p>O Desafio Logístico foi desenvolvido como uma ferramenta para transformar conceitos em ação.</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Propósito</h4>
              <p>Ajudar escolas, cursos técnicos, empresas e educadores a criarem experiências de aprendizagem mais envolventes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './ConhecaFormaPlay.module.css';
import { FormaPlayText } from './FormaPlayText';

export const ConhecaFormaPlay: React.FC = () => {
  return (
    <section id="conheca" className={styles.section} aria-label="Trajetória da FormaPlay">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trajetória da <FormaPlayText /></h2>
          <p className={styles.subtitle}>Educação que transforma. Experiência que ensina.</p>
        </div>
        
        <div className={styles.content}>
          <p className={styles.text}>
            A <FormaPlayText /> nasceu com a missão de aproximar teoria e prática, criando jogos educacionais de alta qualidade que despertam o engajamento, o raciocínio estratégico e a cooperação entre alunos e educadores.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Origem em Sala de Aula</h4>
              <p>O projeto nasceu em ambiente educacional real, a partir da necessidade de tornar o aprendizado de logística mais dinâmico, visual e participativo.</p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Desenvolvimento do Desafio Logístico</h4>
              <p>Criação do jogo físico com tabuleiro, cartas de eventos, veículos e dinheiro fictício para simular a tomada de decisão sob incerteza.</p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Validação & Empreenda Senac</h4>
              <p>O jogo foi aplicado com turmas reais, validado por professores e conquistou aprovação para a 2ª fase do renomado programa Empreenda Senac.</p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Expansão e Ecossistema FormaPlay</h4>
              <p>Fornecimento para escolas técnicas, instituições de ensino e desenvolvimento de novos modelos e edições pedagógicas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

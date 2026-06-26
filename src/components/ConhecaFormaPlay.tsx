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
            A <FormaPlayText /> nasceu com o propósito de transformar o aprendizado em uma experiência mais prática, envolvente e significativa. Unindo educação, estratégia e diversão, desenvolvemos jogos educacionais que aproximam teoria e prática de forma dinâmica.
          </p>
          <p className={styles.text}>
            Nosso principal produto, o Desafio Logístico, foi criado a partir de vivências reais na área educacional e da percepção de que aprender pode ser muito mais participativo quando o aluno se envolve com decisões, desafios e situações próximas do mundo real.
          </p>
          <p className={styles.text}>
            A proposta ganhou força com sua participação no Empreenda Senac, onde o projeto foi avaliado e aprovado para a segunda fase do programa, reforçando seu potencial como ferramenta educacional inovadora.
          </p>
          <p className={styles.text}>
            Hoje, a <FormaPlayText /> segue evoluindo com o objetivo de criar soluções educacionais para estudantes, professores, instituições e empresas.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Nascimento da ideia</h4>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Criação do Desafio Logístico</h4>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Validações com alunos e professores</h4>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Aprovação para a 2ª fase do Empreenda Senac</h4>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot}></div>
            <div className={styles.timelineContent}>
              <h4>Evolução da <FormaPlayText /> como marca de jogos educacionais</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

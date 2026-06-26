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
            <h2 className="section-title">
              Da sala de aula para uma experiência real de aprendizagem
            </h2>
            <p className={styles.paragraph}>
              A <FormaPlayText /> nasceu para aproximar teoria e prática por meio de jogos educacionais que colocam o aluno no centro da experiência.
            </p>
            <p className={styles.paragraph}>
              Com o Desafio Logístico, conceitos como custos, rotas, imprevistos e tomada de decisão deixam de ser apenas teoria e passam a ser vivenciados em uma dinâmica envolvente e colaborativa.
            </p>
          </div>
          
          <div className={`${styles.cardsGrid} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Lightbulb className={styles.icon} />
              </div>
              <h3>Aprender fazendo</h3>
              <p>Conectamos o aprendizado de sala de aula com a realidade do mercado.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Target className={styles.icon} />
              </div>
              <h3>Decidir em equipe</h3>
              <p>Desenvolvemos a capacidade de planejamento e tomada de decisão.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Users className={styles.icon} />
              </div>
              <h3>Transformar teoria em prática</h3>
              <p>Estimulamos o trabalho em equipe, negociação e resolução conjunta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

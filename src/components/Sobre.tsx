import React from 'react';
import styles from './Sobre.module.css';
import { Target, Lightbulb, Users } from 'lucide-react';

export const Sobre: React.FC = () => {
  return (
    <section id="sobre" className={`section ${styles.sobre}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.textContent} animate-fade-in-up`}>
            <h2 className="section-title">
              Jogos educacionais que transformam o aprendizado
            </h2>
            <p className={styles.paragraph}>
              A FormaPlay nasceu com o propósito de criar jogos educacionais capazes de aproximar teoria e prática de forma leve, interativa e envolvente.
            </p>
            <p className={styles.paragraph}>
              Nossos jogos são desenvolvidos para apoiar professores, escolas, instituições de ensino e treinamentos corporativos, trazendo situações reais para dentro da sala de aula por meio da tomada de decisão, estratégia, colaboração e resolução de problemas.
            </p>
            <p className={styles.paragraph}>
              Mais do que jogar, a proposta da FormaPlay é criar experiências de aprendizagem que despertam participação, raciocínio e protagonismo nos alunos.
            </p>
            <div className={styles.quoteBox}>
              <p className={styles.quote}>
                "Educação que transforma. Diversão que ensina."
              </p>
            </div>
          </div>
          
          <div className={`${styles.cardsGrid} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Lightbulb className={styles.icon} />
              </div>
              <h3>Teoria e Prática</h3>
              <p>Conectamos o aprendizado de sala de aula com a realidade do mercado.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Target className={styles.icon} />
              </div>
              <h3>Estratégia</h3>
              <p>Desenvolvemos a capacidade de planejamento e tomada de decisão.</p>
            </div>
            
            <div className={`${styles.card} glass`}>
              <div className={styles.iconWrapper}>
                <Users className={styles.icon} />
              </div>
              <h3>Colaboração</h3>
              <p>Estimulamos o trabalho em equipe, negociação e resolução conjunta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

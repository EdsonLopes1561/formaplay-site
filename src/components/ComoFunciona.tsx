import React from 'react';
import styles from './ComoFunciona.module.css';
import { Map, Dices, AlertTriangle, Wallet, Trophy } from 'lucide-react';

export const ComoFunciona: React.FC = () => {
  const steps = [
    {
      icon: <Map />,
      title: "Passo 1 — Planeje sua rota",
      description: "Cada jogador inicia com recursos financeiros e precisa avançar pelo tabuleiro tomando decisões ao longo do caminho."
    },
    {
      icon: <Dices />,
      title: "Passo 2 — Lance o dado",
      description: "O dado define o avanço do jogador pelo percurso, levando-o a diferentes situações logísticas."
    },
    {
      icon: <AlertTriangle />,
      title: "Passo 3 — Resolva desafios",
      description: "As cartas apresentam custos, eventos, desafios, imprevistos e oportunidades que exigem análise e decisão."
    },
    {
      icon: <Wallet />,
      title: "Passo 4 — Administre recursos",
      description: "O jogador precisa equilibrar gastos, ganhos, riscos e estratégias para chegar ao destino com o melhor resultado."
    },
    {
      icon: <Trophy />,
      title: "Passo 5 — Vença pela melhor estratégia",
      description: "O vencedor não é apenas quem chega primeiro, mas quem administra melhor seus recursos e termina com o melhor desempenho."
    }
  ];

  return (
    <section id="como-funciona" className={`section ${styles.comoFunciona}`}>
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">Como funciona o Desafio Logístico</h2>
          <p className="section-subtitle">
            Uma jornada de decisões estratégicas do início ao fim.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={`${styles.timelineItem} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.timelineIcon}>
                {step.icon}
              </div>
              <div className={styles.timelineContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

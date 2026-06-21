import React from 'react';
import styles from './BeneficiosEducacionais.module.css';
import { Lightbulb, Users, Brain, Network, TrendingUp, Briefcase } from 'lucide-react';

export const BeneficiosEducacionais: React.FC = () => {
  const beneficios = [
    {
      icon: <Lightbulb />,
      title: "Aprendizado prático",
      description: "Transforma conceitos de logística, custos e planejamento em situações visuais e interativas."
    },
    {
      icon: <Users />,
      title: "Engajamento dos alunos",
      description: "A dinâmica do jogo aumenta a participação, a atenção e o envolvimento durante a atividade."
    },
    {
      icon: <Brain />,
      title: "Tomada de decisão",
      description: "Os jogadores precisam analisar cenários, escolher caminhos e lidar com consequências."
    },
    {
      icon: <Network />,
      title: "Trabalho em equipe",
      description: "Estimula comunicação, colaboração, negociação e troca de ideias entre os participantes."
    },
    {
      icon: <TrendingUp />,
      title: "Pensamento estratégico",
      description: "Ajuda o aluno a compreender que boas decisões dependem de planejamento, cálculo e visão de processo."
    },
    {
      icon: <Briefcase />,
      title: "Aplicação em projetos",
      description: "Pode ser utilizado em aulas, feiras, projetos integradores, treinamentos e atividades práticas."
    }
  ];

  return (
    <section id="beneficios" className={`section ${styles.beneficios}`}>
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">Por que usar jogos educacionais em sala de aula?</h2>
        </div>

        <div className={styles.grid}>
          {beneficios.map((beneficio, index) => (
            <div key={index} className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.iconWrapper}>
                {beneficio.icon}
              </div>
              <h3>{beneficio.title}</h3>
              <p>{beneficio.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

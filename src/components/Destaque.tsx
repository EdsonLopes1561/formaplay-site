import React from 'react';
import styles from './Destaque.module.css';
import { CheckCircle2 } from 'lucide-react';

export const Destaque: React.FC = () => {
  const destaques = [
    "Indicado para jovens e adultos",
    "Ideal para cursos técnicos, escolas e treinamentos",
    "Trabalha estratégia, planejamento e tomada de decisão",
    "Estimula participação ativa em sala de aula",
    "Pode ser aplicado em dinâmicas individuais ou em grupo"
  ];

  return (
    <section id="desafio-logistico" className={`section ${styles.destaque}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.imageColumn} animate-fade-in-up`}>
            <div className={styles.imagePlaceholder}>
              <img src="/desafio-logistico-produto-mesa.png" alt="Desafio Logístico Detalhes" className={styles.image} />
            </div>
          </div>
          
          <div className={`${styles.contentColumn} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <h2 className="section-title">
              Desafio Logístico: aprender logística na prática
            </h2>
            <p className={styles.description}>
              O Desafio Logístico é um jogo educacional de tabuleiro criado para desenvolver o raciocínio logístico de forma prática, dinâmica e colaborativa.
            </p>
            <p className={styles.description}>
              Durante a partida, os jogadores simulam situações do mundo real, tomam decisões, calculam custos, enfrentam imprevistos e buscam concluir suas entregas com eficiência.
            </p>
            <p className={styles.description}>
              A cada rodada, o jogo estimula planejamento, negociação, análise de riscos, controle financeiro e pensamento estratégico.
            </p>
            
            <div className={styles.destaquesList}>
              {destaques.map((item, index) => (
                <div key={index} className={styles.destaqueItem}>
                  <CheckCircle2 className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.actions}>
              <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.btnAction}`}>
                Quero o Desafio Logístico
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

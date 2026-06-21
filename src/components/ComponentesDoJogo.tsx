import React from 'react';
import styles from './ComponentesDoJogo.module.css';
import { LayoutDashboard, ScrollText, Truck, Dices, Banknote, BookOpen, PackageOpen } from 'lucide-react';

export const ComponentesDoJogo: React.FC = () => {
  const componentes = [
    { icon: <LayoutDashboard />, label: "Tabuleiro" },
    { icon: <ScrollText />, label: "Cartas de desafios e situações logísticas" },
    { icon: <Truck />, label: "Peões em formato de caminhão" },
    { icon: <Dices />, label: "Dado" },
    { icon: <Banknote />, label: "Dinheiro fictício" },
    { icon: <BookOpen />, label: "Manual de regras" },
    { icon: <PackageOpen />, label: "Embalagem personalizada" }
  ];

  return (
    <section id="componentes" className={`section ${styles.componentes}`}>
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">O que acompanha o Desafio Logístico</h2>
          <p className="section-subtitle">
            O jogo é composto por materiais pensados para tornar a experiência visual, organizada e envolvente.
          </p>
        </div>

        <div className={styles.grid}>
          {componentes.map((item, index) => (
            <div key={index} className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={`text-center animate-fade-in-up ${styles.fraseApoio}`}>
          <p>Tudo foi desenvolvido para transformar a aprendizagem em uma experiência prática, estratégica e divertida.</p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './ProvaSocial.module.css';
import { Star, GraduationCap, School, BookOpenCheck } from 'lucide-react';

export const ProvaSocial: React.FC = () => {
  const destaques = [
    { icon: <GraduationCap />, text: "Desenvolvido por estudantes da área de logística" },
    { icon: <School />, text: "Testado em ambiente educacional" },
    { icon: <BookOpenCheck />, text: "Criado para aproximar teoria e prática" },
    { icon: <Star />, text: "Aprovado para a 2ª fase do Empreenda Senac" }
  ];

  return (
    <section id="validacao" className={`section ${styles.provaSocial}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.content} animate-fade-in-up`}>
            <h2 className="section-title">Criado a partir de uma experiência real de aprendizagem</h2>
            <p className={styles.description}>
              O Desafio Logístico nasceu em ambiente educacional, a partir da vivência em sala de aula e da necessidade de tornar o ensino de logística mais prático, participativo e memorável.
            </p>
            <p className={styles.description}>
              A proposta foi testada e validada, recebendo reconhecimento ao ser aprovada para a 2ª fase do programa Empreenda Senac, destacando-se como uma solução inovadora para o ensino prático.
            </p>
          </div>
          
          <div className={`${styles.destaquesGrid} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            {destaques.map((item, index) => (
              <div key={index} className={styles.destaqueItem}>
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

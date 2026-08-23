import React from 'react';
import styles from './Hero.module.css';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.content} animate-fade-in-up`}>
          <span className={styles.badge}>Educação que transforma</span>
          <h1 className={styles.title}>
            Jogos educacionais que transformam conhecimento em experiências de aprendizagem.
          </h1>
          <p className={styles.description}>
            Desenvolvemos experiências educacionais que unem aprendizado, estratégia, participação e diversão.
          </p>
        </div>
        
        <div className={`${styles.actions} animate-fade-in-up`}>
          <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.btnHero}`}>
            Solicitar Orçamento
            <ArrowRight size={20} />
          </a>
          <a href="#jogos" className={`btn btn-outline ${styles.btnHero}`}>
            Conheça nossas experiências
          </a>
        </div>
        
        <div className={`${styles.imageWrapper} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.productInfoCard}>
            <span className={styles.productStatus}>Produto disponível</span>
            <h3 className={styles.productTitle}>Desafio Logístico</h3>
            <p className={styles.productDesc}>Estratégia, planejamento e tomada de decisão aplicados à logística.</p>
          </div>
          <img 
            src="/desafio-logistico-produto-mesa.png" 
            alt="Desafio Logístico" 
            className={styles.heroImage}
          />
          <div className={styles.glowEffect}></div>
        </div>
      </div>
    </section>
  );
};

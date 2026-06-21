import React from 'react';
import { getWhatsAppLink } from '../constants';
import styles from './Hero.module.css';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.content} animate-fade-in-up`}>
          <span className={styles.badge}>Aprender. Brincar. Decidir. Evoluir.</span>
          <h1 className={styles.title}>
            Desafio <span className={styles.highlight}>Logístico</span>
          </h1>
          <p className={styles.subtitle}>
            O jogo educacional que transforma logística em estratégia.
          </p>
          <p className={styles.description}>
            Aprender, brincar e evoluir com decisões logísticas reais.
          </p>
          
          <div className={styles.actions}>
            <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.btnHero}`}>
              Solicitar Orçamento
              <ArrowRight size={20} />
            </a>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.btnHero}`}>
              <MessageCircle size={20} />
              Fale no WhatsApp
            </a>
          </div>
        </div>
        
        <div className={`${styles.imageWrapper} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
          <img 
            src="/hero.png" 
            alt="Desafio Logístico - Caminhão e Tabuleiro" 
            className={styles.heroImage}
          />
          <div className={styles.glowEffect}></div>
        </div>
      </div>
    </section>
  );
};

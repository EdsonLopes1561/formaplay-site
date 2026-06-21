import React from 'react';
import styles from './ChamadaFinal.module.css';
import { getWhatsAppLink } from '../constants';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const ChamadaFinal: React.FC = () => {
  return (
    <section id="orcamento" className={`section ${styles.chamadaFinal}`}>
      <div className="container">
        <div className={`${styles.content} animate-fade-in-up`}>
          <h2 className={styles.title}>
            Leve o Desafio Logístico para sua instituição
          </h2>
          <p className={styles.description}>
            Transforme suas aulas, treinamentos ou projetos em uma experiência prática de decisão, estratégia e aprendizagem.
          </p>
          <p className={styles.description}>
            Solicite um orçamento e conheça as possibilidades de aplicação do Desafio Logístico na sua instituição.
          </p>
          
          <div className={styles.actions}>
            <a 
              href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn btn-primary ${styles.btnPrimary}`}
            >
              Solicitar Orçamento
              <ArrowRight size={20} />
            </a>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn btn-outline ${styles.btnLarge} ${styles.btnOutlineWhite}`}
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

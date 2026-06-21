import React from 'react';
import styles from './Footer.module.css';
import { Logo } from './Logo';
import { getWhatsAppLink } from '../constants';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        <div className={styles.column}>
          <Logo />
          <p className={styles.tagline}>
            Educação que transforma. Diversão que ensina.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contato</h4>
          <ul className={styles.linkList}>
            <li>
              <a href="mailto:contato.formaplay@gmail.com" className={styles.link}>
                <Mail size={16} />
                contato.formaplay@gmail.com
              </a>
            </li>
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <MessageCircle size={16} />
                WhatsApp Oficial
              </a>
            </li>
            <li>
              <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <ExternalLink size={16} />
                Solicitar Orçamento
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Links rápidos</h4>
          <ul className={styles.linkList}>
            <li><a href="#desafio-logistico" className={styles.link}>Desafio Logístico</a></li>
            <li><a href="#desafio-kids" className={styles.link}>Desafio Kids</a></li>
            <li><a href="#jogos" className={styles.link}>Linha de Jogos</a></li>
            <li><a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={styles.link}>Solicitar Orçamento</a></li>
          </ul>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>
            © {currentYear} FormaPlay — Jogos Educacionais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

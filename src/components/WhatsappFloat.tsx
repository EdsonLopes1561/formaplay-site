import React from 'react';
import styles from './WhatsappFloat.module.css';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../constants';

export const WhatsappFloat: React.FC = () => {
  return (
    <a 
      href={getWhatsAppLink()} 
      className={styles.floatButton}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar conosco no WhatsApp"
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={28} />
      </div>
      <span className={styles.text}>Fale conosco</span>
    </a>
  );
};

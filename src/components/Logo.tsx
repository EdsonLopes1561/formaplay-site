import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ theme = 'light' }) => {
  return (
    <div className={styles.logoContainer}>
      <span className={theme === 'dark' ? styles.formaDark : styles.forma}>Forma</span>
      <span className={styles.play}>
        <span className={styles.p}>P</span>
        <span className={styles.l}>l</span>
        <span className={styles.a}>a</span>
        <span className={styles.y}>y</span>
      </span>
    </div>
  );
};

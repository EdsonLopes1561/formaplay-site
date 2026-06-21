import React from 'react';
import styles from './Logo.module.css';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <span className={styles.forma}>Forma</span>
      <span className={styles.play}>
        <span className={styles.p}>P</span>
        <span className={styles.l}>l</span>
        <span className={styles.a}>a</span>
        <span className={styles.y}>y</span>
      </span>
    </div>
  );
};

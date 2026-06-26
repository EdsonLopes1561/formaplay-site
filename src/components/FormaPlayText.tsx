import React from 'react';
import styles from './Logo.module.css';

export const FormaPlayText: React.FC = () => {
  return (
    <span style={{ whiteSpace: 'nowrap', fontWeight: 'inherit' }}>
      <span className={styles.forma}>Forma</span><span className={styles.p}>P</span><span className={styles.l}>l</span><span className={styles.a}>a</span><span className={styles.y}>y</span>
    </span>
  );
};

import React, { useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import styles from './MapaModal.module.css';
import { MapaBrasil } from './MapaBrasil';
import type { PresencaCidade, MetricType } from '../data/presencaData';

interface MapaModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: PresencaCidade[];
  metric: MetricType;
  ufs: string[];
}

export const MapaModal: React.FC<MapaModalProps> = ({
  isOpen,
  onClose,
  nodes,
  metric,
  ufs
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mapa Ampliado da FormaPlay"
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.modalBadge}>
              <MapPin size={14} />
              <span>PRESENÇA TERRITORIAL</span>
            </div>
            <h3 className={styles.modalTitle}>Mapa de Presença e Validação</h3>
          </div>

          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar mapa ampliado"
            title="Fechar (ESC)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Map Content */}
        <div className={styles.modalBody}>
          <MapaBrasil
            nodes={nodes}
            metric={metric}
            ufs={ufs}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};

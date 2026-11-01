import React, { useEffect } from 'react';
import { X, Music, Play, Pause } from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import {
  FULL_LYRICS_STANZAS,
  MUSICA_OFICIAL_META,
} from '../data/musicaOficialLyrics';
import styles from './LyricsModal.module.css';

export const LyricsModal: React.FC = () => {
  const {
    isLyricsModalOpen,
    closeLyricsModal,
    isPlaying,
    togglePlayPause,
    activeLyric,
  } = useAudioPlayer();

  useEffect(() => {
    if (!isLyricsModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLyricsModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLyricsModalOpen, closeLyricsModal]);

  if (!isLyricsModalOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={closeLyricsModal}
      role="presentation"
      data-testid="lyrics-modal-backdrop"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lyrics-modal-title"
        data-testid="lyrics-modal"
      >
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.badge}>
              <Music size={14} />
              <span>Letra Oficial Completa</span>
            </div>
            <h2 id="lyrics-modal-title" className={styles.title}>
              {MUSICA_OFICIAL_META.title}
            </h2>
            <p className={styles.subtitle}>{MUSICA_OFICIAL_META.subtitle}</p>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={togglePlayPause}
              className={styles.miniPlayBtn}
              aria-label={isPlaying ? 'Pausar música' : 'Ouvir música'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pausar' : 'Ouvir'}</span>
            </button>

            <button
              type="button"
              onClick={closeLyricsModal}
              className={styles.closeBtn}
              aria-label="Fechar letra completa"
              data-testid="close-lyrics-modal-btn"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.stanzasGrid}>
            {FULL_LYRICS_STANZAS.map((stanza) => {
              const isCurrentSection =
                isPlaying &&
                activeLyric &&
                !activeLyric.isInstrumental &&
                stanza.lines.includes(activeLyric.text);

              return (
                <div
                  key={stanza.id}
                  className={`${styles.stanzaCard} ${
                    stanza.isChorus ? styles.chorusCard : ''
                  } ${isCurrentSection ? styles.activeStanzaCard : ''}`}
                >
                  <span className={styles.stanzaTitle}>{stanza.title}</span>
                  <div className={styles.linesList}>
                    {stanza.lines.map((line, idx) => {
                      const isCurrentLine =
                        isPlaying && activeLyric?.text === line;
                      return (
                        <p
                          key={idx}
                          className={`${styles.lyricLine} ${
                            isCurrentLine ? styles.currentLineHighlight : ''
                          }`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerNote}>
            FormaPlay — Jogos Educacionais
          </span>
          <button
            type="button"
            onClick={closeLyricsModal}
            className={styles.footerCloseBtn}
          >
            Fechar letra
          </button>
        </div>
      </div>
    </div>
  );
};


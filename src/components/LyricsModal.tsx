import React, { useEffect } from 'react';
import { X, Music, Play, Pause, Info, FileText } from 'lucide-react';
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
    modalTrack,
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

  const isOfficial = !modalTrack || modalTrack.isOfficial;

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
              <span>
                {isOfficial
                  ? 'Letra Oficial Completa'
                  : `Letra — ${modalTrack.collectionLabel}`}
              </span>
            </div>
            <h2 id="lyrics-modal-title" className={styles.title}>
              {isOfficial ? MUSICA_OFICIAL_META.title : modalTrack.title}
            </h2>
            <p className={styles.subtitle}>
              {isOfficial
                ? MUSICA_OFICIAL_META.subtitle
                : `${modalTrack.genre} • Duração: ${modalTrack.duration}`}
            </p>
          </div>

          <div className={styles.headerActions}>
            {modalTrack.isAvailable && (
              <button
                type="button"
                onClick={togglePlayPause}
                className={styles.miniPlayBtn}
                aria-label={isPlaying ? 'Pausar música' : 'Ouvir música'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? 'Pausar' : 'Ouvir'}</span>
              </button>
            )}

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
          {isOfficial ? (
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
          ) : modalTrack.lyrics ? (
            <div className={styles.customLyricsBox}>
              <div className={styles.customLyricsContent}>
                {modalTrack.lyrics.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.customLyricParagraph}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.pendingLyricsBox}>
              <div className={styles.pendingIconWrap}>
                <FileText size={32} />
              </div>
              <h3 className={styles.pendingTitle}>Letra em fase de conferência</h3>
              <p className={styles.pendingDescription}>
                {modalTrack.lyricsNote ||
                  'A letra oficial desta gravação está em fase de transcrição e validação artística. Ela será disponibilizada assim que a gravação final for publicada.'}
              </p>
              <div className={styles.pendingNotice}>
                <Info size={18} />
                <span>
                  O áudio e a letra respeitam a gravação real original, garantindo total
                  autenticidade à obra.
                </span>
              </div>
            </div>
          )}
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

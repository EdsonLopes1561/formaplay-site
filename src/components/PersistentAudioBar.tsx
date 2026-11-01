import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  FileText,
  Music,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useRouter } from '../router/RouterContext';
import {
  MUSICA_OFICIAL_META,
  formatAudioTime,
} from '../data/musicaOficialLyrics';
import styles from './PersistentAudioBar.module.css';

export const PersistentAudioBar: React.FC = () => {
  const { currentPath } = useRouter();
  const {
    isPlaying,
    isPaused,
    currentTime,
    duration,
    isMuted,
    activeLyric,
    hasInteracted,
    togglePlayPause,
    stop,
    seek,
    toggleMute,
    openLyricsModal,
  } = useAudioPlayer();

  const isPlayerPage =
    currentPath === '/' ||
    currentPath === '/musica' ||
    currentPath === '/universo-musical';

  const [isSectionIntersecting, setIsSectionIntersecting] =
    useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlayerPage) {
      return;
    }

    const checkVisibility = () => {
      const fullEl = document.getElementById('musica-oficial');
      const compactEl = document.getElementById('musica-compacta');

      let isAnyVisible = false;
      if (fullEl) {
        const rect = fullEl.getBoundingClientRect();
        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          isAnyVisible = true;
        }
      }
      if (compactEl) {
        const rect = compactEl.getBoundingClientRect();
        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          isAnyVisible = true;
        }
      }
      setIsSectionIntersecting(isAnyVisible);
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isPlayerPage]);

  const isPlayerVisibleOnScreen = isPlayerPage && isSectionIntersecting;

  // Show the persistent bar when the user has started playback (playing or paused mid-song)
  // and either navigated to another internal route or scrolled away from player sections
  const isActiveSession = isPlaying || (isPaused && currentTime > 0);
  if (!hasInteracted || !isActiveSession || isPlayerVisibleOnScreen) {
    return null;
  }

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <aside
      className={`${styles.floatingDock} ${
        isMinimized ? styles.minimizedDock : ''
      }`}
      aria-label="Mini player persistente da Música Oficial FormaPlay"
      data-testid="persistent-audio-bar"
    >
      <div className={styles.dockTopRow}>
        <div className={styles.songInfo}>
          <div
            className={`${styles.iconPulse} ${
              isPlaying ? styles.iconPlaying : ''
            }`}
          >
            <Music size={16} />
          </div>
          <div className={styles.songMeta}>
            <span className={styles.songTitle}>{MUSICA_OFICIAL_META.title}</span>
            <span className={styles.liveLyric} title={activeLyric.text}>
              {activeLyric.text}
            </span>
          </div>
        </div>

        <div className={styles.dockActions}>
          <button
            type="button"
            onClick={togglePlayPause}
            className={styles.dockPlayBtn}
            aria-label={isPlaying ? 'Pausar música' : 'Continuar música'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            type="button"
            onClick={stop}
            className={styles.dockIconBtn}
            aria-label="Parar música e voltar ao início"
            title="Stop"
          >
            <Square size={14} />
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className={styles.dockIconBtn}
            aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            type="button"
            onClick={openLyricsModal}
            className={styles.dockIconBtn}
            aria-label="Ver letra completa"
            title="Ver letra completa"
          >
            <FileText size={15} />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            className={styles.dockIconBtn}
            aria-label={
              isMinimized ? 'Expandir mini player' : 'Minimizar mini player'
            }
          >
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className={styles.dockProgressRow}>
          <span className={styles.dockTime}>{formatAudioTime(currentTime)}</span>
          <div className={styles.dockProgressWrap}>
            <div
              className={styles.dockProgressFill}
              style={{ width: `${progressPercent}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || MUSICA_OFICIAL_META.durationSeconds}
              step={0.2}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className={styles.dockProgressInput}
              aria-label="Avançar ou retroceder música no mini player"
            />
          </div>
          <span className={styles.dockTime}>{formatAudioTime(duration)}</span>
        </div>
      )}
    </aside>
  );
};

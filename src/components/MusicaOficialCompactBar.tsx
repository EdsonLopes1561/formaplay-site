import React from 'react';
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useRouter } from '../router/RouterContext';
import {
  MUSICA_OFICIAL_META,
  formatAudioTime,
} from '../data/musicaOficialLyrics';
import { MUSICA_OFICIAL_TRACK } from '../data/musicCatalog';
import { AudioVisualizer } from './AudioVisualizer';
import styles from './MusicaOficialCompactBar.module.css';

export const MusicaOficialCompactBar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    isMuted,
    activeLyric,
    isOfficialTrackActive,
    loadAndPlayTrack,
    togglePlayPause,
    toggleMute,
  } = useAudioPlayer();

  const isOfficialPlaying = isOfficialTrackActive && isPlaying;

  const handleToggle = () => {
    if (!isOfficialTrackActive) {
      loadAndPlayTrack(MUSICA_OFICIAL_TRACK);
    } else {
      togglePlayPause();
    }
  };

  const handleOpenFullPlayer = () => {
    if (currentPath === '/musica') {
      const el = document.getElementById('musica-oficial');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/musica');
    }
  };

  return (
    <div
      id="musica-compacta"
      className={styles.compactBar}
      aria-label="Faixa compacta da Música Oficial FormaPlay"
      data-testid="musica-oficial-compact-bar"
    >
      <div className={styles.leftCol}>
        <div
          className={`${styles.iconWrap} ${
            isOfficialPlaying ? styles.iconWrapActive : ''
          }`}
          aria-hidden="true"
        >
          <Music size={18} className={styles.musicIcon} />
        </div>

        <div className={styles.titleWrap}>
          <span className={styles.badgeMini}>Música Oficial</span>
          <h3 className={styles.title}>{MUSICA_OFICIAL_META.title}</h3>
          <p className={styles.subtitle} title={isOfficialPlaying ? activeLyric.text : MUSICA_OFICIAL_META.subtitle}>
            {isOfficialPlaying && !activeLyric.isInstrumental
              ? activeLyric.text
              : MUSICA_OFICIAL_META.subtitle}
          </p>
        </div>
      </div>

      <div className={styles.centerCol}>
        <div className={styles.visualizerWrap}>
          <AudioVisualizer
            className={styles.canvas}
            barCount={28}
            minHeight={38}
          />
        </div>
      </div>

      <div className={styles.rightCol}>
        <div className={styles.timeTag}>
          <span>{formatAudioTime(isOfficialTrackActive ? currentTime : 0)}</span>
          <span className={styles.timeDivider}>/</span>
          <span>{formatAudioTime(isOfficialTrackActive && duration > 0 ? duration : MUSICA_OFICIAL_META.durationSeconds)}</span>
        </div>

        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={handleToggle}
            className={`${styles.btnPlayPause} ${
              isOfficialPlaying ? styles.btnPlaying : ''
            }`}
            aria-label={
              isOfficialPlaying ? 'Pausar música oficial' : 'Tocar música oficial'
            }
            data-testid="compact-play-pause-btn"
          >
            {isOfficialTrackActive && isLoading ? (
              <Loader2 size={18} className={styles.spin} />
            ) : isOfficialPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
            <span className={styles.playText}>
              {isPlaying ? 'Pausar' : 'Ouvir Música'}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className={styles.btnIcon}
            aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
            title={isMuted ? 'Ativar som' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          <button
            type="button"
            onClick={handleOpenFullPlayer}
            className={styles.btnFullPlayer}
            aria-label="Abrir Universo Musical FormaPlay com player completo e letra"
            title="Conhecer o Universo Musical FormaPlay com letra sincronizada"
            data-testid="open-full-player-btn"
          >
            <span className={styles.fullPlayerText}>Player completo</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  Volume1,
  VolumeX,
  FileText,
  Music,
  Loader2,
  AlertCircle,
  RefreshCw,
  Radio,
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import {
  MUSICA_OFICIAL_META,
  SYNCED_LYRICS,
  formatAudioTime,
} from '../data/musicaOficialLyrics';
import { AudioVisualizer } from './AudioVisualizer';
import styles from './MusicaOficialSection.module.css';

export const MusicaOficialSection: React.FC = () => {
  const {
    status,
    isPlaying,
    isPaused,
    isLoading,
    hasError,
    errorMessage,
    currentTime,
    duration,
    volume,
    isMuted,
    activeLyricIndex,
    play,
    pause,
    stop,
    seek,
    setVolume,
    toggleMute,
    openLyricsModal,
    retryLoad,
  } = useAudioPlayer();

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const prevLine2 =
    activeLyricIndex >= 2 ? SYNCED_LYRICS[activeLyricIndex - 2] : null;
  const prevLine1 =
    activeLyricIndex >= 1 ? SYNCED_LYRICS[activeLyricIndex - 1] : null;
  const currentLine = SYNCED_LYRICS[activeLyricIndex] || SYNCED_LYRICS[0];
  const nextLine1 =
    activeLyricIndex + 1 < SYNCED_LYRICS.length
      ? SYNCED_LYRICS[activeLyricIndex + 1]
      : null;
  const nextLine2 =
    activeLyricIndex + 2 < SYNCED_LYRICS.length
      ? SYNCED_LYRICS[activeLyricIndex + 2]
      : null;

  const getStatusLabel = () => {
    switch (status) {
      case 'loading':
        return 'Carregando áudio...';
      case 'playing':
        return 'Reproduzindo agora';
      case 'paused':
        return 'Pausado';
      case 'error':
        return 'Falha no carregamento';
      case 'stopped':
      case 'idle':
      default:
        return 'Pronto para tocar';
    }
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={19} />;
    if (volume < 0.5) return <Volume1 size={19} />;
    return <Volume2 size={19} />;
  };

  return (
    <section
      id="musica-oficial"
      className={styles.section}
      aria-label="Player da Música Oficial FormaPlay"
    >
      <div className="container">
        <div className={styles.headerBlock}>
          <div className={styles.sectionBadge}>
            <Music size={15} />
            <span>Identidade Sonora FormaPlay</span>
          </div>
          <h2 className={styles.sectionTitle}>{MUSICA_OFICIAL_META.title}</h2>
          <p className={styles.sectionSubtitle}>
            {MUSICA_OFICIAL_META.subtitle}
          </p>
        </div>

        <div className={styles.playerShell}>
          {/* Top Bar: Status Indicator + Full Lyrics Button */}
          <div className={styles.playerTopBar}>
            <div
              className={`${styles.statusPill} ${
                isPlaying
                  ? styles.statusPlaying
                  : isPaused
                  ? styles.statusPaused
                  : isLoading
                  ? styles.statusLoading
                  : hasError
                  ? styles.statusError
                  : ''
              }`}
              role="status"
              aria-live="polite"
              data-testid="player-status-indicator"
            >
              {isLoading ? (
                <Loader2 size={15} className={styles.spinIcon} />
              ) : isPlaying ? (
                <span className={styles.pulseDot} aria-hidden="true" />
              ) : (
                <Radio size={15} />
              )}
              <span>{getStatusLabel()}</span>
            </div>

            <div className={styles.topBarRight}>
              <span className={styles.sectionTagBadge}>
                {currentLine.isInstrumental
                  ? 'Trecho Instrumental'
                  : currentLine.section}
              </span>

              <button
                type="button"
                onClick={openLyricsModal}
                className={styles.fullLyricsBtn}
                data-testid="open-full-lyrics-btn"
              >
                <FileText size={16} />
                <span>Ver letra completa</span>
              </button>
            </div>
          </div>

          {/* Main Stage: Visualizer + Synchronized Karaoke Lyrics */}
          <div className={styles.stageGrid}>
            {/* Left/Top Column: Audio Visualizer */}
            <div className={styles.visualizerPanel}>
              <div className={styles.visualizerCanvasWrap}>
                <AudioVisualizer className={styles.visualizerCanvas} />
              </div>
              <div className={styles.visualizerCaption}>
                <span>Espectro de áudio em tempo real</span>
                <span>
                  {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                </span>
              </div>
            </div>

            {/* Right/Bottom Column: Synchronized Karaoke Lyrics */}
            <div
              className={styles.karaokePanel}
              aria-label="Letra sincronizada com a música"
              data-testid="synced-lyrics-panel"
            >
              <div className={styles.karaokeHeader}>
                <span className={styles.karaokeTitle}>Letra Sincronizada</span>
                <span className={styles.karaokePartBadge}>
                  {currentLine.section}
                </span>
              </div>

              <div className={styles.karaokeViewport}>
                {/* Linha anterior -2 */}
                <div className={styles.lyricSlotFar}>
                  {prevLine2 ? (
                    <button
                      type="button"
                      className={styles.lyricPastFar}
                      onClick={() => seek(prevLine2.startTime)}
                      title="Voltar para este trecho"
                    >
                      {prevLine2.text}
                    </button>
                  ) : (
                    <span className={styles.lyricPlaceholder} aria-hidden="true">
                      &nbsp;
                    </span>
                  )}
                </div>

                {/* Linha anterior -1 */}
                <div className={styles.lyricSlotNear}>
                  {prevLine1 ? (
                    <button
                      type="button"
                      className={styles.lyricPastNear}
                      onClick={() => seek(prevLine1.startTime)}
                      title="Voltar para este trecho"
                      data-testid="lyric-prev-line"
                    >
                      {prevLine1.text}
                    </button>
                  ) : (
                    <span className={styles.lyricPlaceholder} aria-hidden="true">
                      &nbsp;
                    </span>
                  )}
                </div>

                {/* Linha ATUAL destacada */}
                <div
                  className={`${styles.lyricSlotCurrent} ${
                    currentLine.isInstrumental ? styles.instrumentalCurrent : ''
                  }`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <p
                    className={styles.lyricCurrentText}
                    data-testid="lyric-current-line"
                  >
                    {currentLine.text}
                  </p>
                  {currentLine.subtext && (
                    <span className={styles.lyricCurrentSubtext}>
                      {currentLine.subtext}
                    </span>
                  )}
                </div>

                {/* Próxima linha +1 */}
                <div className={styles.lyricSlotNear}>
                  {nextLine1 ? (
                    <button
                      type="button"
                      className={styles.lyricNextNear}
                      onClick={() => seek(nextLine1.startTime)}
                      title="Avançar para este trecho"
                      data-testid="lyric-next-line"
                    >
                      <span className={styles.nextLabel}>A seguir:</span>{' '}
                      {nextLine1.text}
                    </button>
                  ) : (
                    <span className={styles.lyricPlaceholder} aria-hidden="true">
                      &nbsp;
                    </span>
                  )}
                </div>

                {/* Próxima linha +2 */}
                <div className={styles.lyricSlotFar}>
                  {nextLine2 ? (
                    <button
                      type="button"
                      className={styles.lyricNextFar}
                      onClick={() => seek(nextLine2.startTime)}
                      title="Avançar para este trecho"
                    >
                      {nextLine2.text}
                    </button>
                  ) : (
                    <span className={styles.lyricPlaceholder} aria-hidden="true">
                      &nbsp;
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert if MP3 fails */}
          {hasError && errorMessage && (
            <div className={styles.errorBanner} role="alert">
              <div className={styles.errorTextWrap}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={retryLoad}
                className={styles.retryBtn}
              >
                <RefreshCw size={15} />
                <span>Tentar novamente</span>
              </button>
            </div>
          )}

          {/* Progress Bar (Draggable) */}
          <div className={styles.progressSection}>
            <span
              className={styles.timeDisplay}
              data-testid="player-current-time"
            >
              {formatAudioTime(currentTime)}
            </span>

            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
                aria-hidden="true"
              />
              <input
                type="range"
                min={0}
                max={duration || MUSICA_OFICIAL_META.durationSeconds}
                step={0.1}
                value={currentTime}
                onChange={(e) => seek( parseFloat(e.target.value) )}
                className={styles.progressInput}
                aria-label="Barra de progresso da música"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatAudioTime(currentTime)} de ${formatAudioTime(duration)}`}
                data-testid="player-progress-slider"
              />
            </div>

            <span className={styles.timeDisplay} data-testid="player-duration">
              {formatAudioTime(duration)}
            </span>
          </div>

          {/* Bottom Controls Row: Play, Pause, Stop, Volume, Full Lyrics */}
          <div className={styles.controlsRow}>
            <div className={styles.transportControls}>
              <button
                type="button"
                onClick={play}
                disabled={isPlaying || isLoading}
                className={`${styles.controlBtn} ${styles.playBtn} ${
                  isPlaying ? styles.activeTransport : ''
                }`}
                aria-label="Reproduzir música oficial"
                data-testid="player-play-btn"
              >
                {isLoading ? (
                  <Loader2 size={20} className={styles.spinIcon} />
                ) : (
                  <Play size={20} />
                )}
                <span>Play</span>
              </button>

              <button
                type="button"
                onClick={pause}
                disabled={!isPlaying}
                className={`${styles.controlBtn} ${styles.pauseBtn} ${
                  isPaused ? styles.activeTransport : ''
                }`}
                aria-label="Pausar música mantendo a posição"
                data-testid="player-pause-btn"
              >
                <Pause size={19} />
                <span>Pause</span>
              </button>

              <button
                type="button"
                onClick={stop}
                disabled={!isPlaying && !isPaused && currentTime === 0}
                className={`${styles.controlBtn} ${styles.stopBtn}`}
                aria-label="Parar música e voltar ao início"
                data-testid="player-stop-btn"
              >
                <Square size={18} />
                <span>Stop</span>
              </button>
            </div>

            <div className={styles.volumeControls}>
              <button
                type="button"
                onClick={toggleMute}
                className={styles.muteBtn}
                aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
                aria-pressed={isMuted}
                data-testid="player-mute-btn"
              >
                {renderVolumeIcon()}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className={styles.volumeSlider}
                aria-label="Controle de volume"
                data-testid="player-volume-slider"
              />
              <span className={styles.volumePercent}>
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

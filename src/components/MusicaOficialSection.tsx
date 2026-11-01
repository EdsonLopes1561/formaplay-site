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
import { MUSICA_OFICIAL_TRACK } from '../data/musicCatalog';
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
    isOfficialTrackActive,
    loadAndPlayTrack,
    play,
    pause,
    stop,
    seek,
    setVolume,
    toggleMute,
    openLyricsModal,
    retryLoad,
  } = useAudioPlayer();

  const isOfficialPlaying = isOfficialTrackActive && isPlaying;
  const isOfficialPaused = isOfficialTrackActive && isPaused;
  const isOfficialLoading = isOfficialTrackActive && isLoading;
  const displayCurrentTime = isOfficialTrackActive ? currentTime : 0;
  const displayDuration =
    isOfficialTrackActive && duration > 0
      ? duration
      : MUSICA_OFICIAL_META.durationSeconds;

  const handlePlay = async () => {
    if (!isOfficialTrackActive) {
      await loadAndPlayTrack(MUSICA_OFICIAL_TRACK);
    } else {
      await play();
    }
  };

  const handleSeek = (time: number) => {
    if (!isOfficialTrackActive) {
      loadAndPlayTrack(MUSICA_OFICIAL_TRACK).then(() => seek(time));
    } else {
      seek(time);
    }
  };

  const progressPercent =
    displayDuration > 0
      ? Math.min(100, Math.max(0, (displayCurrentTime / displayDuration) * 100))
      : 0;

  const currentLyricIdx = isOfficialTrackActive ? activeLyricIndex : 0;
  const prevLine2 =
    currentLyricIdx >= 2 ? SYNCED_LYRICS[currentLyricIdx - 2] : null;
  const prevLine1 =
    currentLyricIdx >= 1 ? SYNCED_LYRICS[currentLyricIdx - 1] : null;
  const currentLine = SYNCED_LYRICS[currentLyricIdx] || SYNCED_LYRICS[0];
  const nextLine1 =
    currentLyricIdx + 1 < SYNCED_LYRICS.length
      ? SYNCED_LYRICS[currentLyricIdx + 1]
      : null;
  const nextLine2 =
    currentLyricIdx + 2 < SYNCED_LYRICS.length
      ? SYNCED_LYRICS[currentLyricIdx + 2]
      : null;

  const getStatusLabel = () => {
    if (!isOfficialTrackActive) return 'Pronto para tocar';
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
                isOfficialPlaying
                  ? styles.statusPlaying
                  : isOfficialPaused
                  ? styles.statusPaused
                  : isOfficialLoading
                  ? styles.statusLoading
                  : hasError && isOfficialTrackActive
                  ? styles.statusError
                  : ''
              }`}
              role="status"
              aria-live="polite"
              data-testid="player-status-indicator"
            >
              {isOfficialLoading ? (
                <Loader2 size={15} className={styles.spinIcon} />
              ) : isOfficialPlaying ? (
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
                  {formatAudioTime(displayCurrentTime)} / {formatAudioTime(displayDuration)}
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
                      onClick={() => handleSeek(prevLine2.startTime)}
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
                      onClick={() => handleSeek(prevLine1.startTime)}
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
                      onClick={() => handleSeek(nextLine1.startTime)}
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
                      onClick={() => handleSeek(nextLine2.startTime)}
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
              {formatAudioTime(displayCurrentTime)}
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
                max={displayDuration}
                step={0.1}
                value={displayCurrentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className={styles.progressInput}
                aria-label="Barra de progresso da música"
                aria-valuemin={0}
                aria-valuemax={Math.round(displayDuration)}
                aria-valuenow={Math.round(displayCurrentTime)}
                aria-valuetext={`${formatAudioTime(displayCurrentTime)} de ${formatAudioTime(displayDuration)}`}
                data-testid="player-progress-slider"
              />
            </div>

            <span className={styles.timeDisplay} data-testid="player-duration">
              {formatAudioTime(displayDuration)}
            </span>
          </div>

          {/* Bottom Controls Row: Play, Pause, Stop, Volume, Full Lyrics */}
          <div className={styles.controlsRow}>
            <div className={styles.transportControls}>
              <button
                type="button"
                onClick={handlePlay}
                disabled={isOfficialPlaying || isOfficialLoading}
                className={`${styles.controlBtn} ${styles.playBtn} ${
                  isOfficialPlaying ? styles.activeTransport : ''
                }`}
                aria-label="Reproduzir música oficial"
                data-testid="player-play-btn"
              >
                {isOfficialLoading ? (
                  <Loader2 size={20} className={styles.spinIcon} />
                ) : (
                  <Play size={20} />
                )}
                <span>Play</span>
              </button>

              <button
                type="button"
                onClick={pause}
                disabled={!isOfficialPlaying}
                className={`${styles.controlBtn} ${styles.pauseBtn} ${
                  isOfficialPaused ? styles.activeTransport : ''
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
                disabled={!isOfficialPlaying && !isOfficialPaused && displayCurrentTime === 0}
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

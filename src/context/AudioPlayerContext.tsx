/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  MUSICA_OFICIAL_META,
  SYNCED_LYRICS,
  getActiveLyricIndex,
  type SyncedLyricLine,
} from '../data/musicaOficialLyrics';

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'error';

interface AudioPlayerContextValue {
  status: PlaybackStatus;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  activeLyricIndex: number;
  activeLyric: SyncedLyricLine;
  isLyricsModalOpen: boolean;
  hasInteracted: boolean;
  stopResetToken: number;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  togglePlayPause: () => Promise<void>;
  seek: (timeSeconds: number) => void;
  setVolume: (newVolume: number) => void;
  toggleMute: () => void;
  openLyricsModal: () => void;
  closeLyricsModal: () => void;
  retryLoad: () => Promise<void>;
  getFrequencyData: (buffer: Uint8Array) => boolean;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export const useAudioPlayer = (): AudioPlayerContextValue => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return ctx;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const triedFallbackRef = useRef<boolean>(false);
  const isSourceAssignedRef = useRef<boolean>(false);

  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(MUSICA_OFICIAL_META.durationSeconds);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [stopResetToken, setStopResetToken] = useState<number>(0);

  // Ensure lazy assignment of audio src only when user interacts
  const ensureAudioSource = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isSourceAssignedRef.current) {
      isSourceAssignedRef.current = true;
      audio.src = MUSICA_OFICIAL_META.audioSrc;
      audio.load();
    }
  }, []);

  // Initialize Web Audio API graph once after user gesture
  const ensureWebAudioGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || typeof window === 'undefined') return;

    try {
      const AudioCtxConstructor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtxConstructor) return;

      if (!audioContextRef.current) {
        const ctx = new AudioCtxConstructor();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.68;
        analyser.minDecibels = -85;
        analyser.maxDecibels = -22;

        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceNodeRef.current = source;
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
    } catch {
      // Fallback: if Web Audio API fails in a restricted browser, standard HTML5 audio still plays
    }
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    setErrorMessage(null);
    ensureAudioSource();
    await ensureWebAudioGraph();

    try {
      setStatus('loading');
      await audio.play();
      setStatus('playing');
    } catch {
      // Wait for error event if network/file missing, or handle play interruption
      if (audio.error) {
        setStatus('error');
        setErrorMessage(
          'Não foi possível carregar o arquivo da Música Oficial FormaPlay no momento.'
        );
      } else {
        setStatus('paused');
      }
    }
  }, [ensureAudioSource, ensureWebAudioGraph]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setStatus('paused');
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {
        // Ignore if not loaded yet
      }
    }
    setCurrentTime(0);
    setStatus('stopped');
    setStopResetToken((prev) => prev + 1);
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (status === 'playing') {
      pause();
    } else {
      await play();
    }
  }, [status, pause, play]);

  const seek = useCallback(
    (timeSeconds: number) => {
      const clamped = Math.max(0, Math.min(timeSeconds, duration || MUSICA_OFICIAL_META.durationSeconds));
      setCurrentTime(clamped);
      setHasInteracted(true);

      const audio = audioRef.current;
      if (!audio) return;

      ensureAudioSource();
      try {
        audio.currentTime = clamped;
      } catch {
        // If metadata isn't ready yet, apply once loadedmetadata fires
        const applySeekOnLoad = () => {
          try {
            audio.currentTime = clamped;
          } catch {
            // noop
          }
          audio.removeEventListener('loadedmetadata', applySeekOnLoad);
        };
        audio.addEventListener('loadedmetadata', applySeekOnLoad);
      }
    },
    [duration, ensureAudioSource]
  );

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    if (clamped > 0) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0) {
        audioRef.current.muted = false;
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  const openLyricsModal = useCallback(() => {
    setIsLyricsModalOpen(true);
  }, []);

  const closeLyricsModal = useCallback(() => {
    setIsLyricsModalOpen(false);
  }, []);

  const retryLoad = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    triedFallbackRef.current = false;
    isSourceAssignedRef.current = true;
    setErrorMessage(null);
    audio.src = MUSICA_OFICIAL_META.audioSrc;
    audio.load();
    await play();
  }, [play]);

  const getFrequencyData = useCallback((buffer: Uint8Array): boolean => {
    const analyser = analyserRef.current;
    if (!analyser) return false;
    analyser.getByteFrequencyData(buffer as Uint8Array<ArrayBuffer>);
    return true;
  }, []);

  // Cleanup AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.duration && Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
    audio.volume = volume;
    audio.muted = isMuted;
  };

  const handleWaiting = () => {
    setStatus((prev) => (prev === 'playing' ? 'loading' : prev));
  };

  const handlePlaying = () => {
    setErrorMessage(null);
    setStatus('playing');
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.ended && status !== 'stopped') {
      setStatus((prev) => (prev === 'stopped' ? 'stopped' : 'paused'));
    }
  };

  const handleEnded = () => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setStatus('stopped');
    setStopResetToken((prev) => prev + 1);
  };

  const handleError = () => {
    const audio = audioRef.current;
    if (!audio || !isSourceAssignedRef.current) return;

    if (!triedFallbackRef.current && MUSICA_OFICIAL_META.fallbackAudioSrc) {
      triedFallbackRef.current = true;
      audio.src = MUSICA_OFICIAL_META.fallbackAudioSrc;
      audio.load();
      if (status === 'loading' || status === 'playing') {
        audio.play().catch(() => {
          setStatus('error');
          setErrorMessage(
            'Não foi possível carregar o arquivo da Música Oficial FormaPlay (/audio/forma-play-musica-oficial.mp3).'
          );
        });
      }
      return;
    }

    setStatus('error');
    setErrorMessage(
      'Arquivo de áudio não encontrado ou indisponível no momento (/audio/forma-play-musica-oficial.mp3).'
    );
  };

  const activeLyricIndex = getActiveLyricIndex(currentTime);
  const activeLyric = SYNCED_LYRICS[activeLyricIndex] || SYNCED_LYRICS[0];

  const value: AudioPlayerContextValue = {
    status,
    isPlaying: status === 'playing',
    isPaused: status === 'paused',
    isLoading: status === 'loading',
    hasError: status === 'error',
    errorMessage,
    currentTime,
    duration,
    volume,
    isMuted,
    activeLyricIndex,
    activeLyric,
    isLyricsModalOpen,
    hasInteracted,
    stopResetToken,
    play,
    pause,
    stop,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    openLyricsModal,
    closeLyricsModal,
    retryLoad,
    getFrequencyData,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      {/* Elemento de áudio único e compartilhado em todo o aplicativo (lazy preload="none") */}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        aria-hidden="true"
      />
    </AudioPlayerContext.Provider>
  );
};

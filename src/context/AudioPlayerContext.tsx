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
import {
  MUSICA_OFICIAL_TRACK,
  OFFICIAL_TRACK_ID,
  type MusicTrack,
} from '../data/musicCatalog';

export type PlaybackStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'stopped'
  | 'error';

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
  currentTrack: MusicTrack;
  isOfficialTrackActive: boolean;
  modalTrack: MusicTrack;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  togglePlayPause: () => Promise<void>;
  seek: (timeSeconds: number) => void;
  setVolume: (newVolume: number) => void;
  toggleMute: () => void;
  openLyricsModal: () => void;
  openTrackLyricsModal: (track: MusicTrack) => void;
  closeLyricsModal: () => void;
  retryLoad: () => Promise<void>;
  getFrequencyData: (buffer: Uint8Array) => boolean;
  loadAndPlayTrack: (track: MusicTrack) => Promise<void>;
  selectTrack: (track: MusicTrack) => void;
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

  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(MUSICA_OFICIAL_TRACK);
  const currentTrackRef = useRef<MusicTrack>(MUSICA_OFICIAL_TRACK);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  const [modalTrack, setModalTrack] = useState<MusicTrack>(MUSICA_OFICIAL_TRACK);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(MUSICA_OFICIAL_META.durationSeconds);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [stopResetToken, setStopResetToken] = useState<number>(0);

  // Lazy assignment of audio source
  const ensureAudioSource = useCallback((targetSrc?: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    const srcToUse = targetSrc || currentTrackRef.current.audioSrc || MUSICA_OFICIAL_META.audioSrc;
    if (!isSourceAssignedRef.current || audio.src !== srcToUse) {
      isSourceAssignedRef.current = true;
      audio.src = srcToUse;
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
      // Fallback: if Web Audio API fails in restricted browser, standard HTML5 audio still plays
    }
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    setErrorMessage(null);

    // If active track is not the official track when play() is called directly, ensure current track's source is loaded
    const active = currentTrackRef.current;
    if (!active.isAvailable || !active.audioSrc) {
      // If active track has no audio, switch back to official track
      setCurrentTrack(MUSICA_OFICIAL_TRACK);
      currentTrackRef.current = MUSICA_OFICIAL_TRACK;
      setDuration(MUSICA_OFICIAL_META.durationSeconds);
      ensureAudioSource(MUSICA_OFICIAL_META.audioSrc);
    } else {
      ensureAudioSource(active.audioSrc);
    }

    await ensureWebAudioGraph();

    try {
      setStatus('loading');
      await audio.play();
      setStatus('playing');
    } catch {
      if (audio.error) {
        setStatus('error');
        setErrorMessage(
          `Não foi possível carregar o arquivo de áudio (${currentTrackRef.current.title}) no momento.`
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
      const maxDuration = duration || currentTrackRef.current.durationSeconds || MUSICA_OFICIAL_META.durationSeconds;
      const clamped = Math.max(0, Math.min(timeSeconds, maxDuration));
      setCurrentTime(clamped);
      setHasInteracted(true);

      const audio = audioRef.current;
      if (!audio) return;

      ensureAudioSource();
      try {
        audio.currentTime = clamped;
      } catch {
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

  const selectTrack = useCallback((track: MusicTrack) => {
    setCurrentTrack(track);
    currentTrackRef.current = track;
    setDuration(track.durationSeconds || 0);
  }, []);

  const loadAndPlayTrack = useCallback(
    async (track: MusicTrack) => {
      setHasInteracted(true);

      // If track is not available (e.g. aguardando áudio), do not throw audio errors
      if (!track.isAvailable || !track.audioSrc) {
        // Stop current audio if playing to prevent playing wrong song
        if (status === 'playing' && audioRef.current) {
          audioRef.current.pause();
        }
        selectTrack(track);
        setCurrentTime(0);
        setStatus('idle');
        return;
      }

      // If clicking on the track that is already active
      if (currentTrackRef.current.id === track.id) {
        if (status === 'playing') {
          pause();
        } else {
          await play();
        }
        return;
      }

      // Switching to another track
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        try {
          audio.currentTime = 0;
        } catch {
          // noop
        }
      }

      setCurrentTime(0);
      selectTrack(track);
      setErrorMessage(null);

      if (audio) {
        isSourceAssignedRef.current = true;
        audio.src = track.audioSrc;
        audio.load();
      }

      await ensureWebAudioGraph();

      try {
        setStatus('loading');
        if (audio) {
          await audio.play();
          setStatus('playing');
        }
      } catch {
        if (audio?.error) {
          setStatus('error');
          setErrorMessage(`Não foi possível reproduzir "${track.title}".`);
        } else {
          setStatus('paused');
        }
      }
    },
    [status, pause, play, selectTrack, ensureWebAudioGraph]
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
    setModalTrack(currentTrackRef.current);
    setIsLyricsModalOpen(true);
  }, []);

  const openTrackLyricsModal = useCallback((track: MusicTrack) => {
    setModalTrack(track);
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
    audio.src = currentTrackRef.current.audioSrc || MUSICA_OFICIAL_META.audioSrc;
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

    const active = currentTrackRef.current;

    if (
      active.id === OFFICIAL_TRACK_ID &&
      !triedFallbackRef.current &&
      active.fallbackAudioSrc
    ) {
      triedFallbackRef.current = true;
      audio.src = active.fallbackAudioSrc;
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
      `Arquivo de áudio não encontrado ou indisponível (${active.title}).`
    );
  };

  const isOfficialTrackActive = currentTrack.id === OFFICIAL_TRACK_ID;

  const activeLyricIndex = isOfficialTrackActive
    ? getActiveLyricIndex(currentTime)
    : 0;

  const activeLyric: SyncedLyricLine = isOfficialTrackActive
    ? SYNCED_LYRICS[activeLyricIndex] || SYNCED_LYRICS[0]
    : {
        id: currentTrack.id,
        startTime: 0,
        endTime: duration || 180,
        text: currentTrack.title,
        subtext: currentTrack.collectionLabel,
        section: currentTrack.genre,
        isInstrumental: false,
      };

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
    currentTrack,
    isOfficialTrackActive,
    modalTrack,
    play,
    pause,
    stop,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    openLyricsModal,
    openTrackLyricsModal,
    closeLyricsModal,
    retryLoad,
    getFrequencyData,
    loadAndPlayTrack,
    selectTrack,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      {/* Elemento de áudio único e compartilhado em todo o site */}
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

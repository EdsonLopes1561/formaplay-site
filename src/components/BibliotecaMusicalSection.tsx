import React, { useState, useMemo } from 'react';
import {
  Search,
  Play,
  Pause,
  Square,
  Volume2,
  Volume1,
  VolumeX,
  Music,
  FileText,
  Clock,
  Radio,
  Info,
  X,
  Disc,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import {
  MUSIC_CATALOG,
  MUSIC_COLLECTIONS,
  getAvailableGenres,
  type MusicTrack,
  type MusicCollectionId,
} from '../data/musicCatalog';
import { formatAudioTime } from '../data/musicaOficialLyrics';
import { AudioVisualizer } from './AudioVisualizer';
import styles from './BibliotecaMusicalSection.module.css';

export const BibliotecaMusicalSection: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    isPaused,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    loadAndPlayTrack,
    pause,
    stop,
    seek,
    setVolume,
    toggleMute,
    openTrackLyricsModal,
  } = useAudioPlayer();

  const [selectedCollection, setSelectedCollection] =
    useState<MusicCollectionId>('todas');
  const [selectedGenre, setSelectedGenre] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [focusedTrack, setFocusedTrack] = useState<MusicTrack | null>(null);

  const genres = useMemo(() => getAvailableGenres(), []);

  // Filter catalog based on collection, genre, and search text
  const filteredTracks = useMemo(() => {
    return MUSIC_CATALOG.filter((track) => {
      const matchCollection =
        selectedCollection === 'todas' ||
        track.collection === selectedCollection;

      const matchGenre =
        selectedGenre === 'todos' || track.genre === selectedGenre;

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        track.title.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query) ||
        track.description.toLowerCase().includes(query) ||
        (track.versionInfo && track.versionInfo.toLowerCase().includes(query));

      return matchCollection && matchGenre && matchSearch;
    });
  }, [selectedCollection, selectedGenre, searchQuery]);

  // The track displayed in the dedicated library player pane
  const activeLibraryTrack: MusicTrack = useMemo(() => {
    if (focusedTrack) return focusedTrack;
    if (currentTrack && !currentTrack.isOfficial) return currentTrack;
    return MUSIC_CATALOG[0];
  }, [focusedTrack, currentTrack]);

  const isCurrentActivePlaying =
    isPlaying && currentTrack.id === activeLibraryTrack.id;
  const isCurrentActivePaused =
    isPaused && currentTrack.id === activeLibraryTrack.id;
  const isCurrentActiveLoading =
    isLoading && currentTrack.id === activeLibraryTrack.id;

  const activeDuration =
    currentTrack.id === activeLibraryTrack.id && duration > 0
      ? duration
      : activeLibraryTrack.durationSeconds || 180;

  const activeCurrentTime =
    currentTrack.id === activeLibraryTrack.id ? currentTime : 0;

  const progressPercent =
    activeDuration > 0
      ? Math.min(100, Math.max(0, (activeCurrentTime / activeDuration) * 100))
      : 0;

  const handleTrackCardClick = (track: MusicTrack) => {
    setFocusedTrack(track);
    if (track.isAvailable) {
      loadAndPlayTrack(track);
    }
  };

  const handleActivePlayerToggle = () => {
    if (activeLibraryTrack.isAvailable) {
      loadAndPlayTrack(activeLibraryTrack);
    }
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  const getStatusBadge = (track: MusicTrack) => {
    if (track.isAvailable) {
      return (
        <span className={styles.statusBadgeAvailable}>
          <CheckCircle2 size={13} />
          <span>Disponível</span>
        </span>
      );
    }
    if (track.status === 'em_producao') {
      return (
        <span className={styles.statusBadgeProduction}>
          <span className={styles.pulseDot} aria-hidden="true" />
          <span>Em produção</span>
        </span>
      );
    }
    return (
      <span className={styles.statusBadgePending}>
        <Clock size={13} />
        <span>Aguardando áudio</span>
      </span>
    );
  };

  return (
    <section
      id="biblioteca-desafio-logistico"
      className={styles.section}
      aria-label="Biblioteca Musical FormaPlay"
    >
      <div className="container">
        {/* Header da Biblioteca */}
        <div className={styles.headerBlock}>
          <div className={styles.sectionBadge}>
            <Disc size={15} />
            <span>Acervo Oficial & Catálogo de Trilhas</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Biblioteca Musical FormaPlay
          </h2>
          <p className={styles.sectionSubtitle}>
            Do rock de arena ao pop urbano, das batidas de estrada às homenagens do Empreenda:
            explore o acervo completo de gravações criadas para o{' '}
            <strong>Desafio Logístico</strong> e nossa trajetória pedagógica.
          </p>
        </div>

        {/* PLAYER DEDICADO DA BIBLIOTECA */}
        <div className={styles.playerWrapper} aria-label="Player da Biblioteca">
          <div className={styles.playerShell}>
            <div className={styles.playerHeader}>
              <div className={styles.trackMetaLeft}>
                <div className={styles.coverThumbnailWrap} aria-hidden="true">
                  {activeLibraryTrack.coverImage ? (
                    <img
                      src={activeLibraryTrack.coverImage}
                      alt={activeLibraryTrack.title}
                      className={styles.coverThumb}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.coverFallback}>
                      <Music size={26} />
                    </div>
                  )}
                </div>

                <div className={styles.trackDetails}>
                  <div className={styles.trackTags}>
                    <span className={styles.collectionPill}>
                      {activeLibraryTrack.collectionLabel}
                    </span>
                    <span className={styles.genrePill}>
                      {activeLibraryTrack.genre}
                    </span>
                    {activeLibraryTrack.badge && (
                      <span className={styles.badgeCustom}>
                        {activeLibraryTrack.badge}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.activeTrackTitle}>
                    {activeLibraryTrack.title}
                  </h3>
                  <p className={styles.activeTrackDesc}>
                    {activeLibraryTrack.description}
                  </p>
                  {activeLibraryTrack.versionInfo && (
                    <p className={styles.activeTrackVersion}>
                      <strong>Versão:</strong> {activeLibraryTrack.versionInfo}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.trackMetaRight}>
                {getStatusBadge(activeLibraryTrack)}
                <button
                  type="button"
                  onClick={() => openTrackLyricsModal(activeLibraryTrack)}
                  className={styles.lyricsBtn}
                  aria-label="Consultar letra ou nota informativa desta faixa"
                >
                  <FileText size={16} />
                  <span>Ver letra / detalhes</span>
                </button>
              </div>
            </div>

            {/* Painel de reprodução & ondas se a música tiver áudio disponível */}
            {activeLibraryTrack.isAvailable ? (
              <div className={styles.playbackControlsStage}>
                {/* Visualizador de ondas em tempo real */}
                <div className={styles.visualizerRow}>
                  <div className={styles.visualizerWrap}>
                    <AudioVisualizer
                      className={styles.visualizerCanvas}
                      barCount={36}
                      minHeight={45}
                    />
                  </div>
                  <div className={styles.visualizerTime}>
                    <span>
                      {formatAudioTime(activeCurrentTime)} /{' '}
                      {formatAudioTime(activeDuration)}
                    </span>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className={styles.progressRow}>
                  <span className={styles.timeLabel}>
                    {formatAudioTime(activeCurrentTime)}
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
                      max={activeDuration}
                      step={0.1}
                      value={activeCurrentTime}
                      onChange={(e) => seek(parseFloat(e.target.value))}
                      className={styles.progressSlider}
                      aria-label="Avançar ou retroceder na música"
                    />
                  </div>
                  <span className={styles.timeLabel}>
                    {formatAudioTime(activeDuration)}
                  </span>
                </div>

                {/* Controles de Transporte e Volume */}
                <div className={styles.transportRow}>
                  <div className={styles.transportBtns}>
                    <button
                      type="button"
                      onClick={handleActivePlayerToggle}
                      className={`${styles.playBtn} ${
                        isCurrentActivePlaying ? styles.playBtnActive : ''
                      }`}
                      aria-label={
                        isCurrentActivePlaying
                          ? 'Pausar música'
                          : 'Reproduzir música'
                      }
                    >
                      {isCurrentActiveLoading ? (
                        <Loader2 size={20} className={styles.spinIcon} />
                      ) : isCurrentActivePlaying ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} fill="currentColor" />
                      )}
                      <span>
                        {isCurrentActivePlaying ? 'Pausar' : 'Reproduzir'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={pause}
                      disabled={!isCurrentActivePlaying}
                      className={styles.secondaryTransportBtn}
                      aria-label="Pausar"
                    >
                      <Pause size={17} />
                      <span>Pause</span>
                    </button>

                    <button
                      type="button"
                      onClick={stop}
                      disabled={
                        !isCurrentActivePlaying &&
                        !isCurrentActivePaused &&
                        activeCurrentTime === 0
                      }
                      className={styles.secondaryTransportBtn}
                      aria-label="Parar"
                    >
                      <Square size={16} />
                      <span>Stop</span>
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className={styles.volumeGroup}>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className={styles.volumeMuteBtn}
                      aria-label={isMuted ? 'Desmutar' : 'Mutar áudio'}
                    >
                      {renderVolumeIcon()}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className={styles.volumeSlider}
                      aria-label="Ajustar volume"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Faixa aguardando envio do arquivo de áudio */
              <div className={styles.awaitingAudioNotice}>
                <div className={styles.awaitingLeft}>
                  <AlertCircle size={22} className={styles.awaitingIcon} />
                  <div>
                    <h4 className={styles.awaitingTitle}>
                      Gravação aguardando arquivo de áudio original
                    </h4>
                    <p className={styles.awaitingDesc}>
                      A estrutura técnica desta composição está cadastrada. O arquivo{' '}
                      <code>
                        {activeLibraryTrack.audioSrc || 'public/audio/biblioteca/...'}
                      </code>{' '}
                      será disponibilizado nesta área assim que a mixagem definitiva for concluída.
                    </p>
                  </div>
                </div>
                <div className={styles.durationTag}>
                  <Clock size={15} />
                  <span>Duração: {activeLibraryTrack.duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BARRA DE FILTROS & BUSCA */}
        <div className={styles.filterBar}>
          <div className={styles.collectionsFilter}>
            <button
              type="button"
              onClick={() => setSelectedCollection('todas')}
              className={`${styles.collectionFilterBtn} ${
                selectedCollection === 'todas' ? styles.filterBtnActive : ''
              }`}
            >
              <span>Todas as Coleções</span>
              <span className={styles.filterCount}>{MUSIC_CATALOG.length}</span>
            </button>

            {MUSIC_COLLECTIONS.map((col) => {
              const count = MUSIC_CATALOG.filter(
                (t) => t.collection === col.id
              ).length;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedCollection(col.id)}
                  className={`${styles.collectionFilterBtn} ${
                    selectedCollection === col.id ? styles.filterBtnActive : ''
                  }`}
                >
                  <span>{col.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.genreAndSearchRow}>
            {/* Filtro por Gênero */}
            <div className={styles.genreSelectWrapper}>
              <label htmlFor="genre-select" className={styles.genreLabel}>
                Gênero:
              </label>
              <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={styles.genreSelect}
              >
                <option value="todos">Todos os ritmos ({genres.length})</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo de Busca */}
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar música, gênero ou arranjo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Buscar gravações no catálogo"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  aria-label="Limpar busca"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GRADE DE MÚSICAS DO CATÁLOGO */}
        <div className={styles.catalogGrid}>
          {filteredTracks.map((track) => {
            const isThisTrackPlaying =
              isPlaying && currentTrack.id === track.id;
            const isThisTrackFocused = activeLibraryTrack.id === track.id;

            return (
              <article
                key={track.id}
                className={`${styles.trackCard} ${
                  isThisTrackFocused ? styles.cardFocused : ''
                } ${isThisTrackPlaying ? styles.cardPlaying : ''}`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.genreTag}>
                    <Headphones size={13} />
                    <span>{track.genre}</span>
                  </div>
                  <div className={styles.cardHeaderRight}>
                    <span className={styles.durationBadge}>
                      <Clock size={12} />
                      {track.duration}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardCoverWrap} aria-hidden="true">
                    {track.coverImage ? (
                      <img
                        src={track.coverImage}
                        alt={track.title}
                        className={styles.cardCoverImg}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.cardCoverFallback}>
                        <Music size={28} />
                      </div>
                    )}
                    {isThisTrackPlaying && (
                      <div className={styles.cardPlayingOverlay}>
                        <Radio size={24} className={styles.pulseRadio} />
                      </div>
                    )}
                  </div>

                  <div className={styles.cardTextContent}>
                    <span className={styles.cardCollectionName}>
                      {track.collectionLabel}
                    </span>
                    <h4 className={styles.cardTrackTitle}>{track.title}</h4>
                    <p className={styles.cardTrackDesc}>{track.description}</p>
                    {track.versionInfo && (
                      <p className={styles.cardVersionText}>
                        <strong>Nota de versão:</strong> {track.versionInfo}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardStatusWrap}>
                    {getStatusBadge(track)}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      onClick={() => openTrackLyricsModal(track)}
                      className={styles.cardDetailsBtn}
                      title="Ver detalhes e letra"
                      aria-label={`Ver letra e detalhes de ${track.title}`}
                    >
                      <FileText size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTrackCardClick(track)}
                      className={`${styles.cardActionBtn} ${
                        isThisTrackPlaying ? styles.cardActionPlaying : ''
                      }`}
                      aria-label={
                        track.isAvailable
                          ? isThisTrackPlaying
                            ? `Pausar ${track.title}`
                            : `Ouvir ${track.title}`
                          : `Ver detalhes de ${track.title}`
                      }
                    >
                      {track.isAvailable ? (
                        isThisTrackPlaying ? (
                          <>
                            <Pause size={15} />
                            <span>Pausar</span>
                          </>
                        ) : (
                          <>
                            <Play size={15} fill="currentColor" />
                            <span>Ouvir</span>
                          </>
                        )
                      ) : (
                        <>
                          <Info size={15} />
                          <span>Detalhes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Caso nenhum resultado seja encontrado no filtro */}
        {filteredTracks.length === 0 && (
          <div className={styles.emptyResultsBox}>
            <Music size={40} className={styles.emptyIcon} />
            <h4 className={styles.emptyTitle}>Nenhuma música encontrada</h4>
            <p className={styles.emptyDesc}>
              Tente selecionar outro gênero, limpar os termos de busca ou mudar a coleção.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCollection('todas');
                setSelectedGenre('todos');
                setSearchQuery('');
              }}
              className={styles.resetFiltersBtn}
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        {/* Caixa de Transparência & Organização dos Arquivos */}
        <div className={styles.noticeBox} role="note">
          <Info size={24} className={styles.noticeIcon} />
          <div className={styles.noticeBody}>
            <h4 className={styles.noticeTitle}>
              Estrutura Técnica Escalável & Publicação das Gravações
            </h4>
            <p className={styles.noticeText}>
              O catálogo está configurado para acolher novas gravações em fluxo contínuo.
              Os arquivos de áudio originais devem ser adicionados na pasta{' '}
              <code>public/audio/biblioteca/</code> no formato MP3 otimizado para navegadores.
              Nenhuma faixa fictícia é exibida como disponível sem o respectivo arquivo real
              cadastrado e auditado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


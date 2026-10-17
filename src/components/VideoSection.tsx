import React, { useState } from 'react';
import styles from './VideoSection.module.css';
import { PlayCircle, Award, ArrowRight, Video } from 'lucide-react';
import { Link } from '../router/RouterContext';
import { VIDEOS } from '../data/videos';

export const VideoSection: React.FC = () => {
  // 0: Apresentação (fs2an3x7TXs), 1: Semifinal (Y1DsO5okIPU)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // We feature the two official videos on the home page: Apresentação (0) and Semifinal (1)
  const featuredVideos = [
    VIDEOS[0], // Apresentação Oficial e 1ª Fase
    VIDEOS[1]  // Semifinal Empreenda Senac
  ];

  const currentVideo = featuredVideos[selectedVideoIndex];

  return (
    <section id="video" className={`section ${styles.videoSection}`} aria-label="Seção de vídeos e demonstração prática">
      <div className="container">
        
        {/* Alternador de vídeos (Tabs) */}
        <div className={styles.videoTabs} role="tablist" aria-label="Alternar entre vídeos da FormaPlay">
          {featuredVideos.map((vid, idx) => (
            <button
              key={vid.slug}
              type="button"
              role="tab"
              aria-selected={selectedVideoIndex === idx}
              className={`${styles.tabBtn} ${selectedVideoIndex === idx ? styles.tabBtnActive : ''}`}
              onClick={() => setSelectedVideoIndex(idx)}
            >
              <Video size={14} />
              <span>{idx === 0 ? 'Vídeo 1: Apresentação do Jogo' : 'Vídeo 2: Semifinal Empreenda Senac'}</span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={`${styles.textContent} animate-fade-in-up`}>
            <div className={styles.badge}>
              <Award size={16} />
              <span>{currentVideo.badge}</span>
            </div>

            <h2 className="section-title">
              {currentVideo.title}
            </h2>
            <p className="section-subtitle">
              {currentVideo.shortDescription}
            </p>

            <p className={styles.description}>
              {currentVideo.contextoPedagogico.solucao}
            </p>
            
            <div className={styles.actions}>
              <Link
                href={currentVideo.url}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <span>Assistir na Página Dedicada</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/videos"
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#f8fafc', borderColor: 'rgba(255,255,255,0.25)' }}
              >
                <PlayCircle size={18} />
                <span>Ver Todos os Vídeos</span>
              </Link>
            </div>
          </div>
          
          <div className={`${styles.videoContainer} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <iframe 
              className={styles.iframe}
              src={`${currentVideo.embedUrl}?rel=0`} 
              title={currentVideo.title} 
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

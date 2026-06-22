import React from 'react';
import styles from './VideoSection.module.css';
import { PlayCircle } from 'lucide-react';

export const VideoSection: React.FC = () => {
  return (
    <section id="video" className={`section ${styles.videoSection}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.textContent} animate-fade-in-up`}>
            <div className={styles.badgeWrapper}>
              <span className={styles.senacBadge}>
                Aprovado para a 2ª fase do Empreenda Senac
              </span>
            </div>
            <h2 className="section-title">
              Conheça o Desafio Logístico em 1 minuto
            </h2>
            <p className="section-subtitle">
              Veja como o Desafio Logístico transforma o aprendizado em uma experiência prática, estratégica e envolvente.
            </p>
            <div className={styles.senacHighlight}>
              <p>
                Este vídeo foi apresentado na avaliação do Empreenda Senac, etapa em que o projeto foi aprovado para avançar à segunda fase do programa.
              </p>
            </div>
            <p className={styles.description}>
              Um jogo educacional criado para aproximar teoria e prática, estimulando planejamento, tomada de decisão, negociação e raciocínio logístico.
            </p>
            
            <div className={styles.actions}>
              <a href="https://youtu.be/fs2an3x7TXs?si=xTSepnNPixuUe8M6" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <PlayCircle size={20} />
                Assistir no YouTube
              </a>
              <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Solicitar orçamento
              </a>
            </div>
          </div>
          
          <div className={`${styles.videoContainer} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <iframe 
              className={styles.iframe}
              src="https://www.youtube.com/embed/fs2an3x7TXs" 
              title="Apresentação Desafio Logístico FormaPlay" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './LinhaDeJogos.module.css';
import { Puzzle, Truck, BookOpen, Crown, Laptop, PenTool } from 'lucide-react';
import { getWhatsAppOnlineLink, getWhatsAppPersonalizadoLink } from '../constants';
import { FormaPlayText } from './FormaPlayText';

export const LinhaDeJogos: React.FC = () => {
  return (
    <section id="jogos" className={`section ${styles.linhaDeJogos}`}>
      <div className="container">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">Soluções <FormaPlayText /></h2>
          <p className="section-subtitle">
            Soluções educacionais criadas para tornar o aprendizado mais prático, estratégico e participativo.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Card 1 - Desafio Logístico */}
          <div className={`${styles.card} ${styles.cardFeatured} animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
            <div className={styles.iconWrapper}>
              <Truck className={styles.icon} />
            </div>
            <h3>Desafio Logístico</h3>
            <p>
              Produto principal, jogo físico educacional de logística.
            </p>
            <a href="#desafio-logistico" className={`btn btn-primary ${styles.btnFull}`}>
              Conhecer o Jogo
            </a>
          </div>

          {/* Card 2 - Desafio Logístico Premium */}
          <div className={`${styles.card} ${styles.cardPremium} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.iconWrapperPremium}>
              <Crown className={styles.icon} />
            </div>
            <h3>Desafio Logístico Premium</h3>
            <p>
              Versão especial com acabamento diferenciado e apresentação superior.
            </p>
            <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.btnFull}`}>
              Solicitar Orçamento
            </a>
          </div>

          {/* Card 3 - Desafio Kids */}
          <div className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
            <div className={styles.iconWrapperKids}>
              <Puzzle className={styles.icon} />
            </div>
            <h3>Desafio Kids</h3>
            <p>
              Versão em desenvolvimento para crianças, com proposta lúdica e educativa.
            </p>
            <button className={`btn btn-outline ${styles.btnFull}`} disabled>
              Em desenvolvimento
            </button>
          </div>

          {/* Card 4 - Edição do Professor */}
          <div className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.iconWrapperProf}>
              <BookOpen className={styles.icon} />
            </div>
            <h3>Edição do Professor</h3>
            <p>
              Versão pensada para aplicação em sala de aula, com apoio ao professor e dinâmica orientada.
            </p>
            <a href="#orcamento" className={`btn btn-outline ${styles.btnFull}`}>
              Saiba mais
            </a>
          </div>

          {/* Card 5 - Desafio Online */}
          <div className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: '0.5s' }}>
            <div className={styles.iconWrapperOnline}>
              <Laptop className={styles.icon} />
            </div>
            <h3>Desafio Online — Em breve</h3>
            <p>
              Experiência digital gratuita em desenvolvimento, no formato de jogo de trilha.
            </p>
            <a href={getWhatsAppOnlineLink()} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.btnFull}`}>
              Quero ser avisado
            </a>
          </div>

          {/* Card 6 - Monte seu jogo */}
          <div className={`${styles.card} animate-fade-in-up`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.iconWrapperCustom}>
              <PenTool className={styles.icon} />
            </div>
            <h3>Monte seu jogo</h3>
            <p>
              Conte sua ideia e avaliamos a possibilidade de transformar seu conteúdo em um jogo educacional personalizado, com cartas, tabuleiro, peças e identidade visual sob medida.
            </p>
            <a href={getWhatsAppPersonalizadoLink()} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.btnFull}`}>
              Consultar possibilidade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

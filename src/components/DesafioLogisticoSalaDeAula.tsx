import React from 'react';
import styles from './DesafioLogisticoSalaDeAula.module.css';
import { ArrowRight, GraduationCap, Users, Sparkles, Target } from 'lucide-react';
import { Link } from '../router/RouterContext';

export const DesafioLogisticoSalaDeAula: React.FC = () => {
  return (
    <section 
      id="desafio-sala-de-aula" 
      className={styles.section} 
      aria-label="Desafio Logístico em sala de aula"
    >
      <div className="container">
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>Evidências Reais de Aplicação</span>
          </div>
          <h2 className={styles.title}>Desafio Logístico em sala de aula</h2>
          <p className={styles.subtitle}>
            Veja o Desafio Logístico sendo utilizado em situações reais de aprendizagem, com interação, planejamento, estratégia e tomada de decisão.
          </p>
        </div>

        {/* 3 REAL APPLICATION CARDS */}
        <div className={styles.cardsGrid}>
          {/* CARD 1 */}
          <article className={styles.card}>
            <div className={styles.imageContainer}>
              <picture>
                <source 
                  media="(min-width: 768px)" 
                  srcSet="/galeria-sala-de-aula/alunos-jogando-desafio-logistico-horizontal.webp" 
                  type="image/webp" 
                />
                <img
                  src="/galeria-sala-de-aula/alunos-jogando-desafio-logistico-horizontal.webp"
                  alt="Alunos utilizando o jogo educacional Desafio Logístico em atividade prática de logística"
                  className={styles.cardImage}
                  loading="lazy"
                  decoding="async"
                  width="746"
                  height="630"
                />
              </picture>
              <div className={styles.imageOverlayBadge}>
                <Users size={14} />
                <span>Dinâmica em Grupo</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>
                <Sparkles size={13} />
                Interação Real
              </span>
              <h3 className={styles.cardTitle}>Alunos jogando o Desafio Logístico</h3>
              <p className={styles.cardText}>
                Trabalho em equipe, interação e tomada de decisão durante a partida.
              </p>
            </div>
          </article>

          {/* CARD 2 */}
          <article className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src="/galeria-sala-de-aula/atividade-pratica-logistica-desafio-logistico.webp"
                alt="Participantes utilizando tabuleiro, cartas e recursos do Desafio Logístico em atividade prática"
                className={styles.cardImage}
                loading="lazy"
                decoding="async"
                width="1325"
                height="746"
              />
              <div className={styles.imageOverlayBadge}>
                <Target size={14} />
                <span>Tabuleiro & Recursos</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>
                <Sparkles size={13} />
                Metodologia Prática
              </span>
              <h3 className={styles.cardTitle}>Aprender logística jogando</h3>
              <p className={styles.cardText}>
                Planejamento, custos, cartas e imprevistos transformados em situações práticas de decisão.
              </p>
            </div>
          </article>

          {/* CARD 3 */}
          <article className={styles.card}>
            <div className={styles.imageContainer}>
              <picture>
                <source 
                  media="(min-width: 768px)" 
                  srcSet="/galeria-sala-de-aula/tomada-de-decisao-desafio-logistico-horizontal.webp" 
                  type="image/webp" 
                />
                <img
                  src="/galeria-sala-de-aula/tomada-de-decisao-desafio-logistico-horizontal.webp"
                  alt="Participantes utilizando o Desafio Logístico em atividade prática de tomada de decisão"
                  className={styles.cardImage}
                  loading="lazy"
                  decoding="async"
                  width="746"
                  height="650"
                />
              </picture>
              <div className={styles.imageOverlayBadge}>
                <Target size={14} />
                <span>Ação & Consequência</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>
                <Sparkles size={13} />
                Raciocínio Crítico
              </span>
              <h3 className={styles.cardTitle}>Tomada de decisão durante a partida</h3>
              <p className={styles.cardText}>
                Os participantes analisam situações, fazem escolhas e acompanham as consequências ao longo do jogo.
              </p>
            </div>
          </article>
        </div>

        {/* CTA ACTIONS */}
        <div className={styles.actionsWrapper}>
          <Link href="/desafio-logistico" className={styles.btnPrimary}>
            <span>Conheça o Desafio Logístico</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/logistica-em-sala-de-aula" className={styles.btnSecondary}>
            <GraduationCap size={18} />
            <span>Veja ideias para aulas de logística</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

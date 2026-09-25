import React from 'react';
import styles from './Hero.module.css';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from '../router/RouterContext';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.hero} aria-label="Apresentação institucional FormaPlay">
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.content} animate-fade-in-up`}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Jogos Educacionais & Metodologias Ativas</span>
          </div>
          
          <h1 className={styles.title}>
            Jogos educacionais que transformam conhecimento em experiências de aprendizagem.
          </h1>
          
          <p className={styles.description}>
            Desenvolvemos ferramentas didáticas práticas e imersivas que unem estratégia, tomada de decisão e participação ativa de alunos e professores em sala de aula.
          </p>

          <div className={styles.keyHighlights}>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Aprender na prática</span>
            </div>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Engajamento real</span>
            </div>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Tomada de decisão</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnHeroPrimary}`}>
              <span>Conhecer o Desafio Logístico</span>
              <ArrowRight size={20} />
            </Link>
            <a
              href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${styles.btnHeroSecondary}`}
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
        
        <div className={`${styles.imageWrapper} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.productInfoCard}>
            <span className={styles.productStatus}>Produto Principal Disponível</span>
            <h2 className={styles.productTitle}>Desafio Logístico</h2>
            <p className={styles.productDesc}>Estratégia, planejamento de rotas e decisões financeiras na prática.</p>
            <Link href="/desafio-logistico" className={styles.productLink}>
              Ver detalhes do jogo <ArrowRight size={14} />
            </Link>
          </div>
          <img 
            src="/desafio-logistico-produto-mesa.png" 
            alt="Jogo de tabuleiro educacional Desafio Logístico da FormaPlay montado na mesa" 
            className={styles.heroImage}
            loading="eager"
            width="600"
            height="450"
          />
          <div className={styles.glowEffect}></div>
        </div>
      </div>
    </section>
  );
};

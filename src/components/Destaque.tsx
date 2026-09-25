import React from 'react';
import styles from './Destaque.module.css';
import { CheckCircle2, ArrowRight, PackageCheck } from 'lucide-react';
import { Link } from '../router/RouterContext';

export const Destaque: React.FC = () => {
  const destaques = [
    "Indicado para cursos técnicos, escolas técnicas e faculdades (Logística e Administração)",
    "Simulação dinâmica de rotas, custos operacionais e tomadas de decisão sob pressão",
    "Desenvolve pensamento estratégico, negociação, controle financeiro e trabalho em equipe",
    "Estimula participação ativa: os alunos perguntam, respondem e tomam decisões na partida",
    "Pronto para aplicação em aulas práticas, semanas acadêmicas, oficinas e projetos integradores"
  ];

  return (
    <section id="destaque-produto" className={`section ${styles.destaque}`} aria-label="Apresentação do Desafio Logístico">
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.imageColumn} animate-fade-in-up`}>
            <div className={styles.imageWrapper}>
              <div className={styles.badgeTop}>
                <PackageCheck size={16} />
                <span>Jogo Físico de Tabuleiro</span>
              </div>
              <img 
                src="/desafio-logistico-2.png" 
                alt="Jogo de tabuleiro educacional Desafio Logístico em detalhes" 
                className={styles.image}
                loading="lazy"
                width="550"
                height="400"
              />
            </div>
          </div>
          
          <div className={`${styles.contentColumn} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.categoryBadge}>PRODUTO PRINCIPAL FORMAPLAY</div>
            <h2 className={styles.title}>
              Desafio Logístico: transformar conceitos de logística em experiência prática
            </h2>
            <p className={styles.description}>
              O <strong>Desafio Logístico</strong> é um jogo educacional de tabuleiro desenvolvido para transformar o aprendizado de logística em uma dinâmica colaborativa, estratégica e memorável.
            </p>
            <p className={styles.description}>
              Durante as partidas, os jogadores lidam com rotas, cálculo de custos, análise de riscos e imprevistos reais do transporte e da cadeia de suprimentos, experimentando as consequências diretas de cada decisão.
            </p>
            
            <div className={styles.destaquesList}>
              {destaques.map((item, index) => (
                <div key={index} className={styles.destaqueItem}>
                  <CheckCircle2 className={styles.checkIcon} size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.actions}>
              <Link href="/desafio-logistico" className={`btn btn-primary ${styles.btnPrimary}`}>
                <span>Conhecer Página Completa do Jogo</span>
                <ArrowRight size={18} />
              </Link>
              <a 
                href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`btn btn-outline ${styles.btnOutline}`}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

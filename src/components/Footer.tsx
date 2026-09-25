import React from 'react';
import styles from './Footer.module.css';
import { Logo } from './Logo';
import { getWhatsAppLink } from '../constants';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { FormaPlayText } from './FormaPlayText';
import { Link } from '../router/RouterContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className={styles.footer} aria-label="Rodapé institucional FormaPlay">
      <div className={`container ${styles.footerContainer}`}>
        
        <div className={styles.column}>
          <Link href="/" className={styles.logoLinkFooter} aria-label="FormaPlay Home">
            <Logo />
          </Link>
          <p className={styles.tagline}>
            Jogos educacionais que transformam conhecimento em experiências práticas de aprendizagem. Atendimento para escolas, instituições e professores.
          </p>
          <div className={styles.institutionalData}>
            <p><strong><FormaPlayText /> — Jogos Educacionais</strong></p>
            <p>CNPJ: 66.710.107/0001-31</p>
            <p>www.formaplayjogos.com.br</p>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contato & Atendimento</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="mailto:contato@formaplayjogos.com.br" className={styles.link}>
                <Mail size={16} />
                contato@formaplayjogos.com.br
              </a>
            </li>
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <MessageCircle size={16} />
                WhatsApp Oficial
              </a>
            </li>
            <li>
              <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <ExternalLink size={16} />
                Solicitar Orçamento
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Navegação</h3>
          <ul className={styles.linkList}>
            <li><Link href="/" className={styles.link}>Início (FormaPlay)</Link></li>
            <li><Link href="/desafio-logistico" className={styles.link}>Desafio Logístico (Produto)</Link></li>
            <li><Link href="/#jogos" className={styles.link}>Linha de Jogos & Ecossistema</Link></li>
            <li><Link href="/#validacao" className={styles.link}>Presença no Brasil</Link></li>
            <li>
              <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Solicitar Orçamento
              </a>
            </li>
          </ul>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>
            © {currentYear} <FormaPlayText /> — Jogos Educacionais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

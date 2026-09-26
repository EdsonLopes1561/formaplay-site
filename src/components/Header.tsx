import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useRouter, Link } from '../router/RouterContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { currentPath } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const isDesafioLogistico = currentPath === '/desafio-logistico';
  const isLogisticaEducadores = currentPath === '/logistica-em-sala-de-aula';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isDesafioLogistico) {
        const sections = ['hero', 'o-jogo', 'como-funciona', 'aprendizado', 'componentes', 'para-escolas', 'faq'];
        let current = 'hero';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 160) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      } else if (isLogisticaEducadores) {
        const sections = ['hero', 'desafio-teoria-pratica', 'competencias', 'atividades-praticas', 'como-trabalhar', 'papel-professor', 'desafio-logistico-destaque', 'faq'];
        let current = 'hero';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 160) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      } else {
        const sections = ['inicio', 'sobre', 'destaque-produto', 'jogos', 'validacao', 'contato'];
        let current = 'inicio';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 160) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesafioLogistico, isLogisticaEducadores]);

  const homeMenuItems = [
    { label: 'Início', href: '/' },
    { label: 'Desafio Logístico', href: '/desafio-logistico' },
    { label: 'Para Educadores', href: '/logistica-em-sala-de-aula' },
    { label: 'Sobre a FormaPlay', href: '/#sobre' },
    { label: 'Linha de Jogos', href: '/#jogos' },
    { label: 'Presença no Brasil', href: '/#validacao' },
    { label: 'Contato', href: '/#contato' },
  ];

  const productMenuItems = [
    { label: 'Início', href: '/' },
    { label: 'O Jogo', href: '#o-jogo' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Para Educadores', href: '/logistica-em-sala-de-aula' },
    { label: 'Componentes', href: '#componentes' },
    { label: 'Para Escolas', href: '#para-escolas' },
    { label: 'FAQ', href: '#faq' },
  ];

  const educadoresMenuItems = [
    { label: 'Início', href: '/' },
    { label: 'Atividades Práticas', href: '#atividades-praticas' },
    { label: 'Dinâmica em Grupo', href: '#como-trabalhar' },
    { label: 'O Professor', href: '#papel-professor' },
    { label: 'Desafio Logístico', href: '/desafio-logistico' },
    { label: 'FAQ', href: '#faq' },
  ];

  let menuItems = homeMenuItems;
  if (isDesafioLogistico) {
    menuItems = productMenuItems;
  } else if (isLogisticaEducadores) {
    menuItems = educadoresMenuItems;
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} aria-label="Cabeçalho do site">
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logoLink} aria-label="FormaPlay – Ir para a página inicial">
          <Logo theme="dark" />
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.desktopNav} aria-label="Menu principal de navegação">
          <ul className={styles.navList}>
            {menuItems.map((item) => {
              const isCurrentRoute = (item.href === '/' && currentPath === '/') || 
                                     (item.href === '/desafio-logistico' && currentPath === '/desafio-logistico') ||
                                     (item.href === '/logistica-em-sala-de-aula' && currentPath === '/logistica-em-sala-de-aula');
              const isCurrentSection = item.href.startsWith('#') && activeSection === item.href.substring(1);
              const isActive = isCurrentRoute || isCurrentSection;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <a
            href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOrcamento}
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <a
              href="https://formaplay-orcamento.vercel.app/solicitar-orcamento"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOrcamentoMobile}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicitar Orçamento
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

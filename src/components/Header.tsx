import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { getWhatsAppLink } from '../constants';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Jogos', href: '#jogos' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Para Quem é', href: '#para-quem-e' },
    { label: 'Orçamento', href: 'https://formaplay-orcamento.vercel.app/solicitar-orcamento' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="#inicio" className={styles.logoLink}>
          <Logo />
        </a>

        {/* Desktop Menu */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className={styles.navLink}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Orçamento
          </a>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" target="_blank" rel="noopener noreferrer" className="btn btn-outline" onClick={() => setIsMobileMenuOpen(false)}>
              Solicitar Orçamento
            </a>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

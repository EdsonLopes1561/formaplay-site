import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'jogos', 'como-funciona', 'beneficios', 'para-quem-e'];
      let current = 'inicio';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Add offset to trigger active state just before the section reaches the top
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
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
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="#inicio" className={styles.logoLink}>
          <Logo theme="dark" />
        </a>

        {/* Desktop Menu */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.activeLink : ''}`}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>



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

        </div>
      )}
    </header>
  );
};

import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import telelogicLogo from '@/assets/telelogic-logo.png';

export const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={telelogicLogo} alt="Telelogic" className="h-12" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('nav.home')}
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('nav.services')}
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </Link>
            )}
            <Link
              to="/telena"
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/telena' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Telena AI
            </Link>
          </div>

          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

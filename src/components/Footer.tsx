import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  
  return <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Telelogic</div>
          <p className="text-primary-foreground/80 mb-4">Intelligent Unified Communications & AI Solutions</p>
          <div className="flex justify-center gap-6 mb-4">
            <Link to="/privacy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Telelogic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
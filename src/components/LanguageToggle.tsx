import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'el' ? 'EN' : 'EL'}</span>
    </Button>
  );
};

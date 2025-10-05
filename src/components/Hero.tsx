import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block animate-fade-in mb-6">
            <span className="px-4 py-2 bg-secondary/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-secondary/30">
              {t('hero.subtitle')}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl animate-fade-in-up animation-delay-200">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection('services')}
              className="gap-2"
            >
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              {t('hero.contact')}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

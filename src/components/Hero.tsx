import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import certYealink from '@/assets/cert-yealink.png';
import certYeastar from '@/assets/cert-yeastar.png';
import cert3cx from '@/assets/cert-3cx.jpg';

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
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

          <div className="hidden lg:flex flex-col gap-8 items-center justify-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="animate-fade-in hover:scale-110 transition-transform duration-300">
                <img 
                  src={certYealink} 
                  alt="Yealink Certification" 
                  className="w-32 h-32 object-contain drop-shadow-glow"
                />
              </div>
              <div className="animate-fade-in animation-delay-200 hover:scale-110 transition-transform duration-300">
                <img 
                  src={certYeastar} 
                  alt="Yeastar Certification" 
                  className="w-32 h-32 object-contain drop-shadow-glow"
                />
              </div>
            </div>
            <div className="animate-fade-in animation-delay-400 hover:scale-110 transition-transform duration-300">
              <img 
                src={cert3cx} 
                alt="3CX Advanced Certification" 
                className="w-32 h-32 object-contain drop-shadow-glow"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

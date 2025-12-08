import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';
import certYealink from '@/assets/cert-yealink.png';
import certYeastar from '@/assets/cert-yeastar.png';
import cert3cx from '@/assets/cert-3cx.png';
import certPanasonic from '@/assets/cert-panasonic.png';
import phone1 from '@/assets/cert-3cx.png';
import phone2 from '@/assets/cert-yeastar.png';
import phone3 from '@/assets/m365cert.png';
import phone4 from '@/assets/cert-yealink.png';
import phone5 from '@/assets/cert-panasonic.png';
import phone6 from '@/assets/oraclecert.png';
import photo1 from '@/assets/awscert.png';
import photo2 from '@/assets/azcets.png';
import photo3 from '@/assets/copilotcert.png';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const products = [
    { image: phone1, alt: 'Fanvil IP Phone with Touchscreen' },
    { image: phone2, alt: 'Fanvil X210 Enterprise IP Phone' },
    { image: phone3, alt: 'Fanvil VoIP Desk Phone' },
    { image: phone4, alt: 'Fanvil Android Smart Phone' },
    { image: phone5, alt: 'Fanvil Business IP Phone' },
    { image: phone6, alt: 'Fanvil Hotel IP Phone' },
    { image: photo1, alt: 'AWS Certified Solutions Architect' },
    { image: photo2, alt: 'Microsoft Azure Certified' },
    { image: photo3, alt: 'Microsoft 365 Copilot Certified' },
  ];

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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
          <div className="text-center lg:text-left">
            <div className="inline-block animate-fade-in mb-4 lg:mb-6">
              <span className="px-3 sm:px-4 py-2 bg-secondary/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium border border-secondary/30 leading-tight">
                {t('hero.subtitle')}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 animate-fade-in-up leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-400 justify-center lg:justify-start">
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection('services')}
                className="gap-2 w-full sm:w-auto"
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/telena" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5" />
                  Telena AI
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="gap-2 w-full sm:w-auto"
              >
                <MessageSquare className="h-5 w-5" />
                {t('hero.contact')}
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="animate-fade-in hover:scale-105 transition-all duration-300 overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-md">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto object-contain drop-shadow-glow"
              >
                <source src="/telelogicpromo2.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img 
                  src={cert3cx} 
                  alt="3CX Advanced Certified" 
                  className="w-64 h-64 object-contain"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Product Showcase Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-4">
                  <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="aspect-square flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-contain drop-shadow-glow group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

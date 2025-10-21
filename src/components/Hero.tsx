import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import heroImage from '@/assets/hero-bg.jpg';
import certYealink from '@/assets/cert-yealink.png';
import certYeastar from '@/assets/cert-yeastar.png';
import cert3cx from '@/assets/cert-3cx.png';
import certPanasonic from '@/assets/cert-panasonic.png';
import phone1 from '@/assets/phone-1.png';
import phone2 from '@/assets/phone-2.png';
import phone3 from '@/assets/phone-3.png';
import phone4 from '@/assets/phone-4.png';
import phone5 from '@/assets/phone-5.png';
import phone6 from '@/assets/phone-6.png';

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
            <div className="grid grid-cols-2 gap-4 lg:gap-8 p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="animate-fade-in hover:scale-110 transition-all duration-300 p-2 lg:p-4 bg-white/5 rounded-xl">
                <img 
                  src={certYealink} 
                  alt="Yealink Microsoft Solutions Certified" 
                  className="w-28 h-28 lg:w-40 lg:h-40 object-contain drop-shadow-glow"
                />
              </div>
              <div className="animate-fade-in animation-delay-100 hover:scale-110 transition-all duration-300 p-2 lg:p-4 bg-white/5 rounded-xl">
                <img 
                  src={certYeastar} 
                  alt="Yeastar Certified Technician" 
                  className="w-28 h-28 lg:w-40 lg:h-40 object-contain drop-shadow-glow"
                />
              </div>
              <div className="animate-fade-in animation-delay-200 hover:scale-110 transition-all duration-300 p-2 lg:p-4 bg-white/5 rounded-xl">
                <img 
                  src={cert3cx} 
                  alt="3CX Advanced Certified" 
                  className="w-28 h-28 lg:w-40 lg:h-40 object-contain drop-shadow-glow"
                />
              </div>
              <div className="animate-fade-in animation-delay-300 hover:scale-110 transition-all duration-300 p-2 lg:p-4 bg-white/5 rounded-xl">
                <img 
                  src={certPanasonic} 
                  alt="Panasonic COMMS Professional Academy Certified" 
                  className="w-28 h-28 lg:w-40 lg:h-40 object-contain drop-shadow-glow"
                />
              </div>
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

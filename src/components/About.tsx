import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();

  const highlights = [
    t('about.intro'),
    t('about.expertise'),
    t('about.engineers'),
    t('about.advisor'),
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-primary bg-clip-text text-transparent">
            {t('about.title')}
          </h2>

          <Card className="p-8 md:p-12 shadow-medium border-border">
            <div className="space-y-6">
              {highlights.map((text, index) => (
                <div
                  key={index}
                  className="flex gap-4 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

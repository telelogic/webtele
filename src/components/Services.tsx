import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Brain, MessageCircle, Network, Shield, Phone, Zap } from 'lucide-react';

const services = [
  { key: 'ai', icon: Brain },
  { key: 'unified', icon: MessageCircle },
  { key: 'network', icon: Network },
  { key: 'security', icon: Shield },
  { key: 'legacy', icon: Phone },
  { key: 'automation', icon: Zap },
];

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.key}
                className="p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-14 h-14 bg-gradient-accent rounded-xl flex items-center justify-center mb-6 shadow-medium">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

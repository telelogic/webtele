import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            {t('contact.subtitle')}
          </p>

          <Card className="p-8 md:p-12 shadow-medium border-border">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@telelogic.gr" className="text-primary hover:text-primary-light transition-colors">
                    info@telelogic.gr
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{t('contact.getintouch')}</p>
                  <a href="tel:+302101234567" className="text-primary hover:text-primary-light transition-colors">
                    +30 210 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">Athens, Greece</p>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full mt-8">
                {t('contact.getintouch')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

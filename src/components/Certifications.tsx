import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const certifications = [
  { name: 'Amazon AWS', logo: '☁️' },
  { name: 'Microsoft', logo: '⊞' },
  { name: 'Oracle', logo: '◉' },
  { name: 'Yeastar', logo: '★' },
  { name: '3CX', logo: '📞' },
  { name: 'Yealink', logo: '📱' },
  { name: 'Panasonic', logo: '▣' },
  { name: 'Fortinet', logo: '🛡️' },
  { name: 'CheckPoint', logo: '✓' },
];

export const Certifications = () => {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('certs.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('certs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={cert.name}
              className="p-6 flex flex-col items-center justify-center gap-4 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border"
              style={{
                animation: `fade-in-up 0.6s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="text-4xl">{cert.logo}</div>
              <p className="text-sm font-semibold text-center">{cert.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

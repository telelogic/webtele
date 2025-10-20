import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">{t('privacy.title')}</h1>
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.section1.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section1.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.section2.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section2.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.section3.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section3.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.section4.title')}</h2>
            <p className="text-muted-foreground">{t('privacy.section4.content')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Privacy = () => {
  return <PrivacyContent />;
};

export default Privacy;

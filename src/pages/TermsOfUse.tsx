import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const TermsContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">{t('terms.title')}</h1>
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section1.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section1.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section2.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section2.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section3.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section3.content')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section4.title')}</h2>
            <p className="text-muted-foreground">{t('terms.section4.content')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const TermsOfUse = () => {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  );
};

export default TermsOfUse;

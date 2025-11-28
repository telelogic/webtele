import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import VendorLogos from '@/components/VendorLogos';
// LanguageProvider is provided at App level

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <VendorLogos />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

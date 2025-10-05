import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.services': 'Υπηρεσίες',
    'nav.about': 'Σχετικά',
    'nav.certifications': 'Πιστοποιήσεις',
    'nav.contact': 'Επικοινωνία',
    
    // Hero Section
    'hero.title': 'Η Εξέλιξη των Τηλεπικοινωνιών',
    'hero.subtitle': 'Από παραδοσιακά PBX συστήματα σε έξυπνες λύσεις με τεχνητή νοημοσύνη',
    'hero.description': 'Η Telelogic μετασχηματίζει τις επικοινωνίες της επιχείρησής σας με σύγχρονες λύσεις AI και αυτοματισμού',
    'hero.cta': 'Ανακαλύψτε τις Λύσεις μας',
    'hero.contact': 'Επικοινωνήστε Μαζί Μας',
    
    // Services Section
    'services.title': 'Οι Υπηρεσίες Μας',
    'services.subtitle': 'Ολοκληρωμένες λύσεις για κάθε ανάγκη',
    'services.ai.title': 'AI-Powered Communications',
    'services.ai.description': 'Έξυπνα συστήματα επικοινωνίας με τεχνητή νοημοσύνη για αυτοματοποίηση και βελτιστοποίηση',
    'services.unified.title': 'Unified Communications',
    'services.unified.description': 'Ενοποιημένες επικοινωνίες που συνδυάζουν φωνή, βίντεο, και μηνύματα σε μία πλατφόρμα',
    'services.network.title': 'Δικτυακές Λύσεις',
    'services.network.description': 'Σχεδιασμός και υλοποίηση σύγχρονων δικτυακών υποδομών',
    'services.security.title': 'Ασφάλεια & Προστασία',
    'services.security.description': 'Προηγμένα συστήματα ασφάλειας για την προστασία των επικοινωνιών σας',
    'services.legacy.title': 'PBX & Hardware',
    'services.legacy.description': 'Υποστήριξη και αναβάθμιση παραδοσιακών τηλεφωνικών συστημάτων',
    'services.automation.title': 'Αυτοματοποίηση',
    'services.automation.description': 'Λύσεις αυτοματοποίησης για βελτίωση της αποδοτικότητας',
    
    // About Section
    'about.title': 'Σχετικά με την Telelogic',
    'about.intro': 'Το αντικείμενο της Telelogic Unified Communications εκτείνεται στους τομείς των ολοκληρωμένων λύσεων Δικτύων και Ενοποιημένων Επικοινωνιών και σήμερα είναι ένας αξιόπιστος πάροχος Υπηρεσιών Τηλεφωνίας με Πιστοποιημένες γνώσεις και εξειδίκευση σε όλους τους τομείς των Τηλεπικοινωνιών.',
    'about.expertise': 'Η εξειδίκευση προέρχεται από την διαρκή ενημέρωση και αναβάθμιση της ποιότητας των Υπηρεσιών μας, ακολουθώντας τις πρακτικές των μεγαλύτερων σύγχρονων κατασκευαστών του χώρου, με πιστοποιήσεις, σεμινάρια και διαρκή εκπαίδευση.',
    'about.engineers': 'Οι Μηχανικοί μας διαθέτουν πολυετή πείρα στον σχεδιασμό Συστημάτων Δικτύων Τηλεπικοινωνιών και Ασφάλειας Επικοινωνίας, και ο στόχος μας είναι η άριστη παροχή υπηρεσιών σε τεχνολογίες υψηλού επιπέδου.',
    'about.advisor': 'Ως έμπιστος σύμβουλος, με επαγγελματισμό και ισχυρή αντίληψη σε θέματα ιδιωτικότητας και ασφάλειας, η Telelogic σχεδιάζει μαζί σας τις λύσεις, ακούγοντας τις ανάγκες, και προβλέποντας τις επερχόμενες αλλαγές στον τρόπο που εργαζόμαστε, επικοινωνούμε και συνεργαζόμαστε.',
    
    // Certifications Section
    'certs.title': 'Πιστοποιήσεις & Συνεργασίες',
    'certs.subtitle': 'Διαθέτουμε πιστοποιήσεις από τους κορυφαίους κατασκευαστές',
    
    // Contact Section
    'contact.title': 'Επικοινωνήστε Μαζί Μας',
    'contact.subtitle': 'Είμαστε εδώ για να σας βοηθήσουμε',
    'contact.getintouch': 'Επικοινωνία',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'The Evolution of Telecommunications',
    'hero.subtitle': 'From traditional PBX systems to intelligent AI-powered solutions',
    'hero.description': 'Telelogic transforms your business communications with modern AI and automation solutions',
    'hero.cta': 'Discover Our Solutions',
    'hero.contact': 'Contact Us',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive solutions for every need',
    'services.ai.title': 'AI-Powered Communications',
    'services.ai.description': 'Intelligent communication systems with artificial intelligence for automation and optimization',
    'services.unified.title': 'Unified Communications',
    'services.unified.description': 'Unified communications combining voice, video, and messaging in one platform',
    'services.network.title': 'Network Solutions',
    'services.network.description': 'Design and implementation of modern network infrastructures',
    'services.security.title': 'Security & Protection',
    'services.security.description': 'Advanced security systems to protect your communications',
    'services.legacy.title': 'PBX & Hardware',
    'services.legacy.description': 'Support and upgrade of traditional telephone systems',
    'services.automation.title': 'Automation',
    'services.automation.description': 'Automation solutions to improve efficiency',
    
    // About Section
    'about.title': 'About Telelogic',
    'about.intro': 'Telelogic Unified Communications specializes in comprehensive Network and Unified Communications solutions and is today a trusted provider of Telephony Services with Certified knowledge and expertise in all areas of Telecommunications.',
    'about.expertise': 'Our expertise comes from continuous updates and quality upgrades of our Services, following the practices of the leading modern manufacturers in the field, with certifications, seminars, and ongoing training.',
    'about.engineers': 'Our Engineers have many years of experience in designing Telecommunications Network Systems and Communication Security, and our goal is to provide excellent services in high-level technologies.',
    'about.advisor': 'As a trusted advisor, with professionalism and a strong understanding of privacy and security matters, Telelogic designs solutions with you, listening to your needs and anticipating upcoming changes in the way we work, communicate, and collaborate.',
    
    // Certifications Section
    'certs.title': 'Certifications & Partnerships',
    'certs.subtitle': 'We hold certifications from leading manufacturers',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to help you',
    'contact.getintouch': 'Get in Touch',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('el');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['el']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

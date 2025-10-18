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
    'services.automation.title': 'Ξενοδοχειακές Λύσεις',
    'services.automation.description': 'Συστήματα υψηλής τεχνολογίας για κάθε Ξενοδοχειακή Μονάδα',
    
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
    
    // Footer
    'footer.privacy': 'Πολιτική Απορρήτου',
    'footer.terms': 'Όροι Χρήσης',
    
    // Privacy Page
    'privacy.title': 'Πολιτική Απορρήτου',
    'privacy.section1.title': 'Συλλογή Πληροφοριών',
    'privacy.section1.content': 'Η Telelogic συλλέγει πληροφορίες που μας παρέχετε άμεσα, όπως όταν επικοινωνείτε μαζί μας ή ζητάτε πληροφορίες για τις υπηρεσίες μας. Αυτές οι πληροφορίες μπορεί να περιλαμβάνουν το όνομά σας, τη διεύθυνση email, τον αριθμό τηλεφώνου και άλλες πληροφορίες επικοινωνίας.',
    'privacy.section2.title': 'Χρήση Πληροφοριών',
    'privacy.section2.content': 'Χρησιμοποιούμε τις πληροφορίες που συλλέγουμε για να παρέχουμε, να συντηρούμε και να βελτιώνουμε τις υπηρεσίες μας, να επικοινωνούμε μαζί σας και να ανταποκρινόμαστε στα ερωτήματά σας. Οι πληροφορίες σας χρησιμοποιούνται αποκλειστικά για επαγγελματικούς σκοπούς.',
    'privacy.section3.title': 'Προστασία Δεδομένων',
    'privacy.section3.content': 'Η Telelogic λαμβάνει σοβαρά υπόψη την ασφάλεια των προσωπικών σας δεδομένων. Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των πληροφοριών σας από μη εξουσιοδοτημένη πρόσβαση, αλλαγή, αποκάλυψη ή καταστροφή.',
    'privacy.section4.title': 'Τα Δικαιώματά Σας',
    'privacy.section4.content': 'Έχετε το δικαίωμα πρόσβασης, διόρθωσης ή διαγραφής των προσωπικών σας δεδομένων. Για οποιεσδήποτε ερωτήσεις σχετικά με την πολιτική απορρήτου μας, παρακαλούμε επικοινωνήστε μαζί μας.',
    
    // Terms Page
    'terms.title': 'Όροι Χρήσης',
    'terms.section1.title': 'Αποδοχή Όρων',
    'terms.section1.content': 'Με την πρόσβαση και χρήση της ιστοσελίδας της Telelogic, αποδέχεστε και συμφωνείτε να δεσμεύεστε από τους παρόντες όρους και προϋποθέσεις χρήσης. Εάν δεν συμφωνείτε με αυτούς τους όρους, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα μας.',
    'terms.section2.title': 'Χρήση Υπηρεσιών',
    'terms.section2.content': 'Οι υπηρεσίες που παρέχονται από την Telelogic προορίζονται για επαγγελματική χρήση. Συμφωνείτε να χρησιμοποιείτε τις υπηρεσίες μας σύμφωνα με όλους τους ισχύοντες νόμους και κανονισμούς.',
    'terms.section3.title': 'Πνευματική Ιδιοκτησία',
    'terms.section3.content': 'Όλο το περιεχόμενο της ιστοσελίδας, συμπεριλαμβανομένων κειμένων, γραφικών, λογοτύπων και εικόνων, είναι ιδιοκτησία της Telelogic και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας.',
    'terms.section4.title': 'Περιορισμός Ευθύνης',
    'terms.section4.content': 'Η Telelogic δεν φέρει ευθύνη για οποιαδήποτε άμεση, έμμεση, τυχαία ή επακόλουθη ζημία που προκύπτει από τη χρήση ή την αδυναμία χρήσης των υπηρεσιών μας.',
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
    'services.automation.title': 'Hotel Solutions',
    'services.automation.description': 'High-tech systems for every hotel unit',
    
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
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Privacy Page
    'privacy.title': 'Privacy Policy',
    'privacy.section1.title': 'Information Collection',
    'privacy.section1.content': 'Telelogic collects information that you provide directly to us, such as when you contact us or request information about our services. This information may include your name, email address, phone number, and other contact information.',
    'privacy.section2.title': 'Use of Information',
    'privacy.section2.content': 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to respond to your inquiries. Your information is used exclusively for professional purposes.',
    'privacy.section3.title': 'Data Protection',
    'privacy.section3.content': 'Telelogic takes the security of your personal data seriously. We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction.',
    'privacy.section4.title': 'Your Rights',
    'privacy.section4.content': 'You have the right to access, correct, or delete your personal data. For any questions regarding our privacy policy, please contact us.',
    
    // Terms Page
    'terms.title': 'Terms of Use',
    'terms.section1.title': 'Acceptance of Terms',
    'terms.section1.content': 'By accessing and using the Telelogic website, you accept and agree to be bound by these terms and conditions of use. If you do not agree with these terms, please do not use our website.',
    'terms.section2.title': 'Use of Services',
    'terms.section2.content': 'The services provided by Telelogic are intended for professional use. You agree to use our services in accordance with all applicable laws and regulations.',
    'terms.section3.title': 'Intellectual Property',
    'terms.section3.content': 'All website content, including text, graphics, logos, and images, is the property of Telelogic and is protected by intellectual property laws.',
    'terms.section4.title': 'Limitation of Liability',
    'terms.section4.content': 'Telelogic shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services.',
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

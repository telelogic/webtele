import { useLanguage } from '@/contexts/LanguageContext';

const VendorLogos = () => {
  const { t } = useLanguage();

  // Tech vendor logos - you can replace these with actual logo images
  const vendors = [
    { name: 'Microsoft', logo: '/logos/microsoft.svg' },
    { name: 'Cisco', logo: '/logos/cisco.webp' },
    { name: 'Mikrotik', logo: '/logos/mtik.webp' },
    { name: 'Oracle', logo: '/logos/oracle.webp' },
    { name: 'AWS', logo: '/logos/aws.webp' },
    { name: 'Fanvil', logo: '/logos/fanvil.webp' },
    { name: 'M365', logo: '/logos/m365.webp' },
    { name: 'OpenAI', logo: '/logos/openai.webp' },
    { name: 'Teams', logo: '/logos/teams.webp' },
    { name: 'TP-Link', logo: '/logos/tplink.webp' },
    { name: 'Azure', logo: '/logos/azure.svg' },
    { name: 'Asterisk', logo: '/logos/asterisk.webp' }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedVendors = [...vendors, ...vendors];

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/30 via-blue-50/20 to-cyan-50/30 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-cyan-950/20"></div>
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
      
      {/* Section title */}
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
          {t('vendors.title')}
        </p>
      </div>

      {/* Scrolling container */}
      <div className="relative">
        <div className="flex animate-scroll-infinite space-x-8 hover:pause-animation">
          {duplicatedVendors.map((vendor, index) => (
            <div
              key={`${vendor.name}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="relative">
                {/* Glassmorphism container */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-800/80">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="h-8 object-contain filter hover:brightness-110 transition-all duration-300"
                    style={{ maxWidth: '120px', minWidth: '80px' }}
                  />
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional subtitle */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          {t('vendors.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default VendorLogos;
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, Network, Shield, Phone, Zap, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  { 
    key: 'ai', 
    icon: Brain,
    gradient: 'from-cyan-600/25 via-cyan-500/20 to-cyan-400/15',
    iconGradient: 'from-cyan-600 to-cyan-400',
    capabilities: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Automation'],
    benefits: ['40% efficiency increase', 'Real-time insights', '24/7 availability', 'Scalable solutions']
  },
  { 
    key: 'unified', 
    icon: MessageCircle,
    gradient: 'from-cyan-500/25 via-sky-500/20 to-cyan-300/15',
    iconGradient: 'from-cyan-500 to-sky-400',
    capabilities: ['Voice & Video', 'Instant Messaging', 'File Sharing', 'Screen Sharing'],
    benefits: ['Seamless collaboration', 'Cross-platform support', 'Enterprise security', 'Mobile integration']
  },
  { 
    key: 'network', 
    icon: Network,
    gradient: 'from-teal-600/25 via-cyan-600/20 to-cyan-400/15',
    iconGradient: 'from-teal-600 to-cyan-500',
    capabilities: ['LAN/WAN Design', 'Wi-Fi Solutions', 'QoS Management', 'Network Security'],
    benefits: ['99.9% uptime', 'Scalable infrastructure', 'Performance optimization', 'Future-proof design']
  },
  { 
    key: 'security', 
    icon: Shield,
    gradient: 'from-cyan-700/25 via-cyan-600/20 to-slate-500/15',
    iconGradient: 'from-cyan-700 to-slate-500',
    capabilities: ['Encryption', 'Access Control', 'Threat Detection', 'Compliance'],
    benefits: ['Data protection', 'Regulatory compliance', 'Risk mitigation', 'Peace of mind']
  },
  { 
    key: 'legacy', 
    icon: Phone,
    gradient: 'from-sky-600/25 via-cyan-500/20 to-blue-400/15',
    iconGradient: 'from-sky-600 to-blue-500',
    capabilities: ['PBX Upgrade', 'System Integration', 'Legacy Migration', 'Support & Maintenance'],
    benefits: ['Cost reduction', 'Improved reliability', 'Modern features', 'Smooth transition']
  },
  { 
    key: 'automation', 
    icon: Zap,
    gradient: 'from-cyan-800/25 via-teal-600/20 to-cyan-500/15',
    iconGradient: 'from-cyan-800 to-teal-500',
    capabilities: ['Process Automation', 'Workflow Optimization', 'Smart Routing', 'IoT Integration'],
    benefits: ['Reduced manual work', 'Faster response times', 'Error reduction', 'Cost savings']
  },
];

export const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/20 to-sky-50/20 dark:from-slate-950 dark:via-cyan-950/20 dark:to-sky-950/20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100/5 to-transparent animate-gradient-x dark:via-cyan-900/5"></div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500/30 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-sky-500/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-teal-500/40 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-sky-500/10 backdrop-blur-sm border border-cyan-500/20 mb-4 lg:mb-6">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <span className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400">Our Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              {t('services.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.key}
                  className={`group relative p-6 lg:p-8 cursor-pointer overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2`}
                  style={{
                    animation: `fade-in-up 0.8s ease-out ${index * 0.15}s both`,
                    background: `linear-gradient(135deg, ${service.gradient.replace(/\/20/g, '/5')})`,
                    backdropFilter: 'blur(20px)',
                  }}
                  onClick={() => setSelectedService(service)}
                >
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-xl"></div>
                  
                  {/* Gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="absolute inset-[1px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-lg"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Animated icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 bg-gradient-to-r ${service.iconGradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-3 lg:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 lg:mb-6">
                      {t(`services.${service.key}.description`)}
                    </p>
                    
                    {/* Hover indicator */}
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 p-4 sm:p-6">
          {selectedService && (
            <>
              <DialogHeader className="space-y-4 lg:space-y-6 pb-4 lg:pb-6">
                <div className="flex items-center justify-start">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center bg-gradient-to-r ${selectedService.iconGradient} shadow-lg`}>
                    <selectedService.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                    {t(`services.${selectedService.key}.title`)}
                  </DialogTitle>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {t(`services.${selectedService.key}.description`)}
                  </p>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Capabilities */}
                <div className="space-y-3 lg:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    Key Capabilities
                  </h4>
                  <div className="space-y-2 lg:space-y-3">
                    {selectedService.capabilities.map((capability, index) => (
                      <div 
                        key={capability}
                        className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30 backdrop-blur-sm"
                        style={{ animation: `slide-in-left 0.5s ease-out ${index * 0.1}s both` }}
                      >
                        <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-medium leading-relaxed">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 lg:space-y-4">
                  <h4 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    Key Benefits
                  </h4>
                  <div className="space-y-2 lg:space-y-3">
                    {selectedService.benefits.map((benefit, index) => (
                      <div 
                        key={benefit}
                        className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 backdrop-blur-sm"
                        style={{ animation: `slide-in-right 0.5s ease-out ${index * 0.1}s both` }}
                      >
                        <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-medium leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA - Mobile responsive */}
              <div className="mt-6 lg:mt-8 p-4 lg:p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 backdrop-blur-sm border border-cyan-500/20">
                <div className="text-center space-y-3 lg:space-y-4">
                  <h5 className="text-lg sm:text-xl font-semibold">Ready to get started?</h5>
                  <p className="text-sm sm:text-base text-muted-foreground">Let's discuss how we can help transform your communications infrastructure.</p>
                  <Button className={`bg-gradient-to-r ${selectedService.iconGradient} hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

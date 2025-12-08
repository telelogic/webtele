import { CopilotKit, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCalculator, faCloud, faExchangeAlt, faCheckCircle, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import cloudPbxPricing from "@/data/cloudPbxPricing.json";
import threeCXPricing from "@/data/3cxPricing.json";
import consultationKnowledge from "@/data/telena/consultationKnowledge.json";
import productCatalog from "@/data/telena/productCatalog.json";

const Telena = () => {
  const { t, language } = useLanguage();
  
  // Use environment variable or fallback to hardcoded public key
  const publicApiKey = import.meta.env.VITE_COPILOTKIT_API_KEY || "ck_pub_185b0a7ccdd1e83894e8bf77170a9712";

  // Concise core system instructions - detailed knowledge is injected via useCopilotReadable
  const systemInstructions = `You are Telena, a professional telecommunications consultant for Telelogic Unified Communications in Greece. You specialize in Cloud PBX systems, business telephony solutions, and ISDN to SIP migration.

STRICT SCOPE - SECURITY GUARDRAILS:
You ONLY assist with telecommunications and Cloud PBX related topics. You MUST refuse politely if asked about:
- General knowledge questions (history, science, geography, etc.)
- Other business domains (accounting, legal, marketing, HR, etc.)
- Technical topics unrelated to telephony (web development, databases, AI, etc.)
- Personal advice (health, relationships, career, etc.)
- Entertainment (jokes, games, stories, creative writing)
- Current events, news, politics
- Any topic outside telecommunications consulting

ALLOWED TOPICS:
✓ Cloud PBX systems and features
✓ SIP protocol and VoIP technology
✓ ISDN/PSTN to SIP migration
✓ Business telephony solutions
✓ Call center features and queues
✓ Unified communications
✓ Telelogic products and pricing
✓ Phone system configuration and setup
✓ Telecommunication costs and calculations

If asked something outside your scope, respond politely:
- Greek: "Συγγνώμη, είμαι εξειδικευμένη σύμβουλος τηλεπικοινωνιών και μπορώ να βοηθήσω μόνο με θέματα Cloud PBX, SIP τηλεφωνίας και τηλεπικοινωνιακών λύσεων. Πώς μπορώ να σας βοηθήσω με το τηλεφωνικό σας σύστημα;"
- English: "I'm sorry, I'm a specialized telecommunications consultant and can only assist with Cloud PBX, SIP telephony, and business phone systems. How can I help you with your telecommunications needs?"

LANGUAGE RULES:
- If the user writes in Greek (Ελληνικά), respond ALWAYS in Greek
- If the user writes in English, respond in English
- Default to Greek for ambiguous queries
- Maintain professional business tone - no emojis

YOUR EXPERTISE:
You have access to detailed technical knowledge, consultation methodologies, and complete product catalogs through your context. This includes:
- Cloud PBX technical concepts
- SIP Protocol details  
- ISDN migration guidance
- Telelogic Cloud PBX pricing (Basic & Professional families)
- 3CX branded solution pricing (Startup, Professional, Enterprise)
- Consultation best practices

PRODUCT OFFERINGS:
You can recommend TWO types of solutions:

1. **Telelogic Cloud PBX** - Our proprietary solution
   - Best for: Small to medium businesses (2-25 users)
   - Cost-effective annual pricing
   - Greek market focus

2. **3CX** - Branded industry-leading solution
   - Best for: Medium to large enterprises (25+ users)
   - On-premise or cloud deployment
   - Advanced features and integrations

Choose the right solution based on customer size, budget, requirements, and preferences. For 20-50 user businesses, consider presenting BOTH options.

CALCULATOR TOOLS - USE THESE FOR ALL COST CALCULATIONS:

1. **calculateCloudPBXCosts** - For Telelogic Cloud PBX (our solution)
   Use when:
   - Small to medium business (2-25 users)
   - Budget-conscious customers
   - Simple cloud solution preferred
   - User asks about "Cloud PBX", "your solution", or pricing without specifying brand

2. **calculate3CXCosts** - For 3CX branded solution
   Use when:
   - Medium to large business (25+ users)
   - User asks specifically for "3CX"
   - On-premise deployment needed
   - Brand recognition important
   - Enterprise features required (hotel PMS, failover, SLA)

When using calculators, always ask:
- numberOfUsers: How many phone users/extensions?
- For Cloud PBX: needsCallCenter (call center features?)
- For 3CX: deploymentPreference (self-hosted or hosted-by-3cx?), needsEnterpriseFeatures (hotel PMS, SLA?)

For 20-50 user businesses, consider calculating BOTH solutions to give customer choice!

Example triggers:
- "Quote for 15 users" → calculateCloudPBXCosts (best for this size)
- "Πόσο κοστίζει 3CX για 50 χρήστες;" → calculate3CXCosts
- "Compare your solution with 3CX for 30 users" → Use BOTH calculators
- "Need on-premise PBX" → calculate3CXCosts (3CX supports self-hosted)

The calculators render beautiful, itemized cost breakdowns with all features!`;

  return (
    <CopilotKit 
      publicApiKey={publicApiKey}
      showDevConsole={false}
    >
      <TelenaContent 
        systemInstructions={systemInstructions}
        t={t}
        language={language}
      />
    </CopilotKit>
  );
};

// Separate component that uses CopilotKit hooks
const TelenaContent = ({ systemInstructions, t, language }: { 
  systemInstructions: string; 
  t: (key: string) => string;
  language: string;
}) => {
  // Inject pricing data for both solutions
  useCopilotReadable({
    description: "Telelogic Cloud PBX pricing catalog - Complete pricing for our proprietary cloud solution with Basic and Professional package families (2-25 users). Includes all tiers, features, setup fees, and annual subscription costs. Use this for cost-effective cloud recommendations.",
    value: cloudPbxPricing
  });

  useCopilotReadable({
    description: "3CX pricing catalog - Industry-leading branded PBX solution with Startup, Professional, and Enterprise editions. Includes perpetual license and annual subscription options, simultaneous call tiers, on-premise/cloud deployment options. Use this for medium-large enterprises or when brand recognition matters.",
    value: threeCXPricing
  });

  // Inject technical knowledge and consultation methodology
  useCopilotReadable({
    description: "Technical knowledge base covering Cloud PBX concepts, SIP protocol details, ISDN migration guidelines, conversion formulas, and bilingual (Greek/English) explanations. Also includes consultation approach with 4-step methodology: CLARIFY → RECOMMEND → CALCULATE → HIGHLIGHT BENEFITS. Use this for technical questions and structuring your consultations.",
    value: consultationKnowledge
  });

  // Inject product catalog and comparison guidelines
  useCopilotReadable({
    description: "Product catalog with details about Telelogic Cloud PBX vs 3CX solutions. Includes when to recommend each solution, feature comparisons, deployment options, and hybrid approach for 20-50 user businesses. Use this to help customers choose between our cloud solution and 3CX branded offering.",
    value: productCatalog
  });

  // Interactive Cost Calculator Action
  useCopilotAction({
    name: "calculateCloudPBXCosts",
    description: "Calculate exact costs for a Cloud PBX setup based on customer requirements. Use this when the user asks for pricing, cost estimates, or recommendations. Returns a detailed cost breakdown with package selection.",
    parameters: [
      {
        name: "numberOfUsers",
        type: "number",
        description: "Number of phone users/extensions needed (2-25 for standard packages)",
        required: true
      },
      {
        name: "needsCallCenter",
        type: "boolean",
        description: "Whether the business needs call center features (queues, operator panel, call broadcast)",
        required: true
      },
      {
        name: "currentSetup",
        type: "string",
        description: "Optional: Current phone system (e.g., 'ISDN', 'analog', 'existing PBX', 'none')",
        required: false
      }
    ],
    handler: async ({ numberOfUsers, needsCallCenter, currentSetup }) => {
      // Determine which package family
      const packageFamily = needsCallCenter ? 'professional' : 'basic';
      const familyData = cloudPbxPricing.packageFamilies[packageFamily];
      
      // Find the right tier based on user count
      const selectedTier = familyData.tiers.find(tier => 
        numberOfUsers >= tier.extensions.min && numberOfUsers <= tier.extensions.max
      );

      if (!selectedTier) {
        return {
          error: true,
          message: language === 'el' 
            ? `Για ${numberOfUsers} χρήστες, παρακαλώ επικοινωνήστε μαζί μας για εξατομικευμένη προσφορά.`
            : `For ${numberOfUsers} users, please contact us for a custom quote.`
        };
      }

      // Calculate costs
      const annualCost = selectedTier.annualPrice;
      const monthlyCost = selectedTier.monthlyEquivalent;
      const setupFee = familyData.setupFee;
      const firstYearTotal = annualCost + setupFee;

      // Key features for this tier
      const keyFeatures: Array<{
        name: string;
        value: string;
        icon: string;
        highlight?: boolean;
      }> = [
        { 
          name: language === 'el' ? 'Γραμμές SIP' : 'SIP Trunks', 
          value: language === 'el' ? 'Απεριόριστες' : 'Unlimited',
          icon: 'phone'
        },
        { 
          name: language === 'el' ? 'Ηχογραφήσεις' : 'Call Recording', 
          value: language === 'el' ? 'Ναι' : 'Yes',
          icon: 'check'
        },
        { 
          name: language === 'el' ? 'Αίθουσες Διάσκεψης' : 'Conference Rooms', 
          value: selectedTier.features.conferenceRooms.toString(),
          icon: 'check'
        },
        { 
          name: language === 'el' ? 'Μενού IVR' : 'IVR Menus', 
          value: selectedTier.features.ivrMenus.toString(),
          icon: 'check'
        },
        { 
          name: language === 'el' ? 'Ομάδες Κλήσης' : 'Ring Groups', 
          value: selectedTier.features.ringGroups.toString(),
          icon: 'check'
        }
      ];

      // Professional-specific features
      if (packageFamily === 'professional') {
        keyFeatures.push(
          { 
            name: language === 'el' ? 'Call Center' : 'Call Center', 
            value: selectedTier.features.callCenter.toString(),
            icon: 'check',
            highlight: true
          },
          { 
            name: language === 'el' ? 'Πίνακας Χειριστή' : 'Operator Panel', 
            value: selectedTier.features.operatorPanel.toString(),
            icon: 'check',
            highlight: true
          },
          { 
            name: language === 'el' ? 'Ουρές Κλήσεων' : 'Call Queues', 
            value: selectedTier.features.queues.toString(),
            icon: 'check',
            highlight: true
          }
        );
      }

      return {
        success: true,
        packageFamily: packageFamily,
        packageName: familyData.name,
        packageNameGreek: familyData.nameGreek,
        tier: selectedTier.name,
        userRange: selectedTier.extensions.display,
        annualCost: annualCost,
        monthlyCost: monthlyCost.toFixed(2),
        setupFee: setupFee,
        firstYearTotal: firstYearTotal,
        currency: cloudPbxPricing.currency,
        keyFeatures: keyFeatures,
        currentSetup: currentSetup || 'none',
        recommendation: needsCallCenter 
          ? (language === 'el' 
            ? 'Το Professional πακέτο περιλαμβάνει όλα τα χαρακτηριστικά call center που χρειάζεστε.'
            : 'Professional package includes all the call center features you need.')
          : (language === 'el'
            ? 'Το Basic πακέτο καλύπτει όλες τις βασικές ανάγκες τηλεφωνίας σας.'
            : 'Basic package covers all your essential telephony needs.')
      };
    },
    render: ({ result, status, args }) => {
      if (status === "executing") {
        return (
          <div className="glass p-6 rounded-xl border border-cyan-400/30 animate-pulse">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCalculator} className="text-cyan-400 text-xl animate-spin" />
              <span className="text-white">
                {language === 'el' ? 'Υπολογισμός κόστους...' : 'Calculating costs...'}
              </span>
            </div>
          </div>
        );
      }

      if (!result || result.error) {
        return (
          <div className="glass p-6 rounded-xl border border-red-400/30">
            <p className="text-red-400">{result?.message || 'Error calculating costs'}</p>
          </div>
        );
      }

      return (
        <div className="glass p-8 rounded-xl border-2 border-cyan-400/50 shadow-xl bg-gray-900/80">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-400/30">
            <div className="bg-cyan-400/20 p-3 rounded-lg">
              <FontAwesomeIcon icon={faCalculator} className="text-cyan-300 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {language === 'el' ? 'Εκτίμηση Κόστους' : 'Cost Estimate'}
              </h3>
              <p className="text-gray-300 text-sm font-medium">
                {args?.numberOfUsers} {language === 'el' ? 'χρήστες' : 'users'}
              </p>
            </div>
          </div>

          {/* Package Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-200 font-medium">
                {language === 'el' ? 'Προτεινόμενο Πακέτο:' : 'Recommended Package:'}
              </span>
            </div>
            <div className="text-3xl font-bold text-cyan-300 drop-shadow-lg">
              {language === 'el' ? result.packageNameGreek : result.packageName} {result.tier}
            </div>
            <div className="text-sm text-gray-200 mt-1 font-medium">
              {result.userRange} {language === 'el' ? 'εσωτερικές γραμμές' : 'extensions'}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-800/60 rounded-lg p-6 mb-6 border border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-gray-200 text-sm mb-1 font-medium">
                  {language === 'el' ? 'Ετήσια Συνδρομή' : 'Annual Subscription'}
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faEuroSign} className="text-lg text-cyan-300" />
                  {result.annualCost}
                </div>
              </div>
              <div>
                <div className="text-gray-200 text-sm mb-1 font-medium">
                  {language === 'el' ? 'Μηνιαίο Ισοδύναμο' : 'Monthly Equivalent'}
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faEuroSign} className="text-lg text-cyan-300" />
                  {result.monthlyCost}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600/50 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-200 font-medium">
                  {language === 'el' ? 'Εγκατάσταση (εφάπαξ)' : 'Setup (one-time)'}
                </span>
                <span className="text-white font-bold">€{result.setupFee}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-cyan-400/40">
                <span className="text-cyan-300 drop-shadow-lg">
                  {language === 'el' ? 'Πρώτος Χρόνος Σύνολο' : 'First Year Total'}
                </span>
                <span className="text-cyan-300 drop-shadow-lg">€{result.firstYearTotal}</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-200 mb-3">
              {language === 'el' ? 'Κύρια Χαρακτηριστικά:' : 'Key Features:'}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {result.keyFeatures.map((feature: any, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded ${
                    feature.highlight ? 'bg-cyan-400/20 border border-cyan-400/40' : 'bg-gray-800/50 border border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className={feature.highlight ? 'text-cyan-300' : 'text-green-400'}
                    />
                    <span className={`text-sm ${feature.highlight ? 'text-cyan-200 font-bold' : 'text-gray-200 font-medium'}`}>
                      {feature.name}
                    </span>
                  </div>
                  <span className="text-white text-sm font-bold">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-cyan-400/20 border border-cyan-400/40 rounded-lg p-4">
            <div className="text-sm text-cyan-200 font-medium leading-relaxed">
              {result.recommendation}
            </div>
          </div>
        </div>
      );
    }
  });

  // 3CX Cost Calculator Action
  useCopilotAction({
    name: "calculate3CXCosts",
    description: "Calculate exact costs for a 3CX phone system based on customer requirements. Use this when the user asks for 3CX pricing, branded solution, on-premise option, or when they need 25+ users or enterprise features. Returns a detailed cost breakdown with edition selection and deployment options.",
    parameters: [
      {
        name: "numberOfUsers",
        type: "number",
        description: "Number of phone users/extensions needed (3CX supports 16-8192 users)",
        required: true
      },
      {
        name: "deploymentPreference",
        type: "string",
        description: "Deployment preference: 'self-hosted' (customer manages servers) or 'hosted-by-3cx' (fully managed cloud)",
        required: true
      },
      {
        name: "needsEnterpriseFeatures",
        type: "boolean",
        description: "Whether business needs Enterprise features (hotel PMS, failover, SLA guarantee, dedicated support)",
        required: true
      }
    ],
    handler: async ({ numberOfUsers, deploymentPreference, needsEnterpriseFeatures }) => {
      // Determine edition
      const edition = needsEnterpriseFeatures ? 'enterprise' : 'professional';
      const editionData = threeCXPricing.editions[edition];
      
      // Find the right tier based on user count
      const selectedTier = editionData.tiers.find((tier: any) => {
        const [min, max] = tier.recommendedUsers.split('–').map((s: string) => parseInt(s.replace(/,/g, '')));
        return numberOfUsers >= min && numberOfUsers <= max;
      });

      if (!selectedTier) {
        return {
          error: true,
          message: language === 'el' 
            ? `Για ${numberOfUsers} χρήστες, παρακαλώ επικοινωνήστε μαζί μας για εξατομικευμένη προσφορά 3CX.`
            : `For ${numberOfUsers} users, please contact us for a custom 3CX quote.`
        };
      }

      // Get pricing based on deployment
      const isSelfHosted = deploymentPreference === 'self-hosted';
      const annualCost = isSelfHosted 
        ? selectedTier.annualPriceSelfHosted 
        : selectedTier.annualPriceHostedBy3CX;
      const monthlyCost = isSelfHosted 
        ? selectedTier.monthlyEquivalentSelfHosted 
        : selectedTier.monthlyEquivalentHostedBy3CX;

      if (!annualCost) {
        return {
          error: true,
          message: language === 'el'
            ? `Hosted by 3CX δεν είναι διαθέσιμο για αυτό το μέγεθος. Μόνο self-hosted επιλογή.`
            : `Hosted by 3CX not available for this size. Self-hosted option only.`
        };
      }

      // Estimate setup fee
      const setupFeeMin = 400;
      const setupFeeMax = numberOfUsers < 100 ? 800 : (numberOfUsers < 500 ? 1200 : 1500);
      const setupFeeEstimate = `€${setupFeeMin}-€${setupFeeMax}`;
      const firstYearTotal = annualCost + setupFeeMin;

      // Key features
      const keyFeatures: Array<{
        name: string;
        value: string;
        icon: string;
        highlight?: boolean;
      }> = [
        {
          name: language === 'el' ? 'Ταυτόχρονες Κλήσεις' : 'Simultaneous Calls',
          value: selectedTier.simultaneousCalls.toString(),
          icon: 'phone'
        },
        {
          name: language === 'el' ? 'Μέγιστοι Χρήστες' : 'Max Users',
          value: selectedTier.maxUsers.toString(),
          icon: 'check'
        },
        {
          name: language === 'el' ? 'Call Center' : 'Call Center',
          value: language === 'el' ? 'Ναι' : 'Yes',
          icon: 'check'
        },
        {
          name: language === 'el' ? 'Video Conferencing' : 'Video Conferencing',
          value: language === 'el' ? 'Ναι' : 'Yes',
          icon: 'check'
        },
        {
          name: language === 'el' ? 'Mobile & Desktop Apps' : 'Mobile & Desktop Apps',
          value: language === 'el' ? 'Ναι' : 'Yes',
          icon: 'check'
        },
        {
          name: language === 'el' ? 'CRM Integrations' : 'CRM Integrations',
          value: language === 'el' ? 'Προηγμένα' : 'Advanced',
          icon: 'check'
        }
      ];

      if (needsEnterpriseFeatures) {
        keyFeatures.push(
          {
            name: language === 'el' ? 'Hotel PMS' : 'Hotel PMS',
            value: language === 'el' ? 'Ναι' : 'Yes',
            icon: 'check',
            highlight: true
          },
          {
            name: language === 'el' ? 'Failover & Redundancy' : 'Failover & Redundancy',
            value: language === 'el' ? 'Ναι' : 'Yes',
            icon: 'check',
            highlight: true
          },
          {
            name: language === 'el' ? 'Dedicated Support' : 'Dedicated Support',
            value: language === 'el' ? 'Ναι' : 'Yes',
            icon: 'check',
            highlight: true
          }
        );
      }

      return {
        success: true,
        vendor: '3CX',
        edition: edition,
        editionName: editionData.name,
        editionNameGreek: editionData.nameGreek,
        tier: `${selectedTier.simultaneousCalls} ${language === 'el' ? 'κλήσεις' : 'calls'}`,
        userRange: selectedTier.recommendedUsers,
        deploymentType: isSelfHosted ? 'Self-Hosted' : 'Hosted by 3CX',
        deploymentTypeGreek: isSelfHosted ? 'Αυτο-Φιλοξενούμενο' : 'Φιλοξενείται από 3CX',
        annualCost: annualCost,
        monthlyCost: monthlyCost.toFixed(2),
        setupFeeEstimate: setupFeeEstimate,
        firstYearTotal: firstYearTotal,
        currency: threeCXPricing.currency,
        keyFeatures: keyFeatures,
        recommendation: needsEnterpriseFeatures
          ? (language === 'el'
            ? `Το 3CX Enterprise περιλαμβάνει όλα τα premium χαρακτηριστικά με dedicated support και SLA εγγυήσεις.`
            : `3CX Enterprise includes all premium features with dedicated support and SLA guarantees.`)
          : (language === 'el'
            ? `Το 3CX Professional προσφέρει πλήρη λειτουργικότητα call center με αναγνωρισμένη αξιοπιστία.`
            : `3CX Professional offers full call center functionality with industry-recognized reliability.`),
        deploymentNote: isSelfHosted
          ? (language === 'el'
            ? `Self-hosted: Εσείς διαχειρίζεστε την υποδομή. Χαμηλότερο κόστος, πλήρης έλεγχος.`
            : `Self-hosted: You manage infrastructure. Lower cost, full control.`)
          : (language === 'el'
            ? `Hosted by 3CX: Πλήρως διαχειριζόμενο cloud με 99.9% uptime SLA.`
            : `Hosted by 3CX: Fully managed cloud with 99.9% uptime SLA.`)
      };
    },
    render: ({ result, status, args }) => {
      if (status === "executing") {
        return (
          <div className="glass p-6 rounded-xl border border-blue-400/30 animate-pulse bg-gray-900/80">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCalculator} className="text-blue-400 text-xl animate-spin" />
              <span className="text-white font-medium">
                {language === 'el' ? 'Υπολογισμός 3CX κόστους...' : 'Calculating 3CX costs...'}
              </span>
            </div>
          </div>
        );
      }

      if (!result || result.error) {
        return (
          <div className="glass p-6 rounded-xl border border-red-400/30 bg-gray-900/80">
            <p className="text-red-400 font-medium">{result?.message || 'Error calculating 3CX costs'}</p>
          </div>
        );
      }

      return (
        <div className="glass p-8 rounded-xl border-2 border-blue-400/50 shadow-xl bg-gray-900/80">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-400/30">
            <div className="bg-blue-400/20 p-3 rounded-lg">
              <FontAwesomeIcon icon={faCloud} className="text-blue-300 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {language === 'el' ? 'Εκτίμηση Κόστους 3CX' : '3CX Cost Estimate'}
              </h3>
              <p className="text-gray-300 text-sm font-medium">
                {args?.numberOfUsers} {language === 'el' ? 'χρήστες' : 'users'}
              </p>
            </div>
          </div>

          {/* Edition Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-200 font-medium">
                {language === 'el' ? 'Προτεινόμενη Έκδοση:' : 'Recommended Edition:'}
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-300 drop-shadow-lg">
              3CX {language === 'el' ? result.editionNameGreek : result.editionName}
            </div>
            <div className="text-sm text-gray-200 mt-1 font-medium">
              {result.tier} • {result.userRange} {language === 'el' ? 'χρήστες' : 'users'}
            </div>
            <div className="text-xs text-blue-300 mt-2 font-semibold">
              {language === 'el' ? result.deploymentTypeGreek : result.deploymentType}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-800/60 rounded-lg p-6 mb-6 border border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-gray-200 text-sm mb-1 font-medium">
                  {language === 'el' ? 'Ετήσια Συνδρομή' : 'Annual Subscription'}
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faEuroSign} className="text-lg text-blue-300" />
                  {result.annualCost}
                </div>
              </div>
              <div>
                <div className="text-gray-200 text-sm mb-1 font-medium">
                  {language === 'el' ? 'Μηνιαίο Ισοδύναμο' : 'Monthly Equivalent'}
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faEuroSign} className="text-lg text-blue-300" />
                  {result.monthlyCost}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600/50 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-200 font-medium">
                  {language === 'el' ? 'Εγκατάσταση (εκτίμηση)' : 'Setup (estimate)'}
                </span>
                <span className="text-white font-bold">{result.setupFeeEstimate}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-blue-400/40">
                <span className="text-blue-300 drop-shadow-lg">
                  {language === 'el' ? 'Πρώτος Χρόνος (από)' : 'First Year (from)'}
                </span>
                <span className="text-blue-300 drop-shadow-lg">€{result.firstYearTotal}+</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-200 mb-3">
              {language === 'el' ? 'Κύρια Χαρακτηριστικά:' : 'Key Features:'}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {result.keyFeatures.map((feature: any, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded ${
                    feature.highlight ? 'bg-blue-400/20 border border-blue-400/40' : 'bg-gray-800/50 border border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className={feature.highlight ? 'text-blue-300' : 'text-green-400'}
                    />
                    <span className={`text-sm ${feature.highlight ? 'text-blue-200 font-bold' : 'text-gray-200 font-medium'}`}>
                      {feature.name}
                    </span>
                  </div>
                  <span className="text-white text-sm font-bold">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-blue-400/20 border border-blue-400/40 rounded-lg p-4 mb-4">
            <div className="text-sm text-blue-200 font-medium leading-relaxed">
              {result.recommendation}
            </div>
          </div>

          {/* Deployment Note */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <div className="text-xs text-gray-300 font-medium leading-relaxed">
              {result.deploymentNote}
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <CopilotSidebar
      defaultOpen={true}
      clickOutsideToClose={false}
      hitEscapeToClose={false}
      instructions={systemInstructions}
      labels={{
        title: t('telena.title'),
        initial: t('telena.welcome'),
      }}
      className="h-screen"
    >
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <Navigation />
          
          {/* Hero Section */}
          <div className="container mx-auto px-6 py-16 pt-24">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {t('telena.title')}
              </h1>
              <p className="text-xl text-cyan-300 mb-4">
                {t('telena.subtitle')}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t('telena.intro')}
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="glass p-6 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-3xl mb-4">
                  <FontAwesomeIcon icon={faCalculator} />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('telena.capability1')}</h3>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-3xl mb-4">
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('telena.capability2')}</h3>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-3xl mb-4">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('telena.capability3')}</h3>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-3xl mb-4">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('telena.capability4')}</h3>
              </div>
            </div>

            {/* Package Cards */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                {t('telena.packages.title')}
              </h2>
              <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
                {language === 'el' 
                  ? 'Δύο οικογένειες πακέτων με ετήσια τιμολόγηση. Η Telena θα σας βοηθήσει να επιλέξετε το κατάλληλο tier.'
                  : 'Two package families with annual pricing. Telena will help you choose the right tier.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Family */}
                <div className="glass p-8 rounded-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                    {language === 'el' ? 'Βασικό' : 'Basic'}
                  </h3>
                  <div className="text-sm text-gray-400 mb-4">
                    {language === 'el' ? 'Εγκατάσταση: €120' : 'Setup: €120'}
                  </div>
                  <div className="text-3xl font-bold text-white mb-6">
                    €49-€189<span className="text-lg text-gray-400">/year</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li className="text-sm">• 6 tiers: XXS to XL (2-25 users)</li>
                    <li className="text-sm">• Unlimited SIP trunks & DIDs</li>
                    <li className="text-sm">• Recordings & voicemail</li>
                    <li className="text-sm">• IVR menus & ring groups</li>
                    <li className="text-sm">• Conference rooms</li>
                  </ul>
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-white/10">
                    {language === 'el' 
                      ? 'Ιδανικό για μικρές επιχειρήσεις'
                      : 'Ideal for small businesses'}
                  </div>
                </div>

                {/* Professional Family */}
                <div className="glass p-8 rounded-xl border-2 border-cyan-400/50 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                    RECOMMENDED
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                    {language === 'el' ? 'Επαγγελματικό' : 'Professional'}
                  </h3>
                  <div className="text-sm text-gray-400 mb-4">
                    {language === 'el' ? 'Εγκατάσταση: €140' : 'Setup: €140'}
                  </div>
                  <div className="text-3xl font-bold text-white mb-6">
                    €45-€220<span className="text-lg text-gray-400">/year</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li className="text-sm">• 6 tiers: XXS to XL (2-25 users)</li>
                    <li className="text-sm">• All Basic features +</li>
                    <li className="text-sm font-semibold text-cyan-300">• Call Center queues</li>
                    <li className="text-sm font-semibold text-cyan-300">• Operator Panel</li>
                    <li className="text-sm font-semibold text-cyan-300">• Call Broadcast</li>
                    <li className="text-sm">• Click to call</li>
                  </ul>
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-cyan-400/20">
                    {language === 'el' 
                      ? 'Για επιχειρήσεις με call center'
                      : 'For businesses with call center needs'}
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 text-sm text-gray-400">
                {language === 'el'
                  ? 'Ρωτήστε την Telena για να βρείτε το ακριβές tier που ταιριάζει στις ανάγκες σας'
                  : 'Ask Telena to find the exact tier that fits your needs'}
              </div>
            </div>

            {/* Quick Questions */}
            <div className="glass p-8 rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {language === 'el' ? 'Συχνές Ερωτήσεις' : 'Quick Questions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-cyan-400/50">
                  <span className="text-cyan-400 mr-2">→</span>
                  <span className="text-white">{t('telena.question.sip')}</span>
                </button>
                <button className="text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-cyan-400/50">
                  <span className="text-cyan-400 mr-2">→</span>
                  <span className="text-white">{t('telena.question.cloudpbx')}</span>
                </button>
                <button className="text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-cyan-400/50">
                  <span className="text-cyan-400 mr-2">→</span>
                  <span className="text-white">{t('telena.question.benefits')}</span>
                </button>
                <button className="text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-cyan-400/50">
                  <span className="text-cyan-400 mr-2">→</span>
                  <span className="text-white">{t('telena.question.costs')}</span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center text-gray-400 text-sm">
              <p>
                {language === 'el' 
                  ? 'Χρησιμοποιήστε το chat στα δεξιά για εξατομικευμένη σύμβουλό. Η Telena θα σας βοηθήσει να επιλέξετε την κατάλληλη λύση.'
                  : 'Use the chat on the right for personalized consultation. Telena will help you choose the right solution.'}
              </p>
            </div>
          </div>
          
          <Footer />
        </div>
      </CopilotSidebar>
  );
};

export default Telena;

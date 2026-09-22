import { BlogPost, TeamMember } from '../types';
import { IMAGES } from '../assets/images';

export const SCIENTIFIC_BOARD: TeamMember[] = [
  {
    id: 'dr-lindqvist',
    name: 'Dr. Soren Lindqvist',
    role: 'Head of Microbiome Formulation',
    credentials: 'PhD Biochemistry, Karolinska Institutet',
    bio: 'Pioneered clinical research in strain-specific competitive exclusion and bacterial survivability through upper gastrointestinal acidity.',
    image: IMAGES.avatarMichael,
  },
  {
    id: 'dr-morales',
    name: 'Dr. Althea Morales',
    role: 'Director of Botanical Pharmacology',
    credentials: 'PharmD, MSc Phytochemistry, UC Berkeley',
    bio: 'Specializes in bioactive polyphenolic extraction and the standardization of adaptogenic roots without synthetic solvents.',
    image: IMAGES.avatarSarah,
  },
  {
    id: 'dr-sato',
    name: 'Dr. Kenji Sato',
    role: 'Lead Clinical Trials Investigator',
    credentials: 'MD, PhD Gastroenterology, Tokyo University',
    bio: 'Directs placebo-controlled, double-blind human clinical evaluations analyzing gut mucosal permeability and systemic biomarker response.',
    image: IMAGES.avatarMichael,
  },
  {
    id: 'dr-bennett',
    name: 'Dr. Rachel Bennett',
    role: 'Mitochondrial Cellular Biology Advisor',
    credentials: 'PhD Cellular Metabolism, Cambridge University',
    bio: 'Investigates trace marine chelation and intracellular mineral transport mechanisms to optimize bio-availability.',
    image: IMAGES.avatarSarah,
  },
];

export const SOURCING_ORIGINS = [
  {
    title: 'Nordic Wild Chaga',
    region: 'Lapland, Arctic Finland',
    detail: 'Harvested from certified wild-growth birch forests under sub-zero conditions to maximize antioxidant beta-glucan concentration.',
    badge: 'Wildcrafted • Sub-Arctic',
  },
  {
    title: 'Marine Magnesium Complex',
    region: 'Dead Sea Mineral Basin',
    detail: 'Naturally chelated from deep Mediterranean sea waters through a clean evaporation matrix without chemical processing.',
    badge: 'Solar Evaporated • Elemental',
  },
  {
    title: 'KSM-66 Organic Ashwagandha',
    region: 'Rajasthan, India',
    detail: 'Cultivated in regenerative soil using traditional green water-extraction that preserves the natural full-spectrum withanolides.',
    badge: 'Certified Organic • Single Estate',
  },
  {
    title: 'Alleppey Curcuma Longa',
    region: 'Kerala, India',
    detail: 'Heirloom botanical variety possessing exceptional 95% standardized curcuminoid density to support cellular resilience.',
    badge: 'Non-GMO • Regenerative',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'gut-brain-axis-microbial-metabolites',
    title: 'The Gut-Brain Axis: How Microbial Metabolites Shape Mood and Focus',
    excerpt:
      'Recent clinical neuro-gastroenterology reveals that over 90% of peripheral serotonin and vital short-chain fatty acids originate directly from bacterial fermentation in the colon.',
    category: 'Microbiome Science',
    readTime: '6 min read',
    date: 'September 14, 2026',
    author: {
      name: 'Dr. Soren Lindqvist',
      role: 'Head of Formulation',
      avatar: IMAGES.avatarMichael,
    },
    image: IMAGES.greenCapsule,
    content: [
      'For decades, neuroscience viewed the brain as an isolated executive center operating behind the protective blood-brain barrier. Today, rigorous clinical trials have inverted that paradigm: the gut microbiome communicates bi-directionally with the central nervous system via the vagus nerve, endocrine pathways, and neuroactive microbial metabolites.',
      'When beneficial commensal bacteria ferment specific prebiotic fibers, they generate Short-Chain Fatty Acids (SCFAs)—principally butyrate, propionate, and acetate. Butyrate specifically acts as an epigenetic regulator, reinforcing the integrity of both the intestinal epithelial lining and the blood-brain barrier.',
      'Furthermore, specific probiotic strains such as Lactobacillus rhamnosus and Bifidobacterium longum produce gamma-aminobutyric acid (GABA), the brain’s principal inhibitory neurotransmitter responsible for modulating nervous arousal and sustaining calm cognitive focus.',
      'Our formulation approach pairs 24 targeted strains with non-fermenting prebiotic matrices so that vital colony-forming units survive gastric transit and colonize the distal tract where this metabolic synthesis takes place.',
    ],
    takeaways: [
      'Over 90% of peripheral serotonin and crucial GABA precursors are synthesized through gut-mediated biochemical pathways.',
      'Butyrate reinforces intestinal epithelial junctions and supports blood-brain barrier integrity.',
      'Daily intake of targeted, acid-resistant strains directly correlates with measurable reductions in perceived stress biomarkers.',
    ],
    citations: [
      'Cryan, J. F., et al. "The Microbiome-Gut-Brain Axis." Physiological Reviews, 2019.',
      'Foster, J. A., & Neufeld, K. A. "Gut-brain axis: how the microbiome influences anxiety and depression." Trends in Neurosciences, 2013.',
    ],
  },
  {
    id: 'post-2',
    slug: 'bioavailability-paradox-synthetic-multivitamins',
    title: 'The Bioavailability Paradox: Why Synthetic Isolates Fail Cellular Uptake',
    excerpt:
      'Unpacking why high-dose synthetic vitamins are often excreted unabsorbed, and how chelated botanical matrices enable true cellular assimilation.',
    category: 'Clinical Studies',
    readTime: '8 min read',
    date: 'August 28, 2026',
    author: {
      name: 'Dr. Rachel Bennett',
      role: 'Metabolism Advisor',
      avatar: IMAGES.avatarSarah,
    },
    image: IMAGES.heroBottle,
    content: [
      'A common misconception in nutritional supplements is that higher milligram dosages equal greater efficacy. In reality, human cellular transport mechanisms are saturable and biologically selective. Synthetic mineral isolates—such as magnesium oxide or cyanocobalamin—often possess poor water solubility and low mucosal affinity.',
      'When an unchelated mineral enters the gastrointestinal tract, the acidic environment of the stomach causes dissociation into reactive ions that bind to dietary phytates, rendering them completely insoluble and provoking gastrointestinal discomfort.',
      'By chelating trace minerals with organic glycine molecules or delivering botanicals within their native synergistic co-factor matrix, the digestive tract absorbs them intact through specialized peptide channels.',
      'At Nexwell, every single micro-nutrient is calibrated not for theoretical shelf potency, but for verified intracellular bioavailability confirmed through cellular uptake bioassays.',
    ],
    takeaways: [
      'Synthetic isolates frequently trigger osmotic water shifts and digestive intolerance.',
      'Chelation binds elemental minerals to amino acids, enabling direct transport across mucosal barriers.',
      'Bioavailability, rather than nominal milligram count, governs physiological impact.',
    ],
    citations: [
      'Schuyler, M. et al. "Intestinal Transport and Bioavailability of Amino Acid Chelated Minerals." Journal of Nutritional Biochemistry, 2021.',
    ],
  },
  {
    id: 'post-3',
    slug: 'circadian-nutrient-timing-probiotic-colonization',
    title: 'Circadian Nutrient Timing: When to Take Probiotics for Maximum Colonization',
    excerpt:
      'Chronobiology influences gastric pH, bile secretion, and peristaltic transit. Here is the clinical rationale behind morning fasting intake.',
    category: 'Daily Habits',
    readTime: '5 min read',
    date: 'August 12, 2026',
    author: {
      name: 'Dr. Kenji Sato',
      role: 'Clinical Trials Lead',
      avatar: IMAGES.avatarMichael,
    },
    image: IMAGES.womanSunlight,
    content: [
      'Human gastrointestinal motility is intrinsically tied to our circadian pacemaker. Gastric acid secretion follows a predictable diurnal rhythm, characterized by lowest baseline acidity upon waking before the cephalic phase of digestion is stimulated by food.',
      'Taking a synbiotic capsule on an empty stomach or with a light glass of room-temperature water allows the acid-resistant enteric shell to transit rapidly through the stomach into the duodenum in under 20 minutes.',
      'Conversely, administering probiotics during heavy meals prolongs gastric residence time up to 3 hours, exposing bacteria to prolonged mechanical churning and heightened proteolytic enzymes.',
      'By synchronizing your supplementation with natural gastrointestinal chronobiology, viable bacterial delivery to the colon increases by over 340%.',
    ],
    takeaways: [
      'Gastric acidity and peristaltic rhythm follow distinct 24-hour circadian cycles.',
      'Morning ingestion with room-temperature water minimizes gastric transit duration.',
      'Avoiding concurrent hot liquids protects delicate probiotic organisms from thermal degradation.',
    ],
  },
  {
    id: 'post-4',
    slug: 'botanical-traceability-and-heavy-metal-audits',
    title: 'Botanical Traceability: Why 400+ Contaminant Screening is Essential',
    excerpt:
      'Commercial herbs often absorb industrial lead and pesticide runoff from depleted topsoil. How rigorous batch testing guarantees true biological purity.',
    category: 'Botanical Sourcing',
    readTime: '7 min read',
    date: 'July 29, 2026',
    author: {
      name: 'Dr. Althea Morales',
      role: 'Director of Pharmacology',
      avatar: IMAGES.avatarSarah,
    },
    image: IMAGES.turmericSlice,
    content: [
      'Soil composition directly determines botanical chemistry. Deep-rooting adaptogens like Ashwagandha and Turmeric naturally accumulate heavy metals such as cadmium, lead, and arsenic if grown in proximity to industrial agricultural runoff.',
      'Standard regulatory compliance only requires testing for nominal limits across four basic heavy metals. Nexwell established a voluntary standard: screening every single production lot across 400+ pesticide residues, residual solvents, mycotoxins, and glyphosate.',
      'Our dark amber UV-protective pharmaceutical glass shields sensitive botanical bioactives from photodegradation, ensuring what is printed on the certificate of analysis matches what reaches your cells.',
    ],
    takeaways: [
      'Adaptogenic roots act as natural bioaccumulators, absorbing soil environmental minerals.',
      'Nexwell enforces triple-phase independent testing across 400+ contaminants for every batch.',
      'Dark amber glass protects delicate polyphenols from room-temperature UV oxidation.',
    ],
  },
  {
    id: 'post-5',
    slug: 'prebiotics-vs-probiotics-synbiotic-synergy',
    title: 'Prebiotics vs. Probiotics: The Science Behind the Synbiotic Synergy',
    excerpt:
      'Introducing billions of live bacteria without prebiotic fuel is like planting seeds in arid sand. How precision fibers feed the colonies.',
    category: 'Microbiome Science',
    readTime: '6 min read',
    date: 'July 11, 2026',
    author: {
      name: 'Dr. Soren Lindqvist',
      role: 'Head of Formulation',
      avatar: IMAGES.avatarMichael,
    },
    image: IMAGES.mossySoilStrata,
    content: [
      'While probiotics supply live beneficial strains, prebiotics are the specialized indigestible carbohydrates that serve as cellular nutrition exclusively for those strains.',
      'Many generic commercial supplements utilize fast-fermenting inulin or fructooligosaccharides (FOS). While cheap, these compounds often ferment prematurely in the small intestine, provoking gas, bloating, and discomfort.',
      'Nexwell formulated a targeted, non-fermenting prebiotic outer capsule containing micro-purified polyphenols and larch arabinogalactan. This matrix resists upper-GI breakdown and selectively fuels beneficial Bifidobacteria deep in the colon.',
      'The result is balanced microbiome proliferation without gastrointestinal distress.',
    ],
    takeaways: [
      'Probiotics require specific prebiotic substrates to successfully anchor and multiply.',
      'Non-fermenting prebiotic matrices prevent uncomfortable premature upper-GI gas.',
      'The nested dual-capsule design delivers probiotics directly to where they flourish.',
    ],
  },
  {
    id: 'post-6',
    slug: 'cellular-resilience-mitochondria-marine-minerals',
    title: 'Cellular Resilience: How Marine Electrolytes Rejuvenate Mitochondrial Function',
    excerpt:
      'Deep seawater minerals provide 72 trace elemental co-factors necessary for ATP synthesis and cellular osmotic equilibrium.',
    category: 'Clinical Studies',
    readTime: '5 min read',
    date: 'June 22, 2026',
    author: {
      name: 'Dr. Rachel Bennett',
      role: 'Metabolism Advisor',
      avatar: IMAGES.avatarSarah,
    },
    image: IMAGES.mistyPineValley,
    content: [
      'Every single breath and heartbeat relies on mitochondrial production of adenosine triphosphate (ATP). What is often overlooked is that the enzyme ATP-synthase requires magnesium ions as an obligate co-factor.',
      'Modern depleted soil contains up to 60% less bioavailable magnesium than 50 years ago. Supplementing with generic elemental salts fails to replenish intracellular deficits due to poor cellular transport.',
      'Our solar-evaporated marine mineral complex supplies magnesium alongside ionic trace elements in exact biological ratios that mimic human blood serum.',
    ],
    takeaways: [
      'Magnesium is required for every enzymatic step of cellular ATP energy generation.',
      'Natural ionic marine co-factors enhance cellular membrane permeability.',
      'Restores vitality and muscular relaxation without digestive upset.',
    ],
  },
];

export const CONTACT_FAQS = [
  {
    question: 'How do I take Nexwell Daily Synbiotic for optimal results?',
    answer:
      'Take 1 capsule daily in the morning with a glass of room-temperature water, ideally 15–20 minutes before your first meal. If you have a sensitive stomach, you can take it alongside a light snack.',
  },
  {
    question: 'How does the subscription refill program work?',
    answer:
      'Your first order arrives in our signature dark amber UV-protective glass jar. Every 30 days thereafter, you will receive an eco-friendly, compostable refill pouch. You can pause, reschedule, or cancel your subscription at any time with one click in your account.',
  },
  {
    question: 'Do your products require refrigeration?',
    answer:
      'No. Nexwell is engineered with a dual-capsule nested delivery system and moisture-barrier packaging that preserves strain viability at room temperature (up to 77°F / 25°C). Keep your glass jar in a cool, dry place away from direct sunlight.',
  },
  {
    question: 'Are your formulations third-party tested?',
    answer:
      'Yes. Every production batch is tested by independent ISO-17025 accredited laboratories for potency, identity, and across 400+ contaminants including heavy metals, pesticides, glyphosate, and microbial pathogens.',
  },
  {
    question: 'Can I speak with a clinical advisor about specific health concerns?',
    answer:
      'Our clinical advisory team is available for product-related inquiries at science@nexwell.co. For medical diagnosis or personalized treatment plans, we always recommend consulting your personal healthcare practitioner.',
  },
];

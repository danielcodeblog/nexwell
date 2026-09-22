import { Ingredient, Principle, Pillar, Testimonial } from '../types';
import { IMAGES } from '../assets/images';

export const PRINCIPLES: Principle[] = [
  {
    id: 'clean-formulations',
    title: 'Clean Formulations',
    description:
      'Every ingredient is carefully selected to deliver purposeful support without unnecessary fillers, helping you build healthier habits with confidence.',
    dotCount: 3,
    gridCols: 3,
  },
  {
    id: 'everyday-simplicity',
    title: 'Everyday Simplicity',
    description:
      'Designed to fit seamlessly into modern routines, making daily wellness easier, more consistent, and sustainable over time.',
    dotCount: 6,
    gridCols: 3,
  },
  {
    id: 'trusted-transparency',
    title: 'Trusted Transparency',
    description:
      'Clear ingredients, honest formulations, and science-informed development ensure you always know exactly what you’re taking.',
    dotCount: 9,
    gridCols: 3,
  },
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'ashwagandha',
    number: '01',
    name: 'Ashwagandha',
    benefit: 'Adaptogenic stress reduction and adrenal balance',
    description:
      'Clinically studied KSM-66 extract supporting mental clarity, restorative sleep patterns, and daily vitality balance.',
    source: 'Organic Roots, Rajasthan, India',
  },
  {
    id: 'magnesium-glycinate',
    number: '02',
    name: 'Magnesium',
    benefit: 'Neuromuscular relaxation and metabolic function',
    description:
      'Chelated high-absorption magnesium glycinate formulated for cellular energy generation, muscular relief, and calm nervous system function.',
    source: 'Seawater Extract, Dead Sea Mineral Basin',
  },
  {
    id: 'turmeric',
    number: '03',
    name: 'Turmeric',
    benefit: 'Antioxidant cellular defense',
    description:
      'Rich in natural antioxidants that help maintain a healthy inflammatory response.',
    source: 'Wild Heirloom Curcuma Longa, Alleppey',
  },
  {
    id: 'rhodiola-magnesium',
    number: '04',
    name: 'Magnesium Complex',
    benefit: 'Bioavailable dual-phase cellular recovery',
    description:
      'Synergistic elemental mineral blend formulated to sustain optimal intracellular hydration and mitochondrial recovery.',
    source: 'Plant-Cultivated Marine Botanical Matrix',
  },
];

export const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Science-Backed Formulas',
    description:
      'Developed alongside clinical biochemists and microbiome researchers to provide targeted, bioavailable nutritional support validated by rigorous human clinical trials.',
  },
  {
    number: '02',
    title: 'Daily-Friendly Formulas',
    description:
      'Crafted for maximum gastrointestinal comfort and seamless morning integration, delivering sustained vitality that fits naturally into your ongoing wellness ritual.',
  },
  {
    number: '03',
    title: 'Responsibly Sourced',
    description:
      'Directly collaborating with certified sustainable growers and marine cultivators to secure transparent, regenerative botanicals you can depend on every single day.',
  },
  {
    number: '04',
    title: 'Uncompromising Quality',
    description:
      'Every production batch undergoes third-party verification and comprehensive testing across 400+ environmental contaminants to ensure ultimate purity and potency.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      '“I’ve never stayed consistent with supplements until Nexwell. It made wellness feel simple, approachable, and genuinely enjoyable every single day.”',
    author: 'Elena R.',
    title: 'Verified Member',
    avatar: IMAGES.avatarSarah,
    rotation: '-rotate-3',
    zIndex: 10,
  },
  {
    id: 'test-2',
    quote:
      '“Nexwell made my wellness routine effortless with clean ingredients, simple formulas, and noticeable results I genuinely enjoy every single day.”',
    author: 'Michael T.',
    title: 'Daily Member',
    avatar: IMAGES.avatarMichael,
    rotation: 'rotate-0',
    zIndex: 30,
  },
  {
    id: 'test-3',
    quote:
      '“...simple, effective, and beautifully designed supplements that seamlessly fit into my life while feeling better every single day.”',
    author: 'David K.',
    title: 'Verified Member',
    avatar: IMAGES.avatarMichael,
    rotation: 'rotate-3',
    zIndex: 20,
  },
];

export const MAIN_PRODUCT = {
  id: 'ds-01',
  name: 'Nexwell',
  subtitle: 'Daily Synbiotic',
  badge: 'DS-01® DAILY SYNBIOTIC',
  tagline: 'PROBIOTIC + PREBIOTIC SUPPLEMENT',
  specs: '30 CAPSULES • 30 DAY SUPPLY',
  price: 40.50,
  oneTimePrice: 50.00,
  rating: 4.9,
  reviewCount: 3840,
  capsuleCount: 30,
  supplyDays: 30,
  description:
    'A 24-strain broad spectrum synbiotic formulated with systemically-studied probiotic strains and non-fermenting prebiotic fiber.',
  image: IMAGES.heroBottle,
};

export const ADD_ONS = [
  {
    id: 'travel-vial',
    name: 'Airtight Travel Canister',
    subtitle: 'Pocket UV-Shielded Glass & Aluminum Case',
    price: 12.00,
    image: IMAGES.canisterDriftwood,
    badge: 'Popular',
    description: 'Holds 14 daily synbiotic capsules for travel, work, or weekend trips without humidity exposure.',
  },
  {
    id: 'prebiotic-booster',
    name: 'Prebiotic Botanical Fiber Reset',
    subtitle: '14-Day Micro-Targeted Soluble Sachet Pack',
    price: 18.00,
    image: IMAGES.greenCapsule,
    badge: 'Synergistic',
    description: 'Nourishes bifidobacteria and accelerates digestive ease with organic baobab and green kiwi fiber.',
  },
];


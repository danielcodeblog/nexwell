import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Dna,
  Sparkles,
  Leaf,
  CheckCircle2,
  XCircle,
  FlaskConical,
  Layers,
  HeartPulse,
} from 'lucide-react';
import { PILLARS } from '../data/nexwellData';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface WhyNexwellProps {
  onProcessClick: () => void;
}

const COMPARISONS = [
  {
    feature: 'Capsule Protection',
    nexwell: 'ViaCap® 2-in-1 nested capsule protects 100% of live strains from gastric acid',
    conventional: 'Single gel capsule dissolves in stomach acid before reaching colon',
  },
  {
    feature: 'Ingredient Purity',
    nexwell: 'Zero synthetic binders, zero magnesium stearate, zero artificial colorants',
    conventional: 'Frequently contains fillers, talc, flow agents, and synthetic dyes',
  },
  {
    feature: 'Bioavailability',
    nexwell: 'Chelated minerals & methylated co-enzymes for maximal cellular uptake',
    conventional: 'Inorganic mineral oxides (magnesium oxide) with <4% absorption',
  },
  {
    feature: 'Batch Verification',
    nexwell: '50+ independent third-party tests per batch with public COA dossiers',
    conventional: 'Internal self-testing or unverified label claims without third-party proof',
  },
];

const PILLAR_ICONS = [FlaskConical, Layers, Leaf, ShieldCheck];

export const WhyNexwell: React.FC<WhyNexwellProps> = ({ onProcessClick }) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'comparison'>('pillars');
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
          y: 45,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
        });
      }

      // 2. Main content area entrance
      if (contentAreaRef.current) {
        gsap.from(contentAreaRef.current, {
          scrollTrigger: {
            trigger: contentAreaRef.current,
            start: 'top 82%',
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    // Magnetic button
    let cleanupBtn: (() => void) | undefined;
    if (buttonRef.current) {
      cleanupBtn = applyMagneticEffect(buttonRef.current, 0.4);
    }

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="section-why-nexwell"
      className="relative w-full bg-[#fbf9f5] pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden border-t border-[#ece8df]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Header Block */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-18">
          <div className="max-w-3xl">
            <span
              id="why-nexwell-badge"
              className="inline-block px-3.5 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 shadow-xs"
            >
              Why Nexwell
            </span>
            <h2
              id="why-nexwell-headline"
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.2] tracking-[-0.03em] text-[#1c1f1d] mb-4"
            >
              Engineered with biological rigor.
              <br />
              Formulated for everyday vitality.
            </h2>
            <p className="text-sm sm:text-[15px] text-[#635e54] max-w-xl font-normal leading-relaxed">
              We replace industry guesswork with peer-reviewed science, full traceability, and bioavailable nutrient delivery designed to nourish your body at a cellular level.
            </p>
          </div>

          {/* Action & Tab Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
            {/* View Switcher Pills */}
            <div className="inline-flex p-1 bg-[#ede8dc] rounded-full border border-[#ded8cb]">
              <button
                type="button"
                onClick={() => setActiveTab('pillars')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeTab === 'pillars'
                    ? 'bg-white text-[#1c1f1d] shadow-xs'
                    : 'text-[#6b665c] hover:text-[#1c1f1d]'
                }`}
              >
                Core Pillars
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeTab === 'comparison'
                    ? 'bg-white text-[#1c1f1d] shadow-xs'
                    : 'text-[#6b665c] hover:text-[#1c1f1d]'
                }`}
              >
                The Standard
              </button>
            </div>

            <button
              ref={buttonRef}
              id="why-nexwell-process-button"
              onClick={onProcessClick}
              className="magnetic group inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-all shadow-sm cursor-pointer"
            >
              <span>Our Full Protocol</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Content: Pillars or Comparison */}
        <div ref={contentAreaRef} className="my-8">
          {activeTab === 'pillars' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = PILLAR_ICONS[idx] || Sparkles;
                const isHovered = hoveredPillar === idx;

                return (
                  <div
                    key={pillar.number}
                    id={`pillar-${pillar.number}`}
                    onMouseEnter={() => setHoveredPillar(idx)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    className={`relative rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                      isHovered
                        ? 'border-[#254631]/40 shadow-[0_16px_36px_rgba(28,46,34,0.08)] -translate-y-1'
                        : 'border-[#ded8cb] shadow-xs hover:border-[#cfc8b8]'
                    }`}
                  >
                    {/* Top row: Number & Icon */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono font-medium tracking-widest text-[#787265] uppercase px-3 py-1 rounded-full bg-[#f3eee4] border border-[#e2dcce]">
                          {pillar.number}
                        </span>

                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isHovered
                              ? 'bg-[#1c2e22] text-white scale-110'
                              : 'bg-[#f4efe5] text-[#524c41]'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-[#1c1f1d] tracking-[-0.02em] leading-snug mb-3 group-hover:text-[#254631] transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-[13.5px] text-[#5e594d] leading-[1.7] font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom micro-metric */}
                    <div className="pt-6 mt-6 border-t border-[#f4efe5] flex items-center justify-between text-[11px] font-mono text-[#7a7467]">
                      <span>
                        {idx === 0 && '24 Clinical Strains'}
                        {idx === 1 && '100% Acid Resistant'}
                        {idx === 2 && 'Zero Synthetics'}
                        {idx === 3 && '50+ Lab Verifications'}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#254631]" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Comparison Table / The Nexwell Standard */
            <div className="rounded-3xl bg-white border border-[#ded8cb] p-6 sm:p-10 shadow-xs overflow-hidden">
              <div className="max-w-xl mb-8">
                <span className="text-[11px] font-mono text-[#254631] font-semibold uppercase tracking-widest">
                  Transparency Benchmark
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-[#1c1f1d] mt-1">
                  How Nexwell compares to standard supplements
                </h3>
              </div>

              <div className="divide-y divide-[#eee9de]">
                {COMPARISONS.map((item, index) => (
                  <div
                    key={index}
                    className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start"
                  >
                    <div className="md:col-span-3">
                      <span className="text-sm font-semibold text-[#1c1f1d] tracking-tight">
                        {item.feature}
                      </span>
                    </div>

                    <div className="md:col-span-5 flex items-start space-x-3 bg-[#f6f9f6] p-3.5 rounded-2xl border border-[#d6e3d9]">
                      <CheckCircle2 className="w-4 h-4 text-[#254631] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-mono font-semibold uppercase tracking-wide text-[#254631] mb-0.5">
                          Nexwell Standard
                        </span>
                        <p className="text-xs sm:text-[13px] text-[#2c332e] leading-relaxed">
                          {item.nexwell}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex items-start space-x-3 bg-[#faf9f6] p-3.5 rounded-2xl border border-[#ece7dc]">
                      <XCircle className="w-4 h-4 text-[#a39a89] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-mono font-semibold uppercase tracking-wide text-[#787265] mb-0.5">
                          Conventional Brands
                        </span>
                        <p className="text-xs sm:text-[13px] text-[#6b6559] leading-relaxed">
                          {item.conventional}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Trust Highlights Banner */}
        <div className="mt-14 pt-8 border-t border-[#ede7db] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-semibold text-[#1c1f1d] tracking-tight">100%</span>
            <p className="text-xs text-[#6e685c]">Home Compostable Refill Pouches</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-semibold text-[#1c1f1d] tracking-tight">50+</span>
            <p className="text-xs text-[#6e685c]">3rd-Party Potency & Purity Tests</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-semibold text-[#1c1f1d] tracking-tight">0</span>
            <p className="text-xs text-[#6e685c]">Artificial Binders or Preservatives</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-semibold text-[#1c1f1d] tracking-tight">24</span>
            <p className="text-xs text-[#6e685c]">Clinically Studied Probiotic Strains</p>
          </div>
        </div>
      </div>

      {/* Bottom Scenic Earth Strata Transition */}
      <div className="w-full relative mt-12 sm:mt-16 overflow-hidden pointer-events-none">
        <div className="w-full h-28 sm:h-36 relative">
          <img
            src={IMAGES.mossySoilStrata}
            alt="Organic mossy soil strata"
            className="w-full h-full object-cover object-top opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#fbf9f5] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf9f5] to-transparent" />
        </div>
      </div>
    </section>
  );
};

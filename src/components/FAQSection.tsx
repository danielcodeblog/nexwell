import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface FAQItem {
  question: string;
  answer: string;
}

const REAL_FAQS: FAQItem[] = [
  {
    question: 'What is Nexwell DS-01® Daily Synbiotic?',
    answer:
      'Nexwell DS-01® is a 2-in-1 capsule nested daily synbiotic combining 24 clinically validated, broad-spectrum probiotic strains with non-fermenting prebiotic botanical fiber to support systemic gastrointestinal, cardiovascular, dermatological, and immune health.',
  },
  {
    question: 'When and how should I take my daily capsules?',
    answer:
      'Take 2 capsules daily, ideally at the same time every day on an empty stomach with a glass of cool water—either first thing in the morning 20–30 minutes before your first meal, or right before sleep. If you have a sensitive stomach, you may take them alongside a light meal.',
  },
  {
    question: 'Do Nexwell supplements require refrigeration?',
    answer:
      'No. Our moisture-shielded, oxygen-barrier glass jars and ViaCap® dual-capsule delivery technology ensure 100% strain viability and potency at ambient room temperature (up to 79°F / 26°C) throughout their shelf life. No refrigeration is needed at home or while traveling.',
  },
  {
    question: 'How soon can I expect to notice results?',
    answer:
      'Digestive ease, smoother transit time, and reduced bloating typically improve within 24 to 72 hours. Deeper systemic benefits—such as enhanced skin clarity, reinforced gut barrier integrity, micronutrient absorption, and sustained daily energy—compound continuously with 3 to 6 months of consistent daily habits.',
  },
  {
    question: 'Can I take Nexwell with morning coffee or warm tea?',
    answer:
      'We recommend spacing your synbiotic dose by 15–20 minutes from very hot liquids (above 115°F / 46°C), as prolonged high heat can reduce live culture viability before the protective outer capsule dissolves safely in the stomach.',
  },
  {
    question: 'Can I take Nexwell alongside antibiotics or other supplements?',
    answer:
      'Yes. Nexwell is especially beneficial during and after antibiotic courses to help replenish critical beneficial microbiota. Simply take your synbiotic dose at least 2 hours apart from your antibiotic to prevent the medication from neutralizing live probiotic bacteria.',
  },
  {
    question: 'Is Nexwell safe during pregnancy or breastfeeding?',
    answer:
      'DS-01® contains rigorously sequenced, non-GMO, allergen-free, dairy-free, and vegan strains with extensive safety data. While formulated to be gentle and biologically pure, we always advise sharing our ingredient dossier with your OB-GYN or primary healthcare practitioner during pregnancy or nursing.',
  },
  {
    question: 'How does the refillable glass system and subscription work?',
    answer:
      'Your Welcome Kit arrives in a reusable, UV-protective amber glass apothecary jar and an airtight travel canister. Monthly refills arrive in 100% home-compostable bio-pouches made from FSC-certified plant fibers and algae ink. You can modify delivery frequency (30, 45, or 60 days), skip a month, or cancel anytime with one click.',
  },
];

interface FAQSectionProps {
  onContactClick?: () => void;
  onStandardsClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick, onStandardsClick }) => {
  // All real FAQs open by default
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(REAL_FAQS.map((_, i) => i))
  );

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const helpBoxRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // 2. List entrance with clearProps to guarantee permanent visibility
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 92%',
            },
          }
        );
      }

      // 3. Bottom Help Card
      if (helpBoxRef.current) {
        gsap.fromTo(
          helpBoxRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: helpBoxRef.current,
              start: 'top 95%',
            },
          }
        );
      }
    }, sectionRef);

    let cleanupBtn: (() => void) | undefined;
    if (contactBtnRef.current) {
      cleanupBtn = applyMagneticEffect(contactBtnRef.current, 0.4);
    }

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-faq"
      className="relative w-full bg-white pt-24 sm:pt-32 pb-24 sm:pb-32 border-t border-[#ece8df] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Clean, Uncluttered Editorial Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span
            id="faq-badge"
            className="inline-block px-3.5 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 shadow-xs bg-[#faf8f4]"
          >
            Frequently Asked Questions
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.2] tracking-[-0.03em] text-[#1c1f1d]"
          >
            Real answers to your everyday questions.
          </h2>
        </div>

        {/* Real FAQ List (All displayed cleanly with solid opaque backgrounds on pure white canvas) */}
        <div ref={listRef} className="space-y-4 mb-16">
          {REAL_FAQS.map((faq, idx) => {
            const isOpen = openIndices.has(idx);
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#fcfbf9] border-[#254631]/40 shadow-[0_10px_30px_rgba(28,46,34,0.06)]'
                    : 'bg-[#faf8f5] hover:bg-white border-[#ded8cb] hover:border-[#b8b09f] shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xs font-mono font-semibold text-[#787265]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base sm:text-[17px] font-semibold text-[#1c1f1d] tracking-tight group-hover:text-[#254631] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#1c2e22] text-white rotate-180'
                        : 'bg-[#eee8db] text-[#423d33] group-hover:bg-[#e2dcce]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 border-t border-[#eee7db]">
                    <p className="text-xs sm:text-[14px] text-[#484338] leading-[1.7] pt-4 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Personalized Consultation Callout */}
        <div
          ref={helpBoxRef}
          id="faq-help-box"
          className="p-8 sm:p-10 rounded-3xl bg-[#f2ede1] border border-[#dcd5c4] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs"
        >
          <div className="space-y-1.5 max-w-lg">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#254631] font-semibold">
              Personalized Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1c1f1d]">
              Have a specific question about your routine?
            </h3>
            <p className="text-xs sm:text-sm text-[#615c52] leading-relaxed">
              Our clinical science team and customer care concierges are available 7 days a week to assist with strain compatibility and personalized dosage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            {onStandardsClick && (
              <button
                type="button"
                onClick={onStandardsClick}
                className="px-5 py-2.5 rounded-full border border-[#cfc8b8] bg-white text-xs font-semibold text-[#2b2a26] hover:bg-[#f7f5ef] transition-colors cursor-pointer"
              >
                View Clinical Standards
              </button>
            )}

            {onContactClick && (
              <button
                ref={contactBtnRef}
                type="button"
                onClick={onContactClick}
                className="magnetic inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-colors shadow-sm cursor-pointer"
              >
                <span>Contact Advisory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

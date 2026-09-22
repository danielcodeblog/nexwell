import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface BentoShowcaseProps {
  onProductClick: () => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({ onProductClick }) => {
  const containerRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLImageElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const iconsWrapRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const badgePlantRef = useRef<HTMLDivElement>(null);
  const badgeCountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dual Card Aggressive Entrance
      if (leftCardRef.current && rightCardRef.current) {
        gsap.from(leftCardRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          x: -100,
          opacity: 0,
          duration: 1.3,
          ease: 'power4.out',
        });

        gsap.from(rightCardRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          x: 100,
          opacity: 0,
          duration: 1.3,
          ease: 'power4.out',
        });
      }

      // 2. Parallax scrub on Left emerald capsule image
      if (leftImgRef.current && leftCardRef.current) {
        gsap.to(leftImgRef.current, {
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
          yPercent: 15,
          scale: 1.15,
          ease: 'none',
        });
      }

      // 3. Parallax scrub on Right driftwood canister image
      if (rightImgRef.current && rightCardRef.current) {
        gsap.to(rightImgRef.current, {
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
          yPercent: -12,
          scale: 1.12,
          ease: 'none',
        });
      }

      // 4. Staggered icon pop
      if (iconsWrapRef.current) {
        gsap.from(iconsWrapRef.current.children, {
          scrollTrigger: {
            trigger: iconsWrapRef.current,
            start: 'top 85%',
          },
          scale: 0,
          rotation: -45,
          stagger: 0.12,
          duration: 0.8,
          ease: 'back.out(3)',
        });
      }

      // 5. Price card entrance
      if (priceCardRef.current) {
        gsap.from(priceCardRef.current, {
          scrollTrigger: {
            trigger: priceCardRef.current,
            start: 'top 90%',
          },
          y: 50,
          scale: 0.85,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(2)',
        });
      }

      // 6. Right Card Floating Badges: Continuous aggressive float loops
      if (badgePlantRef.current) {
        gsap.to(badgePlantRef.current, {
          y: '-=16',
          rotation: 3,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (badgeCountRef.current) {
        gsap.to(badgeCountRef.current, {
          y: '+=16',
          rotation: -3,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
        });
      }

      // 7. Interactive mouse tilt on right card badges
      const rightCardEl = rightCardRef.current;
      if (rightCardEl && badgePlantRef.current && badgeCountRef.current) {
        const onRightMouseMove = (e: MouseEvent) => {
          const rect = rightCardEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(badgePlantRef.current, {
            x: x * 30,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(badgeCountRef.current, {
            x: -x * 30,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const onRightMouseLeave = () => {
          gsap.to([badgePlantRef.current, badgeCountRef.current], {
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
        };

        rightCardEl.addEventListener('mousemove', onRightMouseMove);
        rightCardEl.addEventListener('mouseleave', onRightMouseLeave);
      }
    }, containerRef);

    // 8. Magnetic effect on price card
    let cleanupPrice: (() => void) | undefined;
    if (priceCardRef.current) {
      cleanupPrice = applyMagneticEffect(priceCardRef.current, 0.35);
    }

    return () => {
      ctx.revert();
      if (cleanupPrice) cleanupPrice();
    };
  }, []);

  return (
    <section ref={containerRef} id="section-products" className="w-full bg-[#fbf9f5] pb-24 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Card: Emerald Capsule & Everyday Wellness */}
        <div
          ref={leftCardRef}
          id="bento-card-left"
          className="relative rounded-[32px] overflow-hidden min-h-[560px] sm:min-h-[620px] bg-[#122417] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl group will-change-transform"
        >
          {/* Background image & gradient */}
          <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
            <img
              ref={leftImgRef}
              src={IMAGES.greenCapsule}
              alt="Nexwell Emerald Synbiotic Capsule"
              className="w-full h-full object-cover object-center opacity-85 scale-105 will-change-transform"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlays to guarantee legible text */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e1d13]/85 via-transparent to-[#0a160d]/90" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0d1c12]/30 to-[#0b180f]/80" />
          </div>

          {/* Top Row: Title on Left, 3 stacked circular icons on Right */}
          <div className="relative z-10 flex items-start justify-between">
            <h3
              id="bento-left-title"
              className="text-2xl sm:text-3xl font-medium tracking-tight text-white max-w-xs leading-snug"
            >
              Designed to Support Every Day Wellness
            </h3>

            {/* 3 Luxury Precision Bio-Glyphs Stacked */}
            <div ref={iconsWrapRef} className="flex flex-col space-y-2.5">
              {/* Glyph 1: Botanical Phyto-Matrix */}
              <div
                title="100% Plant-Cultivated Phyto-Active Matrix"
                className="group/glyph relative w-9 h-9 rounded-full bg-white/12 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 transition-all shadow-md hover:scale-115 active:scale-95 will-change-transform cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-emerald-200 group-hover/glyph:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22C12 22 4 17 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 17 12 22 12 22Z" />
                  <path d="M12 6V18" strokeDasharray="1.5 2" />
                  <circle cx="12" cy="11" r="2.2" fill="currentColor" fillOpacity="0.25" />
                </svg>
              </div>

              {/* Glyph 2: ViaCap® Dual-Chamber Delivery */}
              <div
                title="ViaCap® Nested Micro-Capsule Shield"
                className="group/glyph relative w-9 h-9 rounded-full bg-white/12 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 transition-all shadow-md hover:scale-115 active:scale-95 will-change-transform cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-emerald-200 group-hover/glyph:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="3" width="14" height="18" rx="7" />
                  <rect x="8.5" y="6.5" width="7" height="11" rx="3.5" strokeDasharray="2 1.5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Glyph 3: Circadian 24H Sustained Dispersion */}
              <div
                title="24-Hour Circadian Micro-Dispersion"
                className="group/glyph relative w-9 h-9 rounded-full bg-white/12 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 transition-all shadow-md hover:scale-115 active:scale-95 will-change-transform cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-emerald-200 group-hover/glyph:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7V12L15.5 14" />
                  <circle cx="12" cy="3" r="1" fill="currentColor" />
                  <circle cx="21" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row: Subcopy on left, buy glass card on right */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-12">
            <p
              id="bento-left-subcopy"
              className="text-xs sm:text-[13px] text-white/75 max-w-xs leading-relaxed font-normal"
            >
              Thoughtfully formulated with clean, science-backed ingredients
            </p>

            {/* Floating Glass Price Card */}
            <div
              ref={priceCardRef}
              id="bento-product-price-card"
              onClick={onProductClick}
              className="magnetic cursor-pointer group/card flex items-center justify-between p-4 px-5 rounded-2xl bg-white/20 hover:bg-white/35 backdrop-blur-xl border border-white/30 text-white shadow-xl hover:shadow-2xl transition-colors duration-300 w-full sm:w-auto min-w-[210px] will-change-transform"
            >
              <div>
                <div className="text-[14px] font-semibold tracking-tight text-white">
                  Nexwell
                </div>
                <div className="text-[11px] text-white/75 -mt-0.5">
                  Daily Synbiotic
                </div>
                <div className="text-[13px] font-medium text-white mt-1.5">
                  $ 40.50
                </div>
              </div>

              <div className="ml-4 w-9 h-9 rounded-full bg-[#111613] text-white flex items-center justify-center group-hover/card:bg-[#1e3b26] transition-colors group-hover/card:scale-110 duration-200">
                <ArrowRight className="w-4 h-4 group-hover/card:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Canister on Driftwood & Floating Badges */}
        <div
          ref={rightCardRef}
          id="bento-card-right"
          className="relative rounded-[32px] overflow-hidden min-h-[560px] sm:min-h-[620px] bg-[#ebe7dc] text-[#1c1f1d] p-8 sm:p-10 flex flex-col justify-between shadow-xl group will-change-transform"
        >
          {/* Driftwood & Canister photo */}
          <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
            <img
              ref={rightImgRef}
              src={IMAGES.canisterDriftwood}
              alt="Nexwell canister resting on natural driftwood"
              className="w-full h-full object-cover object-center scale-105 will-change-transform"
              referrerPolicy="no-referrer"
            />
            {/* Subtle soft vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ebe7dc]/70 via-transparent to-[#ebe7dc]/60" />
          </div>

          {/* Top Title */}
          <div className="relative z-10">
            <h3
              id="bento-right-title"
              className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1f1d] max-w-sm leading-snug"
            >
              Thoughtfully formulated for everyday health.
            </h3>
          </div>

          {/* Center Floating Pill Badges flanking the product */}
          <div className="relative z-10 flex items-center justify-between w-full my-auto py-8">
            {/* Left Pill: 100% Plant-Based */}
            <div
              ref={badgePlantRef}
              id="badge-plant-based"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/70 shadow-lg text-left transition-all duration-300 transform will-change-transform cursor-pointer hover:scale-110"
            >
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1f1d]">
                100%
              </div>
              <div className="text-[12px] font-semibold text-[#254631] mt-0.5">
                Plant-Based
              </div>
              <div className="text-[10px] text-[#6b665c]">
                Pure Wellness
              </div>
            </div>

            {/* Right Pill: 30 Daily Synbiotic */}
            <div
              ref={badgeCountRef}
              id="badge-synbiotic-count"
              className="p-3.5 sm:p-4 rounded-2xl bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/70 shadow-lg text-left transition-all duration-300 transform will-change-transform cursor-pointer hover:scale-110"
            >
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1f1d]">
                30
              </div>
              <div className="text-[12px] font-semibold text-[#254631] mt-0.5">
                Daily Synbiotic
              </div>
              <div className="text-[10px] text-[#6b665c]">
                Probiotic + Prebiotic
              </div>
            </div>
          </div>

          {/* Empty bottom space to balance height */}
          <div className="relative z-10 h-6" />
        </div>
      </div>
    </section>
  );
};

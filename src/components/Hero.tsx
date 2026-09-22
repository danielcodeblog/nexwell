import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const thumbnailBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(bgImgRef.current, { scale: 1.28, yPercent: -4 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 140,
        rotateX: -40,
        skewY: 5,
        opacity: 0,
      });
      gsap.set(buttonWrapRef.current, { scale: 0, y: 50, rotate: -6, opacity: 0 });
      gsap.set(subtextRef.current, { y: 60, opacity: 0 });
      gsap.set(thumbnailBadgeRef.current, { y: 80, scale: 0.8, opacity: 0 });

      // 2. Aggressive Entrance Master Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to(bgImgRef.current, {
        scale: 1.03,
        yPercent: 0,
        duration: 2.2,
        ease: 'power3.out',
      })
        .to(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          {
            yPercent: 0,
            rotateX: 0,
            skewY: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1.3,
            ease: 'power4.out',
          },
          '-=1.8'
        )
        .to(
          buttonWrapRef.current,
          {
            scale: 1,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'back.out(2.4)',
          },
          '-=0.9'
        )
        .to(
          [subtextRef.current, thumbnailBadgeRef.current],
          {
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 1.1,
            ease: 'expo.out',
          },
          '-=0.8'
        );

      // 3. ScrollTrigger aggressive parallax scrub on Hero exit
      if (heroRef.current && bgImgRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(bgImgRef.current, {
              y: p * 180,
              scale: 1.03 + p * 0.18,
              filter: `blur(${p * 6}px)`,
            });
            gsap.set('#hero-heading-container', {
              y: -p * 140,
              opacity: 1 - p * 1.5,
              scale: 1 - p * 0.08,
            });
            gsap.set(thumbnailBadgeRef.current, {
              y: -p * 80,
              scale: 1 - p * 0.2,
              opacity: 1 - p * 1.2,
            });
          },
        });
      }

      // 4. Aggressive mouse-move depth parallax across hero
      const heroEl = heroRef.current;
      if (heroEl) {
        const handleHeroMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xFactor = (clientX / innerWidth - 0.5) * 2; // -1 to 1
          const yFactor = (clientY / innerHeight - 0.5) * 2;

          gsap.to(bgImgRef.current, {
            x: xFactor * 25,
            y: yFactor * 25,
            duration: 0.8,
            ease: 'power2.out',
          });

          gsap.to('#hero-heading-container', {
            x: -xFactor * 18,
            y: -yFactor * 14,
            rotationY: xFactor * 8,
            rotationX: -yFactor * 8,
            transformPerspective: 900,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(thumbnailBadgeRef.current, {
            x: xFactor * 20,
            y: yFactor * 20,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        heroEl.addEventListener('mousemove', handleHeroMouseMove);
        return () => heroEl.removeEventListener('mousemove', handleHeroMouseMove);
      }
    }, heroRef);

    // 5. Magnetic button hover
    let cleanupMagnetic: (() => void) | undefined;
    if (buttonRef.current) {
      cleanupMagnetic = applyMagneticEffect(buttonRef.current, 0.4);
    }

    return () => {
      ctx.revert();
      if (cleanupMagnetic) cleanupMagnetic();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="section-hero"
      className="relative min-h-[92vh] lg:min-h-screen w-full bg-[#0a120c] overflow-hidden flex flex-col justify-between pt-28 pb-14 text-white perspective-[1000px]"
    >
      {/* Background Image with Cinematic Lighting */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          ref={bgImgRef}
          src={IMAGES.heroBottle}
          alt="Nexwell DS-01 Daily Synbiotic in organic mossy forest"
          className="w-full h-full object-cover object-center lg:object-[68%_center] opacity-85 will-change-transform origin-center"
          referrerPolicy="no-referrer"
        />
        {/* Soft Vignette and Shadow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060c07]/92 via-[#0a120c]/50 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c07] via-transparent to-black/35" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto py-12">
        <div id="hero-heading-container" className="max-w-2xl transform-style-3d will-change-transform">
          {/* Main Headline with Split Overflow Clapped Lines */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-[62px] font-medium leading-[1.08] tracking-[-0.03em] text-white flex flex-col"
          >
            <span className="overflow-hidden block">
              <span ref={line1Ref} className="block will-change-transform origin-bottom-left">
                Daily Wellness Starts
              </span>
            </span>
            <span className="overflow-hidden block">
              <span ref={line2Ref} className="block will-change-transform origin-bottom-left">
                Here. Simple Support
              </span>
            </span>
            <span className="overflow-hidden block">
              <span ref={line3Ref} className="block will-change-transform origin-bottom-left">
                For Everyday Health.
              </span>
            </span>
          </h1>

          {/* Shop Collection CTA Button */}
          <div ref={buttonWrapRef} className="mt-8 sm:mt-10 will-change-transform inline-block">
            <button
              ref={buttonRef}
              id="hero-shop-collection-button"
              onClick={onShopClick}
              className="magnetic group relative inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#f1ede2] text-[#0a120c] text-[14px] font-semibold tracking-tight transition-colors duration-200 shadow-xl hover:shadow-2xl active:scale-[0.96]"
            >
              <span>Shop Collection</span>
              <ArrowUpRight className="w-4 h-4 text-[#0a120c] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Subcopy on left, floating preview thumbnail on right */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col sm:flex-row items-start sm:flex-end justify-between gap-6 pt-6">
        <p
          ref={subtextRef}
          id="hero-subtext"
          className="text-white/75 text-sm sm:text-[15px] font-normal leading-relaxed max-w-md will-change-transform"
        >
          Clean supplements formulated to support
          <br className="hidden sm:inline" /> energy, balance, immunity, and everyday
          <br className="hidden sm:inline" /> wellbeing without the complexity.
        </p>

        {/* Small floating preview badge bottom right with 3D hover */}
        <div
          ref={thumbnailBadgeRef}
          id="hero-thumbnail-badge"
          onClick={onShopClick}
          className="cursor-pointer group flex items-center p-2 pr-4 rounded-2xl bg-black/45 hover:bg-black/70 backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-2xl hover:border-emerald-400/40 hover:scale-105 active:scale-95 will-change-transform"
        >
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#122316] relative flex-shrink-0">
            <img
              src={IMAGES.canisterDriftwood}
              alt="Nexwell canister thumbnail"
              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
              <span className="text-[10px] font-semibold tracking-wider text-white">nexwell</span>
            </div>
          </div>
          <div className="ml-3 hidden sm:block">
            <div className="text-[11px] font-medium text-white/90 leading-tight group-hover:text-emerald-300 transition-colors">
              DS-01® Synbiotic
            </div>
            <div className="text-[10px] text-white/60">30-Day Supply</div>
          </div>
        </div>
      </div>
    </section>
  );
};

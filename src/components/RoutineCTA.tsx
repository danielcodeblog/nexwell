import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface RoutineCTAProps {
  onBuildRoutineClick: () => void;
}

export const RoutineCTA: React.FC<RoutineCTAProps> = ({ onBuildRoutineClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background image aggressive parallax scrub
      if (bgImgRef.current && sectionRef.current) {
        gsap.to(bgImgRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
          yPercent: 18,
          scale: 1.22,
          ease: 'none',
        });
      }

      // 2. Central card drops in with aggressive spring
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
          y: -90,
          scale: 0.82,
          opacity: 0,
          duration: 1.2,
          ease: 'back.out(2.4)',
        });

        // 3. Interactive 3D Card Tilt
        const cardEl = cardRef.current;
        const xRot = gsap.quickTo(cardEl, 'rotationX', { duration: 0.35, ease: 'power2.out' });
        const yRot = gsap.quickTo(cardEl, 'rotationY', { duration: 0.35, ease: 'power2.out' });
        const scaleTo = gsap.quickTo(cardEl, 'scale', { duration: 0.35, ease: 'power2.out' });

        const onCardMove = (e: MouseEvent) => {
          const rect = cardEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          xRot(-y * 16);
          yRot(x * 16);
          scaleTo(1.02);
        };

        const onCardLeave = () => {
          xRot(0);
          yRot(0);
          scaleTo(1);
        };

        cardEl.addEventListener('mousemove', onCardMove);
        cardEl.addEventListener('mouseleave', onCardLeave);
      }
    }, sectionRef);

    // 4. Magnetic button effect
    let cleanupBtn: (() => void) | undefined;
    if (buttonRef.current) {
      cleanupBtn = applyMagneticEffect(buttonRef.current, 0.45);
    }

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-routine-cta"
      className="relative w-full min-h-[540px] sm:min-h-[620px] flex items-center justify-center overflow-hidden py-24 sm:py-32 perspective-[1000px]"
    >
      {/* Misty Alpine Forest Panorama Background */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src={IMAGES.mistyPineValley}
          alt="Misty evergreen mountain valley"
          className="w-full h-full object-cover object-center scale-110 will-change-transform"
          referrerPolicy="no-referrer"
        />
        {/* Soft top gradient to blend seamlessly with the community section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f5] via-transparent to-[#0a120c]/85" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Elevated Centered Architectural Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div
          ref={cardRef}
          className="p-10 sm:p-14 lg:p-16 rounded-[36px] bg-[#14231a]/90 hover:bg-[#14231a]/95 backdrop-blur-2xl border border-[#2d4737]/80 shadow-[0_30px_70px_rgba(10,20,13,0.35)] transition-all duration-300 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span
            id="routine-cta-badge"
            className="inline-block px-4 py-1.5 rounded-full border border-[#3b5945] text-[#d6ded8] text-[11px] font-mono tracking-[0.18em] uppercase mb-6 bg-[#1a2f23] shadow-xs"
          >
            Start Your Daily Routine
          </span>

          <h2
            id="routine-cta-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.2] tracking-[-0.03em] text-[#f7f5ef] mb-5 max-w-2xl mx-auto"
          >
            Support your daily vitality with clean, clinically backed nutrition.
          </h2>

          <p
            id="routine-cta-subtext"
            className="text-sm sm:text-[15px] text-[#c0bbaF] max-w-lg mx-auto leading-relaxed mb-9 font-normal"
          >
            Discover a personalized regimen engineered to integrate seamlessly into your morning ritual and sustain your cellular health for life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              ref={buttonRef}
              id="routine-cta-build-button"
              onClick={onBuildRoutineClick}
              className="magnetic group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#ede8dc] hover:bg-[#ded7c8] text-[#14231a] text-sm font-semibold tracking-tight transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Build Your Routine</span>
              <ArrowUpRight className="w-4 h-4 text-[#14231a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRINCIPLES } from '../data/nexwellData';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';

interface CorePrinciplesProps {
  onStandardsClick: () => void;
}

export const CorePrinciples: React.FC<CorePrinciplesProps> = ({ onStandardsClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
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

      // 2. Parallax scrub on moss backdrop
      if (backdropRef.current && sectionRef.current) {
        gsap.to(backdropRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
          yPercent: 18,
          ease: 'none',
        });
      }

      // 3. Aggressive card staggered entrance with rotation and spring
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.from(validCards, {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
          },
          y: 180,
          opacity: 0,
          scale: 0.85,
          rotationZ: (i) => (i - 1) * 8,
          stagger: 0.14,
          duration: 1.3,
          ease: 'power4.out',
        });

        // 4. Interactive 3D tilt on each card with GSAP
        validCards.forEach((card) => {
          if (!card) return;
          const dots = card.querySelectorAll('.dot-matrix-dot');
          const dotWrap = card.querySelector('.dot-matrix-wrap');

          const xRot = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power2.out' });
          const yRot = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power2.out' });
          const scaleTo = gsap.quickTo(card, 'scale', { duration: 0.35, ease: 'power2.out' });

          const onMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            xRot(-y * 22);
            yRot(x * 22);
            scaleTo(1.035);

            if (dotWrap) {
              gsap.to(dotWrap, {
                x: x * 20,
                y: y * 20,
                duration: 0.3,
                ease: 'power1.out',
              });
            }
          };

          const onMouseEnter = () => {
            // Aggressive wave animation on dots
            gsap.to(dots, {
              scale: 1.35,
              backgroundColor: '#254631',
              stagger: {
                grid: [2, 6],
                from: 'center',
                amount: 0.22,
              },
              duration: 0.25,
              ease: 'back.out(3)',
            });
          };

          const onMouseLeave = () => {
            xRot(0);
            yRot(0);
            scaleTo(1);
            if (dotWrap) {
              gsap.to(dotWrap, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
            }
            gsap.to(dots, {
              scale: 1,
              backgroundColor: '#ffffff',
              stagger: 0.02,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          card.addEventListener('mousemove', onMouseMove);
          card.addEventListener('mouseenter', onMouseEnter);
          card.addEventListener('mouseleave', onMouseLeave);
        });
      }
    }, sectionRef);

    // 5. Magnetic button effect
    let cleanupBtn: (() => void) | undefined;
    if (buttonRef.current) {
      cleanupBtn = applyMagneticEffect(buttonRef.current, 0.4);
    }

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-principles"
      className="relative w-full bg-[#fbf9f5] pt-24 pb-28 overflow-hidden perspective-[1200px]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header Block */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span
            id="principles-badge"
            className="inline-block px-3.5 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 shadow-xs"
          >
            The Nexwell Standard
          </span>
          <h2
            id="principles-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-[-0.02em] text-[#1c1f1d] mb-4"
          >
            Core Principles
          </h2>
          <p
            id="principles-subhead"
            className="text-sm sm:text-[15px] text-[#6e695f] max-w-lg mx-auto font-normal leading-relaxed"
          >
            Thoughtfully formulated supplements for modern, balanced, everyday wellness routines.
          </p>
        </div>

        {/* 3 Frosted Cards Grid */}
        <div className="relative">
          {/* Moss / forest backdrop layer behind cards */}
          <div
            ref={backdropRef}
            className="absolute inset-0 -top-12 -bottom-12 rounded-3xl overflow-hidden pointer-events-none opacity-40 will-change-transform"
          >
            <img
              src={IMAGES.mossySoilStrata}
              alt="Mossy forest terrain backdrop"
              className="w-full h-full object-cover filter blur-[2px] scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#fbf9f5]/70 backdrop-blur-[1px]" />
          </div>

          <div
            ref={cardsContainerRef}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-[1000px]"
          >
            {PRINCIPLES.map((p, idx) => (
              <div
                key={p.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                id={`principle-card-${p.id}`}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[380px] bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-white/80 hover:border-[#2e4a36]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(30,50,35,0.12)] transition-shadow duration-300 will-change-transform cursor-pointer"
              >
                {/* Frosted Background Texture */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity">
                  <img
                    src={IMAGES.mossySoilStrata}
                    alt=""
                    className="w-full h-full object-cover scale-150 filter blur-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Dot Matrix Graphic at Top */}
                <div className="h-28 flex items-center justify-center pointer-events-none">
                  <div
                    className="dot-matrix-wrap inline-grid gap-3.5 p-4 rounded-2xl bg-black/5 group-hover:bg-black/10 transition-colors will-change-transform"
                    style={{
                      gridTemplateColumns: `repeat(${p.gridCols}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: p.dotCount }).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className="dot-matrix-dot w-3.5 h-3.5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] will-change-transform"
                      />
                    ))}
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mt-8 pointer-events-none">
                  <h3
                    id={`principle-title-${p.id}`}
                    className="text-xl font-medium text-[#1c1f1d] tracking-tight mb-3 group-hover:text-[#1c3823] transition-colors"
                  >
                    {p.title}
                  </h3>
                  <p
                    id={`principle-desc-${p.id}`}
                    className="text-[13.5px] text-[#615c52] leading-relaxed font-normal"
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <button
            ref={buttonRef}
            id="principles-see-standards-button"
            onClick={onStandardsClick}
            className="magnetic group inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#e8e4d8] hover:bg-[#ded9cc] text-[#2c2b27] text-[13px] font-medium tracking-wide transition-colors shadow-sm hover:shadow-md active:scale-95"
          >
            <span>See Our Standards</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#2c2b27] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

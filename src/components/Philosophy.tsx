import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

export const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge pop
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.4,
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'back.out(2.5)',
      });

      // 2. High-impact text reveal with upward velocity
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 70,
          opacity: 0,
          skewY: 2,
          duration: 1.2,
          ease: 'power4.out',
        });
      }

      // 3. Secondary statement reveal at the bottom right
      if (subTextRef.current) {
        gsap.from(subTextRef.current, {
          scrollTrigger: {
            trigger: subTextRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-philosophy"
      className="w-full bg-[#fbf9f5] text-[#1a1a1a] py-24 sm:py-32 border-b border-[#ece8df] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Tag */}
        <div className="mb-8">
          <span
            ref={badgeRef}
            id="philosophy-badge"
            className="inline-block px-3 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase will-change-transform shadow-xs"
          >
            Philosophy
          </span>
        </div>

        {/* Large Typography Statement */}
        <div className="max-w-4xl">
          <div
            ref={textRef}
            id="philosophy-statement"
            className="text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.24] tracking-[-0.025em] text-[#1c1f1d] will-change-transform"
          >
            We believe wellness shouldn't be complicated. Nexwell creates clean, thoughtfully
            formulated supplements that fit naturally into daily routines, supporting long-term
            health through simple, consistent habits and trusted ingredients.
          </div>
        </div>

        {/* Secondary Statement at the bottom right */}
        <div className="mt-16 sm:mt-24 flex justify-end">
          <div
            ref={subTextRef}
            id="philosophy-secondary-statement"
            className="w-full max-w-4xl text-left will-change-transform"
          >
            <p className="text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.24] tracking-[-0.025em] text-[#1c1f1d]">
              True wellness is rooted in clinical science, not fleeting trends. Every compound is
              engineered for maximal cellular bioavailability, verified by independent testing, and
              crafted to sustain your vitality across every stage of life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


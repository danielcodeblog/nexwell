import React, { useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/nexwellData';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Background Image Gentle Parallax Scrub
      if (bgImgRef.current && sectionRef.current) {
        gsap.to(bgImgRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: 12,
          scale: 1.15,
          ease: 'none',
        });
      }

      // 1. Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power4.out',
        });
      }

      // 2. Aggressive Card Fanning Timeline triggered on scroll
      if (card1Ref.current && card2Ref.current && card3Ref.current && deckRef.current) {
        const isDesktop = window.innerWidth >= 768;

        if (isDesktop) {
          // Set initial stacked position
          gsap.set([card1Ref.current, card3Ref.current], {
            x: 0,
            rotation: 0,
            y: 80,
            opacity: 0,
            scale: 0.85,
          });
          gsap.set(card2Ref.current, {
            y: 80,
            opacity: 0,
            scale: 0.85,
          });

          // Explosive Fan Out
          const fanTl = gsap.timeline({
            scrollTrigger: {
              trigger: deckRef.current,
              start: 'top 75%',
            },
          });

          fanTl
            .to(card2Ref.current, {
              y: 0,
              opacity: 1,
              scale: 1.06,
              duration: 1,
              ease: 'back.out(2.2)',
            })
            .to(
              card1Ref.current,
              {
                x: -30,
                y: 10,
                rotation: -6,
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: 'back.out(2.5)',
              },
              '-=0.7'
            )
            .to(
              card3Ref.current,
              {
                x: 30,
                y: 10,
                rotation: 6,
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: 'back.out(2.5)',
              },
              '-=1.0'
            );
        } else {
          gsap.from([card1Ref.current, card2Ref.current, card3Ref.current], {
            scrollTrigger: {
              trigger: deckRef.current,
              start: 'top 80%',
            },
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power4.out',
          });
        }

        // 3. Interactive 3D deck tilt on mouse move
        const deckEl = deckRef.current;
        const onDeckMouseMove = (e: MouseEvent) => {
          const rect = deckEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card1Ref.current, {
            x: -30 + x * 25,
            y: 10 + y * 25,
            rotationY: x * 20,
            rotationX: -y * 20,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(card2Ref.current, {
            x: x * 15,
            y: y * 15,
            rotationY: x * 15,
            rotationX: -y * 15,
            duration: 0.35,
            ease: 'power2.out',
          });

          gsap.to(card3Ref.current, {
            x: 30 + x * 25,
            y: 10 + y * 25,
            rotationY: x * 20,
            rotationX: -y * 20,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const onDeckMouseLeave = () => {
          gsap.to(card1Ref.current, {
            x: -30,
            y: 10,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
          gsap.to(card2Ref.current, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
          gsap.to(card3Ref.current, {
            x: 30,
            y: 10,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
        };

        deckEl.addEventListener('mousemove', onDeckMouseMove);
        deckEl.addEventListener('mouseleave', onDeckMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-community"
      className="relative w-full overflow-hidden perspective-[1200px] pt-24 pb-36 sm:pb-44"
    >
      {/* Background Image: Mossy Earth & Soil Strata */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src={IMAGES.mossySoilStrata}
          alt="Natural mossy earth strata background"
          className="w-full h-full object-cover object-center scale-110 will-change-transform opacity-75 sm:opacity-80"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient tint: preserves legibility while displaying the rich green moss and organic earth textures */}
        <div className="absolute inset-0 bg-[#fbf9f5]/55 backdrop-blur-[0.5px]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fbf9f5] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fbf9f5] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Block */}
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-16 sm:mb-24">
          <span
            id="community-badge"
            className="inline-block px-3.5 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 shadow-xs"
          >
            Community
          </span>
          <h2
            id="community-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-[-0.025em] text-[#1c1f1d] leading-tight"
          >
            Small habits create
            <br />
            lasting change.
          </h2>
        </div>

        {/* 3 Overlapping / Fanned Testimonial Cards */}
        <div
          ref={deckRef}
          className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center -space-y-6 md:-space-y-0 md:-space-x-8 px-4 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card 1: Left Card */}
          <div
            ref={card1Ref}
            id="testimonial-card-1"
            className="relative w-full md:w-[360px] min-h-[300px] p-8 rounded-3xl bg-white/85 hover:bg-white/95 backdrop-blur-xl text-[#1c1f1d] border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between z-10 will-change-transform transition-colors duration-300 group"
          >
            <div>
              <span className="text-4xl font-serif text-[#7d7667] group-hover:text-[#254631] transition-colors leading-none block mb-3">
                “
              </span>
              <p className="text-[14px] text-[#4d483e] leading-relaxed">
                {TESTIMONIALS[0].quote}
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-[#e8e3d8]">
              <img
                src={TESTIMONIALS[0].avatar}
                alt={TESTIMONIALS[0].author}
                className="w-10 h-10 rounded-full object-cover border border-[#d8d2c4]"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-semibold text-[#1c1f1d]">
                  {TESTIMONIALS[0].author}
                </div>
                <div className="text-[10px] text-[#7d7667]">
                  {TESTIMONIALS[0].title}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Center Elevated Card (Michael T.) */}
          <div
            ref={card2Ref}
            id="testimonial-card-2"
            className="relative w-full md:w-[380px] min-h-[340px] p-8 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-2xl text-[#1c1f1d] border border-white/90 shadow-[0_24px_55px_rgba(0,0,0,0.12)] z-30 flex flex-col justify-between will-change-transform group"
          >
            <div>
              <span className="text-4xl font-serif text-[#254631] leading-none block mb-3">
                “
              </span>
              <p className="text-[14.5px] text-[#2c2923] leading-relaxed font-normal">
                {TESTIMONIALS[1].quote}
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-[#ede9e1]">
              <img
                src={TESTIMONIALS[1].avatar}
                alt={TESTIMONIALS[1].author}
                className="w-11 h-11 rounded-full object-cover border border-[#254631]/20 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-[13px] font-semibold text-[#1c1f1d]">
                  {TESTIMONIALS[1].author}
                </div>
                <div className="text-[11px] text-[#6b665c]">
                  {TESTIMONIALS[1].title}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Right Card */}
          <div
            ref={card3Ref}
            id="testimonial-card-3"
            className="relative w-full md:w-[360px] min-h-[300px] p-8 rounded-3xl bg-white/85 hover:bg-white/95 backdrop-blur-xl text-[#1c1f1d] border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between z-20 will-change-transform transition-colors duration-300 group"
          >
            <div>
              <span className="text-4xl font-serif text-[#7d7667] group-hover:text-[#254631] transition-colors leading-none block mb-3">
                “
              </span>
              <p className="text-[14px] text-[#4d483e] leading-relaxed">
                {TESTIMONIALS[2].quote}
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-[#e8e3d8]">
              <img
                src={TESTIMONIALS[2].avatar}
                alt={TESTIMONIALS[2].author}
                className="w-10 h-10 rounded-full object-cover border border-[#d8d2c4]"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-semibold text-[#1c1f1d]">
                  {TESTIMONIALS[2].author}
                </div>
                <div className="text-[10px] text-[#7d7667]">
                  {TESTIMONIALS[2].title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

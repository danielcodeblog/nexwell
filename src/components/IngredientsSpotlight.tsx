import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { INGREDIENTS } from '../data/nexwellData';
import { IMAGES } from '../assets/images';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

export const IngredientsSpotlight: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('turmeric');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
        });
      }

      // 2. Accordion rows staggered entrance
      if (rowsRef.current) {
        gsap.from(rowsRef.current.children, {
          scrollTrigger: {
            trigger: rowsRef.current,
            start: 'top 80%',
          },
          x: -40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // 3. Counter-Parallax Scrub on Macro Photos
      if (photo1Ref.current && photo2Ref.current) {
        gsap.to(photo1Ref.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -45,
          ease: 'none',
        });

        gsap.to(photo2Ref.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: 45,
          ease: 'none',
        });

        // 4. Interactive 3D tilt on both photos
        [photo1Ref.current, photo2Ref.current].forEach((photo) => {
          if (!photo) return;
          const rotX = gsap.quickTo(photo, 'rotationX', { duration: 0.3, ease: 'power2.out' });
          const rotY = gsap.quickTo(photo, 'rotationY', { duration: 0.3, ease: 'power2.out' });
          const scale = gsap.quickTo(photo, 'scale', { duration: 0.3, ease: 'power2.out' });

          const onMove = (e: MouseEvent) => {
            const rect = photo.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            rotX(-y * 18);
            rotY(x * 18);
            scale(1.05);
          };

          const onLeave = () => {
            rotX(0);
            rotY(0);
            scale(1);
          };

          photo.addEventListener('mousemove', onMove);
          photo.addEventListener('mouseleave', onLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="section-ingredients"
      className="w-full bg-[#fbf9f5] py-24 sm:py-32 border-t border-[#ece8df] overflow-hidden perspective-[1000px]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Header Row */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span
              id="ingredients-badge"
              className="inline-block px-3.5 py-1 rounded-full border border-[#d8d3c5] text-[#6b665c] text-[11px] font-semibold tracking-[0.14em] uppercase mb-5 shadow-xs"
            >
              Ingredients Spotlight
            </span>
            <h2
              id="ingredients-headline"
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.2] tracking-[-0.025em] text-[#1c1f1d]"
            >
              Every ingredient is carefully selected for purity, quality, and effectiveness to
              support balanced nutrition, everyday wellness, and long-term health.
            </h2>
          </div>

          <div className="max-w-xs lg:text-right">
            <p
              id="ingredients-subnote"
              className="text-xs sm:text-[13px] text-[#635e54] leading-relaxed font-normal"
            >
              Thoughtfully formulated with premium ingredients inspired by nature and supported by
              science.
            </p>
          </div>
        </div>

        {/* Content Row: Accordion on Left, Two Images on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Accordion Column (7 cols) */}
          <div ref={rowsRef} className="lg:col-span-7 divide-y divide-[#e7e3d8]">
            {INGREDIENTS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  id={`ingredient-row-${item.id}`}
                  className="py-6 transition-colors"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center space-x-6 sm:space-x-10">
                      <span className="text-xs sm:text-[13px] font-mono font-medium text-[#8c8577] group-hover:text-[#254631] transition-colors">
                        {item.number}
                      </span>
                      <span className="text-lg sm:text-xl font-medium text-[#1c1f1d] group-hover:text-[#254631] transition-colors">
                        {item.name}
                      </span>
                    </div>

                    <div className="p-1 rounded-full text-[#736d62] group-hover:text-[#1c1f1d] transition-colors group-hover:scale-125 duration-200">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[1.75]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[1.75]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Body */}
                  {isOpen && (
                    <div className="mt-4 pl-12 sm:pl-16 pr-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-xs sm:text-[13.5px] text-[#555047] leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center space-x-2 text-[11px] text-[#7d776a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3e6648]" />
                        <span>Source: {item.source}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Photographic Cards Column (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Turmeric Macro Slice */}
            <div
              ref={photo1Ref}
              id="ingredient-photo-turmeric"
              className="rounded-3xl overflow-hidden bg-[#e8e4d8] aspect-[4/5] shadow-md border border-[#e4dfd2] group will-change-transform cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={IMAGES.turmericSlice}
                alt="Translucent sliced golden turmeric root"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lichen on Bark Macro */}
            <div
              ref={photo2Ref}
              id="ingredient-photo-lichen"
              className="rounded-3xl overflow-hidden bg-[#e8e4d8] aspect-[4/5] shadow-md border border-[#e4dfd2] group will-change-transform cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={IMAGES.lichenBark}
                alt="Organic reindeer moss and lichen on aged bark"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

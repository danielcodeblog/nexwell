import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { gsap, ScrollTrigger, applyMagneticEffect } from '../utils/gsapConfig';
import { NavPage } from '../types';

interface FooterProps {
  onProductClick: () => void;
  onContactClick: () => void;
  onNavigate?: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onProductClick,
  onContactClick,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const newsletterColRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const brandMarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Newsletter and link columns entrance
      if (newsletterColRef.current && linksWrapRef.current) {
        gsap.from([newsletterColRef.current, ...Array.from(linksWrapRef.current.children)], {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // 2. Giant Brand Mark: Aggressive Scale-Up and Lift on Scroll
      if (brandMarkRef.current) {
        gsap.from(brandMarkRef.current, {
          scrollTrigger: {
            trigger: brandMarkRef.current,
            start: 'top 95%',
            end: 'bottom 85%',
            scrub: 1,
          },
          scale: 0.65,
          y: 80,
          opacity: 0.15,
          ease: 'power3.out',
        });

        // 3. Interactive Kinetic Letter Distort on Hover/Move
        const markEl = brandMarkRef.current;
        const letters = markEl.querySelectorAll('.kinetic-letter');

        const onMarkMouseMove = (e: MouseEvent) => {
          const rect = markEl.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;

          letters.forEach((letter) => {
            const lRect = (letter as HTMLElement).getBoundingClientRect();
            const lCenter = lRect.left + lRect.width / 2 - rect.left;
            const dist = Math.abs(mouseX - lCenter);
            const maxDist = 200;

            if (dist < maxDist) {
              const power = 1 - dist / maxDist;
              gsap.to(letter, {
                y: -power * 25,
                scale: 1 + power * 0.12,
                color: power > 0.4 ? '#34d399' : '#f5f4ef',
                duration: 0.25,
                ease: 'power2.out',
              });
            } else {
              gsap.to(letter, {
                y: 0,
                scale: 1,
                color: '#f5f4ef',
                duration: 0.35,
                ease: 'power2.out',
              });
            }
          });
        };

        const onMarkMouseLeave = () => {
          letters.forEach((letter) => {
            gsap.to(letter, {
              y: 0,
              scale: 1,
              color: '#f5f4ef',
              duration: 0.5,
              ease: 'power3.out',
            });
          });
        };

        markEl.addEventListener('mousemove', onMarkMouseMove);
        markEl.addEventListener('mouseleave', onMarkMouseLeave);
      }
    }, footerRef);

    // 4. Magnetic button
    let cleanupBtn: (() => void) | undefined;
    if (submitBtnRef.current) {
      cleanupBtn = applyMagneticEffect(submitBtnRef.current, 0.5);
    }

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 4000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="section-footer"
      className="w-full bg-[#09100b] text-white pt-20 pb-10 px-6 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Newsletter on left, 3 Nav Columns on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-20 border-b border-white/10">
          {/* Newsletter Column (5 cols) */}
          <div ref={newsletterColRef} className="lg:col-span-5 max-w-sm">
            <p
              id="footer-newsletter-text"
              className="text-white/80 text-sm sm:text-[14.5px] leading-relaxed mb-6 font-normal"
            >
              Be the first to discover new formulas, wellness insights, and exclusive product releases.
            </p>

            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                id="footer-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full pl-5 pr-14 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs sm:text-[13px] focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                ref={submitBtnRef}
                id="footer-email-submit"
                type="submit"
                aria-label="Submit Email"
                className="magnetic absolute right-1.5 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all active:scale-90 cursor-pointer"
              >
                {isSubmitted ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {isSubmitted && (
              <p className="text-[11px] text-emerald-400 mt-2 pl-4 animate-in fade-in">
                Thank you for subscribing to Nexwell.
              </p>
            )}
          </div>

          {/* Links Columns (7 cols) */}
          <div ref={linksWrapRef} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: PRODUCTS */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/50 tracking-[0.14em] uppercase mb-4">
                Products
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/75">
                <li>
                  <button
                    onClick={onProductClick}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Daily Synbiotic
                  </button>
                </li>
                <li>
                  <button
                    onClick={onProductClick}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Multivitamin
                  </button>
                </li>
                <li>
                  <button
                    onClick={onProductClick}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Gut Health
                  </button>
                </li>
                <li>
                  <button
                    onClick={onProductClick}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Immune Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={onProductClick}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Sleep Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: COMPANY */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/50 tracking-[0.14em] uppercase mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/75">
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('home');
                      } else {
                        scrollToSection('section-hero');
                      }
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('about');
                      } else {
                        scrollToSection('section-philosophy');
                      }
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('blog');
                      } else {
                        scrollToSection('section-principles');
                      }
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('contact');
                      } else {
                        onContactClick();
                      }
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-semibold text-white/50 tracking-[0.14em] uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/75">
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate('home');
                      setTimeout(() => scrollToSection('section-faq'), 100);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <a href="#shipping" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#returns" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Brand Mark: nexwell® with kinetic interactive individual letters */}
        <div className="py-12 sm:py-16 text-center select-none overflow-hidden">
          <div
            ref={brandMarkRef}
            id="footer-giant-brand-mark"
            className="flex items-baseline justify-center tracking-[-0.05em] leading-none will-change-transform cursor-pointer"
          >
            <div className="text-[17vw] sm:text-[18vw] lg:text-[190px] font-bold text-[#f5f4ef] leading-none tracking-[-0.04em] font-sans inline-flex">
              {'nexwell'.split('').map((char, index) => (
                <span
                  key={index}
                  className="kinetic-letter inline-block will-change-transform transition-colors duration-200"
                >
                  {char}
                </span>
              ))}
            </div>
            <span className="kinetic-letter text-[4vw] lg:text-[42px] text-[#f5f4ef]/80 font-normal ml-1 sm:ml-2 -translate-y-8 sm:-translate-y-16 inline-block will-change-transform">
              ®
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, Socials on right */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-white/50 font-medium">
          <div>
            © 2026 NEXWELL. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6 sm:space-x-8 uppercase">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Linkedin
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

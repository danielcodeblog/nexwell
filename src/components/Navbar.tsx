import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ShoppingBag, Menu, X } from 'lucide-react';
import { gsap, applyMagneticEffect } from '../utils/gsapConfig';
import { NavPage } from '../types';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenCart,
  cartCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Track scroll position to adjust background density
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Magnetic buttons setup
    let cleanupContact: (() => void) | undefined;
    let cleanupCart: (() => void) | undefined;
    if (contactBtnRef.current) cleanupContact = applyMagneticEffect(contactBtnRef.current, 0.35);
    if (cartBtnRef.current) cleanupCart = applyMagneticEffect(cartBtnRef.current, 0.4);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cleanupContact) cleanupContact();
      if (cleanupCart) cleanupCart();
    };
  }, []);

  // Animate badge whenever cartCount changes
  useEffect(() => {
    if (badgeRef.current && cartCount > 0) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.3, rotation: -25 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.5)' }
      );
    }
  }, [cartCount]);

  const handleNavClick = (page: NavPage) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header
      ref={navRef}
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#09110b]/92 backdrop-blur-xl border-b border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
          : 'py-5 bg-[#09110b]/75 sm:bg-[#09110b]/60 backdrop-blur-lg border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="navbar-brand-logo"
          onClick={() => handleNavClick('home')}
          className="group flex items-baseline tracking-tight cursor-pointer text-left bg-transparent border-0 p-0"
        >
          <span className="text-2xl sm:text-[27px] font-bold text-white tracking-[-0.04em] font-sans group-hover:text-emerald-300 transition-colors">
            nexwell
          </span>
          <span className="text-xs text-white/70 ml-0.5 font-normal">®</span>
        </button>

        {/* Center Nav Links Pill (Desktop) */}
        <nav
          id="navbar-center-pill"
          className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white/90 text-[13px] font-medium tracking-wide shadow-xs transition-all"
        >
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white text-[#1c2e22] shadow-xs font-semibold'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </button>
          <button
            id="nav-link-about"
            onClick={() => handleNavClick('about')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              currentPage === 'about'
                ? 'bg-white text-[#1c2e22] shadow-xs font-semibold'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            About
          </button>
          <button
            id="nav-link-blog"
            onClick={() => handleNavClick('blog')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              currentPage === 'blog'
                ? 'bg-white text-[#1c2e22] shadow-xs font-semibold'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            Blog
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-white text-[#1c2e22] shadow-xs font-semibold'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Cart Trigger */}
          <button
            ref={cartBtnRef}
            id="navbar-cart-button"
            onClick={onOpenCart}
            aria-label="View Cart"
            className="magnetic relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                ref={badgeRef}
                className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/40 shadow-xs"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Contact Trigger (Desktop) */}
          <button
            ref={contactBtnRef}
            id="navbar-contact-button"
            onClick={() => handleNavClick('contact')}
            className={`magnetic hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full border text-[13px] font-medium tracking-wide transition-all backdrop-blur-sm cursor-pointer active:scale-95 group ${
              currentPage === 'contact'
                ? 'bg-white text-[#1c2e22] border-white font-semibold'
                : 'bg-white/12 hover:bg-white/22 text-white border-white/20'
            }`}
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-dropdown"
          className="md:hidden mt-3 mx-4 p-4 rounded-2xl bg-[#09110b]/98 border border-white/15 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-white text-[#1c2e22] font-semibold'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-white text-[#1c2e22] font-semibold'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPage === 'blog'
                  ? 'bg-white text-[#1c2e22] font-semibold'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'bg-white text-[#1c2e22] font-semibold'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-800/80 text-emerald-100 text-sm font-medium transition-colors"
              >
                <span>View Cart ({cartCount})</span>
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { CorePrinciples } from './components/CorePrinciples';
import { BentoShowcase } from './components/BentoShowcase';
import { IngredientsSpotlight } from './components/IngredientsSpotlight';
import { WhyNexwell } from './components/WhyNexwell';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { RoutineCTA } from './components/RoutineCTA';
import { Footer } from './components/Footer';

import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

import { CartDrawer } from './components/CartDrawer';
import { RoutineModal } from './components/RoutineModal';
import { StandardsModal } from './components/StandardsModal';
import { ContactModal } from './components/ContactModal';
import { NavPage } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isStandardsOpen, setIsStandardsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleAddAndOpenCart = () => {
    setCartQuantity((prev) => prev + 1);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1a1a] font-sans antialiased selection:bg-[#254631] selection:text-white">
      {/* Sticky / Top Floating Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCart={handleOpenCart}
        cartCount={cartQuantity}
      />

      <main>
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero onShopClick={handleOpenCart} />

            {/* 2. Philosophy Section */}
            <Philosophy />

            {/* 3. Core Principles / The Nexwell Standard */}
            <CorePrinciples onStandardsClick={() => setIsStandardsOpen(true)} />

            {/* 4. Dual Bento Showcase: Emerald Capsule & Bottle on Driftwood */}
            <BentoShowcase onProductClick={handleOpenCart} />

            {/* 5. Ingredients Spotlight with Accordion & Botanical Photos */}
            <IngredientsSpotlight />

            {/* 6. Why Nexwell: 4 Pillars & Floating Capsules with Mossy Earth Strata */}
            <WhyNexwell onProcessClick={() => setIsStandardsOpen(true)} />

            {/* 7. Community Testimonials: 3 Fanned Tilted Cards */}
            <Testimonials />

            {/* 8. Frequently Asked Questions Section */}
            <FAQSection
              onContactClick={() => handleNavigate('contact')}
              onStandardsClick={() => setIsStandardsOpen(true)}
            />

            {/* 9. Call to Action: Misty Mountain Panorama & Routine Builder */}
            <RoutineCTA onBuildRoutineClick={() => setIsRoutineOpen(true)} />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onShopClick={handleOpenCart}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onShopClick={handleOpenCart}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onShopClick={handleOpenCart}
          />
        )}
      </main>

      {/* 9. Luxurious Dark Footer with Massive nexwell Mark */}
      <Footer
        onProductClick={handleOpenCart}
        onContactClick={() => handleNavigate('contact')}
        onNavigate={handleNavigate}
      />

      {/* Modals & Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        quantity={cartQuantity}
        setQuantity={setCartQuantity}
      />

      <RoutineModal
        isOpen={isRoutineOpen}
        onClose={() => setIsRoutineOpen(false)}
        onAddToCart={handleAddAndOpenCart}
      />

      <StandardsModal
        isOpen={isStandardsOpen}
        onClose={() => setIsStandardsOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

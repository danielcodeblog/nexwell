import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Microscope, Leaf, Award, CheckCircle2, FileText, X } from 'lucide-react';
import { SCIENTIFIC_BOARD, SOURCING_ORIGINS } from '../data/pagesData';
import { IMAGES } from '../assets/images';
import { NavPage } from '../types';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
  onShopClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onShopClick }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#fbf9f5] text-[#1c1f1d]">
      {/* 1. Hero Banner */}
      <section className="relative px-5 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#254631] bg-[#254631]/10 px-3 py-1 rounded-full mb-4">
          Our Story &amp; Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-[#1c2e22] max-w-3xl mx-auto leading-[1.12]">
          Rooted in human biology, verified by nature.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#5a554a] max-w-2xl mx-auto leading-relaxed font-normal">
          Nexwell was born from a fundamental frustration with the modern supplement industry: the divide
          between ineffective synthetic isolates and unverified wellness fads. We built a new standard
          grounded strictly in clinical trials, bioavailable nutrients, and full-spectrum botanical integrity.
        </p>
      </section>

      {/* 2. Visual Story Mosaic */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-[#ded8cb] relative min-h-[340px] sm:min-h-[420px]">
            <img
              src={IMAGES.canisterDriftwood}
              alt="Nexwell formulation on driftwood"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1810]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-mono">
                  Origin Principle
                </span>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight mt-1">
                  Living nutrients deserve living packaging.
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md">
                  Pharmaceutical-grade dark amber glass protects active synbiotics from UV degradation without plastics.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#0c1810] text-white shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                The Nexwell Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mt-3 leading-snug">
                Why we reject 95% of industry shortcuts.
              </h3>
              <p className="text-sm text-white/70 mt-4 leading-relaxed font-normal">
                Most commercial supplements use generic elemental salts and synthetic excipients like magnesium
                stearate and silicon dioxide to accelerate tablet pressing. At Nexwell, every capsule is 100%
                active formulation without binders, flowing agents, or artificial fillers.
              </p>
            </div>

            <div className="pt-8 border-t border-white/15 grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold tracking-tight text-emerald-400">400+</div>
                <div className="text-xs text-white/70 mt-0.5">Contaminants screened per batch</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-emerald-400">100%</div>
                <div className="text-xs text-white/70 mt-0.5">Traceable botanical supply chain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scientific Advisory Board */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#254631] bg-[#254631]/10 px-3 py-1 rounded-full">
            Clinical Governance
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1c2e22] mt-3">
            Guided by world-class researchers.
          </h2>
          <p className="text-sm text-[#615b4f] mt-3 leading-relaxed font-normal">
            Our formulations are developed, audited, and refined by leading biochemists, gastroenterologists,
            and cellular biologists from prestigious academic research centers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCIENTIFIC_BOARD.map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white border border-[#e4dfd2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#254631] transition-all"
            >
              <div>
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-[#254631]/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-base font-semibold text-[#1c1f1d]">{member.name}</h4>
                <p className="text-xs font-medium text-[#254631] mt-0.5">{member.role}</p>
                <p className="text-[11px] font-mono text-[#827c6f] mt-1">{member.credentials}</p>
              </div>
              <p className="text-xs text-[#5f594d] leading-relaxed border-t border-[#f0ece3] pt-3">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Regenerative Sourcing Map */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20 sm:mb-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#f4efe4] border border-[#dcd6c7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#254631]">
                Global Supply Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1c2e22] mt-2">
                Traceable from soil to cellular delivery.
              </h2>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-semibold text-[#254631] border border-[#254631] px-4 py-2 rounded-full hover:bg-[#254631] hover:text-white transition-all cursor-pointer self-start"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Batch Certificate of Analysis</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOURCING_ORIGINS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#e4dfd2] space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-[#1c1f1d]">{item.title}</h4>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#254631] bg-[#254631]/10 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#7d776b]">{item.region}</p>
                <p className="text-xs text-[#524d43] leading-relaxed pt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Four Pillars of Biological Excellence */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e4dfd2] text-left space-y-3">
            <Microscope className="w-6 h-6 text-[#254631]" />
            <h4 className="text-base font-semibold text-[#1c1f1d]">Targeted Strains</h4>
            <p className="text-xs text-[#635d51] leading-relaxed">
              24 clinically evaluated strains selected for documented physiological survival, not random vanity CFU counts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e4dfd2] text-left space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#254631]" />
            <h4 className="text-base font-semibold text-[#1c1f1d]">Dual Nested Capsule</h4>
            <p className="text-xs text-[#635d51] leading-relaxed">
              Acid-resistant outer capsule protects live bacteria from stomach acid until they reach the colon.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e4dfd2] text-left space-y-3">
            <Leaf className="w-6 h-6 text-[#254631]" />
            <h4 className="text-base font-semibold text-[#1c1f1d]">Zero Excipients</h4>
            <p className="text-xs text-[#635d51] leading-relaxed">
              Free of synthetic colorants, titanium dioxide, talc, magnesium stearate, and common allergens.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e4dfd2] text-left space-y-3">
            <Award className="w-6 h-6 text-[#254631]" />
            <h4 className="text-base font-semibold text-[#1c1f1d]">Triple-Phase Audits</h4>
            <p className="text-xs text-[#635d51] leading-relaxed">
              Raw materials, mid-stage compounding, and finished jars are each independently verified by ISO labs.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl bg-[#1c2e22] text-white text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Join the Clean Nutrition Movement
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] max-w-xl mx-auto leading-tight">
            Start feeling the difference of verified daily biology.
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto font-normal">
            30-day money back guarantee. Free carbon-neutral shipping on every single routine.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onShopClick}
              className="px-8 py-3.5 rounded-full bg-white text-[#1c2e22] font-semibold text-sm hover:bg-emerald-50 transition-all shadow-lg cursor-pointer"
            >
              Order Daily Synbiotic ($40.50)
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              Contact Advisory Team
            </button>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-[#1c1f1d] shadow-2xl border border-[#ded8cb] space-y-5">
            <div className="flex items-center justify-between border-b border-[#eee] pb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-lg text-[#1c2e22]">
                  Certificate of Analysis (Batch #NX-2609)
                </h3>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-[#faf8f4] p-3 rounded-xl border border-[#ece8df]">
                <div>
                  <span className="text-[#7d776b]">Product:</span>
                  <p className="font-semibold text-[#1c1f1d]">DS-01 Daily Synbiotic</p>
                </div>
                <div>
                  <span className="text-[#7d776b]">Testing Lab:</span>
                  <p className="font-semibold text-[#1c1f1d]">Eurofins ISO 17025</p>
                </div>
                <div>
                  <span className="text-[#7d776b]">Viable CFUs:</span>
                  <p className="font-semibold text-emerald-700">53.4 Billion (Pass)</p>
                </div>
                <div>
                  <span className="text-[#7d776b]">Heavy Metals:</span>
                  <p className="font-semibold text-emerald-700">&lt;0.001 ppm (Pass)</p>
                </div>
                <div>
                  <span className="text-[#7d776b]">Pesticides:</span>
                  <p className="font-semibold text-emerald-700">None Detected (Pass)</p>
                </div>
                <div>
                  <span className="text-[#7d776b]">Glyphosate:</span>
                  <p className="font-semibold text-emerald-700">0.00 ppm (Pass)</p>
                </div>
              </div>
              <p className="text-[11px] text-[#787265] leading-relaxed">
                This report confirms this batch meets our clinical bio-availability and micro-biological
                pathogen-free specifications. Verified by third-party dual mass spectrometry.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631]"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

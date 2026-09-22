import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { MAIN_PRODUCT } from '../data/nexwellData';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export const RoutineModal: React.FC<RoutineModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('Gut & Microbiome Health');
  const [selectedTime, setSelectedTime] = useState('Morning with water');

  if (!isOpen) return null;

  const goals = [
    { title: 'Gut & Microbiome Health', desc: 'Strengthen digestional barrier and balance flora' },
    { title: 'Sustained Cellular Energy', desc: 'Clean metabolic vitality without caffeine jitters' },
    { title: 'Cognitive Clarity & Calm', desc: 'Stress resilience, adaptogens, and neural ease' },
    { title: 'Immune & Skin Resilience', desc: 'Systemic antioxidant defense and nutrient bioavailability' },
  ];

  const times = [
    { title: 'Morning with water', desc: 'Empty stomach for optimal prebiotic dispersion' },
    { title: 'With midday meal', desc: 'Paired with healthy dietary fats for absorption' },
    { title: 'Evening wind-down', desc: 'Restorative nighttime cellular synchronization' },
  ];

  const handleFinish = () => {
    onAddToCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-3xl p-6 sm:p-8 text-[#1c1f1d] shadow-2xl z-10 border border-[#e8e4d8] animate-in fade-in zoom-in-95 duration-200">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ece8df]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#254631]" />
            <span className="text-[11px] font-mono font-medium tracking-widest text-[#787265] uppercase">
              Phase {step} of 3 • Routine Formulation
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-[#6b665c] hover:text-[#1c1f1d] hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="py-6 space-y-4">
            <h3 className="text-2xl font-medium tracking-tight text-[#1c1f1d]">
              What is your primary biological priority?
            </h3>
            <p className="text-xs text-[#6b665c] leading-relaxed">
              Select the metabolic domain where you require targeted daily support.
            </p>

            <div className="space-y-2.5 pt-2">
              {goals.map((g) => (
                <button
                  key={g.title}
                  onClick={() => setSelectedGoal(g.title)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                    selectedGoal === g.title
                      ? 'bg-white border-[#254631] shadow-sm'
                      : 'bg-white/60 border-[#e4dfd2] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-[#1c1f1d]">{g.title}</div>
                    <div className="text-xs text-[#6e685c] mt-0.5">{g.desc}</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 flex-shrink-0 ml-3 transition-colors ${
                      selectedGoal === g.title
                        ? 'border-[#254631] bg-white'
                        : 'border-[#c2bcb0] bg-transparent'
                    }`}
                  >
                    {selectedGoal === g.title && (
                      <div className="w-2 h-2 rounded-full bg-[#254631]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-all flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Timing */}
        {step === 2 && (
          <div className="py-6 space-y-4">
            <h3 className="text-2xl font-medium tracking-tight text-[#1c1f1d]">
              When do you prefer to take your daily capsules?
            </h3>
            <p className="text-xs text-[#6b665c] leading-relaxed">
              Circadian synchrony ensures maximal bioavailability and sustained release.
            </p>

            <div className="space-y-2.5 pt-2">
              {times.map((t) => (
                <button
                  key={t.title}
                  onClick={() => setSelectedTime(t.title)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                    selectedTime === t.title
                      ? 'bg-white border-[#254631] shadow-sm'
                      : 'bg-white/60 border-[#e4dfd2] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-[#1c1f1d]">{t.title}</div>
                    <div className="text-xs text-[#6e685c] mt-0.5">{t.desc}</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 flex-shrink-0 ml-3 transition-colors ${
                      selectedTime === t.title
                        ? 'border-[#254631] bg-white'
                        : 'border-[#c2bcb0] bg-transparent'
                    }`}
                  >
                    {selectedTime === t.title && (
                      <div className="w-2 h-2 rounded-full bg-[#254631]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#6b665c] hover:text-[#1c1f1d] cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-all flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>View Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendation */}
        {step === 3 && (
          <div className="py-6 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#254631]/10 text-[#254631] text-[10px] font-mono font-semibold tracking-wider uppercase border border-[#254631]/20">
              Protocol Calibrated • Regimen 01
            </div>

            <h3 className="text-2xl font-medium tracking-tight text-[#1c1f1d]">
              Your Tailored Protocol
            </h3>

            <div className="p-4 rounded-2xl bg-white border border-[#e4dfd2] flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0c1810] flex-shrink-0">
                <img
                  src={MAIN_PRODUCT.image}
                  alt={MAIN_PRODUCT.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#1c1f1d]">
                  {MAIN_PRODUCT.name} {MAIN_PRODUCT.subtitle}
                </div>
                <div className="text-xs text-[#5e594d] mt-0.5">
                  Targeted for: <strong className="text-[#254631] font-semibold">{selectedGoal}</strong>
                </div>
                <div className="text-[11px] text-[#787265] mt-1 font-mono">
                  Cadence: 1 capsule daily • {selectedTime}
                </div>
              </div>
            </div>

            <div className="bg-[#f2efe6] p-4 rounded-2xl text-xs text-[#524e45] leading-relaxed border border-[#e5e0d3]">
              Formulated with 24 clinically validated synbiotic strains, bio-fermented prebiotics, and organic adaptogens for sustainable cellular balance.
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-[#6b665c] hover:text-[#1c1f1d] cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-all flex items-center space-x-2 cursor-pointer shadow-md active:scale-95"
              >
                <span>Add Regimen to Bag ($40.50)</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { X } from 'lucide-react';

interface StandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandardsModal: React.FC<StandardsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#fbf9f5] rounded-3xl p-6 sm:p-10 text-[#1c1f1d] shadow-2xl z-10 border border-[#e8e4d8] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#ece8df]">
          <span className="text-[11px] font-mono font-medium tracking-widest text-[#787265] uppercase">
            The Nexwell Standard • Clinical Protocol
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-[#6b665c] hover:text-[#1c1f1d] hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        <div className="py-6 space-y-7">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1c1f1d]">
              Science, Transparency, and Clinical Discipline.
            </h3>
            <p className="text-sm text-[#615c52] mt-2.5 leading-relaxed">
              Every formula we release undergoes 50+ third-party analytical assays across strain identity,
              microbiological purity, bioavailability, and dissolution rate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#e4dfd2] flex flex-col justify-between hover:border-[#254631]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#254631] font-semibold tracking-wider">
                    01 / PURITY
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#f4f2ec] flex items-center justify-center text-[#254631]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7V17M7 12H17" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-[#1c1f1d]">Zero Fillers</h4>
                <p className="text-xs text-[#6e685c] mt-1.5 leading-relaxed">
                  No magnesium stearate, artificial binders, titanium dioxide, or synthetic colorants.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#e4dfd2] flex flex-col justify-between hover:border-[#254631]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#254631] font-semibold tracking-wider">
                    02 / VIACAP®
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#f4f2ec] flex items-center justify-center text-[#254631]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="4" width="14" height="16" rx="6" />
                      <path d="M5 12H19" strokeDasharray="2 1.5" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-[#1c1f1d]">Targeted Delivery</h4>
                <p className="text-xs text-[#6e685c] mt-1.5 leading-relaxed">
                  ViaCap® nested micro-capsule shield guarantees live strain delivery past gastric acid.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#e4dfd2] flex flex-col justify-between hover:border-[#254631]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#254631] font-semibold tracking-wider">
                    03 / CLINICAL
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#f4f2ec] flex items-center justify-center text-[#254631]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3L4 9V21H20V9L12 3Z" />
                      <path d="M12 11V16" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-[#1c1f1d]">Clinical Dosing</h4>
                <p className="text-xs text-[#6e685c] mt-1.5 leading-relaxed">
                  Active strains dosed strictly according to peer-reviewed human clinical trials.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#ede8de] text-xs text-[#4b463d] space-y-3 border border-[#ded8cb]">
            <div className="font-mono text-[11px] font-semibold text-[#1c1f1d] tracking-wider uppercase">
              Three-Tier Validation Lifecycle:
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-3">
                <span className="px-2 py-0.5 rounded-md bg-[#254631] text-white font-mono text-[10px] tracking-wider uppercase flex-shrink-0 mt-0.5">
                  Assay 01
                </span>
                <span className="text-[#3b372f] leading-relaxed">
                  Full Raw Botanical DNA Fingerprinting via Eurofins Analytical Laboratories.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="px-2 py-0.5 rounded-md bg-[#254631] text-white font-mono text-[10px] tracking-wider uppercase flex-shrink-0 mt-0.5">
                  Assay 02
                </span>
                <span className="text-[#3b372f] leading-relaxed">
                  Inductively Coupled Plasma Mass Spectrometry (ICP-MS) heavy metal screening.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="px-2 py-0.5 rounded-md bg-[#254631] text-white font-mono text-[10px] tracking-wider uppercase flex-shrink-0 mt-0.5">
                  Assay 03
                </span>
                <span className="text-[#3b372f] leading-relaxed">
                  Continuous Stability & Viability Testing across variable temperature and humidity strata.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-7 py-3 rounded-full bg-[#1c2e22] text-white text-xs font-semibold tracking-wide hover:bg-[#254631] transition-all cursor-pointer shadow-md active:scale-95"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

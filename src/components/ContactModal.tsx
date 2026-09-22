import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Regimen Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-3xl p-6 sm:p-8 text-[#1c1f1d] shadow-2xl z-10 border border-[#e8e4d8] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#ece8df]">
          <span className="text-xs font-semibold tracking-wider text-[#6b665c] uppercase">
            Connect With Nexwell
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-full text-[#6b665c] hover:text-[#1c1f1d] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#254631] text-white mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-medium text-[#1c1f1d]">Message Received</h4>
            <p className="text-xs text-[#615c52] max-w-xs mx-auto">
              Our clinical wellness advisory team typically responds within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-4">
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-[#1c1f1d]">
                How can we assist your wellness journey?
              </h3>
              <p className="text-xs text-[#6b665c] mt-1">
                Reach out for ingredient inquiries, membership assistance, or medical consultations.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#6b665c] uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e2ddd0] text-sm text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6b665c] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e2ddd0] text-sm text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6b665c] uppercase tracking-wider mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e2ddd0] text-sm text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                >
                  <option value="Order & Regimen Support">Order &amp; Routine Support</option>
                  <option value="Ingredient Sourcing & Purity">Ingredient Sourcing &amp; Purity</option>
                  <option value="Clinical Data Inquiries">Clinical Data Inquiries</option>
                  <option value="Wholesale & Practitioners">Wholesale &amp; Practitioners</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6b665c] uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your questions or requirements..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e2ddd0] text-sm text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-all flex items-center space-x-1.5"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Mail, Clock, MapPin, CheckCircle2, Send, ChevronDown, ChevronUp, MessageSquare, PhoneCall } from 'lucide-react';
import { CONTACT_FAQS } from '../data/pagesData';
import { NavPage } from '../types';

interface ContactPageProps {
  onNavigate: (page: NavPage) => void;
  onShopClick: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onShopClick }) => {
  const [inquiryType, setInquiryType] = useState('Order & Delivery Support');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const inquiryTypes = [
    'Order & Delivery Support',
    'Clinical & Ingredients',
    'Subscription & Refills',
    'Wholesale / Practitioners',
    'Press & Partnerships',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setOrderNumber('');
    setMessage('');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#fbf9f5] text-[#1c1f1d]">
      {/* 1. Header Banner */}
      <section className="px-5 sm:px-8 py-12 sm:py-20 max-w-6xl mx-auto text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#254631] bg-[#254631]/10 px-3 py-1 rounded-full mb-3">
          Support &amp; Advisory
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-[#1c2e22] leading-tight">
          How can we assist your wellness journey?
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#5e584c] max-w-2xl mx-auto leading-relaxed font-normal">
          Whether you have questions about specific botanical strains, need help adjusting your
          subscription cadence, or want to consult our clinical team—we are here to help.
        </p>
      </section>

      {/* 2. Main Two-Column Contact Section */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#ded8cb] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#254631] text-white mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#1c2e22]">
                  Inquiry Dispatched Successfully
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-[#f4efe4] font-mono text-xs text-[#254631]">
                  Reference Ticket: {ticketId}
                </div>
                <p className="text-sm text-[#5d574b] max-w-md mx-auto leading-relaxed font-normal">
                  Thank you, {firstName || 'valued member'}. A confirmation has been sent to{' '}
                  <span className="font-semibold text-[#1c1f1d]">{email}</span>. A member of our
                  advisory team will review your inquiry and respond within 4 business hours.
                </p>
                <div className="pt-4 flex justify-center space-x-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full border border-[#ded8cb] text-xs font-semibold hover:bg-neutral-50 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    type="button"
                    onClick={onShopClick}
                    className="px-6 py-2.5 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] cursor-pointer"
                  >
                    Explore Formulations
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#1c1f1d]">
                    Send us a direct message
                  </h3>
                  <p className="text-xs text-[#716a5d] mt-1 font-normal">
                    Select the inquiry department below for expedited routing.
                  </p>
                </div>

                {/* Inquiry Type Chips */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider">
                    Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          inquiryType === type
                            ? 'bg-[#1c2e22] text-white shadow-xs'
                            : 'bg-[#faf8f4] border border-[#ded8cb] text-[#635c50] hover:bg-[#f0ece2]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Elena"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Vance"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                    />
                  </div>
                </div>

                {/* Email and Order Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider mb-1">
                      Order / Refill ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NX-84920"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1c1f1d] focus:outline-none focus:border-[#254631]"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#6f685c] uppercase tracking-wider mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help with your daily synbiotic routine or order..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1c1f1d] focus:outline-none focus:border-[#254631] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#1c2e22] hover:bg-[#254631] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels, Hubs & Support Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Departments */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#f4efe4] border border-[#dcd6c7] space-y-4">
              <h4 className="text-base font-semibold tracking-tight text-[#1c1f1d]">
                Dedicated Support Channels
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-[#ded8cb] flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#254631] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1c1f1d]">General &amp; Order Care:</span>
                    <p className="text-[#254631] font-mono mt-0.5">care@nexwell.co</p>
                    <p className="text-[#7d776b] text-[11px] mt-0.5">Monday – Sunday • 8am – 6pm EST</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#ded8cb] flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-[#254631] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1c1f1d]">Clinical Science Advisory:</span>
                    <p className="text-[#254631] font-mono mt-0.5">science@nexwell.co</p>
                    <p className="text-[#7d776b] text-[11px] mt-0.5">For strain and bioavailability consultations</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#ded8cb] flex items-start space-x-3">
                  <PhoneCall className="w-4 h-4 text-[#254631] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1c1f1d]">Wholesale &amp; Practitioners:</span>
                    <p className="text-[#254631] font-mono mt-0.5">partners@nexwell.co</p>
                    <p className="text-[#7d776b] text-[11px] mt-0.5">Clinic distribution and bulk refill orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ded8cb] shadow-xs space-y-4">
              <h4 className="text-base font-semibold tracking-tight text-[#1c1f1d]">
                Research &amp; Compounding Hubs
              </h4>

              <div className="space-y-3 text-xs text-[#5c564a]">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#254631] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1c1f1d]">San Francisco Innovation Hub:</span>
                    <p className="text-[11px] text-[#787265]">580 Howard Street, San Francisco, CA 94105</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#254631] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1c1f1d]">European Microbiome Lab:</span>
                    <p className="text-[11px] text-[#787265]">Technoparkstrasse 1, 8005 Zürich, Switzerland</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0ece2] flex items-center space-x-2 text-[11px] text-[#787265]">
                <Clock className="w-3.5 h-3.5 text-[#254631]" />
                <span>Average team response time: 2.8 business hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick FAQ Section on Contact Page */}
      <section className="px-5 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#254631] bg-[#254631]/10 px-3 py-1 rounded-full">
            Immediate Answers
          </span>
          <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#1c2e22] mt-3">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-[#6e685c] mt-2">
            Get instant answers to the most common queries about routines and orders.
          </p>
        </div>

        <div className="space-y-3">
          {CONTACT_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ded8cb] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#1c1f1d] hover:text-[#254631] cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#254631] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7d776b] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#5c5649] leading-relaxed border-t border-[#f2ede3] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

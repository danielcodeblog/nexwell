import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Download,
} from 'lucide-react';
import { CartItem, AddOnItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedAddOns: AddOnItem[];
  deliveryPlan: 'subscribe' | 'one-time';
  frequency: string;
  appliedPromo: { code: string; discountPercent: number; discountAmount?: number } | null;
  onClearCart?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedAddOns,
  deliveryPlan,
  frequency,
  appliedPromo,
  onClearCart,
}) => {
  // Steps: 1: Shipping & Info, 2: Payment, 3: Success Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('Securing connection...');
  const [orderId, setOrderId] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subscribeNewsletter: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'CA',
    zip: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Price Calculations
  const itemsSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addOnsSubtotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const rawSubtotal = itemsSubtotal + addOnsSubtotal;

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountAmount) {
      promoDiscount = appliedPromo.discountAmount;
    } else if (appliedPromo.discountPercent) {
      promoDiscount = (rawSubtotal * appliedPromo.discountPercent) / 100;
    }
  }

  const shippingCost = shippingMethod === 'priority' ? 5.99 : 0.0;
  const estimatedTax = (rawSubtotal - promoDiscount) * 0.0725; // 7.25% demo tax
  const finalTotal = Math.max(0, rawSubtotal - promoDiscount + shippingCost + estimatedTax);

  // 1-Click Demo Fill
  const handleQuickFill = () => {
    setFormData({
      email: 'clara.vance@example.com',
      phone: '+1 (555) 234-8901',
      subscribeNewsletter: true,
      firstName: 'Clara',
      lastName: 'Vance',
      address: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94110',
      country: 'United States',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '08/28',
      cardCvc: '849',
      cardName: 'Clara Vance',
    });
    setFormErrors({});
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.address) errors.address = 'Street address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.zip) errors.zip = 'Postal / ZIP code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setProcessingMsg('Encrypting payment token...');

    setTimeout(() => {
      setProcessingMsg('Authorizing with banking partner...');
    }, 700);

    setTimeout(() => {
      setProcessingMsg('Configuring personalized refill dispatch...');
    }, 1400);

    setTimeout(() => {
      const generatedOrder = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrder);
      setIsProcessing(false);
      setStep(3);
      if (onClearCart) onClearCart();
    }, 2200);
  };

  const handleExpressOrder = (provider: string) => {
    handleQuickFill();
    setPaymentMethod(provider === 'Apple Pay' ? 'apple-pay' : 'card');
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={step === 3 ? onClose : undefined}
        className="fixed inset-0 bg-[#0c1810]/70 backdrop-blur-md transition-opacity"
      />

      {/* Main Checkout Modal Window */}
      <div className="relative w-full max-w-5xl bg-[#fbf9f5] text-[#1c1f1d] sm:rounded-3xl shadow-2xl z-10 min-h-[92vh] sm:min-h-0 max-h-[95vh] flex flex-col overflow-hidden border border-[#dcd6c8]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#e6e1d4] bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold tracking-tight text-[#1c2e22]">
              nexwell
            </span>
          </div>

          {/* Stepper (Only in steps 1 & 2) */}
          {step !== 3 && (
            <div className="flex items-center space-x-2 text-xs font-medium">
              <span
                onClick={() => setStep(1)}
                className={`cursor-pointer px-3 py-1 rounded-full transition-colors ${
                  step === 1
                    ? 'bg-[#1c2e22] text-white font-semibold'
                    : 'text-[#655f52] hover:text-[#1c1f1d]'
                }`}
              >
                1. Shipping
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#a8a192]" />
              <span
                className={`px-3 py-1 rounded-full transition-colors ${
                  step === 2
                    ? 'bg-[#1c2e22] text-white font-semibold'
                    : 'text-[#968f80]'
                }`}
              >
                2. Payment
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 rounded-full hover:bg-black/5 text-[#736d61] hover:text-[#1c1f1d] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Area: Two-Column Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN: Main Form & Process */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#e6e1d4] flex flex-col justify-between">
            {step === 1 && (
              <div>
                {/* Express Checkout Strip */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-[#686254]">
                      Express checkout
                    </span>
                    <button
                      type="button"
                      onClick={handleQuickFill}
                      className="text-xs text-[#254631] hover:underline font-medium cursor-pointer"
                    >
                      Autofill demo info
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleExpressOrder('Apple Pay')}
                      className="py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                      <span>Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExpressOrder('Google Pay')}
                      className="py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 border border-[#d2ccc0] font-medium text-xs flex items-center justify-center space-x-1 transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                      <span className="font-bold">G</span>
                      <span>Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExpressOrder('PayPal')}
                      className="py-2.5 px-4 rounded-xl bg-[#003087] hover:bg-[#002466] text-white font-medium text-xs flex items-center justify-center space-x-1 transition-all shadow-xs cursor-pointer active:scale-98"
                    >
                      <span className="font-semibold italic">PayPal</span>
                    </button>
                  </div>

                  <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#dfd9cc]" />
                    </div>
                    <span className="relative bg-[#fbf9f5] px-3 text-xs text-[#8a8374]">
                      or continue with shipping address
                    </span>
                  </div>
                </div>

                {/* Shipping Details Form */}
                <form onSubmit={handleProceedToPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40 focus:border-[#254631] transition-all"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                    )}
                    <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.subscribeNewsletter}
                        onChange={(e) =>
                          setFormData({ ...formData, subscribeNewsletter: e.target.checked })
                        }
                        className="rounded text-[#254631] focus:ring-[#254631] border-[#c8c2b4]"
                      />
                      <span className="text-xs text-[#6e685a]">
                        Keep me updated on orders and research news
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40 focus:border-[#254631] transition-all"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-600 text-xs mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40 focus:border-[#254631] transition-all"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-600 text-xs mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40 focus:border-[#254631] transition-all"
                    />
                    {formErrors.address && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                        Apt / Suite
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ZIP"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                      />
                    </div>
                  </div>

                  {/* Shipping Method Choice */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#2c2b27] mb-2">
                      Shipping Method
                    </label>
                    <div className="space-y-2">
                      <div
                        onClick={() => setShippingMethod('standard')}
                        className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          shippingMethod === 'standard'
                            ? 'bg-white border-[#254631] shadow-xs'
                            : 'bg-white/60 border-[#ded8cb] hover:border-[#b5ae9f]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              shippingMethod === 'standard'
                                ? 'border-[#254631] bg-white'
                                : 'border-[#c2bcb0] bg-transparent'
                            }`}
                          >
                            {shippingMethod === 'standard' && (
                              <div className="w-2 h-2 rounded-full bg-[#254631]" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#1c1f1d]">
                              Standard Shipping (3-5 business days)
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#254631]">
                          Free
                        </span>
                      </div>

                      <div
                        onClick={() => setShippingMethod('priority')}
                        className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          shippingMethod === 'priority'
                            ? 'bg-white border-[#254631] shadow-xs'
                            : 'bg-white/60 border-[#ded8cb] hover:border-[#b5ae9f]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              shippingMethod === 'priority'
                                ? 'border-[#254631] bg-white'
                                : 'border-[#c2bcb0] bg-transparent'
                            }`}
                          >
                            {shippingMethod === 'priority' && (
                              <div className="w-2 h-2 rounded-full bg-[#254631]" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#1c1f1d]">
                              Express Shipping (1-2 business days)
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#1c1f1d]">$5.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#1c2e22] hover:bg-[#254631] text-white text-sm font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                {/* Back to Step 1 Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center space-x-1.5 text-xs text-[#6e685a] hover:text-[#1c1f1d] mb-5 font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Back to shipping</span>
                </button>

                {/* Shipping Summary Card */}
                <div className="p-3.5 rounded-xl bg-white border border-[#e4dfd2] mb-5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#847e70] text-[11px] block">
                      Ship to:
                    </span>
                    <span className="font-medium text-[#1c1f1d] mt-0.5 block">
                      {formData.firstName} {formData.lastName}, {formData.address}, {formData.city} {formData.zip}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#254631] hover:underline text-xs font-medium cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#1c1f1d]">Payment</h3>
                    <span className="text-xs text-[#6e685a]">
                      All transactions are secure and encrypted
                    </span>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#1c2e22] text-white border-[#1c2e22]'
                          : 'bg-white text-[#5f594e] border-[#ded8cb] hover:border-[#b5ae9f]'
                      }`}
                    >
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple-pay')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        paymentMethod === 'apple-pay'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-[#5f594e] border-[#ded8cb] hover:border-[#b5ae9f]'
                      }`}
                    >
                      <span>Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'bg-[#003087] text-white border-[#003087]'
                          : 'bg-white text-[#5f594e] border-[#ded8cb] hover:border-[#b5ae9f]'
                      }`}
                    >
                      <span className="italic font-bold">PayPal</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' ? (
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          value={formData.cardName || `${formData.firstName} ${formData.lastName}`}
                          onChange={(e) =>
                            setFormData({ ...formData, cardName: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5 flex items-center justify-between">
                          <span>Card Number</span>
                          <span className="text-[11px] text-[#868072]">
                            Demo: 4242 •••• •••• 4242
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                            Expiration (MM / YY)
                          </label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              setFormData({ ...formData, cardExpiry: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2c2b27] mb-1.5">
                            Security Code (CVC)
                          </label>
                          <input
                            type="text"
                            placeholder="CVC"
                            value={formData.cardCvc}
                            onChange={(e) =>
                              setFormData({ ...formData, cardCvc: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6cfc0] bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#254631]/40"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-white border border-[#ded8cb] text-center space-y-2">
                      <p className="text-xs font-semibold text-[#1c1f1d]">
                        Instant checkout with {paymentMethod === 'apple-pay' ? 'Apple Pay' : 'PayPal'}
                      </p>
                      <p className="text-xs text-[#787265]">
                        You will complete payment securely via your chosen account.
                      </p>
                    </div>
                  )}

                  {/* Guarantee banner (Clean, no star icons) */}
                  <div className="p-3 rounded-xl bg-[#eeebe2] text-xs text-[#554f43]">
                    <span>30-day money-back guarantee. Pause or cancel subscription anytime.</span>
                  </div>

                  {/* Final Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePlaceOrder}
                      className="w-full py-3.5 px-6 rounded-full bg-[#1c2e22] hover:bg-[#254631] disabled:bg-[#344b3c] text-white text-sm font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2.5">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{processingMsg}</span>
                        </div>
                      ) : (
                        <span>Pay ${finalTotal.toFixed(2)}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="py-6 sm:py-8 text-center space-y-5 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-[#254631] text-white flex items-center justify-center mx-auto shadow-md text-lg font-bold">
                  ✓
                </div>

                <div className="space-y-1.5">
                  <span className="inline-block text-xs uppercase bg-[#254631]/10 text-[#254631] px-3 py-0.5 rounded-full font-semibold">
                    Order #{orderId}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-[#1c1f1d]">
                    Thank you, {formData.firstName || 'there'}!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5f594e] max-w-md mx-auto">
                    Your order has been received. A confirmation receipt has been sent to {formData.email || 'your email'}.
                  </p>
                </div>

                {/* Simple order timeline */}
                <div className="max-w-md mx-auto w-full p-4 rounded-xl bg-white border border-[#e4dfd2] text-left space-y-3 text-xs">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#254631] font-semibold">01</span>
                    <div>
                      <p className="font-semibold text-[#1c1f1d]">Order Dispatched</p>
                      <p className="text-[#736d60]">Your formulation will ship within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#254631] font-semibold">02</span>
                    <div>
                      <p className="font-semibold text-[#1c1f1d]">Estimated Delivery</p>
                      <p className="text-[#736d60]">
                        {shippingMethod === 'priority' ? '1-2 business days' : '3-5 business days'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#254631] font-semibold">03</span>
                    <div>
                      <p className="font-semibold text-[#1c1f1d]">
                        {deliveryPlan === 'subscribe' ? `Routine Cadence: ${frequency}` : 'One-time Order'}
                      </p>
                      <p className="text-[#736d60]">
                        {deliveryPlan === 'subscribe'
                          ? 'Compostable refills arrive automatically before your glass jar empties.'
                          : 'Thank you for choosing Nexwell.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReceiptModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full border border-[#cfc8b8] bg-white text-xs font-semibold text-[#2c2b27] hover:bg-[#f3f0e8] transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>View Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-[#1c2e22] text-xs font-semibold text-white hover:bg-[#254631] transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Continue Shopping</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary (Simplified, No star icons) */}
          <div className="lg:col-span-5 bg-[#f6f2e8] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd1]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#635d50]">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0) + selectedAddOns.length})
                </h3>
                <span className="text-xs font-medium text-[#254631]">
                  {deliveryPlan === 'subscribe' ? 'Subscription (-20%)' : 'One-time'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-[#d6cfc0]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 bg-[#254631] text-white text-[10px] font-bold w-4 h-4 rounded-tl-md flex items-center justify-center font-mono">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1c1f1d] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#716a5c] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-semibold text-[#1c1f1d]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                {selectedAddOns.map((addOn) => (
                  <div key={addOn.id} className="flex items-center space-x-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#1c2e22] flex-shrink-0 border border-[#d6cfc0]">
                      <img
                        src={addOn.image}
                        alt={addOn.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 bg-[#254631] text-white text-[10px] font-bold w-4 h-4 rounded-tl-md flex items-center justify-center font-mono">
                        1
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1c1f1d] truncate">{addOn.name}</p>
                      <p className="text-[11px] text-[#716a5c] truncate">{addOn.subtitle}</p>
                    </div>
                    <span className="font-semibold text-[#1c1f1d]">${addOn.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Line Items */}
              <div className="space-y-2 pt-3 border-t border-[#e2dcce] text-xs">
                <div className="flex justify-between text-[#686254]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1c1f1d]">${rawSubtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && promoDiscount > 0 && (
                  <div className="flex justify-between text-[#254631] font-medium">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#686254]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#254631]">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#686254]">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-[#1c1f1d]">
                    ${estimatedTax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#1c1f1d] pt-2.5 border-t border-[#ded8cb]">
                  <span>Total</span>
                  <span className="text-base text-[#1c2e22]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Reassurance Footer */}
            <div className="pt-6 border-t border-[#ded8cb] text-xs text-[#868072] flex items-center justify-center space-x-2">
              <span>Secure 256-Bit SSL</span>
              <span>•</span>
              <span>Free 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Receipt Modal Overlay */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-[#1c1f1d] border border-[#dcd6c8] space-y-6">
            <div className="flex items-center justify-between border-b border-[#eee] pb-4">
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#1c2e22]">nexwell</span>
                <p className="text-xs text-[#787265]">Tax Invoice &amp; Routine Receipt</p>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-[#787265]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-mono font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Billed to:</span>
                <span>
                  {formData.firstName} {formData.lastName} ({formData.email})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span>
                  {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </span>
              </div>
            </div>

            {/* Receipt Table */}
            <div className="border border-neutral-100 rounded-xl p-3 bg-neutral-50 text-xs space-y-1.5">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.quantity}x {i.name} ({i.subtitle})
                  </span>
                  <span className="font-semibold">${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              {selectedAddOns.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span>1x {a.name}</span>
                  <span className="font-semibold">${a.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-neutral-200 pt-1.5 flex justify-between font-bold text-sm">
                <span>Total Paid</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-50"
              >
                Print Invoice
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-5 py-2 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

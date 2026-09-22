import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react';
import { MAIN_PRODUCT } from '../data/nexwellData';
import { CartItem } from '../types';
import { CheckoutModal } from './CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  setQuantity: (fn: (prev: number) => number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  quantity,
  setQuantity,
}) => {
  const [deliveryPlan, setDeliveryPlan] = useState<'subscribe' | 'one-time'>('subscribe');
  const [frequency, setFrequency] = useState<string>('Every 30 days');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    discountAmount?: number;
  } | null>(null);
  const [promoMsg, setPromoMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen && !isCheckoutOpen) return null;

  // Price calculations
  const unitPrice = deliveryPlan === 'subscribe' ? MAIN_PRODUCT.price : MAIN_PRODUCT.oneTimePrice;
  const rawSubtotal = unitPrice * quantity;

  let promoSavings = 0;
  if (appliedPromo) {
    if (appliedPromo.discountAmount) {
      promoSavings = appliedPromo.discountAmount;
    } else if (appliedPromo.discountPercent) {
      promoSavings = (rawSubtotal * appliedPromo.discountPercent) / 100;
    }
  }

  const finalSubtotal = Math.max(0, rawSubtotal - promoSavings);

  // Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCodeInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'WELLNESS15') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15 });
      setPromoMsg({ type: 'success', text: '15% discount applied to your routine!' });
      setPromoCodeInput('');
    } else if (cleanCode === 'FIRSTORDER') {
      setAppliedPromo({ code: cleanCode, discountPercent: 0, discountAmount: 10 });
      setPromoMsg({ type: 'success', text: '$10.00 first-time order discount applied!' });
      setPromoCodeInput('');
    } else if (cleanCode === 'RESET20' || cleanCode === 'NEXWELL') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20 });
      setPromoMsg({ type: 'success', text: 'Special 20% member voucher applied!' });
      setPromoCodeInput('');
    } else {
      setPromoMsg({
        type: 'error',
        text: 'Invalid code. Try "WELLNESS15" or "FIRSTORDER"',
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoMsg(null);
  };

  // Cart item object to pass to checkout
  const cartItems: CartItem[] =
    quantity > 0
      ? [
          {
            id: MAIN_PRODUCT.id,
            name: MAIN_PRODUCT.name,
            subtitle: MAIN_PRODUCT.subtitle,
            price: unitPrice,
            quantity: quantity,
            image: MAIN_PRODUCT.image,
            isSubscription: deliveryPlan === 'subscribe',
            frequency: deliveryPlan === 'subscribe' ? frequency : undefined,
            specs: MAIN_PRODUCT.specs,
          },
        ]
      : [];

  const handleProceedToCheckout = () => {
    if (quantity === 0) {
      setQuantity(() => 1);
    }
    setIsCheckoutOpen(true);
  };

  const handleClearCartAfterOrder = () => {
    setQuantity(() => 1);
    setAppliedPromo(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-[#0c1810]/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md bg-[#fbf9f5] text-[#1c1f1d] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-l border-[#e5dfd2]">
            {/* 1. Header */}
            <div className="p-5 sm:p-6 border-b border-[#e8e4d8] bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1c1f1d]">
                    Your Cart
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#254631]/10 text-[#254631] font-medium">
                    {quantity}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close cart"
                  className="p-1.5 rounded-full hover:bg-[#f0ebe1] text-[#6b665c] hover:text-[#1c1f1d] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Free Shipping Simple Banner */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-[#f5f1e8] text-xs text-[#254631] flex items-center justify-between font-medium">
                <span>Free standard shipping included</span>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-[#254631] text-white px-2 py-0.5 rounded-full">
                  Free
                </span>
              </div>
            </div>

            {/* 2. Scrollable Body */}
            <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
              {/* Subscription Toggle */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#ede9df] rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryPlan('subscribe')}
                  className={`py-2 px-3 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    deliveryPlan === 'subscribe'
                      ? 'bg-white text-[#1c1f1d] shadow-xs font-semibold'
                      : 'text-[#6b665c] hover:text-[#1c1f1d]'
                  }`}
                >
                  <span>Subscribe &amp; Save (20%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryPlan('one-time')}
                  className={`py-2 px-3 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    deliveryPlan === 'one-time'
                      ? 'bg-white text-[#1c1f1d] shadow-xs font-semibold'
                      : 'text-[#6b665c] hover:text-[#1c1f1d]'
                  }`}
                >
                  <span>One-time purchase</span>
                </button>
              </div>

              {/* Delivery Frequency (if subscribed) */}
              {deliveryPlan === 'subscribe' && (
                <div className="flex items-center justify-between text-xs text-[#595347] px-1">
                  <span>Delivery frequency:</span>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="text-xs font-medium bg-white border border-[#d6cfc0] rounded-lg px-2 py-1 text-[#1c1f1d] focus:outline-none focus:ring-1 focus:ring-[#254631] cursor-pointer"
                  >
                    <option value="Every 30 days">Every 30 days (Recommended)</option>
                    <option value="Every 60 days">Every 60 days</option>
                    <option value="Every 90 days">Every 90 days</option>
                  </select>
                </div>
              )}

              {/* Main Product Card */}
              {quantity > 0 ? (
                <div className="p-4 rounded-2xl bg-white border border-[#e4dfd2] shadow-xs flex items-start space-x-3.5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0c1810] flex-shrink-0 border border-[#d8d2c2]">
                    <img
                      src={MAIN_PRODUCT.image}
                      alt={MAIN_PRODUCT.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1c1f1d] leading-tight">
                          {MAIN_PRODUCT.name}
                        </h4>
                        <p className="text-xs text-[#6b665c] mt-0.5">
                          {MAIN_PRODUCT.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#1c1f1d]">
                          ${(unitPrice * quantity).toFixed(2)}
                        </div>
                        {deliveryPlan === 'subscribe' && (
                          <div className="text-[10px] text-[#868072] line-through">
                            ${(MAIN_PRODUCT.oneTimePrice * quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stepper and Delete */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2 border border-[#d8d3c5] rounded-full px-2 py-0.5 bg-[#faf8f4]">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#6b665c] hover:text-black cursor-pointer transition-colors"
                        >
                          <Minus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                        <span className="text-xs font-semibold px-1 min-w-4 text-center text-[#1c1f1d]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#6b665c] hover:text-black cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setQuantity(() => 0)}
                        className="text-xs text-[#8c8577] hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white border border-[#e4dfd2] text-center space-y-3">
                  <p className="text-xs text-[#6b665c]">Your cart is empty.</p>
                  <button
                    type="button"
                    onClick={() => setQuantity(() => 1)}
                    className="px-4 py-2 rounded-full bg-[#1c2e22] text-white text-xs font-semibold hover:bg-[#254631] transition-colors cursor-pointer"
                  >
                    Add Daily Synbiotic (${unitPrice.toFixed(2)})
                  </button>
                </div>
              )}

              {/* Promo Code Expandable Section */}
              <div className="pt-1">
                {!showPromoInput && !appliedPromo ? (
                  <button
                    type="button"
                    onClick={() => setShowPromoInput(true)}
                    className="text-xs text-[#254631] hover:underline cursor-pointer font-medium"
                  >
                    + Add promo code
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-[#e4dfd2] space-y-2">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#254631] font-medium">
                          Promo code &quot;{appliedPromo.code}&quot; applied
                        </span>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-xs text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. WELLNESS15)"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#d6cfc0] text-xs focus:outline-none focus:ring-1 focus:ring-[#254631]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-lg bg-[#1c2e22] hover:bg-[#254631] text-white text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {promoMsg && (
                      <p
                        className={`text-[11px] ${
                          promoMsg.type === 'success' ? 'text-[#254631]' : 'text-red-600'
                        }`}
                      >
                        {promoMsg.text}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Simple Guarantee Note (No star icons) */}
              <div className="pt-1 text-xs text-[#716b5e] leading-relaxed">
                <p>30-day money-back guarantee. Pause or cancel your subscription anytime.</p>
              </div>
            </div>

            {/* 3. Footer / Checkout Actions */}
            <div className="p-5 sm:p-6 border-t border-[#e8e4d8] bg-white space-y-3 flex-shrink-0">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6e685a]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1c1f1d]">${rawSubtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && promoSavings > 0 && (
                  <div className="flex justify-between text-[#254631] font-medium">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${promoSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#254631]">Free</span>
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#eee9df]">
                  <span className="font-semibold text-[#1c1f1d]">Total</span>
                  <span className="text-lg font-bold text-[#1c1f1d]">
                    ${finalSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#1c2e22] hover:bg-[#254631] text-white text-sm font-semibold tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>

              <p className="text-center text-[11px] text-[#868072]">
                Secure checkout • Free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Full-Featured Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        selectedAddOns={[]}
        deliveryPlan={deliveryPlan}
        frequency={frequency}
        appliedPromo={appliedPromo}
        onClearCart={handleClearCartAfterOrder}
      />
    </>
  );
};

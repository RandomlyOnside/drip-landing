'use client';

import React from 'react';
import { useCart } from '@/contexts';
import CartBadge from './CartBadge';

interface OrderHeaderProps {
  cafeName?: string;
  showTotal?: boolean;
  showCheckout?: boolean;
  showShimmer?: boolean;
  onCheckoutClick?: () => void;
  className?: string;
}

export function OrderHeader({ 
  cafeName, 
  showTotal = true, 
  showCheckout = true,
  showShimmer = true,
  onCheckoutClick,
  className = "" 
}: OrderHeaderProps) {
  const { getTotalPrice, getTotalItems } = useCart();

  // Hide header if no items in cart
  if (getTotalItems() === 0) {
    return null;
  }

  const handleCheckoutClick = () => {
    if (onCheckoutClick) {
      onCheckoutClick();
    } else {
      window.location.href = '/portal/consumer-demo/order/cart';
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="px-4 py-1 bg-accent2 border-b border-accent2">
        <div className="flex items-center justify-between text-xs text-white font-medium">
          {cafeName && (
            <div className="truncate max-w-[120px]">
              {cafeName}
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {showTotal && (
              <div className="text-xs font-semibold">
                ${getTotalPrice().toFixed(2)}
              </div>
            )}
            {showCheckout && (
              <button 
                onClick={handleCheckoutClick}
                className="flex items-center justify-center w-6 h-6 hover:bg-white/20 rounded transition-colors relative"
                aria-label="Go to checkout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4" />
                </svg>
                <CartBadge />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Shimmering Status Bar */}
      {showShimmer && (
        <div className="h-1 bg-gradient-to-r from-accent2 via-white/30 to-accent2 relative overflow-hidden">
          <style jsx>{`
            @keyframes statusShimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full animate-[statusShimmer_2s_ease-in-out_infinite]"></div>
        </div>
      )}
    </div>
  );
}
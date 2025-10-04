'use client';

import React, { useState } from 'react';
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
  const { getTotalPrice, getTotalItems, cartItems } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide header if no items in cart
  if (getTotalItems() === 0) {
    return null;
  }

  // Get cafe name from cart items if not provided
  const displayCafeName = cafeName || cartItems[0]?.cafeName || 'Your Order';

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
    // Auto-collapse after 4 seconds if expanded
    if (!isExpanded) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 4000);
    }
  };

  const handleCheckoutClick = () => {
    if (onCheckoutClick) {
      onCheckoutClick();
    } else {
      window.location.href = '/portal/consumer-demo/order/cart';
    }
  };

  const handleConfirmOrder = () => {
    // Navigate to order confirmation page
    window.location.href = '/portal/consumer-demo/order/confirmation';
  };

  // Calculate tax and totals
  const subtotal = getTotalPrice();
  const taxRate = 0.0875; // 8.75% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className={`${className} border-2 border-accent2/30 rounded-lg overflow-hidden`}>
      {/* Header */}
      <div 
        className="px-4 py-1 bg-accent2 cursor-pointer hover:bg-accent2/90 transition-colors"
        onClick={handleHeaderClick}
      >
        <div className="flex items-center justify-between text-xs text-white font-medium">
          <div className="truncate max-w-[120px]">
            {displayCafeName}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {showTotal && (
              <div className="text-xs font-semibold">
                ${total.toFixed(2)}
              </div>
            )}
            {showCheckout && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckoutClick();
                }}
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

      {/* Order Summary - Slides down when expanded */}
      <div className={`bg-white overflow-hidden transition-all duration-300 ease-out ${
        isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-2">
          <div className="text-xs text-gray-600 font-medium mb-1">
            {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
          </div>
          
          {/* Items List */}
          <div className="space-y-1 mb-2 max-h-16 overflow-y-auto">
            {cartItems.slice(0, 2).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="truncate max-w-[140px] text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-600 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            {cartItems.length > 2 && (
              <div className="text-xs text-gray-500 italic">
                +{cartItems.length - 2} more item{cartItems.length - 2 !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Totals Section */}
          <div className="border-t border-gray-200 pt-2 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-700">${tax.toFixed(2)}</span>
            </div>
            
            {/* Payment & Confirm */}
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-gray-600">Card ending in 4242</span>
              <button 
                onClick={handleConfirmOrder}
                className="bg-accent1 text-white px-2 py-0.5 rounded text-xs font-medium hover:bg-accent1/90 transition-colors"
              >
                Pay ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
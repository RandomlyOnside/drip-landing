'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string;
}

interface MiniCartProps {
  items: CartItem[];
  onCheckout: () => void;
  className?: string;
}

export default function MiniCart({ items, onCheckout, className = '' }: MiniCartProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show mini cart when items are added
  useEffect(() => {
    setIsVisible(items.length > 0);
  }, [items]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isVisible) return null;

  return (
    <div className={`bg-white border-2 border-accent1 rounded-lg p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-accent1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-lg font-semibold text-primary">
            Your Order ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''})
          </h3>
        </div>
        <div className="text-lg font-bold text-primary">
          ${calculateTotal().toFixed(2)}
        </div>
      </div>

      {/* Items Summary */}
      <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex-1">
              <span className="text-primary font-medium">{item.name}</span>
              {item.quantity > 1 && (
                <span className="text-primary/60 ml-1">x{item.quantity}</span>
              )}
              {item.customizations && (
                <div className="text-xs text-primary/60 truncate">
                  {item.customizations}
                </div>
              )}
            </div>
            <span className="text-primary font-medium ml-2">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full py-3 bg-accent1 text-white rounded-lg hover:bg-accent1/90 transition-colors font-medium text-lg"
      >
        Checkout
      </button>
    </div>
  );
}
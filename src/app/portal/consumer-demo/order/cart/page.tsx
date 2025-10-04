'use client';

import { useState, useEffect } from 'react';
import { Layout, QuickActions, StepProgressBar } from '@/components/consumer';
import { useToast } from '@/lib/toast';
import { useCart } from '@/contexts';

export default function CartPage() {
  const [progressWidth, setProgressWidth] = useState(0);
  const { showSuccess, showInfo } = useToast();
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  // Animate progress bar on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(80); // Step 3 progress
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      // Visual feedback: item disappears from cart
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    // Visual feedback: item disappears from cart
  };

  const calculateSubtotal = () => {
    return getTotalPrice();
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    showSuccess('Order confirmed!');
    window.location.href = '/portal/consumer-demo/order/confirmation';
  };

  return (
    <Layout cafeName="Local Drip Coffee">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Your Cart
          </h1>
        </div>

        {/* Quick Actions */}
        <QuickActions className="mb-4" />

        {/* Step Progress Bar */}
        <StepProgressBar
          stepNumber={3}
          stepTitle="Step 3: Review Cart"
          progress={80}
        />

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Your cart is empty</h3>
            <p className="text-primary/70 mb-6">Add some items from the menu to get started!</p>
          </div>
        )}

        {/* Cart Items */}
        {cartItems.length > 0 && (
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-primary/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-1">{item.name}</h3>
                    <p className="text-sm text-primary/70 mb-1">Local Drip Coffee</p>
                    {item.customizations && (
                      <p className="text-xs text-primary/60">
                        {item.customizations}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-primary/70">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium text-primary">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-primary/70">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* You May Also Like Section - Only show when there are items */}
        {cartItems.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">You may also like</h3>
            
            {/* Horizontal scrollable menu items */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { id: 1, name: 'Caramel Macchiato', price: 5.25 },
                { id: 2, name: 'Blueberry Muffin', price: 3.50 },
                { id: 3, name: 'Iced Americano', price: 4.00 },
                { id: 4, name: 'Chocolate Croissant', price: 4.25 },
                { id: 5, name: 'Green Tea Latte', price: 4.75 },
                { id: 6, name: 'Banana Bread', price: 3.75 }
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-32 h-32 bg-white border border-primary/20 rounded-lg overflow-hidden hover:shadow-md hover:border-accent1/40 transition-all cursor-pointer relative"
                  onClick={() => window.location.href = `/portal/consumer-demo/order/customize?item=${encodeURIComponent(item.name)}&cafe=${encodeURIComponent('Local Drip Coffee')}&price=${item.price}`}
                >
                  {/* Square placeholder image background */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent2/20">
                  </div>
                  
                  {/* Title overlay as square tag */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-accent1 text-white px-1.5 py-0.5 rounded text-xs font-medium shadow-sm" style={{ fontSize: '10px' }}>
                      {item.name}
                    </div>
                  </div>
                  
                  {/* Price pill in bottom right */}
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-transparent text-accent2 px-1.5 py-0.5 rounded text-xs font-bold" style={{ fontSize: '10px' }}>
                      ${item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compact Order Summary - Only show when there are items */}
        {cartItems.length > 0 && (
          <div className="bg-white border border-primary/20 rounded-lg p-3 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-primary/70">Subtotal</span>
              <span className="text-sm text-primary">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-primary/70">Tax</span>
              <span className="text-sm text-primary">${calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 pt-1 border-t border-primary/10">
              <span className="text-sm font-semibold text-primary">Total</span>
              <span className="text-sm font-bold text-primary">${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary/60">•••• 4242</span>
              <button
                onClick={handleCheckout}
                className="px-4 py-1.5 bg-accent1 text-white rounded text-sm hover:bg-accent1/90 transition-colors font-medium"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
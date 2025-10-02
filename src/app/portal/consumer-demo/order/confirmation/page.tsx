'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout, QuickActions } from '@/components/consumer';
import { useToast } from '@/lib/toast';

export default function ConfirmationPage() {
  const [progressWidth, setProgressWidth] = useState(0);
  const searchParams = useSearchParams();
  const { showSuccess } = useToast();
  
  // Check if this is a previous order view or new order confirmation
  const isHistoryView = searchParams.get('view') === 'history';
  const orderId = searchParams.get('orderId') || '#12345';

  // Mock order data - in real app this would come from API based on orderId
  const orderData = {
    id: orderId,
    status: isHistoryView ? 'Completed' : 'Confirmed',
    cafe: 'Local Drip Coffee',
    cafeAddress: '123 Main St',
    orderDate: new Date().toLocaleDateString(),
    orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedTime: isHistoryView ? 'Delivered' : '15-20 minutes',
    items: [
      {
        id: 1,
        name: 'Vanilla Latte',
        size: 'Large',
        shots: 2,
        flavors: ['Vanilla'],
        addIns: ['Extra Foam'],
        price: 5.25,
        quantity: 1
      },
      {
        id: 2,
        name: 'Americano',
        size: 'Medium',
        shots: 2,
        flavors: [],
        addIns: [],
        price: 3.25,
        quantity: 2
      }
    ],
    subtotal: 11.75,
    tax: 0.94,
    total: 12.69,
    paymentMethod: '•••• •••• •••• 4242'
  };

  // Animate progress bar on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(isHistoryView ? 100 : 100); // 100% for confirmation
    }, 300);
    return () => clearTimeout(timer);
  }, [isHistoryView]);

  const handleReorder = () => {
    showSuccess('Items added to cart for reordering!');
    window.location.href = '/portal/consumer-demo/order/cart';
  };

  const handleTrackOrder = () => {
    showSuccess('Opening order tracking...');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {isHistoryView ? 'Order Details' : 'Order Confirmed!'}
          </h1>
          {!isHistoryView && (
            <p className="text-primary/70 mt-1">Thank you for your order</p>
          )}
        </div>

        {/* Quick Actions */}
        <QuickActions className="mb-4" />

        {/* Step Progress Bar - Only show for new orders */}
        {!isHistoryView && (
          <div className="mb-6 bg-white border border-primary/20 rounded-lg p-3">
            <style jsx>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">Step 4: Order Confirmed</span>
              <span className="text-xs text-primary/60">100%</span>
            </div>
            <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 rounded-full relative transition-all duration-700 ease-out"
                style={{ 
                  width: `${progressWidth}%`,
                  background: '#7D9A6D'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Order Status Card */}
        <div className="bg-white border-2 border-accent2 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-primary">Order {orderData.id}</h2>
              <p className="text-sm text-primary/70">{orderData.orderDate} at {orderData.orderTime}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                orderData.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-accent2/20 text-accent2'
              }`}>
                {orderData.status}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-primary mb-2">Pickup Location</h3>
              <p className="text-sm text-primary">{orderData.cafe}</p>
              <p className="text-xs text-primary/70">{orderData.cafeAddress}</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">
                {isHistoryView ? 'Delivery Status' : 'Estimated Time'}
              </h3>
              <p className="text-sm text-primary">{orderData.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Order Items</h3>
          
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-2 border-b border-primary/10 last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-primary">{item.name}</h4>
                  <p className="text-xs text-primary/60">
                    {item.size} • {item.shots} shot{item.shots > 1 ? 's' : ''}
                    {item.flavors.length > 0 && ` • ${item.flavors.join(', ')}`}
                    {item.addIns.length > 0 && ` • ${item.addIns.join(', ')}`}
                  </p>
                  <p className="text-xs text-primary/50">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-primary/70">Subtotal</span>
              <span className="text-primary">${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary/70">Tax</span>
              <span className="text-primary">${orderData.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-primary/10 pt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-primary">Total</span>
                <span className="text-lg font-bold text-primary">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded border border-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{orderData.paymentMethod}</p>
                <p className="text-xs text-primary/60">Visa ending in 4242</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isHistoryView ? (
            <button
              onClick={handleReorder}
              className="w-full py-3 bg-accent1 text-white rounded-lg hover:bg-accent1/90 transition-colors font-medium text-lg"
            >
              Reorder Items
            </button>
          ) : (
            <button
              onClick={handleTrackOrder}
              className="w-full py-3 bg-accent1 text-white rounded-lg hover:bg-accent1/90 transition-colors font-medium text-lg"
            >
              Track Order
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/portal/consumer-demo/order'}
            className="w-full py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium text-lg"
          >
            {isHistoryView ? 'Back to Orders' : 'Order Again'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
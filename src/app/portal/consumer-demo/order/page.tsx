'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, QuickActions, CartBadge, StepProgressBar } from '@/components/consumer';
import { MockDataService } from '@/lib/mockDataService';
import { useToast } from '@/lib/toast';
import { useCart } from '@/contexts';

export default function OrderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [progressWidth, setProgressWidth] = useState(0);
  const { showSuccess, showInfo } = useToast();
  const { cartItems, getTotalItems } = useCart();
  const router = useRouter();

  // Check if user has items in cart and redirect to menu
  useEffect(() => {
    if (getTotalItems() > 0 && cartItems.length > 0) {
      const cafeName = cartItems[0].cafeName;
      if (cafeName) {
        router.push(`/portal/consumer-demo/order/menu?cafe=${encodeURIComponent(cafeName)}`);
        return;
      }
    }
  }, [cartItems, getTotalItems, router]);

  // Animate progress bar on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(10);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Get menu items from mock data service
  const menuItems = MockDataService.getMockFrequentItems();
  const categories = ['all', 'coffee', 'food', 'pastries', 'drinks'];

  const handleAddToCart = (itemId: string, itemName: string) => {
    // Visual feedback provided by CartBadge update
  };

  const handleQuickOrder = (itemId: string, itemName: string) => {
    showInfo(`Quick ordering ${itemName}...`);
  };

  // Filter items by category (mock filtering for now)
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => 
        item.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'coffee' && item.name.toLowerCase().includes('latte')) ||
        (selectedCategory === 'food' && item.name.toLowerCase().includes('sandwich')) ||
        (selectedCategory === 'pastries' && item.name.toLowerCase().includes('croissant'))
      );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Order Now
          </h1>
        </div>

        {/* Quick Actions */}
        <QuickActions className="mb-4" />

        {/* Step Progress Bar */}
        <StepProgressBar
          stepNumber={1}
          stepTitle="Step 1: Select Cafe"
          progress={10}
          showCart={true}
          onCartClick={() => window.location.href = '/portal/consumer-demo/order/cart'}
        />

        {/* Google Map Section */}
        <div className="mb-6">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center border border-primary/20">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-sm text-primary/70">Google Maps Integration</p>
              <p className="text-xs text-primary/50">Map showing nearby cafes</p>
            </div>
          </div>
        </div>

        {/* Nearby Cafes Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-primary mb-3">Nearby Cafes</h2>
          
          {/* Nearby Cafes - 1 per row, vertical layout */}
          <div className="space-y-3 mb-4">
            {[
              { id: 1, name: 'Local Drip Coffee', address: '123 Main St', hours: 'Open until 8pm', badge: 'Popular', status: 'Ready in 10 min' },
              { id: 2, name: 'Bean There Cafe', address: '456 Oak Ave', hours: 'Open until 9pm', badge: 'New', status: 'Offline' },
              { id: 3, name: 'Morning Brew', address: '789 Pine St', hours: 'Open until 7pm', badge: 'Fast', status: 'Ready in 5 min' },
              { id: 4, name: 'Roasted Dreams', address: '321 Elm St', hours: 'Open until 10pm', badge: 'Featured', status: 'Ready in 15 min' },
              { id: 5, name: 'Coffee Corner', address: '654 Maple Dr', hours: 'Open until 6pm', badge: 'Local', status: 'Ready in 8 min' }
            ].map((cafe) => (
              <div 
                key={cafe.id} 
                className="bg-white border border-primary/20 rounded-lg overflow-hidden hover:shadow-md hover:border-accent1/40 transition-all cursor-pointer"
                onClick={() => window.location.href = `/portal/consumer-demo/order/menu?cafe=${encodeURIComponent(cafe.name)}`}
              >
                {/* Cafe Image/Logo - Full width on top */}
                <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-accent2/20 flex items-center justify-center relative">
                  {/* Badge/Tag on top of image */}
                  <div className="absolute top-2 left-2 bg-accent1 text-white px-2 py-1 rounded text-xs font-medium shadow-sm">
                    {cafe.badge}
                  </div>
                  
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-primary">{cafe.name.charAt(0)}</span>
                  </div>
                </div>
                
                {/* Cafe Info and Actions - Below image */}
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-primary mb-1">{cafe.name}</h3>
                      <p className="text-xs text-primary/70 mb-0.5">{cafe.address}</p>
                      <p className="text-xs text-primary/60">{cafe.hours}</p>
                    </div>
                    
                    {/* Action Icons and Status */}
                    <div className="flex flex-col items-end gap-1 ml-3">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-primary/5 rounded transition-colors">
                          <svg className="w-5 h-5 text-primary/70 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded transition-colors">
                          <svg className="w-5 h-5 text-primary/70 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Status - Under icons */}
                      <div className="text-xs font-medium">
                        <span className={`${
                          cafe.status.toLowerCase().includes('offline') 
                            ? 'text-red-600' 
                            : 'text-accent2'
                        }`}>
                          {cafe.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
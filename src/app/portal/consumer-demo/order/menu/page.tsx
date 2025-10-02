'use client';

import { useState, useEffect } from 'react';
import { Layout, QuickActions, StepProgressBar } from '@/components/consumer';
import { useToast } from '@/lib/toast';
import { useSearchParams } from 'next/navigation';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [progressWidth, setProgressWidth] = useState(0);
  const { showSuccess, showInfo } = useToast();
  const searchParams = useSearchParams();
  const cafeName = searchParams.get('cafe') || 'Selected Cafe';

  // Mock menu data with categories and subcategories
  const menuData = {
    'Hot Coffees': {
      'Brewed': [
        { id: 1, name: 'House Blend', price: 2.50, image: '☕' },
        { id: 2, name: 'Dark Roast', price: 2.75, image: '☕' },
        { id: 3, name: 'Pike Place', price: 2.60, image: '☕' }
      ],
      'Americano': [
        { id: 4, name: 'Americano', price: 3.25, image: '☕' },
        { id: 5, name: 'Long Shot', price: 3.50, image: '☕' },
        { id: 6, name: 'Red Eye', price: 3.75, image: '☕' }
      ],
      'Lattes': [
        { id: 7, name: 'Vanilla Latte', price: 4.50, image: '🥛' },
        { id: 8, name: 'Caramel Latte', price: 4.75, image: '🥛' },
        { id: 9, name: 'Hazelnut Latte', price: 4.60, image: '🥛' }
      ]
    },
    'Cold Coffees': {
      'Cold Brew': [
        { id: 10, name: 'Cold Brew', price: 3.50, image: '🧊' },
        { id: 11, name: 'Vanilla Cold Brew', price: 4.00, image: '🧊' },
        { id: 12, name: 'Nitro Cold Brew', price: 4.25, image: '🧊' }
      ],
      'Iced Coffee': [
        { id: 13, name: 'Iced Coffee', price: 3.00, image: '🧊' },
        { id: 14, name: 'Iced Americano', price: 3.25, image: '🧊' },
        { id: 15, name: 'Iced Mocha', price: 4.50, image: '🧊' }
      ],
      'Iced Espresso': [
        { id: 16, name: 'Iced Latte', price: 4.25, image: '🥤' },
        { id: 17, name: 'Iced Cappuccino', price: 4.00, image: '🥤' },
        { id: 18, name: 'Iced Macchiato', price: 4.75, image: '🥤' }
      ]
    }
  };

  // Animate progress bar on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(40); // Step 2 progress
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickOrder = (itemId: string, itemName: string) => {
    showInfo(`Quick ordering ${itemName}...`);
  };



  return (
    <Layout cafeName={cafeName}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {cafeName} Menu
          </h1>
        </div>

        {/* Quick Actions */}
        <QuickActions className="mb-4" />

        {/* Step Progress Bar */}
        <StepProgressBar
          stepNumber={2}
          stepTitle="Step 2: Choose Items"
          progress={40}
          showCart={true}
          onCartClick={() => window.location.href = '/portal/consumer-demo/order/cart'}
        />

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'Hot Coffees', 'Cold Coffees'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent1 text-white'
                  : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="space-y-8">
          {Object.entries(menuData)
            .filter(([category]) => selectedCategory === 'all' || selectedCategory === category)
            .map(([category, subcategories]) => (
            <div key={category} className="space-y-4">
              {/* Category Title */}
              <h2 className="text-xl font-bold text-primary">{category}</h2>
              
              {/* Subcategories */}
              {Object.entries(subcategories).map(([subcategory, items]) => (
                <div key={subcategory} className="space-y-3">
                  {/* Subcategory Title */}
                  <h3 className="text-lg font-semibold text-primary/80">{subcategory}</h3>
                  
                  {/* Horizontal Scrolling Items */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-32 h-32 bg-white border border-primary/20 rounded-lg overflow-hidden hover:shadow-md hover:border-accent1/40 transition-all cursor-pointer relative"
                        onClick={() => window.location.href = `/portal/consumer-demo/order/customize?item=${encodeURIComponent(item.name)}&cafe=${encodeURIComponent(cafeName)}&price=${item.price}`}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
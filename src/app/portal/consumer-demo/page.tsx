'use client';

import { Layout, QuickActions } from '@/components/consumer';
import { MockDataService } from '@/lib/mockDataService';
import { PWADetector } from '@/components/PWADetector';
import { usePWAConditional } from '@/components/PWADetector';
import { useRouter } from 'next/navigation';
export default function ConsumerDemoPage() {
  const user = MockDataService.getMockConsumerUser();
  const firstName = user.name.split(' ')[0]; // Extract first name from "John Doe"
  const { isPWA, renderIfBrowser, renderIfPWA } = usePWAConditional();
  const router = useRouter();

  const handleCafeClick = (cafeName: string) => {
    router.push(`/portal/consumer-demo/order/menu?cafe=${encodeURIComponent(cafeName)}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        
        {/* Welcome Section with Logo */}
        <div className="mb-4 flex items-center gap-4">
          <img 
            src="/images/ld-color-drip.svg" 
            alt="Local Drip Logo" 
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Welcome {firstName}!
            </h1>
            {/* Show different subtitle based on PWA vs browser */}
            {renderIfPWA(
              <p className="text-sm text-primary-60">Using LocalDrip App</p>
            )}
            {renderIfBrowser(
              <p className="text-sm text-primary-60">Using LocalDrip Web</p>
            )}
          </div>
        </div>

        {/* Quick Actions Sub-Menu */}
        <QuickActions className="mb-2" />


        {/* Recent Orders Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-primary mb-3">Recent Orders</h2>
          
          {/* Recent Orders - 3 items in a row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {MockDataService.getMockFrequentItems().slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white border border-primary/20 rounded-lg p-2 hover:shadow-md hover:border-accent1/40 transition-all">
                {/* Header with logo and cafe name */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">L</span>
                  </div>
                  <p className="text-xs text-primary/70 truncate">{item.cafe}</p>
                </div>
                
                {/* Item name */}
                <h3 className="text-xs font-semibold text-primary truncate mb-1.5">{item.name}</h3>
                
                {/* Footer with cost, date and reorder icon */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">${item.price}</span>
                    <span className="text-xs text-primary/60">2 days ago</span>
                  </div>
                  <button className="p-1 hover:bg-primary/5 rounded transition-colors">
                    <svg className="w-4 h-4 text-primary/70 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-b border-primary/10"></div>
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
                onClick={() => handleCafeClick(cafe.name)}
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
                      
                      {/* Order Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCafeClick(cafe.name);
                        }}
                        disabled={cafe.status.toLowerCase().includes('offline')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          cafe.status.toLowerCase().includes('offline')
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-accent1 text-white hover:bg-accent1/90 active:scale-95'
                        }`}
                      >
                        {cafe.status.toLowerCase().includes('offline') ? 'Offline' : 'Order'}
                      </button>
                      
                      {/* Status - Under button */}
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
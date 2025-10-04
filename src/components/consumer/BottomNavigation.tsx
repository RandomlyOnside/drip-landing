'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { usePWA } from '@/hooks/usePWA';
import { OrderHeader } from './OrderHeader';
import CartBadge from './CartBadge';

interface BottomNavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const bottomNavItems: BottomNavItem[] = [
  {
    name: 'Home',
    href: '/portal/consumer-demo',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    name: 'Order',
    href: '/portal/consumer-demo/order',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    name: 'Profile',
    href: '/portal/consumer-demo/profile',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
];

interface BottomNavigationProps {
  cafeName?: string;
}

export function BottomNavigation({ cafeName }: BottomNavigationProps = {}) {
  const pathname = usePathname();
  const { isInstalled, platform } = usePWA();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleShown, setBubbleShown] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setShowBubble(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Show bubble effect - on every page load unless dismissed
  useEffect(() => {
    if (!isInstalled && (showInstallButton || platform === 'ios') && !bubbleShown) {
      // Check if user has dismissed the bubble before (localStorage)
      const bubbleDismissed = localStorage.getItem('pwa-install-bubble-dismissed');

      if (!bubbleDismissed) {
        // Show bubble after a short delay
        const timer = setTimeout(() => {
          setShowBubble(true);
          setBubbleShown(true);
          setIsBouncing(true);

          // Stop bouncing after 10 seconds, settle for 10 more
          setTimeout(() => {
            setIsBouncing(false);
          }, 10000);

          // Auto-hide bubble after 20 seconds total (10 bounce + 10 settle)
          setTimeout(() => {
            setShowBubble(false);
          }, 20000);
        }, 2000); // Show after 2 seconds

        return () => clearTimeout(timer);
      }
    }
  }, [showInstallButton, platform, isInstalled, bubbleShown]);

  const handleBubbleClick = () => {
    setShowBubble(false);
    // Mark bubble as dismissed since they're installing
    localStorage.setItem('pwa-install-bubble-dismissed', 'true');
    handleInstallClick();
  };

  const handleBubbleDismiss = () => {
    setShowBubble(false);
    // Mark bubble as dismissed so it won't show again
    localStorage.setItem('pwa-install-bubble-dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (platform === 'ios') {
        alert('To install: tap Share button → "Add to Home Screen"');
      } else {
        alert('To install: look for install option in browser menu');
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const isActiveRoute = (href: string) => {
    // Normalize paths by removing trailing slashes
    const normalizedPathname = pathname.replace(/\/$/, '') || '/';
    const normalizedHref = href.replace(/\/$/, '') || '/';

    // Exact match for home page
    if (normalizedHref === '/portal/consumer-demo') {
      return normalizedPathname === '/portal/consumer-demo';
    }
    // For other pages, check if pathname starts with href
    return normalizedPathname.startsWith(normalizedHref);
  };

  // Create navigation items with conditional install button
  const navItems = [...bottomNavItems];

  // Add install button if not installed and installable
  if (!isInstalled && (showInstallButton || platform === 'ios')) {
    navItems.push({
      name: 'Install',
      href: '#install',
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 281.25 374.999991" 
          fill="none"
          style={{ background: 'transparent' }}
        >
          <path 
            fill="currentColor"
            d="M 212.179688 98.890625 C 183.707031 50.519531 155.71875 10.605469 154.539062 8.929688 C 151.558594 4.6875 146.695312 2.164062 141.511719 2.164062 C 136.328125 2.164062 131.46875 4.6875 128.484375 8.929688 C 127.308594 10.605469 99.316406 50.519531 70.84375 98.890625 C 31.042969 166.503906 11.695312 213.648438 11.695312 243.019531 C 11.695312 314.601562 69.929688 372.835938 141.511719 372.835938 C 213.09375 372.835938 271.324219 314.601562 271.324219 243.019531 C 271.324219 213.648438 251.980469 166.5 212.179688 98.890625 Z M 212.179688 98.890625"
          />
          <path 
            fill="currentColor"
            d="M 142.296875 2.210938 C 142.035156 2.199219 141.777344 2.164062 141.511719 2.164062 C 136.328125 2.164062 131.46875 4.6875 128.484375 8.929688 C 127.308594 10.605469 99.316406 50.519531 70.84375 98.890625 C 31.042969 166.503906 11.695312 213.648438 11.695312 243.019531 C 11.695312 314.601562 69.929688 372.835938 141.511719 372.835938 C 141.773438 372.835938 142.035156 372.824219 142.296875 372.824219 Z M 142.296875 2.210938"
          />
          <path 
            fill="#f7f1e3"
            d="M 89.582031 304.753906 C 85.175781 304.753906 80.789062 302.933594 77.640625 299.371094 C 63.882812 283.789062 56.308594 263.777344 56.308594 243.023438 C 56.308594 238.078125 57.972656 222.921875 73.410156 189.070312 C 77.058594 181.070312 86.503906 177.539062 94.503906 181.1875 C 102.503906 184.835938 106.035156 194.28125 102.386719 202.28125 C 89.238281 231.109375 88.210938 242.347656 88.152344 243.15625 C 88.1875 256.097656 92.929688 268.566406 101.511719 278.292969 C 107.332031 284.882812 106.707031 294.945312 100.117188 300.765625 C 97.089844 303.441406 93.328125 304.753906 89.582031 304.753906 Z M 89.582031 304.753906"
          />
        </svg>
      )
    });
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary/20 safe-area-pb">
      <OrderHeader cafeName={cafeName} />
      
      <div className="flex items-center justify-around px-2 py-2 relative">
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          const isInstallButton = item.href === '#install';

          if (isInstallButton) {
            return (
              <div key={item.name} className="relative">
                <button
                  onClick={handleInstallClick}
                  className={cn(
                    'flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px] min-h-[60px]',
                    'text-accent1 hover:bg-accent1/10 active:scale-95'
                  )}
                >
                  <div className="mb-1 relative overflow-hidden">
                    <div className="relative">
                      {item.icon}
                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </button>

                {/* Install Bubble Tooltip */}
                {showBubble && (
                  <div className="absolute bottom-full right-0 mb-2 z-60">
                    <div className={`bg-accent1 text-white px-5 py-3 rounded-lg shadow-lg w-[240px] text-center relative ${isBouncing ? 'animate-bounce' : ''}`}>
                      <button
                        onClick={handleBubbleDismiss}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-white text-accent1 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gray-100"
                        aria-label="Dismiss"
                      >
                        ×
                      </button>

                      <div className="text-sm font-medium mb-1">
                        Install LocalDrip App
                      </div>
                      <div className="text-xs opacity-90 mb-2">
                        Your fav cafes, one tap!
                      </div>
                      <button
                        onClick={handleBubbleClick}
                        className="bg-white text-accent1 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                      >
                        Install Now
                      </button>

                      {/* Arrow pointing down to install button */}
                      <div className="absolute top-full right-8">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent1"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px] min-h-[60px] relative',
                isActive
                  ? 'bg-accent1/20 text-accent1'
                  : 'text-primary/70 hover:text-primary hover:bg-primary/5 active:scale-95'
              )}
            >
              <div className="mb-1 relative">
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
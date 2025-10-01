'use client';

import { useState, useEffect } from 'react';

export interface PWAInfo {
  isStandalone: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  displayMode: 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen';
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
}

export function usePWA(): PWAInfo {
  const [pwaInfo, setPwaInfo] = useState<PWAInfo>({
    isStandalone: false,
    isInstallable: false,
    isInstalled: false,
    displayMode: 'browser',
    platform: 'unknown'
  });

  useEffect(() => {
    const detectPWA = () => {
      // Check if running in standalone mode (PWA installed)
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true || // iOS Safari
        document.referrer.includes('android-app://');

      // Detect display mode
      let displayMode: PWAInfo['displayMode'] = 'browser';
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
      } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        displayMode = 'minimal-ui';
      } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
        displayMode = 'fullscreen';
      }

      // Detect platform
      let platform: PWAInfo['platform'] = 'unknown';
      const userAgent = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        platform = 'ios';
      } else if (/android/.test(userAgent)) {
        platform = 'android';
      } else if (/windows|mac|linux/.test(userAgent)) {
        platform = 'desktop';
      }

      // Check if PWA is installable
      const isInstallable = 'serviceWorker' in navigator && 'PushManager' in window;

      setPwaInfo({
        isStandalone,
        isInstallable,
        isInstalled: isStandalone,
        displayMode,
        platform
      });
    };

    // Initial detection
    detectPWA();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => detectPWA();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return pwaInfo;
}

// Utility functions for specific checks
export const isPWAInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
};

export const getPWADisplayMode = (): PWAInfo['displayMode'] => {
  if (typeof window === 'undefined') return 'browser';
  
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  return 'browser';
};

export const getPlatform = (): PWAInfo['platform'] => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  } else if (/windows|mac|linux/.test(userAgent)) {
    return 'desktop';
  }
  return 'unknown';
};
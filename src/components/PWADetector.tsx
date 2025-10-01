'use client';

import React from 'react';
import { usePWA } from '@/hooks/usePWA';

interface PWADetectorProps {
  children?: React.ReactNode;
  showInBrowser?: React.ReactNode;
  showInPWA?: React.ReactNode;
  showInstallPrompt?: boolean;
  className?: string;
}

export function PWADetector({ 
  children, 
  showInBrowser, 
  showInPWA, 
  showInstallPrompt = false,
  className 
}: PWADetectorProps) {
  const { isStandalone, isInstalled, displayMode, platform } = usePWA();

  // Show install prompt logic
  if (showInstallPrompt && !isInstalled) {
    return (
      <div className={className}>
        <div className="bg-primary-5 border border-primary-20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📱</div>
            <div>
              <h3 className="font-semibold text-primary">Install LocalDrip</h3>
              <p className="text-sm text-primary-60">
                Get the full app experience! Install LocalDrip for faster access and offline support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show different content based on context
  if (isStandalone || isInstalled) {
    return showInPWA ? <div className={className}>{showInPWA}</div> : null;
  } else {
    return showInBrowser ? <div className={className}>{showInBrowser}</div> : null;
  }
}

// Component to show PWA status info (useful for debugging)
export function PWAStatus() {
  const pwaInfo = usePWA();

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono">
      <h4 className="font-bold mb-2">PWA Status:</h4>
      <ul className="space-y-1">
        <li>Standalone: {pwaInfo.isStandalone ? '✅' : '❌'}</li>
        <li>Installed: {pwaInfo.isInstalled ? '✅' : '❌'}</li>
        <li>Installable: {pwaInfo.isInstallable ? '✅' : '❌'}</li>
        <li>Display Mode: {pwaInfo.displayMode}</li>
        <li>Platform: {pwaInfo.platform}</li>
      </ul>
    </div>
  );
}

// Hook for conditional rendering in components
export function usePWAConditional() {
  const { isStandalone, isInstalled } = usePWA();
  
  return {
    isPWA: isStandalone || isInstalled,
    isBrowser: !isStandalone && !isInstalled,
    renderIfPWA: (content: React.ReactNode) => (isStandalone || isInstalled) ? content : null,
    renderIfBrowser: (content: React.ReactNode) => (!isStandalone && !isInstalled) ? content : null,
  };
}
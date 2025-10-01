'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children?: React.ReactNode;
}

export function PWAInstallButton({ 
  className, 
  variant = 'default', 
  size = 'default',
  children 
}: PWAInstallButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const { isInstalled, platform } = usePWA();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      setShowButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support the install prompt
      if (platform === 'ios') {
        alert('To install this app on iOS: tap the Share button and then "Add to Home Screen"');
      } else {
        alert('To install this app: look for the install option in your browser menu');
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowButton(false);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Show button if we have a deferred prompt or on iOS (manual instructions)
  if (!showButton && platform !== 'ios') {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children || (
        <>
          <span className="mr-2">📱</span>
          Install App
        </>
      )}
    </Button>
  );
}

// Alternative component for showing install instructions
export function PWAInstallPrompt() {
  const { isInstalled, platform } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = () => {
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (isInstalled || !showPrompt) {
    return null;
  }

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return 'Tap the Share button and select "Add to Home Screen"';
      case 'android':
        return 'Tap the menu and select "Add to Home Screen" or "Install App"';
      case 'desktop':
        return 'Look for the install icon in your address bar or browser menu';
      default:
        return 'Look for install options in your browser menu';
    }
  };

  return (
    <div className="bg-primary-5 border border-primary-20 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📱</div>
          <div>
            <h3 className="font-semibold text-primary mb-1">Install LocalDrip</h3>
            <p className="text-sm text-primary-60 mb-2">
              Your fav cafes, one tap!
            </p>
            <p className="text-xs text-primary-40">
              {getInstallInstructions()}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-primary-40 hover:text-primary-60 text-xl leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
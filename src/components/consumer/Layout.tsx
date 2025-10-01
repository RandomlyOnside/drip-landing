'use client';

import React from 'react';
import { Navigation } from './Navigation';
import { BottomNavigation } from './BottomNavigation';
import PWAInstallPrompt from './PWAInstallPrompt';
import { Logo } from '@/components/ui/Logo';
import SiteFooter from '@/components/SiteFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Desktop Navigation Only */}
      <div className="hidden md:block sticky top-0 z-30 bg-secondary border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Logo
                variant="header"
                size="medium"
                clickable={true}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Navigation */}
            <Navigation />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <div className="mt-auto">
        <SiteFooter />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
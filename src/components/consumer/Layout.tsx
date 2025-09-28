'use client';

import React from 'react';
import { Navigation } from './Navigation';
import PWAInstallPrompt from './PWAInstallPrompt';
import { Logo } from '@/components/ui/Logo';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-secondary border-b border-primary/20">
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
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-primary/20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-primary/70 text-center">
            © 2024 LocalDrip, Brewed by Consumer Portal. All rights reserved.
          </p>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
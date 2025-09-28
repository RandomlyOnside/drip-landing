'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  currentPath: string;
}

// Enhanced active state detection
function isActiveRoute(currentPath: string, href: string): boolean {
  if (currentPath === href) return true;
  // If we're on the main consumer-demo page, highlight Home
  if (currentPath === '/portal/consumer-demo' && href === '/portal/consumer-demo/home') {
    return true;
  }
  return false;
}

export function MobileMenu({ isOpen, onClose, navigationItems, currentPath }: MobileMenuProps) {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-64 bg-background border-l border-border z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-12 w-12 min-h-[44px] min-w-[44px]"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(currentPath, item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out min-h-[48px] min-w-[48px]',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105'
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
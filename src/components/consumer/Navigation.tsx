'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';
import { navigationItems } from '@/lib/navigationTest';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enhanced active state detection
  const isActiveRoute = (href: string) => {
    if (pathname === href) return true;
    // If we're on the main consumer-demo page, highlight Home
    if (pathname === '/portal/consumer-demo' && href === '/portal/consumer-demo/home') {
      return true;
    }
    return false;
  };

  // Keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ease-in-out relative min-h-[44px] min-w-[44px]',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-primary hover:bg-primary/10 hover:text-primary hover:scale-105'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation - Hamburger Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="h-12 w-12 min-h-[44px] min-w-[44px]"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        currentPath={pathname}
      />
    </>
  );
}
'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/Logo';

const SiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'Locals', href: '#locals' },
    { label: 'Cafés', href: '#cafes' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary border-b border-primary-12" role="banner">
      <div className="container mx-auto flex h-16 items-center justify-between container-padding">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Logo
            variant="header"
            size="medium"
            clickable={true}
            onClick={scrollToTop}
            priority={true}
            alt="Local Drip - Navigate to top"
            ariaLabel="Local Drip logo, click to scroll to top"
            className="transition-transform duration-200 hover:scale-105"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-primary hover:text-primary-80 focus:text-primary-80 transition-colors duration-200 font-medium py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-primary hover:text-primary-80 focus:text-primary-80 transition-colors duration-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav 
          id="mobile-menu"
          className="md:hidden bg-secondary border-t border-primary-12 shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto py-4 container-padding">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-primary hover:text-primary-80 focus:text-primary-80 transition-colors duration-200 font-medium py-3 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary text-lg"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
'use client';

import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-secondary py-6 sm:py-8" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-primary/70 text-xs leading-relaxed">
            © 2025 Local Drip. Where locals and cafés connect.
          </p>
          <p className="text-primary/70 text-xs leading-relaxed">
            Brewed in partnership with{' '}
            <a
              href="https://bluebearlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Blue Bear Labs
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
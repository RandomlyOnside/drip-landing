'use client';

import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-secondary py-6 sm:py-8" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
            © 2025 Local Drip. Where locals and cafés connect.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
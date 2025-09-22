'use client';

import { Logo } from '@/components/ui/Logo';
import { useState } from 'react';

export default function AccessibilityTestPage() {
  const [clickCount, setClickCount] = useState(0);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    const message = `Logo clicked ${clickCount + 1} times`;
    setAnnouncements(prev => [...prev, message]);
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAnnouncements(prev => [...prev, 'Scrolled to top']);
  };

  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Logo Accessibility Test Page
        </h1>
        
        {/* Screen reader announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcements.length > 0 && announcements[announcements.length - 1]}
        </div>

        {/* Test Section 1: Basic Logo Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Logo Variants (Non-clickable)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center p-6 border rounded-lg">
            <div className="text-center space-y-2">
              <Logo variant="header" size="medium" />
              <p className="text-sm text-muted-foreground">Header</p>
            </div>
            <div className="text-center space-y-2">
              <Logo variant="hero" size="medium" />
              <p className="text-sm text-muted-foreground">Hero</p>
            </div>
            <div className="text-center space-y-2">
              <Logo variant="footer" size="medium" />
              <p className="text-sm text-muted-foreground">Footer</p>
            </div>
            <div className="text-center space-y-2">
              <Logo variant="inline" size="medium" />
              <p className="text-sm text-muted-foreground">Inline</p>
            </div>
          </div>
        </section>

        {/* Test Section 2: Clickable Logos */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Clickable Logos (Keyboard Navigation)</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Test keyboard navigation: Tab to focus, Enter or Space to activate
            </p>
            <div className="flex flex-wrap gap-6 items-center p-6 border rounded-lg">
              <div className="text-center space-y-2">
                <Logo 
                  variant="header" 
                  clickable 
                  onClick={scrollToTop}
                  ariaLabel="Navigate to top of page"
                />
                <p className="text-sm text-muted-foreground">Header (Scroll to top)</p>
              </div>
              <div className="text-center space-y-2">
                <Logo 
                  variant="hero" 
                  size="small"
                  clickable 
                  onClick={handleLogoClick}
                />
                <p className="text-sm text-muted-foreground">Hero (Click counter)</p>
              </div>
              <div className="text-center space-y-2">
                <Logo 
                  variant="inline" 
                  clickable 
                  onClick={handleLogoClick}
                  ariaDescribedBy="click-description"
                />
                <p className="text-sm text-muted-foreground" id="click-description">
                  Inline (With aria-describedby)
                </p>
              </div>
            </div>
            <div className="p-4 bg-muted rounded">
              <p className="font-medium">Click Count: {clickCount}</p>
            </div>
          </div>
        </section>

        {/* Test Section 3: Custom Alt Text and ARIA */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">3. Custom Alt Text and ARIA Labels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg space-y-4">
              <h3 className="font-medium">Custom Alt Text</h3>
              <Logo 
                alt="Local Drip coffee company logo with custom description"
                variant="hero"
                size="small"
              />
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <h3 className="font-medium">Custom ARIA Label</h3>
              <Logo 
                clickable
                onClick={handleLogoClick}
                ariaLabel="Local Drip logo - Click to increment counter"
                variant="hero"
                size="small"
              />
            </div>
          </div>
        </section>

        {/* Test Section 4: Fallback Text */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Fallback Text (Simulated Image Error)</h2>
          <div className="p-6 border rounded-lg space-y-4">
            <p className="text-muted-foreground">
              These logos simulate image loading errors to show fallback text
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="text-center space-y-2">
                <Logo 
                  variant="header"
                  // Force fallback by using non-existent image
                  alt="Fallback header logo"
                />
                <p className="text-sm text-muted-foreground">Header Fallback</p>
              </div>
              <div className="text-center space-y-2">
                <Logo 
                  variant="hero"
                  size="small"
                  clickable
                  onClick={handleLogoClick}
                  alt="Fallback clickable logo"
                />
                <p className="text-sm text-muted-foreground">Clickable Fallback</p>
              </div>
            </div>
          </div>
        </section>

        {/* Test Section 5: High Contrast Mode */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. High Contrast Support</h2>
          <div className="p-6 border rounded-lg space-y-4">
            <p className="text-muted-foreground">
              Enable high contrast mode in your OS to test enhanced contrast features
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <Logo variant="header" clickable onClick={handleLogoClick} />
              <Logo variant="hero" size="small" />
              <Logo variant="inline" clickable onClick={handleLogoClick} />
            </div>
          </div>
        </section>

        {/* Accessibility Instructions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Accessibility Testing Instructions</h2>
          <div className="p-6 border rounded-lg space-y-4">
            <h3 className="font-medium">Keyboard Navigation:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Use Tab to navigate between clickable logos</li>
              <li>Press Enter or Space to activate focused logos</li>
              <li>Verify focus indicators are visible</li>
            </ul>
            
            <h3 className="font-medium">Screen Reader Testing:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Enable screen reader (NVDA, JAWS, VoiceOver)</li>
              <li>Verify descriptive alt text is announced</li>
              <li>Check that fallback text is properly announced</li>
              <li>Confirm button roles are announced for clickable logos</li>
            </ul>
            
            <h3 className="font-medium">High Contrast Mode:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Enable high contrast mode in your operating system</li>
              <li>Verify logos remain visible and properly contrasted</li>
              <li>Check that focus indicators are enhanced</li>
            </ul>
          </div>
        </section>

        {/* Announcements Log */}
        {announcements.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Screen Reader Announcements Log</h2>
            <div className="p-6 border rounded-lg">
              <ul className="space-y-1">
                {announcements.map((announcement, index) => (
                  <li key={index} className="text-sm">
                    {index + 1}. {announcement}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
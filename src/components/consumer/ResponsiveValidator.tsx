'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ValidationResult {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  element?: string;
  details?: string;
}

export function ResponsiveValidator() {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const runValidation = useCallback(() => {
    setIsValidating(true);
    const validationResults: ValidationResult[] = [];

    try {
      // Check viewport size
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      validationResults.push({
        type: 'info',
        message: `Current viewport: ${viewport.width}x${viewport.height}px`,
        details: getViewportCategory(viewport.width),
      });

      // Check touch targets
      const touchTargetResults = validateTouchTargets();
      validationResults.push(...touchTargetResults);

      // Check navigation responsiveness
      const navResults = validateNavigation(viewport.width);
      validationResults.push(...navResults);

      // Check PWA features
      const pwaResults = validatePWA();
      validationResults.push(...pwaResults);

      // Check responsive layouts
      const layoutResults = validateLayouts();
      validationResults.push(...layoutResults);

      setResults(validationResults);
      setIsVisible(true);

    } catch (error) {
      validationResults.push({
        type: 'error',
        message: 'Validation error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
      setResults(validationResults);
      setIsVisible(true);
    } finally {
      setIsValidating(false);
    }
  }, []);

  // Only show in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Auto-run validation on mount
      setTimeout(() => runValidation(), 1000);
    }
  }, [runValidation]);

  const validateTouchTargets = (): ValidationResult[] => {
    const results: ValidationResult[] = [];
    const minSize = 44;

    const selectors = [
      'button',
      'a[href]',
      'input[type="button"]',
      'input[type="submit"]',
      'input[type="reset"]',
      '[role="button"]',
      '[tabindex="0"]',
      'select',
      'input[type="checkbox"]',
      'input[type="radio"]',
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    let validTargets = 0;
    let invalidTargets = 0;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0;

      if (isVisible) {
        const isValid = rect.width >= minSize && rect.height >= minSize;
        
        if (isValid) {
          validTargets++;
        } else {
          invalidTargets++;
          results.push({
            type: 'error',
            message: 'Touch target too small',
            element: `${element.tagName}.${element.className.split(' ')[0] || 'no-class'}`,
            details: `${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum: ${minSize}px)`,
          });
        }
      }
    });

    if (invalidTargets === 0) {
      results.push({
        type: 'success',
        message: `All ${validTargets} touch targets meet 44px minimum`,
      });
    } else {
      results.push({
        type: 'warning',
        message: `${invalidTargets} of ${validTargets + invalidTargets} touch targets are too small`,
      });
    }

    return results;
  };

  const validateNavigation = (viewportWidth: number): ValidationResult[] => {
    const results: ValidationResult[] = [];
    const isMobile = viewportWidth < 768;

    const mobileMenuButton = document.querySelector('[aria-label="Open menu"]');
    const desktopNav = document.querySelector('nav.hidden.md\\:flex');

    if (isMobile) {
      if (mobileMenuButton) {
        const isVisible = window.getComputedStyle(mobileMenuButton).display !== 'none';
        if (isVisible) {
          results.push({
            type: 'success',
            message: 'Mobile menu button is visible on mobile viewport',
          });
        } else {
          results.push({
            type: 'error',
            message: 'Mobile menu button should be visible on mobile viewport',
          });
        }
      } else {
        results.push({
          type: 'error',
          message: 'Mobile menu button not found',
        });
      }

      if (desktopNav) {
        const isVisible = window.getComputedStyle(desktopNav).display !== 'none';
        if (!isVisible) {
          results.push({
            type: 'success',
            message: 'Desktop navigation is hidden on mobile viewport',
          });
        } else {
          results.push({
            type: 'warning',
            message: 'Desktop navigation should be hidden on mobile viewport',
          });
        }
      }
    } else {
      if (desktopNav) {
        const isVisible = window.getComputedStyle(desktopNav).display !== 'none';
        if (isVisible) {
          results.push({
            type: 'success',
            message: 'Desktop navigation is visible on desktop viewport',
          });
        } else {
          results.push({
            type: 'error',
            message: 'Desktop navigation should be visible on desktop viewport',
          });
        }
      }

      if (mobileMenuButton) {
        const isVisible = window.getComputedStyle(mobileMenuButton).display !== 'none';
        if (!isVisible) {
          results.push({
            type: 'success',
            message: 'Mobile menu button is hidden on desktop viewport',
          });
        } else {
          results.push({
            type: 'warning',
            message: 'Mobile menu button should be hidden on desktop viewport',
          });
        }
      }
    }

    return results;
  };

  const validatePWA = (): ValidationResult[] => {
    const results: ValidationResult[] = [];

    // Check manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      results.push({
        type: 'success',
        message: 'PWA manifest is present',
      });
    } else {
      results.push({
        type: 'error',
        message: 'PWA manifest is missing',
      });
    }

    // Check service worker support
    if ('serviceWorker' in navigator) {
      results.push({
        type: 'success',
        message: 'Service Worker is supported',
      });
    } else {
      results.push({
        type: 'warning',
        message: 'Service Worker is not supported in this browser',
      });
    }

    // Check standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      results.push({
        type: 'info',
        message: 'App is running in standalone mode',
      });
    } else {
      results.push({
        type: 'info',
        message: 'App is running in browser mode',
      });
    }

    return results;
  };

  const validateLayouts = (): ValidationResult[] => {
    const results: ValidationResult[] = [];

    // Check for responsive grid layouts
    const grids = document.querySelectorAll('[class*="grid"]');
    if (grids.length > 0) {
      results.push({
        type: 'info',
        message: `Found ${grids.length} grid layouts`,
      });
    }

    // Check for responsive flex layouts
    const flexes = document.querySelectorAll('[class*="flex"]');
    if (flexes.length > 0) {
      results.push({
        type: 'info',
        message: `Found ${flexes.length} flex layouts`,
      });
    }

    // Check for responsive classes
    const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
    if (responsiveElements.length > 0) {
      results.push({
        type: 'success',
        message: `Found ${responsiveElements.length} elements with responsive classes`,
      });
    } else {
      results.push({
        type: 'warning',
        message: 'No responsive Tailwind classes found',
      });
    }

    return results;
  };

  const getViewportCategory = (width: number): string => {
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  };

  const getIcon = (type: ValidationResult['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: ValidationResult['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Floating validation button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={runValidation}
          disabled={isValidating}
          className="rounded-full shadow-lg"
          size="sm"
        >
          {isValidating ? 'Validating...' : 'Validate Responsive'}
        </Button>
      </div>

      {/* Validation results panel */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Responsive Design Validation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Results */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getBackgroundColor(result.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {result.message}
                        </div>
                        {result.element && (
                          <div className="text-xs text-gray-600 mt-1">
                            Element: {result.element}
                          </div>
                        )}
                        {result.details && (
                          <div className="text-xs text-gray-600 mt-1">
                            {result.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  {results.filter(r => r.type === 'error').length} errors, {' '}
                  {results.filter(r => r.type === 'warning').length} warnings, {' '}
                  {results.filter(r => r.type === 'success').length} passed
                </div>
                <Button
                  onClick={runValidation}
                  disabled={isValidating}
                  size="sm"
                  variant="outline"
                >
                  Re-validate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
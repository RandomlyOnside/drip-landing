'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/consumer/Layout';
import { Button } from '@/components/ui/button';
import { 
  generateResponsiveTestReport,
  VIEWPORT_SIZES,
  checkTouchTargetSize,
  getInteractiveElements,
  checkPWAStatus
} from '@/lib/responsiveTestUtils';
import { useToast } from '@/lib/toast';

export default function ResponsiveTestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [currentViewport, setCurrentViewport] = useState({ width: 0, height: 0 });
  const [isRunningTests, setIsRunningTests] = useState(false);
  const { showSuccess, showError, showInfo } = useToast();

  useEffect(() => {
    // Update current viewport size
    const updateViewport = () => {
      setCurrentViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const runResponsiveTests = async () => {
    setIsRunningTests(true);
    showInfo('Running responsive design tests...');

    try {
      // Wait a bit for UI to update
      await new Promise(resolve => setTimeout(resolve, 500));

      const results = generateResponsiveTestReport();
      setTestResults(results);
      
      // Count issues
      const touchTargetIssues = results.touchTargets.filter(t => !t.isValid).length;
      const totalTouchTargets = results.touchTargets.length;
      
      if (touchTargetIssues === 0) {
        showSuccess(`All ${totalTouchTargets} touch targets meet 44px minimum requirement!`);
      } else {
        showError(`${touchTargetIssues} of ${totalTouchTargets} touch targets are too small`);
      }

    } catch (error) {
      showError('Error running responsive tests');
      console.error('Test error:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const testTouchTargets = () => {
    const elements = getInteractiveElements();
    const results = elements.map(el => ({
      element: el,
      result: checkTouchTargetSize(el),
      tagName: el.tagName,
      className: el.className,
    }));

    console.log('Touch Target Test Results:', results);
    
    const failedElements = results.filter(r => !r.result.isValid);
    if (failedElements.length === 0) {
      showSuccess(`All ${results.length} interactive elements meet touch target requirements`);
    } else {
      showError(`${failedElements.length} elements are too small for touch targets`);
      failedElements.forEach(el => {
        console.warn(`Small touch target: ${el.tagName}.${el.className} - ${el.result.width}x${el.result.height}px`);
      });
    }
  };

  const testPWAFeatures = () => {
    const pwaStatus = checkPWAStatus();
    console.log('PWA Status:', pwaStatus);

    if (pwaStatus.hasManifest && pwaStatus.hasServiceWorker) {
      showSuccess('PWA features are properly configured');
    } else {
      const missing = [];
      if (!pwaStatus.hasManifest) missing.push('manifest');
      if (!pwaStatus.hasServiceWorker) missing.push('service worker');
      showError(`PWA missing: ${missing.join(', ')}`);
    }

    if (pwaStatus.isStandalone) {
      showInfo('App is running in standalone mode');
    } else if (pwaStatus.isInstallable) {
      showInfo('App is installable');
    }
  };

  const simulateViewport = (viewport: typeof VIEWPORT_SIZES[0]) => {
    // This would typically be done in a testing environment
    // For demo purposes, we'll just show the info
    showInfo(`Simulating ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    // In a real test, you'd change the viewport and verify layout changes
    console.log(`Testing viewport: ${viewport.name}`, {
      width: viewport.width,
      height: viewport.height,
      category: viewport.category,
    });
  };

  const getCurrentViewportCategory = () => {
    if (currentViewport.width < 768) return 'mobile';
    if (currentViewport.width < 1024) return 'tablet';
    return 'desktop';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Responsive Design Testing
          </h1>
          <p className="text-base sm:text-lg text-primary/80">
            Test and verify responsive design implementation
          </p>
        </div>

        {/* Current Viewport Info */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Current Viewport</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentViewport.width}px</div>
              <div className="text-sm text-primary/70">Width</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentViewport.height}px</div>
              <div className="text-sm text-primary/70">Height</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary capitalize">{getCurrentViewportCategory()}</div>
              <div className="text-sm text-primary/70">Category</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {currentViewport.width / currentViewport.height > 1 ? 'Landscape' : 'Portrait'}
              </div>
              <div className="text-sm text-primary/70">Orientation</div>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={runResponsiveTests}
            disabled={isRunningTests}
            className="w-full"
          >
            {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
          </Button>
          <Button 
            onClick={testTouchTargets}
            variant="outline"
            className="w-full"
          >
            Test Touch Targets
          </Button>
          <Button 
            onClick={testPWAFeatures}
            variant="outline"
            className="w-full"
          >
            Test PWA Features
          </Button>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            Refresh Tests
          </Button>
        </div>

        {/* Viewport Simulation */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Viewport Simulation</h2>
          <p className="text-sm text-primary/70 mb-4">
            Click to simulate different viewport sizes (for testing purposes)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {VIEWPORT_SIZES.map((viewport) => (
              <Button
                key={`${viewport.width}x${viewport.height}`}
                onClick={() => simulateViewport(viewport)}
                variant="outline"
                size="sm"
                className={`text-xs min-h-[44px] min-w-[44px] ${
                  viewport.category === 'mobile' ? 'border-blue-200 text-blue-700' :
                  viewport.category === 'tablet' ? 'border-green-200 text-green-700' :
                  'border-purple-200 text-purple-700'
                }`}
              >
                {viewport.name}
                <br />
                <span className="text-xs opacity-70">
                  {viewport.width}×{viewport.height}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="space-y-6">
            {/* Touch Targets Results */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">Touch Target Results</h2>
              <div className="mb-4">
                <div className="text-sm text-primary/70">
                  Total Interactive Elements: {testResults.touchTargets.length}
                </div>
                <div className="text-sm text-primary/70">
                  Valid Touch Targets: {testResults.touchTargets.filter((t: any) => t.isValid).length}
                </div>
                <div className="text-sm text-primary/70">
                  Invalid Touch Targets: {testResults.touchTargets.filter((t: any) => !t.isValid).length}
                </div>
              </div>
              
              {testResults.touchTargets.filter((t: any) => !t.isValid).length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-red-600">Elements Below 44px Minimum:</h3>
                  {testResults.touchTargets
                    .filter((t: any) => !t.isValid)
                    .map((target: any, index: number) => (
                      <div key={index} className="text-sm bg-red-50 p-2 rounded border border-red-200">
                        <span className="font-medium">{target.element}</span>
                        <span className="text-red-600 ml-2">
                          {target.size.width}×{target.size.height}px
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* PWA Status Results */}
            <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">PWA Status</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl ${testResults.pwaStatus.hasManifest ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults.pwaStatus.hasManifest ? '✅' : '❌'}
                  </div>
                  <div className="text-sm text-primary/70">Manifest</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl ${testResults.pwaStatus.hasServiceWorker ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults.pwaStatus.hasServiceWorker ? '✅' : '❌'}
                  </div>
                  <div className="text-sm text-primary/70">Service Worker</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl ${testResults.pwaStatus.isInstallable ? 'text-green-600' : 'text-yellow-600'}`}>
                    {testResults.pwaStatus.isInstallable ? '✅' : '⚠️'}
                  </div>
                  <div className="text-sm text-primary/70">Installable</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl ${testResults.pwaStatus.isStandalone ? 'text-green-600' : 'text-gray-400'}`}>
                    {testResults.pwaStatus.isStandalone ? '✅' : '➖'}
                  </div>
                  <div className="text-sm text-primary/70">Standalone</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Testing Checklist */}
        <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Manual Testing Checklist</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">Navigation adapts to mobile (hamburger menu appears)</div>
                <div className="text-sm text-primary/70">Resize browser to &lt;768px width</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">Desktop navigation shows on larger screens</div>
                <div className="text-sm text-primary/70">Resize browser to &gt;768px width</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">Mobile menu opens and closes properly</div>
                <div className="text-sm text-primary/70">Click hamburger menu on mobile</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">All pages are responsive across breakpoints</div>
                <div className="text-sm text-primary/70">Test Home, Orders, and Profile pages</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">PWA install prompt appears (if supported)</div>
                <div className="text-sm text-primary/70">Check for install banner or prompt</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-medium text-primary">App works in standalone mode</div>
                <div className="text-sm text-primary/70">Install PWA and test functionality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
#!/usr/bin/env node

/**
 * Comprehensive responsive design testing script
 * Tests navigation behavior, touch targets, PWA features, and layout responsiveness
 */

const puppeteer = require('puppeteer');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const VIEWPORT_SIZES = [
  // Mobile viewports
  { width: 320, height: 568, name: 'iPhone SE', category: 'mobile' },
  { width: 375, height: 667, name: 'iPhone 8', category: 'mobile' },
  { width: 390, height: 844, name: 'iPhone 12', category: 'mobile' },
  { width: 414, height: 896, name: 'iPhone 11 Pro Max', category: 'mobile' },
  
  // Tablet viewports
  { width: 768, height: 1024, name: 'iPad', category: 'tablet' },
  { width: 820, height: 1180, name: 'iPad Air', category: 'tablet' },
  { width: 1024, height: 1366, name: 'iPad Pro', category: 'tablet' },
  
  // Desktop viewports
  { width: 1280, height: 720, name: 'Desktop Small', category: 'desktop' },
  { width: 1440, height: 900, name: 'Desktop Medium', category: 'desktop' },
  { width: 1920, height: 1080, name: 'Desktop Large', category: 'desktop' },
];

const PAGES_TO_TEST = [
  '/portal/consumer-demo/home',
  '/portal/consumer-demo/order',
  '/portal/consumer-demo/profile',
];

const TOUCH_TARGET_MIN_SIZE = 44;

class ResponsiveTestRunner {
  constructor() {
    this.browser = null;
    this.results = {
      navigation: [],
      touchTargets: [],
      pwa: {},
      layouts: [],
      errors: [],
    };
  }

  async init() {
    console.log('🚀 Starting responsive design tests...\n');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async testNavigationResponsiveness() {
    console.log('📱 Testing navigation responsiveness...');
    
    const page = await this.browser.newPage();
    
    for (const viewport of VIEWPORT_SIZES) {
      try {
        await page.setViewport(viewport);
        await page.goto(`${BASE_URL}/portal/consumer-demo/home`, { waitUntil: 'networkidle0' });
        
        // Check navigation elements
        const mobileMenuButton = await page.$('[aria-label="Open menu"]');
        const desktopNav = await page.$('nav.hidden.md\\:flex');
        
        const mobileMenuVisible = mobileMenuButton ? await mobileMenuButton.isIntersectingViewport() : false;
        const desktopNavVisible = desktopNav ? await desktopNav.isIntersectingViewport() : false;
        
        // Test mobile menu functionality on mobile viewports
        let mobileMenuWorks = false;
        if (viewport.category === 'mobile' && mobileMenuButton) {
          await mobileMenuButton.click();
          await page.waitForTimeout(500);
          const mobileMenu = await page.$('.fixed.inset-y-0.right-0');
          mobileMenuWorks = mobileMenu ? await mobileMenu.isIntersectingViewport() : false;
          
          // Close menu
          const closeButton = await page.$('[aria-label="Close menu"]');
          if (closeButton) {
            await closeButton.click();
            await page.waitForTimeout(500);
          }
        }
        
        this.results.navigation.push({
          viewport: viewport.name,
          category: viewport.category,
          mobileMenuButtonVisible: mobileMenuVisible,
          desktopNavVisible: desktopNavVisible,
          mobileMenuWorks,
          expected: {
            mobileMenuButton: viewport.category === 'mobile',
            desktopNav: viewport.category !== 'mobile',
          }
        });
        
        console.log(`  ✓ ${viewport.name} (${viewport.width}x${viewport.height})`);
        
      } catch (error) {
        console.error(`  ❌ Error testing ${viewport.name}:`, error.message);
        this.results.errors.push({
          test: 'navigation',
          viewport: viewport.name,
          error: error.message
        });
      }
    }
    
    await page.close();
    console.log('✅ Navigation responsiveness tests completed\n');
  }

  async testTouchTargets() {
    console.log('👆 Testing touch target sizes...');
    
    const page = await this.browser.newPage();
    await page.setViewport({ width: 375, height: 667 }); // iPhone 8 size
    
    for (const pagePath of PAGES_TO_TEST) {
      try {
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle0' });
        
        // Get all interactive elements
        const touchTargets = await page.evaluate((minSize) => {
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
          const results = [];
          
          elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.width > 0 && rect.height > 0;
            
            if (isVisible) {
              results.push({
                index,
                tagName: element.tagName,
                className: element.className,
                width: rect.width,
                height: rect.height,
                isValid: rect.width >= minSize && rect.height >= minSize,
                text: element.textContent?.trim().substring(0, 50) || '',
              });
            }
          });
          
          return results;
        }, TOUCH_TARGET_MIN_SIZE);
        
        this.results.touchTargets.push({
          page: pagePath,
          targets: touchTargets,
          totalTargets: touchTargets.length,
          validTargets: touchTargets.filter(t => t.isValid).length,
          invalidTargets: touchTargets.filter(t => !t.isValid),
        });
        
        console.log(`  ✓ ${pagePath}: ${touchTargets.filter(t => t.isValid).length}/${touchTargets.length} valid targets`);
        
      } catch (error) {
        console.error(`  ❌ Error testing touch targets on ${pagePath}:`, error.message);
        this.results.errors.push({
          test: 'touchTargets',
          page: pagePath,
          error: error.message
        });
      }
    }
    
    await page.close();
    console.log('✅ Touch target tests completed\n');
  }

  async testPWAFeatures() {
    console.log('📱 Testing PWA features...');
    
    const page = await this.browser.newPage();
    await page.goto(`${BASE_URL}/portal/consumer-demo/home`, { waitUntil: 'networkidle0' });
    
    try {
      // Check for manifest
      const manifestLink = await page.$('link[rel="manifest"]');
      const hasManifest = !!manifestLink;
      
      // Check for service worker registration
      const hasServiceWorker = await page.evaluate(() => {
        return 'serviceWorker' in navigator;
      });
      
      // Check if running in standalone mode
      const isStandalone = await page.evaluate(() => {
        return window.matchMedia('(display-mode: standalone)').matches ||
               (window.navigator as any).standalone === true;
      });
      
      // Check for PWA install prompt component
      const installPromptExists = await page.$('[class*="PWAInstallPrompt"]') !== null;
      
      this.results.pwa = {
        hasManifest,
        hasServiceWorker,
        isStandalone,
        installPromptExists,
        isInstallable: hasManifest && hasServiceWorker && !isStandalone,
      };
      
      console.log(`  ✓ Manifest: ${hasManifest ? '✅' : '❌'}`);
      console.log(`  ✓ Service Worker: ${hasServiceWorker ? '✅' : '❌'}`);
      console.log(`  ✓ Standalone Mode: ${isStandalone ? '✅' : '➖'}`);
      console.log(`  ✓ Install Prompt: ${installPromptExists ? '✅' : '➖'}`);
      
    } catch (error) {
      console.error('  ❌ Error testing PWA features:', error.message);
      this.results.errors.push({
        test: 'pwa',
        error: error.message
      });
    }
    
    await page.close();
    console.log('✅ PWA feature tests completed\n');
  }

  async testLayoutResponsiveness() {
    console.log('📐 Testing layout responsiveness...');
    
    const page = await this.browser.newPage();
    
    for (const pagePath of PAGES_TO_TEST) {
      const pageResults = [];
      
      for (const viewport of VIEWPORT_SIZES) {
        try {
          await page.setViewport(viewport);
          await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle0' });
          
          // Test key responsive elements
          const layoutTests = await page.evaluate(() => {
            const tests = [];
            
            // Test grid layouts
            const grids = document.querySelectorAll('[class*="grid"]');
            grids.forEach((grid, index) => {
              const styles = window.getComputedStyle(grid);
              tests.push({
                type: 'grid',
                index,
                className: grid.className,
                gridTemplateColumns: styles.gridTemplateColumns,
                display: styles.display,
              });
            });
            
            // Test flex layouts
            const flexes = document.querySelectorAll('[class*="flex"]');
            flexes.forEach((flex, index) => {
              const styles = window.getComputedStyle(flex);
              tests.push({
                type: 'flex',
                index,
                className: flex.className,
                flexDirection: styles.flexDirection,
                flexWrap: styles.flexWrap,
                display: styles.display,
              });
            });
            
            return tests;
          });
          
          pageResults.push({
            viewport: viewport.name,
            category: viewport.category,
            layoutTests,
          });
          
        } catch (error) {
          console.error(`  ❌ Error testing layout on ${pagePath} at ${viewport.name}:`, error.message);
          this.results.errors.push({
            test: 'layout',
            page: pagePath,
            viewport: viewport.name,
            error: error.message
          });
        }
      }
      
      this.results.layouts.push({
        page: pagePath,
        results: pageResults,
      });
      
      console.log(`  ✓ ${pagePath} tested across ${VIEWPORT_SIZES.length} viewports`);
    }
    
    await page.close();
    console.log('✅ Layout responsiveness tests completed\n');
  }

  generateReport() {
    console.log('📊 Generating test report...\n');
    
    // Navigation Report
    console.log('=== NAVIGATION RESPONSIVENESS ===');
    const navIssues = this.results.navigation.filter(result => {
      if (result.category === 'mobile') {
        return !result.mobileMenuButtonVisible || !result.mobileMenuWorks;
      } else {
        return !result.desktopNavVisible || result.mobileMenuButtonVisible;
      }
    });
    
    if (navIssues.length === 0) {
      console.log('✅ All navigation tests passed');
    } else {
      console.log(`❌ ${navIssues.length} navigation issues found:`);
      navIssues.forEach(issue => {
        console.log(`  - ${issue.viewport}: Navigation not working correctly for ${issue.category}`);
      });
    }
    console.log('');
    
    // Touch Targets Report
    console.log('=== TOUCH TARGETS ===');
    const totalInvalidTargets = this.results.touchTargets.reduce((sum, page) => sum + page.invalidTargets.length, 0);
    const totalTargets = this.results.touchTargets.reduce((sum, page) => sum + page.totalTargets, 0);
    
    if (totalInvalidTargets === 0) {
      console.log(`✅ All ${totalTargets} touch targets meet 44px minimum requirement`);
    } else {
      console.log(`❌ ${totalInvalidTargets} of ${totalTargets} touch targets are too small:`);
      this.results.touchTargets.forEach(page => {
        if (page.invalidTargets.length > 0) {
          console.log(`  ${page.page}:`);
          page.invalidTargets.forEach(target => {
            console.log(`    - ${target.tagName}.${target.className}: ${target.width}x${target.height}px`);
          });
        }
      });
    }
    console.log('');
    
    // PWA Report
    console.log('=== PWA FEATURES ===');
    const pwa = this.results.pwa;
    console.log(`Manifest: ${pwa.hasManifest ? '✅' : '❌'}`);
    console.log(`Service Worker: ${pwa.hasServiceWorker ? '✅' : '❌'}`);
    console.log(`Installable: ${pwa.isInstallable ? '✅' : '➖'}`);
    console.log(`Standalone Mode: ${pwa.isStandalone ? '✅' : '➖'}`);
    console.log('');
    
    // Errors Report
    if (this.results.errors.length > 0) {
      console.log('=== ERRORS ===');
      this.results.errors.forEach(error => {
        console.log(`❌ ${error.test}: ${error.error}`);
      });
      console.log('');
    }
    
    // Summary
    console.log('=== SUMMARY ===');
    const totalIssues = navIssues.length + totalInvalidTargets + this.results.errors.length;
    if (totalIssues === 0) {
      console.log('🎉 All responsive design tests passed!');
    } else {
      console.log(`⚠️  Found ${totalIssues} issues that need attention`);
    }
  }

  async run() {
    try {
      await this.init();
      
      await this.testNavigationResponsiveness();
      await this.testTouchTargets();
      await this.testPWAFeatures();
      await this.testLayoutResponsiveness();
      
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test runner error:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const runner = new ResponsiveTestRunner();
  runner.run().catch(console.error);
}

module.exports = ResponsiveTestRunner;
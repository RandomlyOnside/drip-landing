/**
 * Utility functions for testing responsive design behavior
 */

export interface ViewportSize {
  width: number;
  height: number;
  name: string;
  category: 'mobile' | 'tablet' | 'desktop';
}

export const VIEWPORT_SIZES: ViewportSize[] = [
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
  { width: 2560, height: 1440, name: 'Desktop XL', category: 'desktop' },
];

export const TOUCH_TARGET_MIN_SIZE = 44; // 44px minimum for touch targets

/**
 * Check if an element meets minimum touch target size requirements
 */
export function checkTouchTargetSize(element: HTMLElement): {
  isValid: boolean;
  width: number;
  height: number;
  minSize: number;
} {
  const rect = element.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const isValid = width >= TOUCH_TARGET_MIN_SIZE && height >= TOUCH_TARGET_MIN_SIZE;
  
  return {
    isValid,
    width,
    height,
    minSize: TOUCH_TARGET_MIN_SIZE
  };
}

/**
 * Get all interactive elements that should meet touch target requirements
 */
export function getInteractiveElements(): HTMLElement[] {
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
  
  return Array.from(document.querySelectorAll(selectors.join(', '))) as HTMLElement[];
}

/**
 * Test navigation behavior at different viewport sizes
 */
export function testNavigationResponsiveness(): {
  viewport: ViewportSize;
  mobileMenuVisible: boolean;
  desktopMenuVisible: boolean;
  hamburgerButtonVisible: boolean;
}[] {
  const results: {
    viewport: ViewportSize;
    mobileMenuVisible: boolean;
    desktopMenuVisible: boolean;
    hamburgerButtonVisible: boolean;
  }[] = [];

  VIEWPORT_SIZES.forEach(viewport => {
    // Simulate viewport change
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: viewport.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: viewport.height,
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    // Check navigation elements visibility
    const mobileMenuButton = document.querySelector('[aria-label="Open menu"]') as HTMLElement;
    const desktopNav = document.querySelector('nav.hidden.md\\:flex') as HTMLElement;
    
    const hamburgerButtonVisible = mobileMenuButton ? 
      window.getComputedStyle(mobileMenuButton).display !== 'none' : false;
    
    const desktopMenuVisible = desktopNav ? 
      window.getComputedStyle(desktopNav).display !== 'none' : false;

    // Mobile menu visibility would need to be checked when opened
    const mobileMenuVisible = false; // This would be checked during interaction tests

    results.push({
      viewport,
      mobileMenuVisible,
      desktopMenuVisible,
      hamburgerButtonVisible,
    });
  });

  return results;
}

/**
 * Check if PWA is installable and in standalone mode
 */
export function checkPWAStatus(): {
  isInstallable: boolean;
  isStandalone: boolean;
  hasManifest: boolean;
  hasServiceWorker: boolean;
} {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;
  
  const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
  
  const hasServiceWorker = 'serviceWorker' in navigator;
  
  // Check if beforeinstallprompt event would be available
  const isInstallable = !isStandalone && hasManifest && hasServiceWorker;

  return {
    isInstallable,
    isStandalone,
    hasManifest,
    hasServiceWorker,
  };
}

/**
 * Test responsive layout behavior for specific components
 */
export function testComponentResponsiveness(componentSelector: string): {
  viewport: ViewportSize;
  elementExists: boolean;
  isVisible: boolean;
  computedStyles: {
    display: string;
    flexDirection: string;
    gridTemplateColumns: string;
    width: string;
    height: string;
  };
}[] {
  const results: {
    viewport: ViewportSize;
    elementExists: boolean;
    isVisible: boolean;
    computedStyles: {
      display: string;
      flexDirection: string;
      gridTemplateColumns: string;
      width: string;
      height: string;
    };
  }[] = [];

  VIEWPORT_SIZES.forEach(viewport => {
    // Simulate viewport change
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: viewport.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: viewport.height,
    });

    window.dispatchEvent(new Event('resize'));

    const element = document.querySelector(componentSelector) as HTMLElement;
    const elementExists = element !== null;
    
    if (elementExists) {
      const styles = window.getComputedStyle(element);
      const isVisible = styles.display !== 'none' && styles.visibility !== 'hidden';
      
      results.push({
        viewport,
        elementExists,
        isVisible,
        computedStyles: {
          display: styles.display,
          flexDirection: styles.flexDirection,
          gridTemplateColumns: styles.gridTemplateColumns,
          width: styles.width,
          height: styles.height,
        },
      });
    } else {
      results.push({
        viewport,
        elementExists: false,
        isVisible: false,
        computedStyles: {
          display: '',
          flexDirection: '',
          gridTemplateColumns: '',
          width: '',
          height: '',
        },
      });
    }
  });

  return results;
}

/**
 * Generate a comprehensive responsive design test report
 */
export function generateResponsiveTestReport(): {
  touchTargets: { element: string; isValid: boolean; size: { width: number; height: number } }[];
  navigation: ReturnType<typeof testNavigationResponsiveness>;
  pwaStatus: ReturnType<typeof checkPWAStatus>;
  components: { [key: string]: ReturnType<typeof testComponentResponsiveness> };
} {
  // Test touch targets
  const interactiveElements = getInteractiveElements();
  const touchTargets = interactiveElements.map(element => {
    const result = checkTouchTargetSize(element);
    return {
      element: element.tagName + (element.className ? `.${element.className.split(' ')[0]}` : ''),
      isValid: result.isValid,
      size: { width: result.width, height: result.height },
    };
  });

  // Test navigation responsiveness
  const navigation = testNavigationResponsiveness();

  // Check PWA status
  const pwaStatus = checkPWAStatus();

  // Test key components
  const components = {
    'stats-grid': testComponentResponsiveness('.grid.grid-cols-2.lg\\:grid-cols-4'),
    'main-content': testComponentResponsiveness('.grid.lg\\:grid-cols-3'),
    'order-filters': testComponentResponsiveness('.flex.flex-wrap.gap-2'),
    'profile-form': testComponentResponsiveness('.grid.sm\\:grid-cols-2'),
  };

  return {
    touchTargets,
    navigation,
    pwaStatus,
    components,
  };
}
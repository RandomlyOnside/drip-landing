// Navigation test utilities for verifying routing integration

export const navigationItems = [
  { name: 'Home', href: '/portal/consumer-demo/home', icon: '🏠' },
  { name: 'Orders', href: '/portal/consumer-demo/order', icon: '📦' },
  { name: 'Profile', href: '/portal/consumer-demo/profile', icon: '👤' },
];

// Test navigation items (for development/testing only)
export const testNavigationItems = [
  ...navigationItems,
  { name: 'Nav Test', href: '/portal/consumer-demo/navigation-test', icon: '🧪' },
];

export function isValidRoute(pathname: string): boolean {
  const validRoutes = [
    '/portal/consumer-demo',
    '/portal/consumer-demo/home',
    '/portal/consumer-demo/order', 
    '/portal/consumer-demo/profile'
  ];
  
  return validRoutes.includes(pathname);
}

export function getActiveRoute(pathname: string): string | null {
  const route = navigationItems.find(item => item.href === pathname);
  return route ? route.name : null;
}

export function testDeepLinking(): boolean {
  // Test if browser supports history API for deep linking
  return !!(window.history && window.history.pushState);
}

export function testPWAStandaloneMode(): boolean {
  // Test if running in PWA standalone mode
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
}
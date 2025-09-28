#!/usr/bin/env node

/**
 * Navigation Verification Script
 * Tests the consumer portal navigation functionality
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Verifying Consumer Portal Navigation Implementation...\n');

// Check if required files exist
const requiredFiles = [
  'src/components/consumer/Navigation.tsx',
  'src/components/consumer/MobileMenu.tsx',
  'src/components/consumer/Layout.tsx',
  'src/components/consumer/PageTransition.tsx',
  'src/lib/navigationTest.ts',
  'src/app/portal/consumer-demo/page.tsx',
  'src/app/portal/consumer-demo/home/page.tsx',
  'src/app/portal/consumer-demo/order/page.tsx',
  'src/app/portal/consumer-demo/profile/page.tsx'
];

let allFilesExist = true;

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

// Check Navigation.tsx for active state implementation
console.log('\n🔍 Checking Navigation component:');
const navigationContent = fs.readFileSync('src/components/consumer/Navigation.tsx', 'utf8');

const checks = [
  { name: 'usePathname import', pattern: /import.*usePathname.*from.*next\/navigation/ },
  { name: 'Active state detection', pattern: /isActiveRoute/ },
  { name: 'Transition classes', pattern: /transition-all.*duration/ },
  { name: 'Navigation items import', pattern: /import.*navigationItems.*from.*navigationTest/ }
];

checks.forEach(check => {
  const found = check.pattern.test(navigationContent);
  console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
});

// Check MobileMenu.tsx for active state implementation
console.log('\n📱 Checking MobileMenu component:');
const mobileMenuContent = fs.readFileSync('src/components/consumer/MobileMenu.tsx', 'utf8');

const mobileChecks = [
  { name: 'Active state function', pattern: /isActiveRoute.*function/ },
  { name: 'Transition classes', pattern: /transition-all.*duration/ },
  { name: 'Scale effects', pattern: /scale-105/ }
];

mobileChecks.forEach(check => {
  const found = check.pattern.test(mobileMenuContent);
  console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
});

// Check PageTransition component
console.log('\n🔄 Checking PageTransition component:');
const pageTransitionContent = fs.readFileSync('src/components/consumer/PageTransition.tsx', 'utf8');

const transitionChecks = [
  { name: 'usePathname hook', pattern: /usePathname/ },
  { name: 'Opacity transition', pattern: /opacity-100.*opacity-0/ },
  { name: 'Transform transition', pattern: /translate-y/ }
];

transitionChecks.forEach(check => {
  const found = check.pattern.test(pageTransitionContent);
  console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
});

// Check main consumer page for redirect
console.log('\n🏠 Checking main consumer page redirect:');
const consumerPageContent = fs.readFileSync('src/app/portal/consumer-demo/page.tsx', 'utf8');

const redirectChecks = [
  { name: 'useRouter import', pattern: /useRouter.*from.*next\/navigation/ },
  { name: 'useEffect hook', pattern: /useEffect/ },
  { name: 'Router replace', pattern: /router\.replace.*home/ }
];

redirectChecks.forEach(check => {
  const found = check.pattern.test(consumerPageContent);
  console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
});

console.log('\n✨ Navigation verification complete!');
console.log('\n📋 Manual testing checklist:');
console.log('  1. Visit /portal/consumer-demo - should redirect to /home');
console.log('  2. Navigate between Home, Orders, Profile - active states should highlight');
console.log('  3. Test mobile menu - should show active states and smooth transitions');
console.log('  4. Test browser back/forward buttons - should work correctly');
console.log('  5. Test direct URL access to each page - deep linking should work');
console.log('  6. Test in PWA standalone mode - navigation should work correctly');
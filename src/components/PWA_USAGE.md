# PWA Detection Usage Guide

## Overview
These components and hooks help you detect whether users are using your PWA app or the web browser, allowing you to provide different experiences for each context.

## Components

### `usePWA()` Hook
Returns comprehensive PWA information:

```tsx
import { usePWA } from '@/hooks/usePWA';

function MyComponent() {
  const { isStandalone, isInstalled, displayMode, platform } = usePWA();
  
  return (
    <div>
      <p>Running in: {isStandalone ? 'PWA App' : 'Web Browser'}</p>
      <p>Platform: {platform}</p>
      <p>Display Mode: {displayMode}</p>
    </div>
  );
}
```

### `usePWAConditional()` Hook
Simplified hook for conditional rendering:

```tsx
import { usePWAConditional } from '@/components/PWADetector';

function MyComponent() {
  const { isPWA, isBrowser, renderIfPWA, renderIfBrowser } = usePWAConditional();
  
  return (
    <div>
      {renderIfPWA(<p>You're using the LocalDrip app! 📱</p>)}
      {renderIfBrowser(<p>You're using the web version 🌐</p>)}
    </div>
  );
}
```

### `PWADetector` Component
Show different content based on context:

```tsx
import { PWADetector } from '@/components/PWADetector';

function MyComponent() {
  return (
    <PWADetector
      showInPWA={<div>App-specific content</div>}
      showInBrowser={<div>Browser-specific content</div>}
      showInstallPrompt={true} // Shows install prompt in browser
    />
  );
}
```

### `PWAInstallButton` Component
Smart install button that handles different platforms:

```tsx
import { PWAInstallButton } from '@/components/PWAInstallButton';

function MyComponent() {
  return (
    <PWAInstallButton variant="default" size="lg">
      Install LocalDrip
    </PWAInstallButton>
  );
}
```

### `PWAInstallPrompt` Component
Non-intrusive install prompt banner:

```tsx
import { PWAInstallPrompt } from '@/components/PWAInstallButton';

function MyComponent() {
  return (
    <div>
      <PWAInstallPrompt />
      {/* Rest of your content */}
    </div>
  );
}
```

## Common Use Cases

### 1. Different Navigation for PWA vs Browser
```tsx
function Header() {
  const { isPWA } = usePWAConditional();
  
  return (
    <header>
      {isPWA ? (
        // PWA: No browser back button, show app navigation
        <AppNavigation />
      ) : (
        // Browser: Can rely on browser back button
        <WebNavigation />
      )}
    </header>
  );
}
```

### 2. Show Install Prompt Only in Browser
```tsx
function HomePage() {
  return (
    <div>
      <PWAInstallPrompt />
      {/* Your page content */}
    </div>
  );
}
```

### 3. Different Styling for PWA
```tsx
function MyComponent() {
  const { isStandalone } = usePWA();
  
  return (
    <div className={`
      ${isStandalone ? 'pt-safe-area-inset-top' : 'pt-4'}
      ${isStandalone ? 'pb-safe-area-inset-bottom' : 'pb-4'}
    `}>
      Content with safe area handling for PWA
    </div>
  );
}
```

### 4. Platform-Specific Features
```tsx
function ShareButton() {
  const { platform } = usePWA();
  
  const handleShare = () => {
    if (platform === 'ios' && navigator.share) {
      navigator.share({ title: 'LocalDrip', url: window.location.href });
    } else {
      // Fallback sharing
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  return <button onClick={handleShare}>Share</button>;
}
```

## Detection Methods

The PWA detection uses multiple methods:

1. **`window.matchMedia('(display-mode: standalone)')`** - Standard PWA detection
2. **`navigator.standalone`** - iOS Safari specific
3. **`document.referrer.includes('android-app://')`** - Android app detection
4. **User agent analysis** - Platform detection

## Browser Support

- ✅ Chrome/Edge (full support)
- ✅ Firefox (partial support)
- ✅ Safari iOS (with fallbacks)
- ✅ Safari macOS (basic support)
- ✅ Samsung Internet (full support)

## Tips

1. **Always provide fallbacks** for browsers that don't support PWA features
2. **Test on actual devices** - PWA behavior can differ between desktop and mobile
3. **Use the install prompt sparingly** - don't show it on every page visit
4. **Consider user preferences** - some users prefer the browser experience
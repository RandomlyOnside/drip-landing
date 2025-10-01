import type { Metadata, Viewport } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ToastProvider } from '@/lib/toast'

export const metadata: Metadata = {
  title: 'Local Drip - Neighborhood coffee, fair & easy',
  description: 'Coming soon to Denver: One simple app to discover, order, and support independent coffee shops. Get early access to Local Drip.',
  keywords: 'local coffee, neighborhood cafés, coffee community, fair trade coffee',
  authors: [{ name: 'Local Drip' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LocalDrip',
  },
  icons: {
    icon: [
      { url: '/images/ld-color-drip.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/images/ld-color-drip.svg',
    shortcut: '/images/ld-color-drip.svg'
  },
  openGraph: {
    title: 'Local Drip - Neighborhood coffee, fair & easy',
    description: 'Connecting local coffee enthusiasts with neighborhood cafés.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d35400',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LocalDrip" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="LocalDrip" />
        <meta name="msapplication-TileColor" content="#d35400" />
        <meta name="msapplication-TileImage" content="/images/icon-192.png" />
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
        <link rel="icon" href="/images/icon-192.png" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/images/icon-192.png" />
      </head>
      <body className="font-sans bg-secondary text-primary antialiased min-h-screen">
        {gaId && <GoogleAnalytics gaId={gaId} adsId={adsId} />}
        <ToastProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ToastProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced service worker registration with Android compatibility
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/portal/consumer-demo/'
                  })
                    .then(function(registration) {
                      console.log('SW registered successfully:', registration.scope);
                      
                      // Handle updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              console.log('New service worker available');
                            }
                          });
                        }
                      });
                      
                      // Update service worker if available
                      if (registration.waiting) {
                        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                      }
                    })
                    .catch(function(registrationError) {
                      console.error('SW registration failed:', registrationError);
                    });
                });
              }
              
              // Enhanced PWA install prompt handling for Android
              let deferredPrompt;
              let installPromptShown = false;
              
              window.addEventListener('beforeinstallprompt', (e) => {
                console.log('PWA install prompt available on Android');
                e.preventDefault();
                deferredPrompt = e;
                window.deferredPrompt = e;
                
                // Show custom install UI or trigger immediately for testing
                console.log('Install prompt ready - can be triggered manually');
              });
              
              // Handle app installed event
              window.addEventListener('appinstalled', (e) => {
                console.log('PWA was installed successfully');
                deferredPrompt = null;
                window.deferredPrompt = null;
              });
              
              // Add global function to trigger install (for debugging)
              window.triggerInstall = function() {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then((choiceResult) => {
                    console.log('User choice:', choiceResult.outcome);
                    deferredPrompt = null;
                  });
                } else {
                  console.log('No install prompt available');
                }
              };
            `,
          }}
        />
      </body>
    </html>
  )
}
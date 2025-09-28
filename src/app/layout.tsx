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
    title: 'Consumer Portal',
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
  themeColor: '#000000',
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
        <meta name="apple-mobile-web-app-title" content="Consumer Portal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
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
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
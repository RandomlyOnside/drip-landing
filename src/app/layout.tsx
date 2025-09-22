import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Local Drip - Neighborhood coffee, fair & easy',
  description: 'Coming soon to Denver: One simple app to discover, order, and support independent coffee shops. Get early access to Local Drip.',
  keywords: 'local coffee, neighborhood cafés, coffee community, fair trade coffee',
  authors: [{ name: 'Local Drip' }],
  robots: 'index, follow',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-secondary text-primary antialiased min-h-screen">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
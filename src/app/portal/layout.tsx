import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LocalDrip Portal',
  description: 'Manage your LocalDrip experience',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal-specific header/navigation can go here */}
      <main>{children}</main>
    </div>
  )
}
"use client"

import * as React from "react"
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SignupModal } from '@/components/SignupModal';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalRole, setModalRole] = React.useState<'local' | 'cafe'>('local')

  const openModal = (role: 'local' | 'cafe') => {
    setModalRole(role)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main role="main" id="main-content">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen bg-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="text-center max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">
            {/* Hero Logo */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <Logo
                variant="hero"
                size="large"
                priority={true}
                className="mx-auto"
              />
            </div>
            <h1
              id="hero-heading"
              className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Denver cafés. Zero lines. All local.
            </h1>
            <p className="text-primary/80 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              One simple app to discover, order, and support Denver’s independent coffee shops.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button
                onClick={() => openModal('local')}
                className="bg-accent1 hover:bg-accent1/90 focus:bg-accent1/90 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 focus:ring-offset-secondary"
                aria-describedby="local-signup-description"
              >
                Start Supporting Local
              </Button>
              <Button
                onClick={() => openModal('cafe')}
                className="bg-accent2 hover:bg-accent2/90 focus:bg-accent2/90 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent2 focus:ring-offset-2 focus:ring-offset-secondary"
                aria-describedby="cafe-signup-description"
              >
                Partner With Local Drip
              </Button>
            </div>
            <div className="sr-only">
              <p id="local-signup-description">Start supporting local coffee shops and discover neighborhood cafés</p>
              <p id="cafe-signup-description">Partner with Local Drip as a café owner to connect with local coffee lovers</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section
          id="story"
          className="bg-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
          aria-labelledby="story-heading"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2
              id="story-heading"
              className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Every Cup Stays Local.
            </h2>
            <div className="text-primary/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 space-y-4 sm:space-y-6">
              <p className="leading-relaxed">
                Local cafés are the heartbeat of our neighborhoods. But while big chains pour resources into apps and reward programs that lock customers into their ecosystem, independents are left struggling to keep up.
              </p>
              <p className="leading-relaxed">
                We started LocalDrip because we believe great coffee should strengthen local culture — and keep local dollars local. With one simple app, we make it just as easy to order from your neighborhood café as it is from the biggest chains — and every purchase helps your community thrive.
              </p>
            </div>
            {/* Support Local Image */}
            <div className="relative max-w-2xl mx-auto">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
                <Image
                  src="/images/supportlocal.png"
                  alt="Support local cafés and community"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Locals Section */}
        <section
          id="locals"
          className="bg-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 scroll-mt-20"
          aria-labelledby="locals-heading"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2
              id="locals-heading"
              className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              For Locals
            </h2>
            <p className="text-primary/85 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Every cup fuels your neighborhood. Order from nearby cafés, support baristas you know, and keep Denver thriving.
            </p>
            <Button
              onClick={() => openModal('local')}
              className="bg-accent1 hover:bg-accent1/90 focus:bg-accent1/90 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] max-w-sm sm:max-w-none mx-auto transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 focus:ring-offset-secondary"
            >
              Get Early Access
            </Button>
          </div>
        </section>

        {/* Cafés Section */}
        <section
          id="cafes"
          className="bg-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 scroll-mt-20"
          aria-labelledby="cafes-heading"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2
              id="cafes-heading"
              className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              For Cafés
            </h2>
            <p className="text-primary/85 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Reach more customers, boost repeat orders, and keep your café running smoothly — all without the hefty delivery app fees.
            </p>
            <Button
              onClick={() => openModal('cafe')}
              className="bg-accent2 hover:bg-accent2/90 focus:bg-accent2/90 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] max-w-sm sm:max-w-none mx-auto transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent2 focus:ring-offset-2 focus:ring-offset-secondary"
            >
              Partner with Us
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        role={modalRole}
      />
    </>
  )
}
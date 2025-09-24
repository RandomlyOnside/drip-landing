"use client"

import * as React from "react"
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/Logo';
import { trackButtonClick, trackPageView, trackSignupAttempt, trackSignupSuccess, trackEmailInputFocus } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { submitWaitlistSignup } from '@/lib/signupService';

export default function Home() {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isDejaBrew, setIsDejaBrew] = React.useState(false)
  const [error, setError] = React.useState('')

  // Track scroll depth
  useScrollTracking();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView('Home');
  }, []);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setError('')
    trackSignupAttempt('waitlist')
    trackButtonClick('waitlist_signup_button', 'hero')

    try {
      const result = await submitWaitlistSignup(email)

      if (result.success) {
        trackSignupSuccess('waitlist')
        setIsSubmitted(true)
        setEmail('')
        console.log('Waitlist signup successful:', result.id)
      } else {
        // Handle "Déjà brew" message specially
        if (result.error === 'Déjà brew — that email\'s already signed up! YAY!') {
          setIsDejaBrew(true)
          setEmail('')
        } else {
          setError(result.error || 'Something went wrong. Please try again.')
        }
        console.error('Signup failed:', result.error)
      }
    } catch (error: any) {
      console.error('Signup error:', error)

      // Enhanced error handling (matching existing pattern)
      let errorMessage = error.message || 'Something went wrong. Please try again.';

      if (error.message === 'Email already registered') {
        setIsDejaBrew(true)
        setEmail('')
        return // Don't set error, just show déjà brew state
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Access denied. Please try again later.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again.';
      } else if (error.message && error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message && (error.message.includes('Firebase') || error.message.includes('Firestore'))) {
        errorMessage = 'Service error. Please try again later.';
      }

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
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
              Denver&apos;s Best Cafés. <br /> One App.
            </h1>
            <p className="text-primary/80 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover, order, and support Denver&apos;s best cafés — all in one place.
            </p>
            {/* Waitlist Signup Form */}
            <div className="max-w-md mx-auto">
              <p className="text-primary/60 text-sm text-center mb-4">
                Be the first to know when we launch in Denver
              </p>
              <form onSubmit={handleWaitlistSignup} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                      if (isSubmitted) setIsSubmitted(false)
                      if (isDejaBrew) setIsDejaBrew(false)
                    }}
                    onFocus={() => trackEmailInputFocus('hero')}
                    required
                    className="flex-1 px-4 py-3 text-base border-2 border-primary/20 rounded-lg focus:border-accent1 focus:outline-none focus:ring-2 focus:ring-accent1/20 bg-white/90"
                    aria-label="Email address for waitlist signup"
                  />
                  <Button
                    type="submit"
                    disabled={!email || isSubmitting}
                    className="bg-accent1 hover:bg-accent1/90 focus:bg-accent1/90 disabled:bg-accent1/50 text-white font-semibold px-6 py-3 text-base sm:text-lg whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                  </Button>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="text-center p-6 bg-accent2/10 rounded-lg border border-accent2/20">
                    <div className="text-accent2 text-2xl mb-2">✓</div>
                    <h3 className="text-primary font-semibold text-lg mb-2">You&apos;re on the list!</h3>
                    <p className="text-primary/80">We&apos;ll notify you when LocalDrip launches in Denver.</p>
                  </div>
                )}

                {/* Déjà Brew Message */}
                {isDejaBrew && (
                  <div className="text-center p-6 bg-accent2/10 rounded-lg border border-accent2/20">
                    <div className="text-accent2 text-2xl mb-2">☕</div>
                    <h3 className="text-primary font-semibold text-lg mb-2">Déjà brew — that email&apos;s already signed up! YAY!</h3>
                    <p className="text-primary/80">You&apos;re all set for when LocalDrip launches in Denver.</p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="text-center p-6 rounded-lg border text-red-600 bg-red-50 border-red-200">
                    <div className="font-semibold text-lg">
                      {error}
                    </div>
                  </div>
                )}

              </form>
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
              Why can&apos;t supporting local be simple?
            </h2>
            <div className="text-primary/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 space-y-4 sm:space-y-6">
              <p className="leading-relaxed">
                For years, I asked myself: why can&apos;t I easily get a custom cup of coffee from a local café, without defaulting back to the chains? Every time life got busy, I fell into the same trap — the convenience of the big apps.
              </p>
              <p className="leading-relaxed">
                Big chains pour money into apps and reward programs that lock customers into their ecosystems. Independents? They get left behind. And the impact is huge: <span className="font-semibold text-accent1 bg-accent1/10 px-2 py-1 rounded">every $1 spent locally creates about $1.40 for your community, while that same dollar at a chain drains about $0.60 away</span>.
              </p>
              <p className="leading-relaxed">
                So why isn&apos;t it easier? Why can&apos;t I order ahead from local shops — all of them, in one place? Some days I want the pumpkin bread from the café down the block, other days it&apos;s the cinnamon roll from a spot across the neighborhood. Supporting local shouldn&apos;t mean sacrificing convenience.
              </p>
              <p className="leading-relaxed">
                That&apos;s why I built LocalDrip. One app for all your local cafés. Your custom drinks, your favorite spots — without the lock-in, without the price gouging. Just a fair, sustainable way to keep your daily coffee dollars where they belong: in your community.
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

      </main>

      {/* Footer */}
      <SiteFooter />

    </>
  )
}
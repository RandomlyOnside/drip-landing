'use client';

import { useRouter } from 'next/navigation';
import { MockDataService } from '@/lib/mockDataService';
import { MockData } from '@/lib/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastTester } from '@/components/ui/toast-tester';

export default function SignInPage() {
  const router = useRouter();
  const [mockData, setMockData] = useState<MockData | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load mock data when component mounts
    setMockData(MockDataService.getMockData());
    
    // Set up interval to update mock data every 5 seconds
    const interval = setInterval(() => {
      setMockData(MockDataService.getMockData());
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleConsumerDemo = () => {
    router.push('/portal/consumer-demo');
  };

  const handleCafeDemo = () => {
    router.push('/portal/cafe-demo');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally handle real authentication
    console.log('Sign in attempted with:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // This would normally handle Google OAuth
    console.log('Google sign in attempted');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Top Menu Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleConsumerDemo}
                className="px-4 py-2 text-accent2 hover:text-accent2/70 font-medium transition-colors duration-200"
              >
                Consumer
              </button>
              <button
                onClick={handleCafeDemo}
                className="px-4 py-2 text-accent2 hover:text-accent2/70 font-medium transition-colors duration-200"
              >
                Cafe
              </button>
              <a
                href="https://instagram.com/localdrip"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-accent2 hover:text-accent2/70 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Branding */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/ld-color.svg"
                alt="LocalDrip Logo"
                width={120}
                height={120}
                className="h-20 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-primary">
              Welcome to LocalDrip Portal
            </h2>
            <p className="mt-2 text-sm text-primary/70">
              Sign in to your account
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 mb-6"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent1 focus:border-accent1"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent1 focus:border-accent1"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent1 transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Toast Testing Component */}
          <ToastTester />
        </div>
      </div>

      {/* Mock Data Footer */}
      {mockData && (
        <footer className="bg-primary text-white py-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-2">
              <h4 className="text-sm font-medium opacity-80">Development Data</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="text-center">
                <span className="block opacity-70">Message</span>
                <span className="font-medium">{mockData.message}</span>
              </div>
              <div className="text-center">
                <span className="block opacity-70">Time</span>
                <span className="font-medium">{mockData.currentTime}</span>
              </div>
              <div className="text-center">
                <span className="block opacity-70">Users</span>
                <span className="font-medium">{mockData.userCount}</span>
              </div>
              <div className="text-center">
                <span className="block opacity-70">Cafes</span>
                <span className="font-medium">{mockData.cafeCount}</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/consumer/Layout';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HomeError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Home page error:', error);
  }, [error]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Home page unavailable
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re having trouble loading your home page. Please try refreshing or check back later.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={reset} className="w-full">
              Try again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/portal/consumer-demo'}
              className="w-full"
            >
              Back to Portal
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
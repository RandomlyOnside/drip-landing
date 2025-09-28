'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/consumer/Layout';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ConsumerError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Consumer portal error:', error);
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We encountered an error while loading the consumer portal. Please try again.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={reset} className="w-full">
              Try again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/portal/signin'}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
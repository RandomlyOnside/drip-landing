'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/consumer/Layout';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Profile page error:', error);
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Profile unavailable
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re having trouble loading your profile. Please try refreshing or check back later.
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
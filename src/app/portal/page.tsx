'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortalPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page
    router.push('/portal/signin');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">LocalDrip</h1>
        <p className="text-gray-600">Redirecting to portal...</p>
      </div>
    </div>
  );
}
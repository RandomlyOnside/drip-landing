'use client';

import { useRouter } from 'next/navigation';

export default function CafeDemoPage() {
  const router = useRouter();

  const handleBackToSignIn = () => {
    router.push('/portal/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* LocalDrip Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">LocalDrip</h1>
          <p className="text-lg text-gray-600">Cafe Demo</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Cafe Demo
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            This is a placeholder for the cafe demo experience.
          </p>
        </div>

        {/* Back Navigation */}
        <div className="text-center">
          <button
            onClick={handleBackToSignIn}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
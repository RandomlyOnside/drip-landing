'use client';

import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Local Drip Analytics</h1>
          <p className="mt-2 text-gray-600">Monitor your site performance and user signups</p>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
'use client';

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LocalDrip Portal</h1>
          <p className="mt-2 text-gray-600">Welcome to your LocalDrip dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">Overview of your activity</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Orders</h2>
            <p className="text-gray-600">Manage your coffee orders</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile</h2>
            <p className="text-gray-600">Update your preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Layout } from '@/components/consumer/Layout';

export default function ConsumerDemoPage() {

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Welcome to Consumer Portal
          </h1>
          <p className="text-lg text-primary/80">
            Your gateway to managing orders and account information
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-primary/20 rounded-lg p-6 text-center hover:shadow-md hover:border-accent2/40 transition-all">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Home</h3>
            <p className="text-primary/70 text-sm">
              Access your dashboard and overview
            </p>
          </div>

          <div className="bg-white border border-primary/20 rounded-lg p-6 text-center hover:shadow-md hover:border-accent1/40 transition-all">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Orders</h3>
            <p className="text-primary/70 text-sm">
              View and manage your orders
            </p>
          </div>

          <div className="bg-white border border-primary/20 rounded-lg p-6 text-center hover:shadow-md hover:border-accent2/40 transition-all">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Profile</h3>
            <p className="text-primary/70 text-sm">
              Update your account settings
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Getting Started</h2>
          <p className="text-primary/80 mb-4">
            Use the navigation menu above to explore different sections of the consumer portal.
          </p>
          <div className="text-sm text-primary/70">
            <p>• <strong className="text-primary">Home:</strong> View your dashboard and recent activity</p>
            <p>• <strong className="text-primary">Orders:</strong> Track and manage your orders</p>
            <p>• <strong className="text-primary">Profile:</strong> Update your personal information and preferences</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
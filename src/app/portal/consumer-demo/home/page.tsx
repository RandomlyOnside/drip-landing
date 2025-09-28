'use client';

import { Layout } from '@/components/consumer/Layout';
import { MockDataService } from '@/lib/mockDataService';
import { useToast } from '@/lib/toast';

export default function HomePage() {
  const homeData = MockDataService.getMockHomePageData();
  const { showSuccess, showInfo } = useToast();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            {homeData.welcomeMessage}
          </h1>
          <p className="text-base sm:text-lg text-primary/80">
            Here&apos;s what&apos;s happening with your account today
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              {homeData.stats.totalOrders}
            </div>
            <div className="text-xs sm:text-sm text-primary/70 font-medium">
              Total Orders
            </div>
          </div>

          <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              ${homeData.stats.totalSpent.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-primary/70 font-medium">
              Total Spent
            </div>
          </div>

          <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              {homeData.stats.favoriteItems}
            </div>
            <div className="text-xs sm:text-sm text-primary/70 font-medium">
              Favorite Items
            </div>
          </div>

          <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              {homeData.stats.rewardPoints}
            </div>
            <div className="text-xs sm:text-sm text-primary/70 font-medium">
              Reward Points
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">Recent Activity</h2>
            <div className="space-y-4">
              {homeData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    {activity.type === 'order' ? '📦' : '🎁'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary">
                      {activity.message}
                    </p>
                    <p className="text-xs text-primary/60 mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">Quick Actions</h2>
            <div className="space-y-3">
              {homeData.quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => showInfo(`${action.title} feature coming soon!`)}
                  className="w-full text-left p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <div className="font-medium text-primary text-sm">
                    {action.title}
                  </div>
                  <div className="text-xs text-primary/70 mt-1">
                    {action.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900">Account Status</h3>
              <div className="text-2xl">✅</div>
            </div>
            <p className="text-sm text-blue-700">
              Your account is active and in good standing
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-900">Next Delivery</h3>
              <div className="text-2xl">🚚</div>
            </div>
            <p className="text-sm text-green-700">
              Your next order is scheduled for tomorrow
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-900">Rewards</h3>
              <div className="text-2xl">🏆</div>
            </div>
            <p className="text-sm text-purple-700">
              You&apos;re {250 - homeData.stats.rewardPoints} points away from your next reward
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SignupData {
  email: string;
  role: 'local' | 'cafe';
  createdAt: Timestamp;
}

interface AnalyticsStats {
  totalSignups: number;
  localSignups: number;
  cafeSignups: number;
  todaySignups: number;
  weekSignups: number;
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalSignups: 0,
    localSignups: 0,
    cafeSignups: 0,
    todaySignups: 0,
    weekSignups: 0,
  });
  const [recentSignups, setRecentSignups] = useState<SignupData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const signupsRef = collection(db, 'signups');
      const q = query(signupsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const signups: SignupData[] = [];
      querySnapshot.forEach((doc) => {
        signups.push(doc.data() as SignupData);
      });

      // Calculate stats
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats: AnalyticsStats = {
        totalSignups: signups.length,
        localSignups: signups.filter(s => s.role === 'local').length,
        cafeSignups: signups.filter(s => s.role === 'cafe').length,
        todaySignups: signups.filter(s => s.createdAt.toDate() >= today).length,
        weekSignups: signups.filter(s => s.createdAt.toDate() >= weekAgo).length,
      };

      setStats(stats);
      setRecentSignups(signups.slice(0, 10)); // Last 10 signups
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Signups</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalSignups}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Local Users</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.localSignups}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Café Partners</h3>
          <p className="text-2xl font-bold text-green-600">{stats.cafeSignups}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Today</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.todaySignups}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">This Week</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.weekSignups}</p>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Signups</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSignups.map((signup, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {signup.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      signup.role === 'local' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {signup.role === 'local' ? 'Local User' : 'Café Partner'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {signup.createdAt.toDate().toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">External Analytics</h3>
        <div className="space-y-2">
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Google Analytics Dashboard →
          </a>
          <a
            href="https://ads.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Google Ads Dashboard →
          </a>
          <a
            href="https://console.firebase.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Firebase Analytics →
          </a>
        </div>
      </div>
    </div>
  );
}
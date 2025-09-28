'use client';

import { useState } from 'react';
import { Layout } from '@/components/consumer/Layout';
import { MockDataService } from '@/lib/mockDataService';
import { Order } from '@/lib/types';
import { useToast } from '@/lib/toast';

export default function OrderPage() {
  const [orders] = useState<Order[]>(MockDataService.getMockOrders());
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const { showSuccess, showInfo, showError } = useToast();

  const handleViewDetails = (orderId: string) => {
    showInfo(`Viewing details for order #${orderId}`);
  };

  const handleReorder = (orderId: string) => {
    showSuccess(`Items from order #${orderId} added to cart!`);
  };

  const handleCancelOrder = (orderId: string) => {
    showError(`Order #${orderId} has been cancelled`);
  };

  const handleBrowseMenu = () => {
    showInfo('Menu browsing feature coming soon!');
  };

  // Filter orders based on selected filter
  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  // Status badge styling
  const getStatusBadge = (status: Order['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Your Orders
          </h1>
          <p className="text-base sm:text-lg text-primary/80">
            Track and manage your order history
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {(['all', 'pending', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({orders.filter(o => o.status === status).length})
                  </span>
                )}
                {status === 'all' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({orders.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List/Grid */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-primary/20 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-semibold text-primary">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-primary/70">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={getStatusBadge(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="text-lg font-bold text-primary">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-primary/10 pt-4">
                  <h4 className="text-sm font-medium text-primary/80 mb-3">Order Items</h4>
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-primary text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-primary/60">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 pt-4 border-t border-primary/10">
                  <button 
                    onClick={() => handleViewDetails(order.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  {order.status === 'completed' && (
                    <button 
                      onClick={() => handleReorder(order.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium"
                    >
                      Reorder
                    </button>
                  )}
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-4xl">📦</div>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              No {filter !== 'all' ? filter : ''} orders found
            </h3>
            <p className="text-primary/70 mb-6 max-w-md mx-auto">
              {filter === 'all' 
                ? "You haven't placed any orders yet. Start browsing our menu to place your first order!"
                : `You don't have any ${filter} orders at the moment.`
              }
            </p>
            <button 
              onClick={handleBrowseMenu}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse Menu
            </button>
          </div>
        )}

        {/* Order Summary Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {filteredOrders.length}
              </div>
              <div className="text-xs text-primary/70 font-medium">
                {filter === 'all' ? 'Total Orders' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders`}
              </div>
            </div>
            
            <div className="bg-white border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-xs text-primary/70 font-medium">
                Total Value
              </div>
            </div>

            <div className="bg-white border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {filteredOrders.reduce((sum, order) => sum + order.items.length, 0)}
              </div>
              <div className="text-xs text-primary/70 font-medium">
                Total Items
              </div>
            </div>

            <div className="bg-white border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                ${filteredOrders.length > 0 ? (filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length).toFixed(2) : '0.00'}
              </div>
              <div className="text-xs text-primary/70 font-medium">
                Avg Order
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
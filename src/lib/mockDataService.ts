import { MockData, ConsumerUser, Order, OrderItem } from './types';

/**
 * Service for providing mock data during development and testing
 */
export class MockDataService {
  /**
   * Returns sample mock data for portal development
   * @returns MockData object with sample values
   */
  static getMockData(): MockData {
    return {
      message: "Hello World",
      currentTime: new Date().toLocaleString(),
      userCount: 50,
      cafeCount: 7
    };
  }

  /**
   * Returns mock consumer user profile data
   * @returns ConsumerUser object with sample profile data
   */
  static getMockConsumerUser(): ConsumerUser {
    return {
      id: "user-123",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/images/avatar-placeholder.png"
    };
  }

  /**
   * Returns mock order data for the consumer
   * @returns Array of Order objects with sample order data
   */
  static getMockOrders(): Order[] {
    const mockOrderItems: OrderItem[] = [
      {
        id: "item-1",
        name: "Coffee Blend Premium",
        quantity: 2,
        price: 12.99
      },
      {
        id: "item-2",
        name: "Pastry Selection",
        quantity: 1,
        price: 8.50
      }
    ];

    const mockOrderItems2: OrderItem[] = [
      {
        id: "item-3",
        name: "Espresso Beans",
        quantity: 1,
        price: 15.99
      }
    ];

    return [
      {
        id: "order-001",
        date: "2024-01-15",
        status: "completed",
        total: 34.48,
        items: mockOrderItems
      },
      {
        id: "order-002",
        date: "2024-01-10",
        status: "pending",
        total: 15.99,
        items: mockOrderItems2
      },
      {
        id: "order-003",
        date: "2024-01-05",
        status: "cancelled",
        total: 22.50,
        items: [
          {
            id: "item-4",
            name: "Breakfast Bundle",
            quantity: 1,
            price: 22.50
          }
        ]
      }
    ];
  }

  /**
   * Returns mock home page data for the consumer portal
   * @returns Object with home page statistics and content
   */
  static getMockHomePageData() {
    return {
      welcomeMessage: "Welcome back, John!",
      stats: {
        totalOrders: 15,
        totalSpent: 342.75,
        favoriteItems: 8,
        rewardPoints: 125
      },
      recentActivity: [
        {
          id: "activity-1",
          type: "order",
          message: "Order #001 was delivered",
          date: "2024-01-15"
        },
        {
          id: "activity-2",
          type: "reward",
          message: "You earned 25 reward points",
          date: "2024-01-14"
        }
      ],
      quickActions: [
        {
          id: "action-1",
          title: "Reorder Favorites",
          description: "Quickly reorder your most loved items"
        },
        {
          id: "action-2",
          title: "Browse Menu",
          description: "Explore our latest offerings"
        }
      ]
    };
  }
}
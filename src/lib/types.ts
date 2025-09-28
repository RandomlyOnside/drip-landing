/**
 * Mock data interface for portal development and testing
 */
export interface MockData {
  message: string;
  currentTime: string;
  userCount: number;
  cafeCount: number;
}

/**
 * Consumer user interface for the consumer portal
 */
export interface ConsumerUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * Order item interface for individual items within an order
 */
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

/**
 * Order interface for consumer orders
 */
export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
}
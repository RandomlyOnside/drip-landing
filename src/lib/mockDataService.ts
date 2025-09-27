import { MockData } from './types';

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
}
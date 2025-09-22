/**
 * Local Drip Brand Colors
 * 
 * Centralized color definitions for consistent branding across the application.
 * These colors are also defined in tailwind.config.js for use in Tailwind classes.
 */

export const brandColors = {
  // Primary brand colors
  primary: '#4B2E2E',      // Dark brown - main text and primary elements
  secondary: '#F7F1E3',    // Cream - background and secondary elements
  
  // Accent colors
  accent1: '#D35400',      // Orange - CTAs, highlights, and error states
  accent2: '#7D9A6D',      // Green - success states and secondary CTAs
  
  // Semantic colors (using brand palette)
  success: '#7D9A6D',      // Green for success messages and positive feedback
  error: '#D35400',        // Orange for error messages and warnings
  
  // Usage guidelines:
  // - Use `success` for positive feedback, confirmations, and completed actions
  // - Use `error` for error messages, warnings, and failed actions
  // - Use `accent1` (orange) for primary CTAs and important highlights
  // - Use `accent2` (green) for secondary CTAs and positive actions
} as const

/**
 * Tailwind class mappings for brand colors
 * Use these classes in your components for consistent styling
 */
export const brandColorClasses = {
  // Text colors
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary', 
    success: 'text-success',
    error: 'text-error',
    accent1: 'text-accent1',
    accent2: 'text-accent2',
  },
  
  // Background colors
  bg: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    error: 'bg-error', 
    accent1: 'bg-accent1',
    accent2: 'bg-accent2',
  },
  
  // Border colors
  border: {
    primary: 'border-primary',
    secondary: 'border-secondary',
    success: 'border-success', 
    error: 'border-error',
    accent1: 'border-accent1',
    accent2: 'border-accent2',
  },
  
  // Message styling combinations
  messages: {
    success: 'bg-green-50 text-success border border-green-200',
    error: 'bg-orange-50 text-error border border-orange-200',
  }
} as const

/**
 * Helper function to get message styling classes
 * @param type - The message type ('success' | 'error')
 * @returns Tailwind classes for the message styling
 */
export function getMessageClasses(type: 'success' | 'error'): string {
  return brandColorClasses.messages[type]
}
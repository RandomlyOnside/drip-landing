'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastContainer } from '@/components/ui/toast-container';

// Types
export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  duration?: number; // milliseconds, default 5000
  dismissible?: boolean; // default true
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timestamp: number;
  duration?: number;
  dismissible?: boolean;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

interface UseToastReturn {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Export context for ToastContainer component
export { ToastContext };

// Generate unique ID for toasts
const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

// Context Provider Hook
export const useToastContext = (): ToastContextType => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType, options?: ToastOptions) => {
    // Handle missing message
    const displayMessage = message || 'No message provided';
    
    // Validate toast type, default to 'info' if invalid
    const validTypes: ToastType[] = ['success', 'error', 'info'];
    const toastType = validTypes.includes(type) ? type : 'info';
    
    if (!validTypes.includes(type)) {
      console.warn(`Invalid toast type "${type}". Defaulting to "info".`);
    }

    const newToast: Toast = {
      id: generateToastId(),
      message: displayMessage,
      type: toastType,
      timestamp: Date.now(),
      duration: options?.duration ?? 5000,
      dismissible: options?.dismissible ?? true,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    showToast,
    removeToast,
    toasts,
  };
};

// Context Provider Component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contextValue = useToastContext();

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// useToast Hook
export const useToast = (): UseToastReturn => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider. Please wrap your app with <ToastProvider>.');
  }

  const { showToast, removeToast } = context;

  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    showToast(message, 'success', options);
  }, [showToast]);

  const showError = useCallback((message: string, options?: ToastOptions) => {
    showToast(message, 'error', options);
  }, [showToast]);

  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    showToast(message, 'info', options);
  }, [showToast]);

  return {
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
};
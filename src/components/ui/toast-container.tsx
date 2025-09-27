'use client';

import React, { useContext } from 'react';
import { Toast } from './toast';
import { ToastContext } from '@/lib/toast';

export const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    return null; // Gracefully handle missing provider
  }

  const { toasts, removeToast } = context;

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-2 max-w-sm w-full"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in slide-in-from-bottom-full fade-in duration-300"
        >
          <Toast toast={toast} onDismiss={removeToast} />
        </div>
      ))}
    </div>
  );
};
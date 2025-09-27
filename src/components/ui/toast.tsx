'use client';

import React from 'react';
import { X, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toast as ToastType } from '@/lib/toast';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const toastStyles = {
  success: {
    background: 'bg-white border-l-4 border-l-green-500 shadow-lg',
    border: 'border-gray-200',
    text: 'text-green-600',
    icon: CheckCircle
  },
  error: {
    background: 'bg-white border-l-4 border-l-red-500 shadow-lg', 
    border: 'border-gray-200',
    text: 'text-red-600',
    icon: XCircle
  },
  info: {
    background: 'bg-white border-l-4 border-l-blue-500 shadow-lg',
    border: 'border-gray-200', 
    text: 'text-blue-600',
    icon: Info
  }
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const style = toastStyles[toast.type];
  const IconComponent = style.icon;

  const handleDismiss = () => {
    if (toast.dismissible !== false) {
      onDismiss(toast.id);
    }
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-md border transition-all duration-300 ease-out',
        style.background,
        style.border,
        style.text
      )}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
      
      {/* Message */}
      <div className="flex-1 text-sm font-medium text-gray-800">
        {toast.message}
      </div>
      
      {/* Dismiss Button */}
      {toast.dismissible !== false && (
        <button
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 rounded-sm transition-colors',
            'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
            `focus:ring-${toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : 'accent2'}`
          )}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
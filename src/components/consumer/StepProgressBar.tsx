'use client';

import { useState, useEffect } from 'react';
import CartBadge from './CartBadge';

interface StepProgressBarProps {
  stepNumber: number;
  stepTitle: string;
  progress: number;
  showCart?: boolean;
  onCartClick?: () => void;
  className?: string;
}

export function StepProgressBar({ 
  stepNumber, 
  stepTitle, 
  progress, 
  showCart = false, 
  onCartClick,
  className = "" 
}: StepProgressBarProps) {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={`mb-6 bg-white border border-primary/20 rounded-lg p-3 ${showCart ? 'flex items-center justify-between' : ''} ${className}`}>
      <div className="flex-1">
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">{stepTitle}</span>
          <span className="text-xs text-primary/60">{progress}%</span>
        </div>
        <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 rounded-full relative transition-all duration-700 ease-out"
            style={{ 
              width: `${progressWidth}%`,
              background: '#7D9A6D'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {showCart && (
        <div className="ml-4 relative">
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-primary/5 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <CartBadge />
          </button>
        </div>
      )}
    </div>
  );
}
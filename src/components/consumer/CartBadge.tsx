'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/contexts';

interface CartBadgeProps {
  className?: string;
}

export default function CartBadge({ className = '' }: CartBadgeProps) {
  const { getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return null;
  }

  return (
    <span className={`absolute -top-1 -right-1 bg-accent1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ${className}`}>
      {totalItems}
    </span>
  );
}
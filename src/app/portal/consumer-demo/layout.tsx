'use client';

import { CartProvider } from '@/contexts';

export default function ConsumerDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
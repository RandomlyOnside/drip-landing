'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

export const useScrollTracking = () => {
  const scrollDepthsTracked = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% scroll depths
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollDepthsTracked.current.has(milestone)) {
          scrollDepthsTracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
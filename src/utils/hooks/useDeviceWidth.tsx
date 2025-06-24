"use client";
import { useEffect, useState } from 'react';

export function useDeviceWidth(): number {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    // Run once on mount in case SSR mismatch
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
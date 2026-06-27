"use client";

import { useState, useEffect } from "react";

export function useAnimatedCounter(target: number, duration = 2500): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = target * easeOut(progress);
      setValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

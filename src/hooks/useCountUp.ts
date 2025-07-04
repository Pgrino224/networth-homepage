import { useState, useEffect } from 'react';

export function useCountUp(
  start: number,
  end: number,
  trigger: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    const steps = 60;
    const increment = (end - start) / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easeOut;
      
      setCount(Math.round(currentValue));

      if (currentStep >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [trigger, start, end, duration]);

  return count;
}
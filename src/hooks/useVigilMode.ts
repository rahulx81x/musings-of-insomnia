import { useState, useEffect } from 'react';

export function useVigilMode(): boolean {
  const [isVigil, setIsVigil] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 0 && hour < 5;
  });

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setIsVigil(hour >= 0 && hour < 5);
    };

    const interval = setInterval(check, 60_000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return isVigil;
}

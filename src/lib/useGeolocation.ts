import { useState, useEffect } from 'react';

const useGeolocation = (): string => {
  const [location, setLocation] = useState<string>('Unknown');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  return location;
};

export default useGeolocation;
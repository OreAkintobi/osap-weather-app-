import { useState, useEffect } from 'react';
import { WeatherData, WeatherDataA, WeatherDataB } from '@/src/types';
import { getWeatherService } from '../services';
import { useTheme } from './useTheme';

export const useWeather = () => {
  const [location, setLocation] = useState<string>('');
  const [service, setService] = useState<'A' | 'B'>('A');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleTheme } = useTheme();

  const fetchWeather = async (loc: string) => {
    try {
      setLoading(true);
      const serviceInstance = await getWeatherService(service);
      const data = await serviceInstance.getWeather(loc);
      const normalizedData =
        service === 'A'
          ? serviceInstance.normalizeResponse(data as unknown as WeatherDataA)
          : serviceInstance.normalizeResponse(data as unknown as WeatherDataB);
      setWeatherData(normalizedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [service]);

  useEffect(() => {
    toggleTheme();
  }, [service]);

  return {
    location,
    weatherData,
    setLocation,
    setService,
    service,
    loading,
    fetchWeather,
  };
};

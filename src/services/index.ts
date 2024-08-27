import { WeatherService } from '@/src/types';
import { WeatherServiceA } from './WeatherServiceA';
import { WeatherServiceB } from './WeatherServiceB';

export const getWeatherService = async (
  serviceName: 'A' | 'B'
): Promise<WeatherService> => {
  switch (serviceName) {
    case 'A':
      const { WeatherServiceA } = await import('./WeatherServiceA');
      return new WeatherServiceA();
    case 'B':
      const { WeatherServiceB } = await import('./WeatherServiceB');
      return new WeatherServiceB();
    default:
      throw new Error('Unknown service');
  }
};

export const getWeatherServiceTest = (
  serviceName: 'A' | 'B'
): WeatherService => {
  switch (serviceName) {
    case 'A':
      return new WeatherServiceA();
    case 'B':
      return new WeatherServiceB();
    default:
      throw new Error('Unknown service');
  }
};

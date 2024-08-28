import { WeatherData, WeatherDataB, WeatherService } from '@/src/types';
import axios from 'axios';
import { handleError } from '@/src/utils/';

export class WeatherServiceB implements WeatherService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_WEATHER_API_API_KEY || '';
  }

  async getWeather(city: string): Promise<any> {
    try {
      const weatherData = await this.getWeatherByCity(city);
      if (!weatherData) {
        throw new Error(`Unable to retrieve weather data for "${city}".`);
      }
      return weatherData;
    } catch (error: unknown) {
      handleError(error, 'WeatherServiceB');
    }
  }

  private async getWeatherByCity(city: string): Promise<any> {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${
      this.apiKey
    }&q=${encodeURIComponent(city)}&aqi=no`;
    const response = await axios.get(weatherUrl);
    return response.data;
  }

  normalizeResponse(response: WeatherDataB): WeatherData {
    return {
      locationName: response.location.name || '',
      epochTime: response.location.localtime_epoch || 0,
      condition: response.current.condition.text || '',
      temperature: {
        current: response.current.temp_c || 0,
        high: response.current.heatindex_c || 0,
      },
    };
  }

  async getWeatherMock(location: string): Promise<WeatherData> {
    return {
      temperature: { high: 32, current: 28 },
      condition: 'Cloudy',
      locationName: location,
    };
  }
}

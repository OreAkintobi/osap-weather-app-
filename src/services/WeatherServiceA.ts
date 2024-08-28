import axios from 'axios';
import { handleError } from '@/src/utils';
import { WeatherData, WeatherDataA, WeatherService } from '@/src/types';

export class WeatherServiceA implements WeatherService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_API_KEY || '';
  }

  async getWeather(city: string): Promise<any> {
    try {
      const weatherData = await this.getWeatherByCity(city);
      if (!weatherData) {
        throw new Error(`Unable to retrieve weather data for "${city}".`);
      }
      return weatherData;
    } catch (error: unknown) {
      handleError(error, 'WeatherServiceA');
    }
  }

  private async getCityCoordinates(
    city: string
  ): Promise<{ lat: number; lon: number }> {
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(geocodeUrl);

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error(`City "${city}" not found.`);
    }
  }

  private async getWeatherData(lat: number, lon: number): Promise<any> {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);
    return response.data;
  }

  private async getWeatherByCity(city: string): Promise<any> {
    const { lat, lon } = await this.getCityCoordinates(city);
    return await this.getWeatherData(lat, lon);
  }

  normalizeResponse(response: WeatherDataA): WeatherData {
    return {
      locationName: response.name || '',
      epochTime: response.dt || 0,
      condition: response.weather[0].main || '',
      temperature: {
        current: response.main.temp || 0,
        high: response.main.temp_max || 0,
      },
    };
  }

  async getWeatherMock(location: string): Promise<WeatherData> {
    return {
      temperature: { high: 32, current: 28 },
      condition: 'Sunny',
      locationName: location,
    };
  }
}

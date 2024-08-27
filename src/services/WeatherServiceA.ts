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
    try {
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
    } catch (error: unknown) {
      handleError(error, 'GeoCoder API (OpenWeather)');
    }
  }

  private async getWeatherData(lat: number, lon: number): Promise<any> {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
      const response = await axios.get(weatherUrl);
      return response.data;
    } catch (error: unknown) {
      handleError(error, 'Weather API (OpenWeather)');
    }
  }

  private async getWeatherByCity(city: string): Promise<any> {
    try {
      const { lat, lon } = await this.getCityCoordinates(city);
      return await this.getWeatherData(lat, lon);
    } catch (error: unknown) {
      handleError(error, 'WeatherServiceA');
    }
  }

  normalizeResponse(response: WeatherDataA): WeatherData {
    return {
      locationName: response.name,
      epochTime: response.dt,
      condition: response.weather[0].main,
      temperature: {
        current: response.main.temp,
        high: response.main.temp_max,
      },
    } as WeatherData;
  }

  async getWeatherMock(location: string): Promise<WeatherData> {
    return {
      temperature: { high: 32, current: 28 },
      condition: 'Sunny',
      locationName: location,
    };
  }
}

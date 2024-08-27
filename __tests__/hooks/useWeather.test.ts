import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useWeather, useTheme } from '../../src/hooks';
import { getWeatherService } from '../../src/services';
import { WeatherData, WeatherDataA, WeatherDataB } from '../../src/types';

jest.mock('../../src/services', () => ({
  getWeatherService: jest.fn(),
}));

jest.mock('../../src/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

describe('useWeather Hook', () => {
  const TEST_CITY = 'New York';

  const mockNormalizedResponse: WeatherData = {
    locationName: TEST_CITY,
    epochTime: 1724759069,
    condition: 'Clear',
    temperature: { current: 32, high: 35 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data when location is set', async () => {
    const mockResponseA = {
      base: 'stations',
      clouds: {
        all: 0,
      },
      cod: 200,
      coord: {
        lat: 40.7127,
        lon: -74.006,
      },
      dt: 1724715634,
      id: 5128581,
      main: {
        feels_like: 26.05,
        grnd_level: 1017,
        humidity: 69,
        pressure: 1018,
        sea_level: 1018,
        temp: 25.63,
        temp_max: 27.19,
        temp_min: 23.09,
      },
      name: 'New York',
      sys: {
        country: 'US',
        id: 4610,
        sunrise: 1724667468,
        sunset: 1724715481,
        type: 1,
      },
      timezone: -14400,
      visibility: 10000,
      weather: [
        {
          description: 'clear sky',
          icon: '01n',
          id: 800,
          main: 'Clear',
        },
      ],
      wind: {
        deg: 170,
        speed: 3.09,
      },
    };

    const mockWeatherServiceA = {
      getWeather: jest.fn().mockResolvedValue(mockResponseA),
      normalizeResponse: jest.fn().mockImplementation((data: WeatherDataA) => ({
        locationName: data.name,
        epochTime: data.dt,
        condition: data.weather[0].main,
        temperature: {
          current: data.main.temp,
          high: data.main.temp_max,
        },
      })),
    };

    (getWeatherService as jest.Mock).mockResolvedValue(mockWeatherServiceA);
    (useTheme as jest.Mock).mockReturnValue({ toggleTheme: jest.fn() });

    const { result } = renderHook(() => useWeather());

    expect(result.current.service).toBe('A');

    act(() => {
      result.current.setLocation(TEST_CITY);
      result.current.fetchWeather(TEST_CITY);
    });

    await waitFor(() => {
      expect(getWeatherService).toHaveBeenCalledWith('A');
      expect(mockWeatherServiceA.getWeather).toHaveBeenCalledWith(TEST_CITY);
      expect(mockWeatherServiceA.normalizeResponse).toHaveBeenCalledWith(
        mockResponseA
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.weatherData?.condition).toEqual(
        mockNormalizedResponse.condition
      );
    });
  });

  it('should switch weather services and fetch data accordingly', async () => {
    const mockResponseB = {
      current: {
        cloud: 0,
        condition: {
          code: 1000,
          icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
          text: 'Clear',
        },
        dewpoint_c: 17.4,
        dewpoint_f: 63.4,
        feelslike_c: 26.6,
        feelslike_f: 80,
        gust_kph: 14.8,
        gust_mph: 9.2,
        heatindex_c: 35,
        heatindex_f: 81.5,
        humidity: 67,
        is_day: 0,
        last_updated: '2024-08-26 19:30',
        last_updated_epoch: 1724715000,
        precip_in: 0,
        precip_mm: 0,
        pressure_in: 30.11,
        pressure_mb: 1020,
        temp_c: 32,
        temp_f: 78.1,
        uv: 7,
        vis_km: 16,
        vis_miles: 9,
        wind_degree: 10,
        wind_dir: 'N',
        wind_kph: 3.6,
        wind_mph: 2.2,
        windchill_c: 26.4,
        windchill_f: 79.5,
      },
      location: {
        country: 'United States of America',
        lat: 40.71,
        localtime: '2024-08-26 19:38',
        localtime_epoch: 1724759069,
        lon: -74.01,
        name: 'New York',
        region: 'New York',
        tz_id: 'America/New_York',
      },
    };

    const mockWeatherServiceB = {
      getWeather: jest.fn().mockResolvedValue(mockResponseB),
      normalizeResponse: jest.fn().mockImplementation((data: WeatherDataB) => ({
        locationName: data.location.name,
        epochTime: data.location.localtime_epoch,
        condition: data.current.condition.text,
        temperature: {
          current: data.current.temp_c,
          high: data.current.heatindex_c,
        },
      })),
    };

    (getWeatherService as jest.Mock).mockResolvedValue(mockWeatherServiceB);

    const { result } = renderHook(() => useWeather());

    await act(() => {
      result.current.setLocation(TEST_CITY);
    });

    await act(() => {
      result.current.setService('B');
    });

    expect(result.current.service).toBe('B');

    await waitFor(() => {
      expect(getWeatherService).toHaveBeenCalledWith('B');
      expect(mockWeatherServiceB.getWeather).toHaveBeenCalledWith(TEST_CITY);
      expect(mockWeatherServiceB.normalizeResponse).toHaveBeenCalledWith(
        mockResponseB
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.weatherData?.condition).toEqual(
        mockNormalizedResponse.condition
      );
    });
  });
});

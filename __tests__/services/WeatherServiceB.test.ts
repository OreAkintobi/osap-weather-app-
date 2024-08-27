import axios from 'axios';
import { WeatherServiceB } from '../../src/services/WeatherServiceB';
import { WeatherDataB } from '../../src/types';

jest.mock('axios');
jest.mock('../../src/utils', () => ({
  handleError: jest.fn(),
}));

describe('WeatherServiceB', () => {
  let service: WeatherServiceB;

  beforeEach(() => {
    service = new WeatherServiceB();
    jest.clearAllMocks();
  });

  it('should fetch weather data for a valid city', async () => {
    const mockCity = 'New York';
    const mockWeatherResponse = {
      data: {
        location: {
          name: mockCity,
          localtime_epoch: 1625318400,
          lat: 40.7128,
          lon: -74.006,
        },
        current: {
          condition: {
            text: 'Clear',
            icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
            code: 1000,
          },
          temp_c: 32,
          temp_f: 78.1,
          feelslike_c: 32.8,
          feelslike_f: 90.1,
          temp_max: 35,
        },
      },
    };

    (axios.get as unknown as jest.Mock).mockResolvedValueOnce(
      mockWeatherResponse
    );

    const result = await service.getWeather(mockCity);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('v1/current.json')
    );
    expect(result).toEqual(mockWeatherResponse.data);
  });

  it('should normalize weather data correctly', () => {
    const mockResponse = {
      location: {
        name: 'New York',
        localtime_epoch: 1625318400,
      },
      current: {
        condition: { text: 'Clear' },
        temp_c: 32,
        heatindex_c: 35,
      },
    };

    const expectedNormalized = {
      locationName: 'New York',
      epochTime: 1625318400,
      condition: 'Clear',
      temperature: {
        current: 32,
        high: 35,
      },
    };

    const normalized = service.normalizeResponse(
      mockResponse as unknown as WeatherDataB
    );

    expect(normalized).toEqual(expectedNormalized);
  });
});

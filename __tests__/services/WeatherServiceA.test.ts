import axios from 'axios';
import { WeatherServiceA } from '../../src/services/WeatherServiceA';
import { WeatherDataA } from '../../src/types';

jest.mock('axios');
jest.mock('../../src/utils', () => ({
  handleError: jest.fn(),
}));

describe('WeatherServiceA', () => {
  let service: WeatherServiceA;

  beforeEach(() => {
    service = new WeatherServiceA();
    jest.clearAllMocks();
  });

  it('should fetch weather data for a valid city', async () => {
    const mockCity = 'New York';
    const mockCoordinates = { lat: 40.7128, lon: -74.006 };
    const mockWeatherResponse = {
      data: {
        name: mockCity,
        dt: 1625318400,
        weather: [{ main: 'Clear' }],
        main: { temp: 15, temp_max: 18 },
      },
    };

    (axios.get as unknown as jest.Mock)
      .mockResolvedValueOnce({ data: [mockCoordinates] })
      .mockResolvedValueOnce(mockWeatherResponse);

    const result = await service.getWeather(mockCity);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('geo/1.0/direct')
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('data/2.5/weather')
    );
    expect(result).toEqual(mockWeatherResponse.data);
  });

  it('should normalize weather data correctly', () => {
    const mockResponse = {
      name: 'New York',
      dt: 1625318400,
      weather: [{ main: 'Clear' }] as WeatherDataA['weather'],
      main: { temp: 15, temp_max: 18 } as WeatherDataA['main'],
    } as WeatherDataA;

    const expectedNormalized = {
      locationName: 'New York',
      epochTime: 1625318400,
      condition: 'Clear',
      temperature: {
        current: 15,
        high: 18,
      },
    };

    const normalized = service.normalizeResponse(mockResponse);

    expect(normalized).toEqual(expectedNormalized);
  });
});

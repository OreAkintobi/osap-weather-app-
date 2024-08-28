import { getWeatherServiceTest } from '../../src/services';
import { WeatherServiceA } from '../../src/services/WeatherServiceA';
import { WeatherServiceB } from '../../src/services/WeatherServiceB';

describe('getWeatherService', () => {
  it('should return an instance of WeatherServiceA when serviceName is "A"', () => {
    const service = getWeatherServiceTest('A');
    expect(service).toBeInstanceOf(WeatherServiceA);
  });

  it('should return an instance of WeatherServiceB when serviceName is "B"', () => {
    const service = getWeatherServiceTest('B');
    expect(service).toBeInstanceOf(WeatherServiceB);
  });

  it('should throw an error when an unknown serviceName is provided', () => {
    expect(() => getWeatherServiceTest('C' as 'A' | 'B')).toThrow(
      'Unknown service'
    );
  });
});

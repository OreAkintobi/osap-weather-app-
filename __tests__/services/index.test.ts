// import { getWeatherService } from '../../src/services';
// import WeatherServiceA from '../../src/services/WeatherServiceA';
// import WeatherServiceB from '../../src/services/WeatherServiceB';

// // Mock the services directly
// jest.mock('../../src/services/WeatherServiceA');
// jest.mock('../../src/services/WeatherServiceB');

// describe('getWeatherService', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return an instance of WeatherServiceA when serviceName is "A"', async () => {
//     const service = await getWeatherService('A');
//     expect(service).toBeInstanceOf(WeatherServiceA);
//   });

//   it('should return an instance of WeatherServiceB when serviceName is "B"', async () => {
//     const service = await getWeatherService('B');
//     expect(service).toBeInstanceOf(WeatherServiceB);
//   });

//   it('should throw an error when serviceName is unknown', async () => {
//     await expect(getWeatherService('C' as 'A' | 'B')).rejects.toThrow(
//       'Unknown service'
//     );
//   });
// });

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

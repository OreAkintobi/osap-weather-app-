import axios, { AxiosError, isAxiosError } from 'axios';
import { handleError } from '../../src/utils';

jest.mock('axios');

describe('handleError', () => {
  const apiName = 'TestAPI';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error with the correct message when an unknown error type is passed', () => {
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    // Simulate an unknown error object (not an instance of Error)
    const unknownError = { some: 'data' };

    expect(() => handleError(unknownError, apiName)).toThrow(
      `Unknown error occurred in ${apiName}.`
    );
  });
});

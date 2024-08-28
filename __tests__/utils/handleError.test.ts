import axios from 'axios';
import { handleError } from '../../src/utils';

jest.mock('axios');

describe('handleError', () => {
  const apiName = 'TestAPI';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mocking the global alert function
  global.alert = jest.fn();

  it('should alert with the correct message when an unknown error type is passed', () => {
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    // Simulate an unknown error object (not an instance of Error)
    const unknownError = { some: 'data' };

    handleError(unknownError, apiName);

    // Expect alert to be called with the appropriate message
    expect(global.alert).toHaveBeenCalledWith(
      `Unknown error occurred in ${apiName}.`
    );
  });
});

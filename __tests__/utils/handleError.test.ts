import axios from 'axios';
import { handleError } from '../../src/utils';

jest.mock('axios');

describe('handleError', () => {
  const apiName = 'TestAPI';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  global.alert = jest.fn();

  it('should alert with the correct message when an unknown error type is passed', () => {
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    const unknownError = { some: 'data' };

    handleError(unknownError, apiName);

    expect(global.alert).toHaveBeenCalledWith(
      `Unknown error occurred in ${apiName}.`
    );
  });
});

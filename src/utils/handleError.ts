import axios from 'axios';

export function handleError(error: unknown, apiName: string): never {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(
          `${apiName} error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // Request was made but no response was received
        throw new Error(`${apiName} error: No response from server.`);
      } else {
        // Something happened in setting up the request
        throw new Error(`${apiName} request error: ${error.message}`);
      }
    } else {
      throw new Error(`Unknown error in ${apiName}: ${error.message}`);
    }
  } else {
    throw new Error(`Unknown error occurred in ${apiName}.`);
  }
}

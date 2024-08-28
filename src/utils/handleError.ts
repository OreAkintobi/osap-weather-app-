import axios from 'axios';

export function handleError(error: unknown, apiName: string) {
  let userFriendlyMessage = 'Something went wrong. Please try again later.';

  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        userFriendlyMessage =
          error.response.data.message ||
          error.response?.data?.error?.message ||
          'An unexpected error occurred while communicating with the server.';
      } else if (error.request) {
        // Request was made but no response was received
        userFriendlyMessage =
          'Unable to reach the server. Please check your internet connection.';
      } else {
        // Something happened in setting up the request
        userFriendlyMessage =
          error.message ||
          'There was a problem setting up the request. Please try again.';
      }
    } else {
      // Non-Axios errors
      userFriendlyMessage =
        error.message || 'An unexpected error occurred. Please try again.';
    }
  } else {
    // Unknown type of error
    userFriendlyMessage = `Unknown error occurred in ${apiName}.`;
  }
  alert(userFriendlyMessage);
}

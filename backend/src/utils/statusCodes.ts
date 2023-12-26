// Purpose: Export status codes as constants for use in API calls.
// Usage: import statusCode from 'utils/statusCodes.ts';

const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export default statusCode;

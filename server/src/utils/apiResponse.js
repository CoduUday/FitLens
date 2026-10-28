/**
 * Standardized API response helpers
 */

export const successResponse = (res, { statusCode = 200, message = 'Success', data = null, meta = null }) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
    error: null,
  });
};

export const errorResponse = (res, { statusCode = 500, message = 'Internal Server Error', error = null }) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error,
  });
};


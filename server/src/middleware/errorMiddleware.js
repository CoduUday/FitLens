import { errorResponse } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  return errorResponse(res, {
    statusCode: 404,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
    error: {
      code: 'ROUTE_NOT_FOUND',
      path: req.originalUrl,
    },
  });
};

/**
 * Centralized Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  const errorPayload = {
    code: err.code || 'INTERNAL_SERVER_ERROR',
    details: err.details || null,
  };

  if (!config.isProduction && err.stack) {
    errorPayload.stack = err.stack;
  }

  // Avoid console noise during automated tests
  if (config.nodeEnv !== 'test') {
    console.error(`[Error] ${statusCode} - ${message}`, err.stack || err);
  }

  return errorResponse(res, {
    statusCode,
    message,
    error: errorPayload,
  });
};


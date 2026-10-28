import { Router } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

const router = Router();

const startTime = Date.now();

/**
 * @route   GET /api/health
 * @desc    System health check & status
 * @access  Public
 */
router.get('/', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return successResponse(res, {
    statusCode: 200,
    message: 'FitLens API is healthy and operational',
    data: {
      status: 'healthy',
      service: 'fitlens-server',
      version: '1.0.0',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
      },
    },
  });
});

export default router;


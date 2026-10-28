import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './src/config/env.js';
import healthRoutes from './src/routes/healthRoutes.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorMiddleware.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        config.clientUrl,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
      ];

      if (allowedOrigins.includes(origin) || !config.isProduction) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Standard JSON request body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// HTTP Request logging
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));
}

// Global API Rate Limiting (100 reqs per 15 min per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    error: { code: 'RATE_LIMIT_EXCEEDED' },
  },
});
app.use('/api', globalLimiter);

// Health check route
app.use('/api/health', healthRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to FitLens API. Visit /api/health for system status.',
    documentation: '/docs',
  });
});

// 404 Catch-all handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

// Start server if not running in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[FitLens Server] Running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
  });
}

export default app;


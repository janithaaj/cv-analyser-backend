import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';

// Routes
import authRoutes from './routes/auth.routes';
import jobsRoutes from './routes/jobs.routes';
import cvsRoutes from './routes/cvs.routes';
import candidatesRoutes from './routes/candidates.routes';
import interviewsRoutes from './routes/interviews.routes';
import reportsRoutes from './routes/reports.routes';

dotenv.config();

const app = express();
const PORT = env.PORT;

// Rate limiting - More lenient in development
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute (shorter window for faster reset)
  max: env.NODE_ENV === 'development' ? 2000 : 100, // Very high limit in development
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health checks in development
    return env.NODE_ENV === 'development' && req.path === '/health';
  },
  // In development, allow burst requests
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for Swagger UI
}));

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow common localhost ports
    if (env.NODE_ENV === 'development') {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'http://localhost:3001',
        env.CORS_ORIGIN
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    } else {
      // In production, use strict origin check
      if (origin === env.CORS_ORIGIN) {
        return callback(null, true);
      }
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'CV Analyser API Documentation'
}));

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'CV Analyser API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        refresh: 'POST /api/auth/refresh',
        me: 'GET /api/auth/me'
      },
      jobs: {
        list: 'GET /api/jobs',
        create: 'POST /api/jobs',
        get: 'GET /api/jobs/:id',
        update: 'PUT /api/jobs/:id',
        delete: 'DELETE /api/jobs/:id',
        stats: 'GET /api/jobs/:id/stats'
      },
      cvs: {
        list: 'GET /api/cvs',
        upload: 'POST /api/cvs/upload',
        get: 'GET /api/cvs/:id',
        analyze: 'POST /api/cvs/:id/analyze',
        delete: 'DELETE /api/cvs/:id',
        download: 'GET /api/cvs/:id/download'
      },
      candidates: {
        list: 'GET /api/candidates',
        create: 'POST /api/candidates',
        get: 'GET /api/candidates/:id',
        update: 'PUT /api/candidates/:id',
        delete: 'DELETE /api/candidates/:id',
        rank: 'POST /api/candidates/rank',
        cvs: 'GET /api/candidates/:id/cvs'
      },
      interviews: {
        list: 'GET /api/interviews',
        upcoming: 'GET /api/interviews/upcoming',
        create: 'POST /api/interviews',
        get: 'GET /api/interviews/:id',
        update: 'PUT /api/interviews/:id',
        delete: 'DELETE /api/interviews/:id'
      },
      reports: {
        list: 'GET /api/reports',
        generate: 'POST /api/reports/generate',
        get: 'GET /api/reports/:id',
        delete: 'DELETE /api/reports/:id'
      }
    },
    health: 'GET /health'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/cvs', cvsRoutes);
app.use('/api/candidates', candidatesRoutes);
app.use('/api/interviews', interviewsRoutes);
app.use('/api/reports', reportsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  });
});

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});

export default app;


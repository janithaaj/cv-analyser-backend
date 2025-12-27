"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./config/database");
const error_middleware_1 = require("./middleware/error.middleware");
const env_1 = require("./config/env");
const swagger_1 = require("./config/swagger");
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const jobs_routes_1 = __importDefault(require("./routes/jobs.routes"));
const cvs_routes_1 = __importDefault(require("./routes/cvs.routes"));
const candidates_routes_1 = __importDefault(require("./routes/candidates.routes"));
const interviews_routes_1 = __importDefault(require("./routes/interviews.routes"));
const reports_routes_1 = __importDefault(require("./routes/reports.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = env_1.env.PORT;
// Rate limiting - More lenient in development
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute (shorter window for faster reset)
    max: env_1.env.NODE_ENV === 'development' ? 2000 : 100, // Very high limit in development
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
        // Skip rate limiting for health checks in development
        return env_1.env.NODE_ENV === 'development' && req.path === '/health';
    },
    // In development, allow burst requests
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
});
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false // Disable CSP for Swagger UI
}));
// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // In development, allow common localhost ports
        if (env_1.env.NODE_ENV === 'development') {
            const allowedOrigins = [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:3000',
                'http://localhost:3001',
                env_1.env.CORS_ORIGIN
            ].filter(Boolean);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
        }
        else {
            // In production, use strict origin check
            if (origin === env_1.env.CORS_ORIGIN) {
                return callback(null, true);
            }
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(limiter);
// Swagger Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
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
app.use('/api/auth', auth_routes_1.default);
app.use('/api/jobs', jobs_routes_1.default);
app.use('/api/cvs', cvs_routes_1.default);
app.use('/api/candidates', candidates_routes_1.default);
app.use('/api/interviews', interviews_routes_1.default);
app.use('/api/reports', reports_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV
    });
});
// Error handling
app.use(error_middleware_1.errorHandler);
// Connect to MongoDB
(0, database_1.connectDB)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${env_1.env.NODE_ENV} mode`);
});
exports.default = app;
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HR CV Analyser API',
            version: '1.0.0',
            description: 'A comprehensive API for HR CV analysis and candidate management system',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: `http://localhost:${env_1.env.PORT}`,
                description: 'Development server'
            },
            {
                url: env_1.env.API_URL.replace('/api', ''),
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        name: { type: 'string', example: 'John Doe' },
                        role: { type: 'string', enum: ['HR', 'ADMIN', 'MANAGER'], example: 'HR' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Job: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        title: { type: 'string', example: 'Software Engineer' },
                        description: { type: 'string', example: 'Job description here' },
                        company: { type: 'string', example: 'Tech Corp' },
                        location: { type: 'string', example: 'Remote' },
                        type: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'], example: 'FULL_TIME' },
                        status: { type: 'string', enum: ['DRAFT', 'ACTIVE', 'CLOSED'], example: 'ACTIVE' },
                        postedDate: { type: 'string', format: 'date-time' },
                        views: { type: 'number', example: 100 },
                        userId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Candidate: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Jane Smith' },
                        email: { type: 'string', format: 'email', example: 'jane@example.com' },
                        phone: { type: 'string', example: '+1234567890' },
                        location: { type: 'string', example: 'New York, NY' },
                        experience: { type: 'string', example: '5 years' },
                        skills: { type: 'array', items: { type: 'string' }, example: ['React', 'Node.js', 'TypeScript'] },
                        matchScore: { type: 'number', minimum: 0, maximum: 100, example: 85 },
                        status: { type: 'string', enum: ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'], example: 'NEW' },
                        jobId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        lastContact: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                CV: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        fileName: { type: 'string', example: 'john-doe-cv.pdf' },
                        filePath: { type: 'string', example: './uploads/cvs/1234567890-cv.pdf' },
                        fileSize: { type: 'number', example: 1024000 },
                        mimeType: { type: 'string', example: 'application/pdf' },
                        status: { type: 'string', enum: ['UPLOADED', 'ANALYZING', 'ANALYZED', 'FAILED'], example: 'ANALYZED' },
                        matchScore: { type: 'number', minimum: 0, maximum: 100, example: 85 },
                        jobId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        candidateId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        analysisData: { type: 'object' },
                        uploadedAt: { type: 'string', format: 'date-time' },
                        analyzedAt: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Interview: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        candidateId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        jobId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        interviewerId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        date: { type: 'string', format: 'date', example: '2024-01-15' },
                        time: { type: 'string', example: '10:00' },
                        duration: { type: 'number', example: 60 },
                        type: { type: 'string', enum: ['VIDEO_CALL', 'IN_PERSON', 'PHONE'], example: 'VIDEO_CALL' },
                        location: { type: 'string', example: 'Zoom Meeting' },
                        status: { type: 'string', enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'], example: 'SCHEDULED' },
                        notes: { type: 'string', example: 'Technical interview' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                Report: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Monthly Recruitment Report' },
                        type: { type: 'string', enum: ['MONTHLY', 'QUARTERLY', 'YEARLY', 'CUSTOM'], example: 'MONTHLY' },
                        data: { type: 'object' },
                        filePath: { type: 'string', example: './reports/monthly-report-2024-01.pdf' },
                        userId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        generatedAt: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        error: { type: 'string', example: 'Error message' }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Operation successful' },
                        data: { type: 'object' }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', format: 'password', example: 'password123' }
                    }
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['email', 'password', 'name'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', format: 'password', example: 'password123', minLength: 6 },
                        name: { type: 'string', example: 'John Doe' },
                        role: { type: 'string', enum: ['HR', 'ADMIN', 'MANAGER'], example: 'HR' }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Login successful' },
                        data: {
                            type: 'object',
                            properties: {
                                user: { $ref: '#/components/schemas/User' },
                                accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                                refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                            }
                        }
                    }
                }
            }
        },
        tags: [
            { name: 'Authentication', description: 'User authentication and authorization endpoints' },
            { name: 'Jobs', description: 'Job posting and management endpoints' },
            { name: 'CVs', description: 'CV upload and analysis endpoints' },
            { name: 'Candidates', description: 'Candidate management endpoints' },
            { name: 'Interviews', description: 'Interview scheduling endpoints' },
            { name: 'Reports', description: 'Report generation endpoints' }
        ]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map
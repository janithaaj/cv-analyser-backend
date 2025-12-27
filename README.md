# HR CV Analyser Backend

A comprehensive backend API for HR CV analysis and candidate management system built with Node.js, Express.js, TypeScript, and MongoDB.

## Features

- 🔐 JWT-based authentication and authorization
- 📄 CV upload and analysis (PDF and DOCX support)
- 💼 Job posting and management
- 👤 Candidate management and ranking
- 📅 Interview scheduling
- 📊 Reporting and analytics
- 🔍 Advanced search and filtering
- 📦 RESTful API design

## Technology Stack

- **Node.js** (v18+)
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **Multer** - File upload handling
- **pdf-parse** - PDF parsing
- **mammoth** - DOCX parsing
- **Zod** - Request validation
- **Winston** - Logging

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── models/          # Mongoose models
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── app.ts           # Main application file
├── uploads/             # Uploaded files directory
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone and Install

```bash
cd cv-analyser-backend
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000/api

# Database
MONGODB_URI=mongodb://localhost:27017/cv_analyser

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads/cvs

# CORS
CORS_ORIGIN=http://localhost:5174

# Logging
LOG_LEVEL=info
```

### Step 3: Run the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Jobs

- `GET /api/jobs` - Get all jobs (with filters)
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/:id/stats` - Get job statistics

### CVs

- `GET /api/cvs` - Get all CVs (with filters)
- `POST /api/cvs/upload` - Upload CV file
- `GET /api/cvs/:id` - Get CV by ID
- `POST /api/cvs/:id/analyze` - Analyze CV
- `DELETE /api/cvs/:id` - Delete CV
- `GET /api/cvs/:id/download` - Download CV file

### Candidates

- `GET /api/candidates` - Get all candidates (with filters)
- `POST /api/candidates` - Create candidate
- `GET /api/candidates/:id` - Get candidate by ID
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `POST /api/candidates/rank` - Rank candidates for a job
- `GET /api/candidates/:id/cvs` - Get candidate's CVs

### Interviews

- `GET /api/interviews` - Get all interviews (with filters)
- `GET /api/interviews/upcoming` - Get upcoming interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews/:id` - Get interview by ID
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Cancel interview

### Reports

- `GET /api/reports` - Get all reports
- `POST /api/reports/generate` - Generate new report
- `GET /api/reports/:id` - Get report by ID
- `DELETE /api/reports/:id` - Delete report

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Database Models

- **User** - System users (HR, Admin, Manager)
- **Job** - Job postings
- **Candidate** - Candidate information
- **CV** - Uploaded CV files and analysis data
- **Interview** - Interview scheduling
- **Report** - Generated reports

## CV Analysis

The system supports:
- PDF files (using pdf-parse)
- DOCX files (using mammoth)
- Automatic skill extraction
- Experience extraction
- Match score calculation based on job requirements

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Logging

Logs are written to:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## Security Features

- Helmet.js for security headers
- Rate limiting
- CORS configuration
- Password hashing with bcrypt
- JWT token authentication

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Code Structure

- **Controllers** - Handle HTTP requests and responses
- **Services** - Contain business logic
- **Models** - Database schemas
- **Middleware** - Request processing (auth, validation, errors)
- **Routes** - API endpoint definitions
- **Utils** - Helper functions

## MongoDB Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`

### MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue on the repository.


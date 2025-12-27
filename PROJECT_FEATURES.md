# HR CV Analyser - Complete Feature List

## Project Overview
A comprehensive HR CV Analyser system that automates the recruitment process from job posting to candidate hiring. The system uses AI-powered CV analysis, intelligent candidate matching, and complete interview management.

---

## 1. Authentication & User Management

### Features:
- **User Registration**
  - Email-based registration
  - Password hashing with bcrypt
  - Role-based access control (HR, ADMIN, MANAGER)
  - Email validation

- **User Login**
  - Secure JWT-based authentication
  - Access token (15 minutes expiry)
  - Refresh token (7 days expiry)
  - Token refresh mechanism

- **User Profile**
  - Get current user information
  - User session management

### API Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

---

## 2. Job Management

### Features:
- **Job Posting**
  - Create job postings with detailed descriptions
  - Job types: Full-time, Part-time, Contract, Internship
  - Job status: Draft, Active, Closed
  - Company and location information
  - Job posting date tracking

- **Job Search & Filtering**
  - Search jobs by title, company, or description
  - Filter by status (DRAFT, ACTIVE, CLOSED)
  - Pagination support
  - Get job by ID

- **Job Statistics**
  - View job-specific statistics
  - Track applications per job
  - Candidate match metrics

- **Job Management**
  - Update job details
  - Delete jobs
  - Close/activate jobs

### API Endpoints:
- `GET /api/jobs` - List all jobs (with filters and pagination)
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/:id/stats` - Get job statistics

---

## 3. CV Upload & Management

### Features:
- **CV Upload**
  - Support for PDF and DOCX formats
  - File size validation (max 10MB)
  - Automatic file type detection
  - Secure file storage

- **CV Processing**
  - Text extraction from PDF files
  - Text extraction from DOCX files
  - CV status tracking (UPLOADED, ANALYZING, ANALYZED, FAILED)

- **CV Management**
  - List all CVs with filtering
  - Filter by job, candidate, or status
  - Pagination support
  - View CV details
  - Download CV files
  - Delete CVs

### API Endpoints:
- `GET /api/cvs` - List all CVs (with filters)
- `POST /api/cvs/upload` - Upload CV file
- `GET /api/cvs/:id` - Get CV by ID
- `POST /api/cvs/:id/analyze` - Analyze CV
- `DELETE /api/cvs/:id` - Delete CV
- `GET /api/cvs/:id/download` - Download CV file

---

## 4. AI-Powered CV Analysis

### Features:
- **OpenAI Integration**
  - Advanced CV analysis using GPT-4o-mini
  - Intelligent skill extraction
  - Experience calculation
  - Education extraction
  - Candidate summary generation
  - Strengths identification
  - Recommendations for hiring

- **Match Score Calculation**
  - Automatic match score (0-100%)
  - Compares CV against job description
  - AI-powered semantic matching
  - Skill-based matching
  - Experience relevance scoring

- **Fallback Analysis**
  - Basic analysis when OpenAI is unavailable
  - Keyword-based skill extraction
  - Simple match score calculation
  - Ensures system always works

- **Analysis Data Storage**
  - Complete analysis results stored
  - Extracted skills array
  - Experience level
  - Education details
  - Match score
  - Analysis timestamp

### API Endpoints:
- `POST /api/cvs/:id/analyze` - Trigger CV analysis

---

## 5. Candidate Management

### Features:
- **Candidate Creation**
  - Manual candidate entry
  - Link candidates to jobs
  - Contact information (email, phone, location)
  - Experience tracking
  - Skills management

- **Candidate Status Management**
  - Status workflow: NEW → SHORTLISTED → INTERVIEWED → OFFERED → HIRED
  - Rejection status: REJECTED
  - Automatic status updates based on match score:
    - Match score ≥ 80% → Auto SHORTLISTED
    - Match score 50-79% → Stays NEW (manual review)
    - Match score < 50% → Auto REJECTED
  - Manual status updates
  - Last contact date tracking

- **Candidate Search & Filtering**
  - Search by name, email, or skills
  - Filter by job ID
  - Filter by status
  - Pagination support

- **Candidate Ranking**
  - Rank candidates for specific jobs
  - Sort by match score
  - Prioritize best-fit candidates

- **Candidate Profile**
  - View complete candidate profile
  - View all CVs uploaded by candidate
  - Contact information
  - Skills and experience
  - Match score history

- **WhatsApp Integration**
  - Direct contact via WhatsApp Web
  - Pre-filled message templates
  - Quick candidate outreach

### API Endpoints:
- `GET /api/candidates` - List all candidates (with filters)
- `POST /api/candidates` - Create new candidate
- `GET /api/candidates/:id` - Get candidate by ID
- `PUT /api/candidates/:id` - Update candidate
- `PUT /api/candidates/:id/status` - Update candidate status only
- `DELETE /api/candidates/:id` - Delete candidate
- `POST /api/candidates/rank` - Rank candidates for a job
- `GET /api/candidates/:id/cvs` - Get candidate's CVs

---

## 6. Interview Management

### Features:
- **Interview Scheduling**
  - Schedule interviews with candidates
  - Link to specific jobs
  - Assign interviewers
  - Set date and time
  - Duration tracking (minimum 15 minutes)
  - Interview types: Video Call, In-Person, Phone
  - Location/meeting link storage

- **Interview Status Management**
  - Status: SCHEDULED, COMPLETED, CANCELLED, RESCHEDULED
  - Update interview status
  - Track interview completion

- **Interview Notes**
  - Add notes to interviews
  - Store interview feedback
  - Reference for future decisions

- **Interview Views**
  - List view with filters
  - Calendar view
  - Upcoming interviews list
  - Filter by candidate, job, interviewer, or status
  - Search functionality

- **Google Calendar Integration**
  - Add interviews to Google Calendar
  - Generate calendar links
  - Event creation via API

### API Endpoints:
- `GET /api/interviews` - List all interviews (with filters)
- `GET /api/interviews/upcoming` - Get upcoming interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews/:id` - Get interview by ID
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Cancel interview

---

## 7. Reports & Analytics

### Features:
- **Report Generation**
  - Monthly reports
  - Quarterly reports
  - Yearly reports
  - Custom date range reports

- **Report Types**
  - Recruitment metrics
  - Hiring statistics
  - CV processing rates
  - Interview completion rates
  - Candidate pipeline analysis

- **Report Management**
  - List all reports
  - View report details
  - Delete reports
  - Report pagination

### API Endpoints:
- `GET /api/reports` - List all reports
- `POST /api/reports/generate` - Generate new report
- `GET /api/reports/:id` - Get report by ID
- `DELETE /api/reports/:id` - Delete report

---

## 8. Dashboard & Analytics

### Features:
- **Real-time Statistics**
  - Active jobs count
  - CVs analyzed count
  - Total candidates
  - Scheduled interviews

- **Quick Stats**
  - Hiring rate percentage
  - CV processing rate
  - Interview completion rate
  - Visual progress bars

- **Recent Activity Feed**
  - Recent CV uploads
  - Recent interviews scheduled
  - Recent job postings
  - Time-stamped activity log

- **Quick Actions**
  - Post new job
  - Upload CV
  - Schedule interview

---

## 9. Security Features

### Features:
- **Authentication Security**
  - JWT token-based authentication
  - Password hashing with bcrypt
  - Secure token storage
  - Token expiration handling

- **API Security**
  - Rate limiting (2000 requests/minute in dev, 100/15min in production)
  - CORS protection
  - Helmet.js security headers
  - Input validation
  - Error handling middleware

- **File Upload Security**
  - File type validation
  - File size limits
  - Secure file storage
  - Path traversal protection

---

## 10. Technical Features

### Features:
- **RESTful API**
  - Standard HTTP methods
  - Consistent response format
  - Error handling
  - Status codes

- **Database**
  - MongoDB with Mongoose ODM
  - Data relationships (populate)
  - Indexing for performance
  - Data validation

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Interactive API explorer
  - Endpoint testing
  - Schema definitions

- **Error Handling**
  - Custom error classes
  - Structured error responses
  - Error logging
  - User-friendly error messages

- **Pagination**
  - Page-based pagination
  - Configurable page size
  - Total count and pages
  - Efficient data loading

- **Search & Filtering**
  - Full-text search
  - Multi-criteria filtering
  - Case-insensitive search
  - Debounced search inputs

---

## 11. Frontend Features

### Features:
- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layouts
  - Modern UI components

- **User Interface**
  - Dashboard with statistics
  - Job management interface
  - CV upload interface
  - Candidate list with filters
  - Interview calendar view
  - Profile modals

- **User Experience**
  - Loading states
  - Error handling
  - Success notifications
  - Form validation
  - Search functionality
  - Filter options

- **Integration Features**
  - WhatsApp Web integration
  - Google Calendar integration
  - File download
  - Profile viewing

---

## 12. Data Models

### Core Entities:
1. **User** - HR staff, admins, managers
2. **Job** - Job postings and descriptions
3. **Candidate** - Candidate information and status
4. **CV** - Uploaded CV files and analysis data
5. **Interview** - Scheduled interviews
6. **Report** - Generated reports

### Relationships:
- Jobs → Candidates (one-to-many)
- Candidates → CVs (one-to-many)
- Jobs → CVs (one-to-many)
- Candidates → Interviews (one-to-many)
- Jobs → Interviews (one-to-many)
- Users → Interviews (one-to-many as interviewer)

---

## 13. Business Logic Features

### Features:
- **Automatic Status Updates**
  - Auto-shortlist high-match candidates (≥80%)
  - Auto-reject low-match candidates (<50%)
  - Manual review for medium matches (50-79%)

- **Match Score Calculation**
  - AI-powered semantic matching
  - Skill relevance scoring
  - Experience matching
  - Education matching

- **Candidate Ranking**
  - Sort by match score
  - Prioritize best-fit candidates
  - Job-specific ranking

- **Interview Scheduling Logic**
  - Date validation
  - Time slot management
  - Duration tracking
  - Status workflow

---

## 14. Integration Capabilities

### Features:
- **OpenAI Integration**
  - GPT-4o-mini for CV analysis
  - JSON response format
  - Error handling and fallback

- **Google Calendar Integration**
  - Event creation
  - Calendar link generation
  - API-based integration

- **WhatsApp Web Integration**
  - Direct messaging
  - Pre-filled messages
  - Contact information handling

---

## 15. Performance & Scalability

### Features:
- **Optimization**
  - Database indexing
  - Efficient queries
  - Pagination
  - Rate limiting

- **Scalability**
  - Modular architecture
  - Service layer separation
  - Middleware pipeline
  - Error handling

---

## Summary Statistics

- **Total API Endpoints**: 35+
- **Core Modules**: 6 (Auth, Jobs, CVs, Candidates, Interviews, Reports)
- **AI Features**: OpenAI-powered CV analysis
- **Integration Points**: 2 (Google Calendar, WhatsApp)
- **User Roles**: 3 (HR, ADMIN, MANAGER)
- **Status Workflows**: 2 (Job status, Candidate status)
- **File Formats Supported**: 2 (PDF, DOCX)
- **Report Types**: 4 (Monthly, Quarterly, Yearly, Custom)

---

## Technology Stack

### Backend:
- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API
- Swagger/OpenAPI
- Multer (file uploads)
- pdf-parse & mammoth (text extraction)

### Security:
- bcrypt (password hashing)
- express-rate-limit (rate limiting)
- helmet.js (security headers)
- CORS (cross-origin protection)

### Frontend:
- React with TypeScript
- Vite (build tool)
- React Router
- Axios (API client)

---

## Use Cases

1. **HR Manager** - Post jobs, review candidates, schedule interviews
2. **Recruiter** - Upload CVs, analyze candidates, manage pipeline
3. **Admin** - Manage users, generate reports, view analytics
4. **Interviewer** - View scheduled interviews, add notes, update status

---

## Future Enhancement Opportunities

1. Email notifications
2. SMS integration
3. Advanced analytics dashboard
4. Bulk CV upload
5. Candidate comparison tool
6. Interview feedback forms
7. Automated interview scheduling
8. Integration with job boards
9. Resume parsing improvements
10. Multi-language support

---

This comprehensive feature list demonstrates a fully functional HR CV Analyser system with AI-powered analysis, complete candidate management, interview scheduling, and reporting capabilities.


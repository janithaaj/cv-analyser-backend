# API Endpoints Reference

## Base URL
```
http://localhost:3000
```

## Available Endpoints

### Health Check
- **GET** `/health` - Check server status

### API Root
- **GET** `/api` - List all available endpoints

---

## Authentication Endpoints

### Register
- **POST** `/api/auth/register`
- Body: `{ "email": "user@example.com", "password": "password123", "name": "User Name", "role": "HR" }`

### Login
- **POST** `/api/auth/login`
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Returns: `{ "user": {...}, "accessToken": "...", "refreshToken": "..." }`

### Refresh Token
- **POST** `/api/auth/refresh`
- Body: `{ "refreshToken": "..." }`

### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <accessToken>`

---

## Jobs Endpoints

### List Jobs
- **GET** `/api/jobs?status=ACTIVE&search=developer&page=1&limit=10`
- Headers: `Authorization: Bearer <accessToken>`

### Create Job
- **POST** `/api/jobs`
- Headers: `Authorization: Bearer <accessToken>`
- Body: `{ "title": "Software Engineer", "company": "Tech Corp", "location": "Remote", "type": "FULL_TIME", "description": "..." }`

### Get Job
- **GET** `/api/jobs/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Update Job
- **PUT** `/api/jobs/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Delete Job
- **DELETE** `/api/jobs/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Get Job Statistics
- **GET** `/api/jobs/:id/stats`
- Headers: `Authorization: Bearer <accessToken>`

---

## CVs Endpoints

### List CVs
- **GET** `/api/cvs?jobId=xxx&candidateId=xxx&status=ANALYZED`
- Headers: `Authorization: Bearer <accessToken>`

### Upload CV
- **POST** `/api/cvs/upload`
- Headers: `Authorization: Bearer <accessToken>`
- Content-Type: `multipart/form-data`
- Body: `{ "cv": <file>, "candidateId": "xxx", "jobId": "xxx" }`

### Get CV
- **GET** `/api/cvs/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Analyze CV
- **POST** `/api/cvs/:id/analyze`
- Headers: `Authorization: Bearer <accessToken>`

### Delete CV
- **DELETE** `/api/cvs/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Download CV
- **GET** `/api/cvs/:id/download`
- Headers: `Authorization: Bearer <accessToken>`

---

## Candidates Endpoints

### List Candidates
- **GET** `/api/candidates?jobId=xxx&status=SHORTLISTED&search=john`
- Headers: `Authorization: Bearer <accessToken>`

### Create Candidate
- **POST** `/api/candidates`
- Headers: `Authorization: Bearer <accessToken>`
- Body: `{ "name": "John Doe", "email": "john@example.com", "phone": "+1234567890", "jobId": "xxx" }`

### Get Candidate
- **GET** `/api/candidates/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Update Candidate
- **PUT** `/api/candidates/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Delete Candidate
- **DELETE** `/api/candidates/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Rank Candidates
- **POST** `/api/candidates/rank`
- Headers: `Authorization: Bearer <accessToken>`
- Body: `{ "jobId": "xxx" }`

### Get Candidate CVs
- **GET** `/api/candidates/:id/cvs`
- Headers: `Authorization: Bearer <accessToken>`

---

## Interviews Endpoints

### List Interviews
- **GET** `/api/interviews?candidateId=xxx&jobId=xxx&status=SCHEDULED`
- Headers: `Authorization: Bearer <accessToken>`

### Get Upcoming Interviews
- **GET** `/api/interviews/upcoming`
- Headers: `Authorization: Bearer <accessToken>`

### Schedule Interview
- **POST** `/api/interviews`
- Headers: `Authorization: Bearer <accessToken>`
- Body: `{ "candidateId": "xxx", "jobId": "xxx", "interviewerId": "xxx", "date": "2024-01-15", "time": "10:00", "duration": 60, "type": "VIDEO_CALL", "location": "Zoom" }`

### Get Interview
- **GET** `/api/interviews/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Update Interview
- **PUT** `/api/interviews/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Cancel Interview
- **DELETE** `/api/interviews/:id`
- Headers: `Authorization: Bearer <accessToken>`

---

## Reports Endpoints

### List Reports
- **GET** `/api/reports?type=MONTHLY`
- Headers: `Authorization: Bearer <accessToken>`

### Generate Report
- **POST** `/api/reports/generate`
- Headers: `Authorization: Bearer <accessToken>`
- Body: `{ "name": "Monthly Report", "type": "MONTHLY", "startDate": "2024-01-01", "endDate": "2024-01-31" }`

### Get Report
- **GET** `/api/reports/:id`
- Headers: `Authorization: Bearer <accessToken>`

### Delete Report
- **DELETE** `/api/reports/:id`
- Headers: `Authorization: Bearer <accessToken>`

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All endpoints return success in this format:
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

---

## Testing with cURL

### Health Check
```bash
curl http://localhost:3000/health
```

### API Root
```bash
curl http://localhost:3000/api
```

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Jobs (with auth)
```bash
curl http://localhost:3000/api/jobs \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Content Security Policy (CSP) Warning

The CSP warning you see in the browser console:
```
Connecting to 'http://localhost:3000/.well-known/appspecific/com.chrome.devtools.json' violates the following Content Security Policy directive
```

This is a **harmless warning** from Chrome DevTools trying to connect to a development endpoint. It doesn't affect your API functionality. It's caused by Helmet.js security headers, which is actually a good security practice.

You can ignore this warning - it's just Chrome DevTools trying to access a non-existent endpoint.


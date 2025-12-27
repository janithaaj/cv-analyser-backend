# Swagger API Documentation Guide

## Accessing Swagger UI

Once your server is running, access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## Features

### Interactive API Documentation
- View all available endpoints
- See request/response schemas
- Test endpoints directly from the browser
- View authentication requirements

### Authentication

Most endpoints require JWT authentication. To use protected endpoints:

1. **Register or Login** first using the `/api/auth/register` or `/api/auth/login` endpoints
2. Copy the `accessToken` from the response
3. Click the **"Authorize"** button at the top of the Swagger UI
4. Enter: `Bearer YOUR_ACCESS_TOKEN`
   - Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
5. Click **"Authorize"** and then **"Close"**

Now you can test all protected endpoints!

## Quick Start

### 1. Start the Server
```bash
npm run dev
```

### 2. Open Swagger UI
Navigate to: `http://localhost:3000/api-docs`

### 3. Test Authentication

#### Register a User
1. Expand **POST /api/auth/register**
2. Click **"Try it out"**
3. Enter user details:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User",
  "role": "HR"
}
```
4. Click **"Execute"**
5. Copy the `accessToken` from the response

#### Login
1. Expand **POST /api/auth/login**
2. Click **"Try it out"**
3. Enter credentials:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
4. Click **"Execute"**
5. Copy the `accessToken`

### 4. Authorize
1. Click the **"Authorize"** button (lock icon) at the top
2. Enter: `Bearer YOUR_ACCESS_TOKEN`
3. Click **"Authorize"** and **"Close"**

### 5. Test Protected Endpoints
Now you can test any protected endpoint:
- Create a job
- Upload a CV
- Create a candidate
- Schedule an interview
- Generate reports

## Endpoint Categories

### Authentication
- Register new user
- Login
- Refresh token
- Get current user

### Jobs
- List jobs (with filters)
- Create job
- Get job details
- Update job
- Delete job
- Get job statistics

### CVs
- List CVs
- Upload CV (multipart/form-data)
- Get CV details
- Analyze CV
- Delete CV
- Download CV

### Candidates
- List candidates
- Create candidate
- Get candidate details
- Update candidate
- Delete candidate
- Rank candidates
- Get candidate's CVs

### Interviews
- List interviews
- Get upcoming interviews
- Schedule interview
- Get interview details
- Update interview
- Cancel interview

### Reports
- List reports
- Generate report
- Get report details
- Delete report

## Testing File Uploads

For CV upload endpoint:
1. Expand **POST /api/cvs/upload**
2. Click **"Try it out"**
3. Fill in:
   - `candidateId`: A valid candidate ID
   - `jobId`: (Optional) A valid job ID
   - `cv`: Click "Choose File" and select a PDF or DOCX file
4. Click **"Execute"**

## Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Tips

1. **Always authorize first** before testing protected endpoints
2. **Check response schemas** to understand the data structure
3. **Use the examples** provided in the documentation
4. **Test with valid IDs** - create resources first, then reference them
5. **Check the console** for detailed error messages

## Troubleshooting

### "Unauthorized" Error
- Make sure you've authorized with a valid token
- Token might have expired - login again to get a new token
- Check that you're using `Bearer` prefix in the authorization

### "404 Not Found"
- Check that the endpoint path is correct
- Verify the server is running
- Check that the resource ID exists

### File Upload Issues
- Make sure the file is PDF or DOCX format
- Check file size (max 10MB)
- Verify `candidateId` is provided and valid

## Export OpenAPI Spec

You can export the OpenAPI specification:

```bash
curl http://localhost:3000/api-docs/swagger.json > swagger.json
```

This exports the complete OpenAPI 3.0 specification that can be imported into:
- Postman
- Insomnia
- Other API testing tools
- API documentation generators

## Additional Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - Detailed endpoint documentation


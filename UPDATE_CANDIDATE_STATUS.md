# Update Candidate Status API

## Overview

The API supports manual status updates for candidates. You can update the status individually or as part of a full candidate update.

## Available Endpoints

### 1. Update Candidate Status Only

**Endpoint:** `PUT /api/candidates/:id/status`

**Purpose:** Update only the candidate's status (simpler, dedicated endpoint)

**Request:**
```bash
PUT /api/candidates/:candidateId/status
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "status": "SHORTLISTED"
}
```

**Example:**
```bash
curl -X PUT "http://localhost:3000/api/candidates/507f1f77bcf86cd799439011/status" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SHORTLISTED"
  }'
```

### 2. Update Candidate (Full Update)

**Endpoint:** `PUT /api/candidates/:id`

**Purpose:** Update candidate including status and other fields

**Request:**
```bash
PUT /api/candidates/:candidateId
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "status": "SHORTLISTED",
  "name": "John Doe",
  "phone": "+1234567890"
  // ... other fields
}
```

**Example:**
```bash
curl -X PUT "http://localhost:3000/api/candidates/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SHORTLISTED"
  }'
```

## Available Status Values

- `NEW` - Newly added candidate
- `SHORTLISTED` - Candidate has been shortlisted
- `INTERVIEWED` - Candidate has been interviewed
- `OFFERED` - Offer has been made
- `HIRED` - Candidate has been hired
- `REJECTED` - Candidate has been rejected

## Features

### 1. Status Validation
- Only valid status values are accepted
- Invalid status returns 400 error

### 2. Automatic lastContact Update
When status changes to:
- `INTERVIEWED` → `lastContact` is automatically set to current date
- `OFFERED` → `lastContact` is automatically set to current date
- `HIRED` → `lastContact` is automatically set to current date

### 3. Error Handling
- **404**: Candidate not found
- **400**: Invalid status or missing status field
- **401**: Unauthorized (missing/invalid token)

## Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Candidate status updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "SHORTLISTED",
    "matchScore": 85,
    "lastContact": "2024-12-25T10:00:00.000Z",
    ...
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid status. Must be one of: NEW, SHORTLISTED, INTERVIEWED, OFFERED, HIRED, REJECTED"
}
```

## Using Swagger UI

1. Go to `http://localhost:3000/api-docs`
2. Authorize with your JWT token
3. Find **PUT /api/candidates/{id}/status**
4. Click "Try it out"
5. Enter candidate ID
6. Enter status in request body:
   ```json
   {
     "status": "SHORTLISTED"
   }
   ```
7. Click "Execute"

## Frontend Integration

### Update Status Only
```typescript
// Update candidate status
const updateStatus = async (candidateId: string, status: string) => {
  const response = await api.put(`/api/candidates/${candidateId}/status`, {
    status: status
  });
  return response.data;
};

// Usage
await updateStatus('507f1f77bcf86cd799439011', 'SHORTLISTED');
```

### Update Full Candidate
```typescript
// Update candidate with status
const updateCandidate = async (candidateId: string, data: any) => {
  const response = await api.put(`/api/candidates/${candidateId}`, {
    status: 'SHORTLISTED',
    ...data
  });
  return response.data;
};
```

## Status Workflow Examples

### Shortlist a Candidate
```bash
PUT /api/candidates/:id/status
{ "status": "SHORTLISTED" }
```

### Mark as Interviewed
```bash
PUT /api/candidates/:id/status
{ "status": "INTERVIEWED" }
# Automatically updates lastContact
```

### Reject a Candidate
```bash
PUT /api/candidates/:id/status
{ "status": "REJECTED" }
```

### Hire a Candidate
```bash
PUT /api/candidates/:id/status
{ "status": "HIRED" }
# Automatically updates lastContact
```

## Testing

### Test with cURL
```bash
# 1. Get your token (login first)
TOKEN="your-jwt-token-here"

# 2. Update status to SHORTLISTED
curl -X PUT "http://localhost:3000/api/candidates/CANDIDATE_ID/status" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "SHORTLISTED"}'

# 3. Verify update
curl -X GET "http://localhost:3000/api/candidates/CANDIDATE_ID" \
  -H "Authorization: Bearer $TOKEN"
```

## Notes

- Status updates are immediate
- `lastContact` is automatically updated for INTERVIEWED, OFFERED, and HIRED
- You can change status from any status to any other status
- Status validation ensures only valid values are accepted
- The dedicated `/status` endpoint is simpler for status-only updates


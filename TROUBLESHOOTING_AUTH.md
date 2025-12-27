# Authentication Troubleshooting Guide

## 401 Unauthorized Error on Login

A 401 error means the login credentials are invalid. Here's how to fix it:

### Common Causes

1. **User doesn't exist** - You need to register first
2. **Wrong password** - Password doesn't match
3. **Wrong email** - Email is incorrect or has typos
4. **Database connection issue** - Can't connect to MongoDB

### Solution Steps

#### Step 1: Register a User First

If you haven't registered yet, you need to create an account first:

**Using Swagger UI:**
1. Go to `http://localhost:3000/api-docs`
2. Expand **POST /api/auth/register**
3. Click **"Try it out"**
4. Enter user details:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User",
  "role": "HR"
}
```
5. Click **"Execute"**
6. Copy the response (you'll get tokens)

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "HR"
  }'
```

**Using your frontend:**
- Make sure you have a registration form/page
- Register a new user first
- Then try logging in with those credentials

#### Step 2: Verify Credentials

Make sure you're using:
- **Exact email** (case-insensitive, but must match exactly)
- **Correct password** (case-sensitive, must match exactly)

#### Step 3: Check Database Connection

Make sure MongoDB is connected:
```bash
# Check server logs for:
# "MongoDB Connected: ..."
```

If you see connection errors, check:
- MongoDB is running
- Connection string in `.env` is correct
- Network/IP is whitelisted (for Atlas)

#### Step 4: Test with Swagger

1. Go to `http://localhost:3000/api-docs`
2. Try the **POST /api/auth/login** endpoint
3. Use the exact email and password you registered with
4. Check the response

### Testing Login

**Using Swagger UI:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "email": "test@example.com",
      "name": "Test User",
      "role": "HR"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Quick Test Script

Create a test user and login:

```bash
# 1. Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "HR"
  }'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'
```

### Common Mistakes

❌ **Wrong:** Using email that doesn't exist
✅ **Correct:** Register first, then login

❌ **Wrong:** Password with extra spaces
✅ **Correct:** Exact password match

❌ **Wrong:** Different email case (though email is case-insensitive)
✅ **Correct:** Use the email you registered with

❌ **Wrong:** Forgetting to include email or password in request
✅ **Correct:** Both fields required

### Debug Checklist

- [ ] User exists in database (check MongoDB)
- [ ] Email matches exactly (case-insensitive)
- [ ] Password matches exactly (case-sensitive)
- [ ] MongoDB is connected
- [ ] Server is running
- [ ] Request includes both email and password
- [ ] Content-Type header is `application/json`

### Check Database Directly

If you have MongoDB Compass or mongosh:

```javascript
// Connect to your database
use cv_analyser

// Check if user exists
db.users.find({ email: "test@example.com" })

// List all users
db.users.find({})
```

### Still Having Issues?

1. **Check server logs** for detailed error messages
2. **Verify MongoDB connection** in server startup logs
3. **Test with Swagger UI** to isolate frontend issues
4. **Check network tab** in browser DevTools for request/response details


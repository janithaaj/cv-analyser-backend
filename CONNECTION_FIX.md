# MongoDB Connection Error Fix

## Error: `querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net`

This error means:
- You're trying to connect to MongoDB Atlas
- The connection string format is incorrect or the cluster name is wrong

## Quick Fix: Use Local MongoDB

Since you have MongoDB running locally, the easiest solution is:

1. **Make sure your `.env` has:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/cv_analyser
   ```

2. **Stop your server** (Ctrl+C)

3. **Rebuild and restart:**
   ```bash
   npm run build
   npm run dev
   ```

## If You Want to Use Atlas

### Correct Connection String Format

Your Atlas connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

**NOT:**
- `mongodb://cluster.mongodb.net` ❌
- `mongodb+srv://cluster.mongodb.net` ❌ (missing cluster name)
- `mongodb+srv://username:password@cluster.mongodb.net` ❌ (wrong format)

### Steps to Get Correct Connection String:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string - it should have your actual cluster name like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/...
   ```
6. Replace `<username>` and `<password>` with your actual credentials
7. If password has special characters, URL-encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`

### Common Issues:

1. **Wrong cluster name**: Make sure you use the actual cluster name from Atlas (e.g., `cluster0.abc123`, not just `cluster`)
2. **Missing credentials**: Username and password must be in the connection string
3. **Network access**: Make sure your IP is whitelisted in Atlas Network Access settings
4. **Database user**: Make sure the database user exists and has correct permissions


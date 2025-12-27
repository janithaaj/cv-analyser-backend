# Quick Start: MongoDB Atlas Setup

## 5-Minute Setup Guide

### 1. Create/Login to MongoDB Atlas Account
- Go to: https://cloud.mongodb.com/
- Sign up (free tier available) or login

### 2. Create a Free Cluster (if you don't have one)
- Click "Build a Database"
- Choose "M0 FREE" (Free tier)
- Select a cloud provider and region
- Click "Create"

### 3. Create Database User
1. Click **"Database Access"** (left sidebar, under Security)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `cvanalyser` (or any name you prefer)
   - **Password**: Click "Autogenerate Secure Password" 
     - **⚠️ COPY THIS PASSWORD IMMEDIATELY!** You won't see it again
     - Or create your own strong password
5. Under "Database User Privileges", select **"Atlas admin"**
6. Click **"Add User"**

### 4. Whitelist Your IP
1. Click **"Network Access"** (left sidebar, under Security)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - OR add your current IP address
4. Click **"Confirm"**
5. Wait 2-3 minutes for changes to apply

### 5. Get Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
5. Copy the connection string

### 6. Update Your .env File

The connection string will look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<username>` → Your database username (from step 3)
- `<password>` → Your database password (from step 3)
- Add database name: `/cv_analyser` before the `?`

**Final format:**
```env
MONGODB_URI=mongodb+srv://cvanalyser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

### 7. Test Connection
```bash
npm run build
npm run dev
```

You should see:
```
Connecting to MongoDB: mongodb+srv://***:***@cluster0.xxxxx.mongodb.net/...
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 3000 in development mode
```

## Example .env Entry

```env
# Database
MONGODB_URI=mongodb+srv://cvanalyser:MySecurePassword123@cluster0.abc123.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

## Common Mistakes to Avoid

❌ **Wrong**: `mongodb://cluster.mongodb.net` (missing `+srv` and cluster name)
❌ **Wrong**: `mongodb+srv://cluster.mongodb.net` (missing credentials)
❌ **Wrong**: Forgetting to add database name `/cv_analyser`
✅ **Correct**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority`

## Need Help?

- See `FIND_ATLAS_CREDENTIALS.md` for detailed instructions
- See `ATLAS_FIX.md` for troubleshooting
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/


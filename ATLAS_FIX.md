# MongoDB Atlas Connection Fix

## Step 1: Get Your Connection String
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 2: Update Your Connection String
Replace `<password>` with your actual database user password:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

**Important:** If your password contains special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- etc.

## Step 3: Whitelist Your IP Address
1. In Atlas Dashboard, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   OR add your current IP address
4. Wait 2-3 minutes for changes to apply

## Step 4: Verify Database User
1. Go to "Database Access"
2. Make sure you have a database user
3. Username and password must match your connection string exactly

## Step 5: Update .env File
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

## Step 6: Test Connection
Restart your server:
```bash
npm run dev
```

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
```


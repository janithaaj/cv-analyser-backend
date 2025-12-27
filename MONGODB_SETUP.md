# MongoDB Connection Setup Guide

## Option 1: MongoDB Atlas (Cloud) - Troubleshooting

If you're getting "Failed to connect to cluster.mongodb.net", check the following:

### 1. Verify Your Connection String Format
Your connection string should look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

### 2. Common Issues and Solutions

#### Issue: Network Access (IP Whitelist)
- Go to MongoDB Atlas Dashboard
- Click "Network Access" in the left sidebar
- Click "Add IP Address"
- Either add your current IP address OR click "Allow Access from Anywhere" (0.0.0.0/0) for development
- Wait a few minutes for changes to propagate

#### Issue: Database User Authentication
- Go to "Database Access" in MongoDB Atlas
- Make sure you have a database user created
- Username and password in connection string must match exactly
- If password has special characters, URL encode them (e.g., `@` becomes `%40`)

#### Issue: Connection String Format
- Make sure there are no extra spaces
- Password should be URL-encoded if it contains special characters
- Cluster name should match your actual cluster name

### 3. Test Your Connection String
You can test the connection string format:
```bash
# Replace with your actual connection string
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cv_analyser"
```

## Option 2: Local MongoDB (Recommended for Development)

### Install MongoDB Locally

#### macOS (using Homebrew):
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually:
mongod --config /usr/local/etc/mongod.conf
```

#### Verify MongoDB is Running:
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Or test connection
mongosh
```

### Update .env for Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/cv_analyser
```

## Quick Fix: Switch to Local MongoDB

If you want to use local MongoDB instead:

1. Install MongoDB locally (see above)
2. Update your `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cv_analyser
   ```
3. Restart your server

## Testing the Connection

After updating your `.env` file, restart your server:
```bash
npm run dev
```

You should see:
```
MongoDB Connected: localhost:27017
```
or
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
```


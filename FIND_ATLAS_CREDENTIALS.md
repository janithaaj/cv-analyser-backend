# How to Find MongoDB Atlas Username and Password

## Step-by-Step Guide

### Step 1: Log into MongoDB Atlas
1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign in with your MongoDB account (or create one if you don't have it)

### Step 2: Access Database Access
1. Once logged in, you'll see your **Atlas Dashboard**
2. In the left sidebar, click on **"Database Access"** (under "Security")
   - It's usually the second option in the Security section
   - Icon looks like a person/user

### Step 3: View or Create Database User

#### If you already have a database user:
1. You'll see a list of database users
2. Click on the user you want to use (or create a new one)
3. **Username** is displayed in the list
4. **Password** - If you forgot it, you'll need to reset it:
   - Click on the user
   - Click **"Edit"** button
   - Click **"Edit Password"**
   - Enter a new password
   - **IMPORTANT:** Save this password somewhere safe!

#### If you need to create a new database user:
1. Click the **"Add New Database User"** button (green button, top right)
2. Choose authentication method:
   - **Password** (recommended for development)
3. Enter:
   - **Username**: Choose any username (e.g., `admin`, `myuser`, `cvanalyser`)
   - **Password**: Click "Autogenerate Secure Password" OR create your own
   - **IMPORTANT:** If you autogenerate, copy it immediately! You won't see it again.
4. Set user privileges:
   - For development: Select **"Atlas admin"** (full access)
   - OR select **"Read and write to any database"**
5. Click **"Add User"**

### Step 4: Get Your Connection String
1. Go back to the main dashboard
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/...
   ```
6. Replace `<username>` with your actual username
7. Replace `<password>` with your actual password

### Step 5: Update Your .env File

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cv_analyser?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `YOUR_USERNAME` with the username from Database Access
- Replace `YOUR_PASSWORD` with your password
- Replace `cluster0.xxxxx` with your actual cluster name
- If your password contains special characters, URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
  - `&` → `%26`
  - `+` → `%2B`
  - `=` → `%3D`

## Visual Guide Locations

```
MongoDB Atlas Dashboard
├── Security (left sidebar)
│   ├── Database Access ← Click here for username/password
│   └── Network Access ← Click here to whitelist IP
└── Clusters
    └── [Your Cluster]
        └── Connect button ← Click here for connection string
```

## Quick Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Went to "Database Access"
- [ ] Found or created database user
- [ ] Have username and password
- [ ] Got connection string from "Connect" button
- [ ] Updated `.env` file with correct credentials
- [ ] Whitelisted IP address in "Network Access"
- [ ] Tested connection

## Troubleshooting

### "Authentication failed"
- Double-check username and password are correct
- Make sure there are no extra spaces
- URL-encode special characters in password

### "IP not whitelisted"
- Go to "Network Access" in Atlas
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0) for development
- Wait 2-3 minutes for changes to apply

### "User not found"
- Make sure you're using the correct username
- Check if the user exists in "Database Access"
- Make sure the user has proper permissions


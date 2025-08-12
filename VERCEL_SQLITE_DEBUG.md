# 🔍 Vercel SQLite Debugging Guide

You're right that Vercel can work with SQLite through API routes! Let's debug why saving isn't working.

## 🚨 **Common Issues & Solutions**

### **1. Database File Location**
**Issue:** Vercel might not find the database file
**Solution:** Ensure the database path is correct

```typescript
// In your .env file, try absolute path:
DATABASE_URL="file:./prisma/dev.db"
```

### **2. Prisma Client Generation**
**Issue:** Prisma client not generated during build
**Solution:** Add build script

```json
// In package.json, ensure you have:
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### **3. Database Initialization**
**Issue:** Database doesn't exist in production
**Solution:** Create initialization script

```typescript
// Create app/lib/init-db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function initializeDatabase() {
  try {
    // Test connection and create tables if needed
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    // Try to run migrations
    const { execSync } = require('child_process');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  }
}
```

### **4. Vercel Configuration**
**Issue:** Vercel not including database file
**Solution:** Add vercel.json configuration

```json
// Create vercel.json in root
{
  "functions": {
    "app/api/**/*.ts": {
      "includeFiles": "prisma/**"
    }
  }
}
```

### **5. Environment Variables**
**Issue:** DATABASE_URL not set in Vercel
**Solution:** Check Vercel dashboard

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ensure `DATABASE_URL` is set to `file:./prisma/dev.db`
3. Apply to all environments (Production, Preview, Development)

## 🛠 **Quick Fixes to Try**

### **Fix 1: Update Build Script**
```bash
npm run build
```

### **Fix 2: Force Prisma Generation**
```bash
npx prisma generate
npx prisma migrate deploy
```

### **Fix 3: Check Database File**
```bash
# Ensure the database file exists and has data
ls -la prisma/
sqlite3 prisma/dev.db ".tables"
```

### **Fix 4: Test API Route Locally**
```bash
# Start local server and test
npm run dev

# Test the API endpoint
curl -X POST http://localhost:3000/api/schedule \
  -H "Content-Type: application/json" \
  -d '{"schedules": {}, "departmentData": {}}'
```

## 🔧 **Debugging Steps**

### **Step 1: Check Vercel Logs**
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on your API route
3. Check the logs for errors

### **Step 2: Add Debug Logging**
```typescript
// In your API route, add logging:
export async function POST(request: Request) {
  console.log('API route called');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Your existing code...
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      message: 'Database error', 
      error: error.message 
    }, { status: 500 });
  }
}
```

### **Step 3: Test Database Connection**
```typescript
// Create app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    await prisma.$connect();
    const count = await prisma.intern.count();
    return NextResponse.json({ 
      status: 'connected', 
      internCount: count 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      error: error.message 
    }, { status: 500 });
  }
}
```

## 🎯 **Most Likely Solutions**

1. **Add `postinstall` script** to package.json
2. **Include prisma files** in Vercel build
3. **Set correct DATABASE_URL** in Vercel environment variables
4. **Ensure database file is committed** to git (if it contains initial data)

## 📞 **Next Steps**

1. Try the build script fix first
2. Check Vercel deployment logs
3. Test the `/api/test-db` endpoint
4. Add debug logging to your save API

Let me know what you find in the logs!
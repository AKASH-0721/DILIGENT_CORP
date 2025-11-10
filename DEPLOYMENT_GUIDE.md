# Deployment Guide - ShopEase E-Commerce Website

This guide provides step-by-step instructions for deploying the ShopEase E-Commerce website to production environments.

## 🚀 Overview

The application consists of:
- **Frontend**: React.js application (deployable to Netlify, Vercel, or similar)
- **Backend**: Node.js/Express.js API (deployable to Heroku, Railway, or similar)
- **Database**: MongoDB Atlas (cloud-hosted)

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables configured
- [ ] Database seeded with sample data (optional)
- [ ] Frontend and backend tested locally
- [ ] Production build tested
- [ ] Domain names configured (if using custom domains)

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster

### 2. Configure Database Access
```bash
# Create database user
1. Go to Database Access in Atlas dashboard
2. Add new database user with read/write permissions
3. Note down username and password

# Configure Network Access
1. Go to Network Access
2. Add IP address (0.0.0.0/0 for development, specific IPs for production)
```

### 3. Get Connection String
```bash
1. Go to Clusters > Connect
2. Choose "Connect your application"
3. Copy the connection string
4. Replace <password> with your database user password
```

### 4. Seed Database (Optional)
```bash
cd backend
node scripts/seedData.js
```

## 🖥️ Backend Deployment (Heroku)

### 1. Prepare for Deployment
```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Update package.json scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2. Deploy to Heroku
```bash
# Install Heroku CLI
# Visit: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create Heroku app
heroku create shopease-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set CORS_ORIGIN="https://your-frontend-domain.com"

# Deploy
git init
git add .
git commit -m "Initial deployment"
heroku git:remote -a shopease-api
git push heroku main
```

### 3. Verify Deployment
```bash
# Check logs
heroku logs --tail

# Test API
curl https://shopease-api.herokuapp.com/api/health
```

## 🌐 Frontend Deployment (Netlify)

### 1. Prepare for Deployment
```bash
cd frontend

# Update API URL in .env or config
REACT_APP_API_URL=https://shopease-api.herokuapp.com/api

# Build for production
npm run build
```

### 2. Deploy to Netlify

#### Option A: Manual Deployment
```bash
# Build the project
npm run build

# Upload 'build' folder to Netlify
# 1. Go to netlify.com
# 2. Drag and drop the 'build' folder
```

#### Option B: Git-based Deployment
```bash
# Connect GitHub repository to Netlify
1. Go to Netlify dashboard
2. Click "New site from Git"
3. Connect GitHub repository
4. Set build settings:
   - Build command: npm run build
   - Publish directory: build
   - Environment variables: REACT_APP_API_URL
```

### 3. Configure Netlify
```toml
# Create netlify.toml in frontend root
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  REACT_APP_API_URL = "https://shopease-api.herokuapp.com/api"
```

## 🚢 Alternative Deployment Options

### Backend Alternatives

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add
railway deploy
```

#### DigitalOcean App Platform
```bash
# Create app.yaml
name: shopease-api
services:
- name: api
  source_dir: backend
  github:
    repo: your-username/shopease
    branch: main
  run_command: node server.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: MONGODB_URI
    value: your-mongodb-uri
```

### Frontend Alternatives

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod

# Set environment variables
vercel env add REACT_APP_API_URL
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://yourusername.github.io/shopease",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run deploy
```

## 🔧 Environment Configuration

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENVIRONMENT=production
```

## 🛡️ Security Configuration

### Backend Security
```javascript
// Update CORS configuration for production
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Update rate limiting for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000
});
```

### Database Security
```bash
# MongoDB Atlas security checklist:
1. Enable database authentication
2. Use strong passwords
3. Restrict network access to specific IPs
4. Enable audit logging
5. Use SSL/TLS connections
6. Regularly update access credentials
```

## 📊 Monitoring and Maintenance

### Health Checks
```bash
# Backend health endpoint
GET /api/health

# Frontend health check
- Monitor build and deployment status
- Set up uptime monitoring (UptimeRobot, Pingdom)
```

### Logging
```bash
# Backend logging
- Use structured logging (Winston, Morgan)
- Set up error tracking (Sentry, LogRocket)
- Monitor API performance

# Frontend monitoring
- Use error boundary components
- Implement analytics (Google Analytics)
- Monitor Core Web Vitals
```

### Backup Strategy
```bash
# Database backups
- MongoDB Atlas automatic backups
- Export collections regularly
- Test backup restoration

# Code backups
- Use version control (Git)
- Tag releases
- Maintain deployment documentation
```

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "shopease-api"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        run: |
          cd frontend
          npm install
          npm run build
          npx netlify-cli deploy --prod --dir=build
        env:
          NETLIFY_AUTH_TOKEN: ${{secrets.NETLIFY_AUTH_TOKEN}}
          NETLIFY_SITE_ID: ${{secrets.NETLIFY_SITE_ID}}
```

## 🎯 Performance Optimization

### Frontend Optimization
```bash
# Build optimization
- Code splitting with React.lazy()
- Image optimization and compression
- CDN configuration for static assets
- Enable gzip compression

# Runtime optimization
- Service worker for caching
- Preload critical resources
- Optimize bundle size
```

### Backend Optimization
```bash
# Server optimization
- Enable compression middleware
- Use database connection pooling
- Implement response caching
- Monitor database query performance

# Infrastructure
- Use load balancer if needed
- Configure auto-scaling
- Set up database indexing
```

## 🚨 Troubleshooting

### Common Issues

#### CORS Errors
```javascript
// Ensure CORS is properly configured
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

#### Database Connection Issues
```bash
# Check MongoDB Atlas network access
# Verify connection string format
# Ensure database user has proper permissions
```

#### Build Failures
```bash
# Check Node.js version compatibility
# Verify all dependencies are installed
# Check for environment variable issues
```

#### API Timeout Issues
```bash
# Increase timeout limits in production
# Check database query performance
# Monitor server resource usage
```

### Debug Commands
```bash
# Check backend logs
heroku logs --tail --app your-app-name

# Check frontend build
npm run build -- --verbose

# Test API endpoints
curl -X GET https://your-api-domain.com/api/health
```

## 📞 Support and Maintenance

### Regular Maintenance Tasks
- [ ] Monitor application performance
- [ ] Update dependencies regularly
- [ ] Review security configurations
- [ ] Check backup systems
- [ ] Monitor database performance
- [ ] Review error logs and fix issues

### Support Contacts
- **Infrastructure**: Cloud provider support
- **Database**: MongoDB Atlas support
- **Development**: Development team
- **Monitoring**: Set up alerts and notifications

---

**Note**: This deployment guide provides general instructions. Always refer to the specific documentation of your chosen hosting providers for the most up-to-date deployment procedures.
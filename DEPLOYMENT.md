# 🚀 Deployment Guide

## Deploy to Vercel

### Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [Git](https://git-scm.com/) installed
- [GitHub Account](https://github.com/)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Movie Recommendation System with web UI"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/psyphon1/Movie-Recommendation-System-1.0.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Web Dashboard

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `psyphon1/Movie-Recommendation-System-1.0`
3. Vercel will auto-detect it's a Python/Flask project
4. Click "Deploy"
5. Wait for deployment to complete
6. Your app will be live at `https://your-project-name.vercel.app`

### Step 3: Verify Deployment

Visit your Vercel URL and test:
- Search for a movie
- Check recommendations
- Try dark mode
- Test responsiveness

---

## Environment Variables (if needed)

If you need to set environment variables on Vercel:

1. Go to **Settings → Environment Variables**
2. Add:
   ```
   FLASK_ENV=production
   ```

---

## Troubleshooting

### Issue: `movies.csv` not found

**Solution**: The CSV file needs to be in the root directory of your repository. Verify:
```bash
ls movies.csv  # Should show the file
```

### Issue: Dependencies not installing

**Solution**: Check `requirements.txt` has correct packages:
```bash
Flask==3.0.0
pandas==2.0.0
numpy==1.24.0
scikit-learn==1.2.0
Werkzeug==3.0.0
```

### Issue: Application crashes on Vercel

**Solution**: Check logs in Vercel dashboard:
1. Go to your Vercel project
2. Click "Deployments"
3. Click the failed deployment
4. Check "Logs" for error messages

---

## Local Testing Before Deployment

```bash
# Test locally first
python app.py

# Visit http://localhost:5000
# Test all features

# Then commit and push to GitHub
git add .
git commit -m "Test and verified all features"
git push origin main
```

---

## GitHub Repository Structure

Your GitHub should have:
```
Movie-Recommendation-System-1.0/
├── app.py
├── config.py
├── requirements.txt
├── vercel.json
├── .gitignore
├── README.md
├── movies.csv
├── main.ipynb
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

---

## Performance Optimization for Vercel

### Current Setup
- ✅ Cold start optimized
- ✅ Lightweight dependencies
- ✅ Efficient data loading

### If Needed (Advanced)
- Add caching headers in Flask
- Implement Redis caching
- Use CDN for static files

---

## Continuous Deployment

With GitHub connected to Vercel:
1. Every push to `main` branch auto-deploys
2. Failed builds prevent deployment
3. View deployment history in Vercel dashboard

### Example Workflow
```bash
# Make changes locally
nano app.py

# Test
python app.py

# Commit and push
git add app.py
git commit -m "Update recommendation algorithm"
git push origin main

# Automatically deploys to Vercel!
```

---

## Custom Domain (Optional)

To add your own domain to Vercel:
1. In Vercel dashboard, go to **Settings → Domains**
2. Add your domain
3. Update DNS records as instructed
4. Wait for verification

---

## Monitoring & Analytics

Vercel provides:
- ✅ Request analytics
- ✅ Error tracking
- ✅ Performance metrics
- ✅ Deployment history

Access in Vercel dashboard → **Analytics**

---

## Rollback (if deployment fails)

```bash
# In Vercel dashboard:
# 1. Go to Deployments
# 2. Click previous successful deployment
# 3. Click "Rollback to this Deployment"
```

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Flask Docs**: https://flask.palletsprojects.com/
- **GitHub Docs**: https://docs.github.com/

---

**You're now ready to deploy to production!** 🚀

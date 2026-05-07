# 🚀 Deployment Guide

## Deploy to Vercel

### Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [Git](https://git-scm.com/) installed
- [GitHub Account](https://github.com/)

### Step 1: Verify GitHub Push

```bash
# Check if all changes are pushed
git status  # Should show "nothing to commit"
git log --oneline  # Should show your recent commits
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

#### Option B: Using Vercel Web Dashboard (Recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Connect your GitHub account if needed
4. Select repository: `psyphon1/Movie-Recommendation-System-1.0`
5. Click **"Import"**
6. Vercel will auto-detect it's a Python/Flask project
7. Click **"Deploy"**

### Step 3: Set Environment Variables

⚠️ **Important**: Environment variables must be set AFTER deployment in Vercel Dashboard

1. After deployment completes, go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
FLASK_ENV = production
FLASK_DEBUG = 0
SECRET_KEY = your-secure-key-here
```

**To generate a secure SECRET_KEY:**
```bash
openssl rand -hex 32
```

4. After adding variables, click **Deployments** → **Redeploy** on the latest deployment

### Step 4: Verify Deployment

Visit your Vercel URL and test:
- Search for a movie
- Check recommendations
- Try dark mode
- Test responsiveness on mobile

Your app URL will be: `https://your-project-name.vercel.app`

---

## Environment Variables

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `FLASK_ENV` | `production` | Vercel Dashboard |
| `FLASK_DEBUG` | `0` | Vercel Dashboard |
| `SECRET_KEY` | Random 32-char string | Vercel Dashboard |

---

## Troubleshooting

### Issue: `movies.csv` not found

**Solution**: The CSV file needs to be in the root directory of your repository.

```bash
ls movies.csv  # Should show the file
```

### Issue: Dependencies not installing

**Check `requirements.txt`:**
```bash
Flask==3.0.0
pandas==2.0.0
numpy==1.24.0
scikit-learn==1.2.0
Werkzeug==3.0.0
python-dotenv==1.0.0
```

### Issue: Application crashes on Vercel

**Solution**: Check logs in Vercel dashboard:
1. Go to your Vercel project
2. Click **Deployments**
3. Click the failed deployment
4. Check **Logs** tab for error messages

### Issue: Environment variables not loaded

**Solution**: Make sure variables are set in Vercel Dashboard **BEFORE** redeploying:
1. Go to **Settings → Environment Variables**
2. Verify all 3 variables are present
3. Click **Redeploy** on latest deployment

---

## Local Testing Before Deployment

```bash
# Test locally first
python app.py

# Visit http://localhost:5000
# Test all features thoroughly

# Then commit and push to GitHub
git add .
git commit -m "Final testing complete"
git push origin main

# Then deploy to Vercel
```

---

## GitHub Repository Structure

Your GitHub repo should have:
```
Movie-Recommendation-System-1.0/
├── .env                 (Not committed - in .gitignore)
├── .env.example         (Shared template)
├── .gitignore          (Prevents committing .env)
├── app.py              (Flask app)
├── config.py           (Configuration)
├── requirements.txt    (Dependencies)
├── vercel.json         (Vercel config)
├── ENV_SETUP.md        (Environment guide)
├── README.md           (Project info)
├── movies.csv          (Dataset)
├── main.ipynb          (Jupyter notebook)
├── templates/
│   └── index.html      (Frontend)
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

---

## Continuous Deployment

With GitHub connected to Vercel:

1. Every push to `main` branch auto-deploys
2. Failed builds prevent deployment
3. View deployment history in Vercel dashboard

### Workflow
```bash
# Make changes locally
nano app.py

# Test locally
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
4. Wait for verification (usually 5-15 minutes)

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

```
In Vercel dashboard:
1. Go to Deployments
2. Click previous successful deployment
3. Click "Redeploy to Production"
```

---

## Performance Monitoring

Check performance metrics:
- Vercel Analytics dashboard
- Response times for API endpoints
- Cold start times
- CPU/Memory usage

---

## Scaling & Optimization

If you need to scale:
- Add Redis for caching
- Implement API rate limiting
- Use CDN for static files
- Consider upgrading Vercel plan

---

## Security Best Practices

✅ Never commit `.env` to GitHub
✅ Use strong SECRET_KEY (32+ characters)
✅ Set FLASK_DEBUG=0 in production
✅ Rotate SECRET_KEY periodically
✅ Use HTTPS (Vercel provides automatically)

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Flask Docs**: https://flask.palletsprojects.com/
- **GitHub Docs**: https://docs.github.com/
- **ENV Setup**: See [ENV_SETUP.md](ENV_SETUP.md)

---

**Your app is ready for production deployment!** 🚀

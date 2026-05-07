# Environment Variables Setup

## Development (.env)

Create a `.env` file in the root directory:

```env
FLASK_ENV=development
SECRET_KEY=dev-secret-key-change-in-production-12345
FLASK_DEBUG=1
```

## Production (Vercel)

⚠️ **Important**: Set environment variables in the Vercel Dashboard, NOT in vercel.json

When deploying to Vercel:

1. Go to your Vercel project
2. Click **Settings → Environment Variables**
3. Add the following variables:

| Variable | Value | Production | Preview | Development |
|----------|-------|------------|---------|-------------|
| `FLASK_ENV` | `production` | ✅ | ✅ | |
| `SECRET_KEY` | `your-secure-random-key` | ✅ | ✅ | |
| `FLASK_DEBUG` | `0` | ✅ | ✅ | |

### Generate a Secure SECRET_KEY

Option 1: Python
```python
import secrets
print(secrets.token_hex(32))
```

Option 2: OpenSSL
```bash
openssl rand -hex 32
```

Option 3: Online Generator
Use: https://generate-secret.vercel.app/

## Environment Variables Reference

- **FLASK_ENV**: Set to `development` or `production`
- **SECRET_KEY**: Random string for session encryption (min 32 chars)
- **FLASK_DEBUG**: Set to `1` for debugging locally, `0` for production

## Loading Environment Variables

The app uses `python-dotenv` to automatically load `.env` file at startup.

```python
from dotenv import load_dotenv
load_dotenv()  # Loads .env file
```

## Local Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Run with .env variables
python app.py
```

## GitHub Security

⚠️ **Important**: Never commit `.env` file to GitHub!

The `.env` file is already in `.gitignore` to prevent accidental commits.

Use `.env.example` as a template for team members.

## Vercel Deployment Steps

1. **Push to GitHub** (already done)
2. **Connect to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repo: `psyphon1/Movie-Recommendation-System-1.0`
   - Click "Deploy"
3. **Set Environment Variables**:
   - After deployment, go to **Settings → Environment Variables**
   - Add `FLASK_ENV=production`
   - Add `SECRET_KEY=your-secure-key-here`
   - Add `FLASK_DEBUG=0`
4. **Redeploy** (if needed):
   - Go to Deployments
   - Click "Redeploy" on the latest deployment

---

For more information, see [DEPLOYMENT.md](DEPLOYMENT.md)


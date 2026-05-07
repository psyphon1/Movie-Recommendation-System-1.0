# Environment Variables Setup

## Development (.env)

Create a `.env` file in the root directory:

```env
FLASK_ENV=development
SECRET_KEY=dev-secret-key-change-in-production-12345
FLASK_DEBUG=1
```

## Production (Vercel)

When deploying to Vercel, set environment variables in the dashboard:

1. Go to your Vercel project
2. Click **Settings → Environment Variables**
3. Add the following:

| Variable | Value | Purpose |
|----------|-------|---------|
| `FLASK_ENV` | `production` | Production mode |
| `SECRET_KEY` | `your-secure-random-key-here` | Flask session security |
| `FLASK_DEBUG` | `0` | Disable debug mode |

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
- **FLASK_DEBUG**: Set to `1` for debugging, `0` for production

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

---

For more information, see [DEPLOYMENT.md](DEPLOYMENT.md)

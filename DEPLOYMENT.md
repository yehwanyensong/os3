# Cloudflare Workers Deployment Guide

## Prerequisites

- GitHub account with this repository
- Cloudflare account (free tier works)

## Step-by-Step Setup

### 1. Cloudflare Account Setup

1. Create a Cloudflare account at https://cloudflare.com if you don't have one
2. Note your Account ID:
   - Log into Cloudflare Dashboard
   - Click on "Workers & Pages"
   - Your Account ID is displayed in the right sidebar

### 2. Create API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Configure permissions:
   - Account > Workers Scripts > Edit
   - Account > Workers KV Storage > Edit (if using KV)
   - Zone > Workers Routes > Edit (if using custom domain)
5. Click "Continue to summary" then "Create Token"
6. **Important**: Copy the token immediately (you won't see it again)

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret" and add:

   **CLOUDFLARE_API_TOKEN**
   ```
   Paste your API token here
   ```

   **CLOUDFLARE_ACCOUNT_ID**
   ```
   Paste your Account ID here
   ```

### 4. Update wrangler.toml (Optional)

Edit `wrangler.toml` to customize your deployment:

```toml
name = "your-project-name"  # Change this to your preferred worker name
main = "worker.js"
compatibility_date = "2024-01-01"

[site]
bucket = "./_site"

# Add custom domain (optional)
# routes = [
#   { pattern = "your-domain.com/*", zone_name = "your-domain.com" }
# ]
```

### 5. Deploy

#### Automatic Deployment (Recommended)

Push to your main branch:
```bash
git add .
git commit -m "Initial deployment setup"
git push origin master  # or 'main'
```

The GitHub Action will automatically:
1. Install dependencies
2. Build the 11ty site
3. Deploy to Cloudflare Workers

Check the "Actions" tab in GitHub to monitor the deployment.

#### Manual Deployment

If you prefer to deploy manually:

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the site
npm run build

# Deploy
npx wrangler deploy
```

### 6. Access Your Site

After deployment:
1. Go to Cloudflare Dashboard > Workers & Pages
2. Find your worker (named from wrangler.toml)
3. Click on it to see the deployment URL (e.g., `your-project.workers.dev`)

## Custom Domain Setup (Optional)

### 1. Add Domain to Cloudflare

1. Add your domain to Cloudflare (if not already added)
2. Update your domain's nameservers to Cloudflare's

### 2. Configure Routes

Update `wrangler.toml`:
```toml
routes = [
  { pattern = "example.com/*", zone_name = "example.com" },
  { pattern = "www.example.com/*", zone_name = "example.com" }
]
```

### 3. Deploy Again

```bash
npx wrangler deploy
```

Your site will now be available at your custom domain!

## Environment Variables

To add environment variables:

### For Development
Create `.dev.vars` file (gitignored):
```
API_KEY=your-dev-key
ENVIRONMENT=development
```

### For Production
Add to `wrangler.toml`:
```toml
[vars]
ENVIRONMENT = "production"
```

Or use Wrangler secrets for sensitive data:
```bash
echo "your-secret-value" | npx wrangler secret put SECRET_NAME
```

Add to GitHub Secrets and reference in the GitHub Action.

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 20+ in GitHub Action
- Check build logs in GitHub Actions tab

### Deployment Fails
- Verify `CLOUDFLARE_API_TOKEN` has correct permissions
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Check Cloudflare Dashboard for any account issues

### Site Not Loading
- Check worker logs in Cloudflare Dashboard
- Verify `_site` directory exists after build
- Check `worker.js` for any errors

### Custom Domain Issues
- Ensure domain is added to Cloudflare
- Verify nameservers are updated
- Check route configuration in `wrangler.toml`
- Allow time for DNS propagation (up to 24-48 hours)

## Monitoring

View logs in Cloudflare Dashboard:
1. Go to Workers & Pages
2. Click your worker
3. Click "Logs" tab
4. View real-time logs or use Logpush for persistent logs

## Updating the Site

Simply push changes to your repository:
```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions will automatically rebuild and redeploy!

## Costs

Cloudflare Workers Free Tier includes:
- 100,000 requests per day
- 10ms CPU time per request
- No bandwidth charges

For most small to medium sites, this is more than enough and costs **$0**.

Paid plans start at $5/month for 10 million requests.

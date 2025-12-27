# Deployment Guide for Vibe AI Marketing Platform

This guide will help you deploy the Vibe AI Marketing Platform to Vercel.

## Prerequisites

Before deploying, make sure you have:

1. ✅ A Supabase project set up (see `SUPABASE_SETUP.md`)
2. ✅ A Google Gemini API key
3. ✅ A GitHub account
4. ✅ A Vercel account (free tier is sufficient)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/vibe-ai-marketing.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables** (click "Environment Variables"):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
```

6. Click "Deploy"

### Option B: Using Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

Follow the prompts and add your environment variables when asked.

## Step 3: Configure Supabase for Production

After your first deployment, you'll have a production URL (e.g., `https://your-project.vercel.app`)

1. Go to your Supabase Dashboard
2. Navigate to **Authentication > URL Configuration**
3. Add your production URLs:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**:
     - `https://your-project.vercel.app`
     - `https://your-project.vercel.app/auth/callback`
     - `https://your-project.vercel.app/**` (wildcard)

4. Update **CORS** settings if needed:
   - Go to **Settings > API**
   - Add your production domain to allowed origins

## Step 4: Update Environment Variables

If you need to update environment variables after deployment:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings > Environment Variables**
3. Edit or add new variables
4. **Important**: Redeploy your project for changes to take effect

## Step 5: Custom Domain (Optional)

To use a custom domain:

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings > Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Update `NEXT_PUBLIC_APP_URL` environment variable with your custom domain
6. Update Supabase redirect URLs with your custom domain

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (keep secret!) | Yes | `eyJhbGc...` |
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key | Yes | `AIzaSy...` |
| `NEXT_PUBLIC_APP_URL` | Your application URL | Yes | `https://yourapp.vercel.app` |

## Continuous Deployment

Once set up, Vercel will automatically:
- ✅ Deploy when you push to your main branch
- ✅ Create preview deployments for pull requests
- ✅ Run build checks before deployment

## Monitoring and Analytics

### Vercel Analytics

Enable analytics in your Vercel Dashboard:
1. Go to your project
2. Navigate to **Analytics**
3. Enable Web Analytics

### Error Tracking

Check deployment logs:
1. Go to your project in Vercel Dashboard
2. Click on a deployment
3. View **Build Logs** and **Function Logs**

## Troubleshooting

### Build Fails

**Error**: `Module not found` or dependency issues
- **Solution**: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error**: Environment variables not found
- **Solution**: Verify all required environment variables are set in Vercel
- Redeploy after adding variables

### Runtime Errors

**Error**: `Unauthorized` or Supabase connection issues
- **Solution**: Check that all Supabase environment variables are correct
- Verify redirect URLs in Supabase dashboard

**Error**: API routes returning 500
- **Solution**: Check function logs in Vercel Dashboard
- Verify Google Gemini API key is valid

### Authentication Issues

**Error**: Users can't log in after deployment
- **Solution**: 
  1. Verify redirect URLs in Supabase match your production URL
  2. Check that `NEXT_PUBLIC_APP_URL` is set correctly
  3. Clear browser cookies and try again

## Performance Optimization

### Recommended Vercel Settings

1. **Edge Functions**: Already configured via middleware
2. **Image Optimization**: Built-in with Next.js Image component
3. **Caching**: Configured via Next.js headers

### CDN and Edge Network

Your site is automatically deployed to Vercel's Edge Network with:
- Global CDN
- Automatic HTTPS
- DDoS protection
- 99.99% uptime SLA

## Security Best Practices

1. ✅ Never commit `.env.local` to version control
2. ✅ Use Vercel Environment Variables for secrets
3. ✅ Enable Vercel's Security features:
   - Authentication
   - Password protection (for staging)
   - IP allowlisting (if needed)
4. ✅ Keep dependencies updated
5. ✅ Monitor for security vulnerabilities

## Scaling

The free Vercel tier includes:
- 100 GB bandwidth
- Unlimited deployments
- Automatic scaling

For higher traffic, upgrade to:
- **Pro**: $20/month - 1TB bandwidth, advanced analytics
- **Enterprise**: Custom pricing - SLA, priority support

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test user registration and login
- [ ] Test image generation feature
- [ ] Check mobile responsiveness
- [ ] Verify theme toggle works
- [ ] Test all dashboard features
- [ ] Monitor error logs for first few days
- [ ] Set up monitoring/alerting

---

🎉 **Congratulations!** Your Vibe AI Marketing Platform is now live!


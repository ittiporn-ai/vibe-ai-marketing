# Quick Start Guide 🚀

Get your Vibe AI Marketing Platform up and running in minutes!

## 1. Prerequisites

Make sure you have:
- Node.js 18+ installed
- npm or yarn
- A Supabase account (free tier is fine)
- A Google Gemini API key

## 2. Installation

```bash
# Clone or navigate to the project directory
cd "/Users/ittiporn/Documents/Vibe Coing MCP"

# Install dependencies
npm install
```

## 3. Environment Setup

Create a `.env.local` file in the project root:

```env
# Copy from .env.example
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Get Supabase Credentials:

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings > API**
4. Copy the URL and keys

### Get Google Gemini API Key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

## 4. Setup Supabase Database

1. Go to your Supabase project
2. Open **SQL Editor**
3. Copy and paste the SQL from `SUPABASE_SETUP.md`
4. Run the migration

Quick SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generated_images table
CREATE TABLE IF NOT EXISTS public.generated_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    prompt_en TEXT,
    image_url TEXT,
    style TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Create policies (see SUPABASE_SETUP.md for complete policies)
```

## 5. Disable Email Confirmation

**Important**: In Supabase Dashboard:
1. Go to **Authentication > Settings**
2. Scroll to **Email Auth**
3. **Turn OFF** "Enable email confirmations"
4. Save changes

## 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 7. Test the Application

### Test Landing Page
- Navigate to `http://localhost:3000`
- Check that all sections load properly

### Test Registration
1. Click "เริ่มใช้งานฟรี" or "Sign Up"
2. Fill in the form
3. Submit
4. You should be automatically logged in (no email verification!)

### Test Dashboard
- After login, you should see the dashboard
- Check all menu items work

### Test Image Generation
1. Go to "สร้างภาพ / Generate"
2. Enter a prompt (Thai or English)
3. Select a style
4. Click "สร้างภาพ"
5. Wait for the image to generate

**Note**: The current implementation uses placeholder images. To use real AI image generation, you'll need to integrate with a proper image generation API (see README.md for details).

## 8. Common Issues

### Port already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Environment variables not loading
- Make sure `.env.local` is in the project root
- Restart the dev server after adding env variables
- Check for typos in variable names

### Supabase connection errors
- Verify your Supabase URL and keys are correct
- Check that your Supabase project is active
- Ensure RLS policies are set up correctly

### Authentication issues
- Verify email confirmation is disabled in Supabase
- Check redirect URLs in Supabase settings
- Clear browser cookies and try again

## 9. Next Steps

Once everything is working:

1. ✅ Customize the landing page content
2. ✅ Integrate real AI image generation API
3. ✅ Add more features as needed
4. ✅ Deploy to Vercel (see DEPLOYMENT.md)

## Quick Commands

```bash
# Development
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run linter

# Supabase (if using Supabase CLI)
npx supabase start # Start local Supabase
npx supabase db reset # Reset database

# Vercel
vercel            # Deploy to Vercel
vercel dev        # Run with Vercel dev server
```

## Need Help?

- 📖 See `README.md` for detailed documentation
- 🔧 See `SUPABASE_SETUP.md` for database setup
- 🚀 See `DEPLOYMENT.md` for deployment guide

---

**Happy coding!** 🎉 If you run into any issues, check the documentation or the error logs.


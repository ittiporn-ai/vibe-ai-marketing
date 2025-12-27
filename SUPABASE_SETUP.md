# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project:
   - **Name**: vibe-ai-marketing
   - **Database Password**: (Save this securely)
   - **Region**: Southeast Asia (Singapore) for Thai users
5. Wait for the project to be created

## 2. Get API Keys

1. Go to Project Settings > API
2. Copy the following values to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service_role key (keep this secret!)

## 3. Configure Authentication (Disable Email Verification)

1. Go to Authentication > Settings
2. Scroll to "Email Auth"
3. **IMPORTANT**: Turn OFF "Enable email confirmations"
4. This allows users to sign up and immediately use the platform without email verification
5. Set "Site URL" to: `http://localhost:3000` (for development)
6. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - Your production URL when deployed

## 4. Run Database Migrations

Run the following SQL in the SQL Editor (Database > SQL Editor):

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

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Generated Images RLS Policies
CREATE POLICY "Users can view own images"
    ON public.generated_images FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images"
    ON public.generated_images FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own images"
    ON public.generated_images FOR DELETE
    USING (auth.uid() = user_id);

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 5. Setup Storage for Images (Optional but Recommended)

1. Go to Storage
2. Create a new bucket called `generated-images`
3. Make it **Public** (for easy image access)
4. Set up storage policies:

```sql
-- Allow users to upload their own images
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'generated-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'generated-images');
```

## 6. Update .env.local

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 7. Test Connection

Run your Next.js app:
```bash
npm run dev
```

The app should now be able to connect to Supabase!

## Important Notes

- **Email Confirmation is DISABLED** - Users can immediately access the platform after signup
- RLS policies ensure users can only access their own data
- The trigger automatically creates a profile when a user signs up
- Images are stored in Supabase Storage with proper permissions


# Vibe AI Marketing Platform

แพลตฟอร์มสร้างภาพด้วย AI สำหรับนักการตลาดไทย
AI-powered Image Generation Platform for Thai Marketers

## Features ✨

- 🎨 **AI Image Generation** - สร้างภาพสวยงามด้วย AI
- 🚀 **No Email Verification** - ไม่ต้องยืนยันอีเมล เริ่มใช้งานได้ทันที
- 🌍 **Bilingual** - รองรับทั้งภาษาไทยและอังกฤษ
- 📊 **Beautiful Dashboard** - แดชบอร์ดสวยงามด้วย Shadcn UI
- 📱 **Responsive Design** - ใช้งานได้ทุกอุปกรณ์
- 🔒 **Secure Authentication** - ระบบรักษาความปลอดภัยด้วย Supabase

## Tech Stack 🛠️

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Iconify
- **Authentication & Database**: Supabase
- **AI**: Google Gemini API
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started 🚀

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Supabase account
- Google Gemini API key

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd vibe-ai-marketing
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup Supabase**

Follow the instructions in `SUPABASE_SETUP.md` to:
- Create a Supabase project
- Configure authentication (disable email confirmation)
- Run database migrations
- Setup storage for images

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
├── app/
│   ├── (auth)/          # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/     # Dashboard pages
│   │   └── dashboard/
│   ├── api/             # API routes
│   │   └── generate-image/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── landing/         # Landing page components
│   └── dashboard/       # Dashboard components
├── lib/
│   ├── supabase/        # Supabase clients
│   └── utils.ts
└── public/
```

## Features in Detail 📝

### Landing Page
- Hero section with animated gradients
- Features showcase
- How it works section
- Call-to-action

### Authentication
- Email/Password registration
- No email verification required
- Automatic login after signup
- Protected routes with middleware

### Dashboard
- User statistics
- Recent images gallery
- Image generation interface
- History page
- Settings page

### AI Image Generation
- Multiple style options
- Thai/English prompt support
- Real-time generation
- Download functionality
- Image history

## Deployment 🚀

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - Add all environment variables from `.env.local`
   - Update `NEXT_PUBLIC_APP_URL` to your production URL

4. **Configure Supabase**
   - Update redirect URLs in Supabase dashboard
   - Add your production URL to allowed origins

5. **Deploy**
   - Vercel will automatically build and deploy your app

## Important Notes ⚠️

### Image Generation
The current implementation uses **placeholder images** for demonstration purposes. In production, you should integrate with a real image generation API such as:

- **DALL-E 3** (OpenAI)
- **Stable Diffusion** (Stability AI)
- **Midjourney API**
- **Replicate** (various models)

Update the `/api/generate-image/route.ts` file to integrate with your chosen service.

### Supabase Configuration
Make sure to:
- ✅ Disable email confirmation in Supabase Auth settings
- ✅ Run all database migrations
- ✅ Setup Row Level Security (RLS) policies
- ✅ Configure storage bucket for images (optional)

## Development 👩‍💻

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

Use Shadcn CLI to add new components:

```bash
npx shadcn@latest add <component-name>
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

## Support 💬

For questions or issues, please open an issue on GitHub.

---

Made with ❤️ for Thai marketers


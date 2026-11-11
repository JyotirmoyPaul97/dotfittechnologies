# Deploy IntFit.ai

## Supabase

The app uses Supabase Auth and the `public.profiles` table. It only needs these client-safe environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-or-publishable-key>
```

Set them in `.env.local` for local development and in Vercel Project Settings for both Preview and Production. Do not add a Supabase service-role key to the browser app.

Apply [`supabase/migrations/00000000000002_profiles.sql`](supabase/migrations/00000000000002_profiles.sql) to the Supabase project before using profile setup. It creates the profile table and row-level policies that restrict each account to its own profile.

In Supabase Authentication settings, set the production site URL and allow the app's local and production callback origins. Sign-up returns users to the current site origin after email confirmation.

## Vercel

Import the GitHub repository as a Next.js project. Keep the repository root as the project root and use the detected defaults (`npm install` and `npm run build`). Add the Supabase variables above before the first production build. Vercel creates preview deployments for non-production branches and production deployments from the configured production branch.

Before deploying, run:

```sh
npm run lint
npx tsc --noEmit
npm run build
```

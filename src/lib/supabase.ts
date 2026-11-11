import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables are not set. Auth features will be disabled. " +
      "Copy .env.example to .env.local and fill in your Supabase project credentials."
  );
}

let supabaseClient;
try {
  // createBrowserClient is intended for browser environments only.
  // If called during SSR (server), it may throw. We'll catch and fallback to createClient.
  supabaseClient = createBrowserClient(
    supabaseUrl ?? "https://placeholder.supabase.co",
    supabaseAnonKey ?? "placeholder-anon-key"
  );
} catch (err) {
  console.warn("[Supabase] createBrowserClient failed, falling back to createClient:", err);
  supabaseClient = createClient(
    supabaseUrl ?? "https://placeholder.supabase.co",
    supabaseAnonKey ?? "placeholder-anon-key"
  );
}

export const supabase = supabaseClient;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("placeholder")
);
import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '';
const rawAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';

const supabaseUrl = rawUrl.trim() || 'http://localhost:54321';
const supabaseAnonKey = rawAnon.trim() || 'development-anon-key';

if (!rawUrl.trim() || !rawAnon.trim()) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



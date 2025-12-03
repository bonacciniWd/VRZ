import { createClient } from '@supabase/supabase-js';

// REQUIRED in .env (Vite):
// VITE_SUPABASE_URL=https://<project>.supabase.co
// VITE_SUPABASE_ANON_KEY=ey...

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail fast to help local/dev setup
  // eslint-disable-next-line no-console
  console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

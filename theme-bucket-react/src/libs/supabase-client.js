import { createClient } from '@supabase/supabase-js'

export const supabase = globalThis.supabase || createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY)

if (process.env.NODE_ENV !== 'production') {
    globalThis.supabase = supabase
}
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Use a valid format URL even if it's fake - Supabase validates URL format
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxxxxxxxxxxxxxxxxxx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTk4MDAsImV4cCI6MTk2MDc3NTgwMH0.placeholder'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

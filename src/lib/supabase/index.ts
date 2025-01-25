export * from './client';
export * from './types';

// Re-export commonly used Supabase types
export type {
  PostgrestError,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

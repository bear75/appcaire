// Core client
export { supabase, supabaseAdmin } from './client';

// Storage utilities
export {
  downloadFile,
  getPublicUrl,
  listFiles,
  removeFile,
  uploadFile,
} from './utils/storage';

// Real-time subscription utilities
export {
  subscribeToTable,
  unsubscribe,
  useTableSubscription,
} from './utils/realtime';

// Types
export type { Database } from './types';

// Re-export commonly used Supabase types
export type {
  PostgrestError,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

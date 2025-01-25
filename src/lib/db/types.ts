import type { SupabaseClient } from '@supabase/supabase-js';

// Re-export the Database type from schema
export type { Database } from './schema';

// Storage types
export type StorageFile = {
  name: string;
  bucket_id: string;
  owner: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
};

export type StorageError = {
  message: string;
  statusCode: number;
};

// Client types
export type DbClient = SupabaseClient<Database>;
export type DbAdminClient = SupabaseClient<Database>;

// Real-time subscription types
export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export type SubscriptionFilter = {
  event?: RealtimeEvent;
  schema?: string;
  table?: string;
  filter?: string;
}; 
import type { SupabaseClient } from '@supabase/supabase-js';

// Re-export the Database type from Drizzle schema
export type { Database } from '@/models/Schema';

// Supabase-specific types
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

export type SupabaseStorageClient = SupabaseClient['storage'];

// Real-time subscription types
export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export type SubscriptionFilter = {
  event?: RealtimeEvent;
  schema?: string;
  table?: string;
  filter?: string;
};

import type { RealtimeChannel } from '@supabase/supabase-js';

import { supabase } from '../client';

type SubscriptionCallback<T = any> = (payload: {
  new: T;
  old: T;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
}) => void;

export function subscribeToTable(
  table: string,
  callback: SubscriptionCallback,
  filter?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    organizationId?: string;
  },
): RealtimeChannel {
  const channel = supabase
    .channel(`public:${table}`)
    .on(
      'postgres_changes',
      {
        event: filter?.event || '*',
        schema: 'public',
        table,
        filter: filter?.organizationId
          ? `organization_id=eq.${filter.organizationId}`
          : undefined,
      },
      (payload) => {
        callback({
          new: payload.new,
          old: payload.old,
          eventType: payload.eventType,
        });
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel);
}

// Helper hook for React components
export function useTableSubscription<T = any>(
  table: string,
  callback: SubscriptionCallback<T>,
  filter?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    organizationId?: string;
  },
) {
  const channel = subscribeToTable(table, callback, filter);

  // Cleanup subscription on unmount
  return () => unsubscribe(channel);
}

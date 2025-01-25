import { useEffect, useState } from 'react';

import type { RealtimeChannel } from '@supabase/supabase-js';

import { db } from '../client';
import type { RealtimeEvent, SubscriptionFilter } from '../types';

const subscriptions = new Map<string, RealtimeChannel>();

/**
 * Subscribe to real-time changes on a table
 */
export function subscribeToTable<T = any>(
  filter: SubscriptionFilter,
  callback: (payload: T) => void,
): () => void {
  const { event = '*', schema = 'public', table, filter: whereFilter } = filter;
  
  const channel = db.channel('table_changes')
    .on(
      'postgres_changes',
      { event, schema, table, filter: whereFilter },
      (payload) => callback(payload.new as T),
    )
    .subscribe();

  const key = `${schema}:${table}:${event}:${whereFilter || ''}`;
  subscriptions.set(key, channel);

  return () => {
    channel.unsubscribe();
    subscriptions.delete(key);
  };
}

/**
 * Unsubscribe from all or specific subscriptions
 */
export function unsubscribe(filter?: SubscriptionFilter): void {
  if (!filter) {
    subscriptions.forEach((channel) => channel.unsubscribe());
    subscriptions.clear();
    return;
  }

  const { schema = 'public', table, event = '*', filter: whereFilter } = filter;
  const key = `${schema}:${table}:${event}:${whereFilter || ''}`;
  const channel = subscriptions.get(key);
  
  if (channel) {
    channel.unsubscribe();
    subscriptions.delete(key);
  }
}

/**
 * React hook for table subscriptions
 */
export function useTableSubscription<T = any>(
  filter: SubscriptionFilter,
): T[] {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTable<T>(filter, (newItem) => {
      setItems((current) => [...current, newItem]);
    });

    return () => {
      unsubscribe();
    };
  }, [filter]);

  return items;
} 
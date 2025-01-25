import { useState, useCallback } from 'react';
import { useToast } from './useUI';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Generic hook for data fetching with loading and error states
 */
export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const toast = useToast();

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchFn();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, isLoading: false, error: error as Error });
      toast.error(errorMessage);
      throw error;
    }
  }, [fetchFn, toast]);

  return {
    ...state,
    execute,
  };
}

/**
 * Hook for infinite scrolling functionality
 */
export function useInfiniteScroll<T>(
  fetchPage: (page: number) => Promise<T[]>,
  options = { pageSize: 10 }
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const toast = useToast();

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newItems = await fetchPage(page);
      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length === options.pageSize);
      setPage(prev => prev + 1);
    } catch (error) {
      toast.error('Failed to load more items');
    } finally {
      setIsLoading(false);
    }
  }, [fetchPage, page, isLoading, hasMore, options.pageSize, toast]);

  return {
    items,
    isLoading,
    hasMore,
    loadMore,
  };
}

/**
 * Hook for managing optimistic updates
 */
export function useOptimisticUpdate<T extends { id: string | number }>(
  items: T[],
  onUpdate: (items: T[]) => Promise<void>
) {
  const [optimisticItems, setOptimisticItems] = useState(items);
  const toast = useToast();

  const update = useCallback(async (updatedItem: T) => {
    // Apply optimistic update
    setOptimisticItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );

    try {
      await onUpdate([...optimisticItems]);
    } catch (error) {
      // Revert on error
      setOptimisticItems(items);
      toast.error('Failed to update. Changes reverted.');
    }
  }, [items, optimisticItems, onUpdate, toast]);

  return {
    items: optimisticItems,
    update,
  };
} 
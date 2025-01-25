import { useState, useCallback } from 'react';
import { useToast as useToastBase } from '@/components/ui/use-toast';

/**
 * Enhanced toast hook with predefined styles and behaviors
 */
export function useToast() {
  const toast = useToastBase();

  const success = useCallback((message: string) => {
    toast({
      title: 'Success',
      description: message,
      variant: 'default',
    });
  }, [toast]);

  const error = useCallback((message: string) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  }, [toast]);

  const info = useCallback((message: string) => {
    toast({
      title: 'Info',
      description: message,
      variant: 'default',
    });
  }, [toast]);

  return {
    ...toast,
    success,
    error,
    info,
  };
}

/**
 * Hook for managing menu state
 */
export function useMenu(defaultOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

/**
 * Hook for managing mobile navigation
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = useCallback(() => setIsOpen(true), []);
  const closeNav = useCallback(() => setIsOpen(false), []);
  const toggleNav = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openNav,
    closeNav,
    toggleNav,
  };
} 
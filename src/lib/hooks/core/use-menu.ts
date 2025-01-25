import { useState } from 'react';

interface UseMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

/**
 * Hook for managing menu state
 * @returns {UseMenuReturn} Menu state and handlers
 */
export function useMenu(): UseMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
} 